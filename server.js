const express = require('express');
const util = require('util');
const log = require('simple-node-logger').createSimpleLogger('info.log');

var jsonfile = require('jsonfile')
var fs = require('fs');
var https = require('https');

var key = process.env.KEY;
var cert = process.env.CERT;
console.log("KEY: ", key);
console.log("CERT: ", cert);
var options = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert)
};

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

var server = https.createServer( options, app );
server.listen(443, function () {
    console.log( 'Express server listening on port ' + server.address().port );
    log.info( 'Express server listening on port ' + server.address().port );
});

app.get('/', function (req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    res.render("index");
  }
})

app.get("/reflections", function(req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    public_images("reflections", req.query.contain_px, function(ret_string) {
      res.write(ret_string);
      res.end();
    });
  }
})

app.get("/sports", function(req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    public_images("sports", req.query.contain_px, function(ret_string) {
      res.write(ret_string);
      res.end();
    });
  }
})

app.get("/portraits", function(req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    public_images("portraits", req.query.contain_px, function(ret_string) {
      res.write(ret_string);
      res.end();
    });
  }
})

app.get("/italy", function(req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    public_images("italy", req.query.contain_px, function(ret_string) {
      res.write(ret_string);
      res.end();
    });
  }
})

app.get("/health", function(req, res) {
  res.sendStatus(200);
  res.end();
})

app.get("/edit", function(req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    res.render("edit");
  }
})

app.get("/edit/images", function(req, res) {
  console.log(req.headers);
  log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    edit_images(req.query.contain_px, function(ret_string) {
      res.write(ret_string);
      res.end();
    });
  }
})

var public_images = function(album, contain_px, callback) {
  var ret_string = "";
  let path = util.format("public/img/portfolio/resized/%s/%s/", contain_px, album)

  console.log(util.format("Listing directory items for %s...", path))
  fs.readdir(path, function(err, items) {
      for (var i=0; i<items.length; i++) {
          ret_string += util.format("https://quinnfostersreflection.com/img/portfolio/resized/%s/%s/%s|", contain_px, album, items[i])
          // ret_string += util.format("https://localhost/img/portfolio/resized/%s/%s/%s|", contain_px, album, items[i])
      }
      callback(ret_string)
  });
}

var edit_images = function(contain_px, callback) {
  var ret_string = "";
  var file = './meta.json'
  jsonfile.readFile(file, function(err, meta) {
    // console.dir(meta)

    for (album in meta) {
      console.log(album);
      let path = util.format("public/img/portfolio/resized/%s/%s/", contain_px, album)

      console.log(util.format("Listing directory items for %s...", path))
      fs.readdirSync(path).forEach(function(item) {
        var photo_name = item;
        // console.log(photo_name);
        ret_string += util.format("https://quinnfostersreflection.com/img/portfolio/resized/%s/%s/%s,", contain_px, album, photo_name);

        for (var j=0; j<meta[album].length; j++) {
          if (meta[album][j].photo_name == photo_name) {
            ret_string += util.format("%s,", meta[album][j].caption);
            ret_string += util.format("%s|", meta[album][j].index);
          }
        }

        ret_string += util.format(";")
        // console.log(ret_string);
      });
    }

    callback(ret_string);

  })
}

// NOTE: depracated
var s3_images = function(album, contain_px_param, callback) {
  var ret_string = "";
  let contain_px = parseInt(contain_px_param, 10);

  let s3 = new AWS.S3();
  let path = util.format("resized/%d/%s", contain_px, album);
  console.log(path);
  log.info(path);
  let params = {
    Bucket: "qfoster",
    Prefix: path
  };
  console.log(params);
  log.info(params);

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
    log.info("Num objects: ", num_objects);
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
