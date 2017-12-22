const express = require('express');
const util = require('util');
const AWS = require('aws-sdk');

var fs = require('fs');
var https = require('https');

var options = {
  key: fs.readFileSync( 'encrypt/quinnfostersreflection.com.key' ),
  cert: fs.readFileSync( 'encrypt/quinnfostersreflection.com.cert' ),
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();

const access_key = process.env.AWS_ACCESS_KEY_ID;
const secret_key = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config = new AWS.Config();
AWS.config.accessKeyId = access_key;
AWS.config.secretAccessKey = secret_key;
AWS.config.region = "us-east-1";

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

var server = https.createServer( options, app );
server.listen(443, function () {
    console.log( 'Express server listening on port ' + server.address().port );
});

app.get('/', function (req, res) {
  console.log(req.headers);
  
  if (req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }

  res.render("index");
})

app.get("/sports", function(req, res) {
  console.log(req.headers);
  
  if (req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }

  images("sports", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/portraits", function(req, res) {
  console.log(req.headers);
  
  if (req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }

  images("portraits", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/reflections", function(req, res) {
  console.log(req.headers);
  
  if (req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }

  images("reflections", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/italy", function(req, res) {
  console.log(req.headers);
  
  if (req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }

  images("italy", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/health", function(req, res) {
  res.sendStatus(200);
  res.end();
})

var images = function(album, contain_px_param, callback) {
  var ret_string = "";
  let contain_px = parseInt(contain_px_param, 10);

  let s3 = new AWS.S3();
  let path = util.format("resized/%d/%s", contain_px, album);
  console.log(path);
  let params = {
    Bucket: "qfoster",
    Prefix: path
  };
  console.log(params);

  s3.listObjects(params, function(err, bucket_objects) {
    if (err) {
      throw err;
    }

    let num_objects = 0;

    bucket_objects.Contents.forEach(function(object) {
      if (object["Size"] == 0) {
        return
      }

      if (object["Key"].includes(path)) {
        num_objects += 1;
      }
    });

    console.log("Num objects: ", num_objects);
    let count = 0;
    bucket_objects.Contents.forEach(function(object) {
      if (object["Size"] == 0) {
        return
      }

      if (object["Key"].includes(path)) {
        count += 1;
        let src_string = util.format("https://s3.amazonaws.com/qfoster/%s|", object.Key);
        ret_string += src_string;
        if (count == num_objects) {
          callback(ret_string);
        }
      }
    });
  });
}
