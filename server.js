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
    edit_images(req.query.album, req.query.contain_px, function(ret_string) {
      res.write(ret_string);
      res.end();
    });
  }
})

app.get("/update", function(req, res) {
  // console.log(req.headers);
  // log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    // console.log(req.query);

    var contain_px = req.query.contain_px;
    var forms = req.query.forms;

    var file = './meta.json'
    console.log("About to read meta.json...");
    jsonfile.readFile(file, function(err, meta) {
      console.log("meta.json read...");
      console.dir(meta)

      for (var i=0; i<forms.length; i++) {
        var form = forms[i];
        console.log(form);

        var album = form.album;
        var photo = form.photo;
        var caption = form.caption;
        var index = form.index;

        for (var j=0; j<meta[album].length; j++) {
          var photo_name = meta[album][j].photo_name;
          if (photo_name == photo) {
            meta[album][j].caption = caption;
            meta[album][j].index = index;
            console.log(caption);
          }
        }
      }

      console.log("writing back to meta.json...");
      jsonfile.writeFile(file, meta, {spaces: 2, EOL: '\r\n'}, function(err) {
        edit_images(album, contain_px, function(ret_string) {
          // console.log(ret_string);
          res.write(ret_string);
          res.end();
        });
      })
    })
  }
})

app.get("/delete", function(req, res) {
  console.log(req.headers);
  // log.info(req.headers);

  if (req.headers.host !== "localhost" && req.get('X-Forwarded-Proto') !== 'https') {
    console.log("Insecure, redirecting...");
    log.info("Insecure, redirecting...");
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else {
    console.log(req.query);

    var contain_px = req.query.contain_px;
    var buttons = req.query.buttons;
    var photos = [];

    for (var i=0; i<buttons.length; i++) {
      var album = buttons[i].album;
      var photo = buttons[i].photo;
      photos.push(photo);

      for (var j=100; j<2500; j += 50) {
        var path = util.format("public/img/portfolio/resized/%d/%s/%s", j, album, photo);
        console.log(path)
        fs.unlink(path, function(err) {});
      }
    }

    var file = './meta.json'
    jsonfile.readFile(file, function(err, meta) {
      // console.dir(meta)

      var new_meta = {}
      new_meta[album] = [];

      for (var other_album in meta) {
        if (other_album != album) {
          new_meta[other_album] = meta[other_album];
        }
      }

      for (var i=0; i<meta[album].length; i++) {
        var photo_name = meta[album][i].photo_name;
        if (!photos.includes(photo_name)) {
          new_meta[album].push(meta[album][i]);
        }
      }

      console.log("writing back to meta.json...");
      jsonfile.writeFile(file, new_meta, {spaces: 2, EOL: '\r\n'}, function(err) {
        edit_images(album, contain_px, function(ret_string) {
          // console.log(ret_string);
          res.write(ret_string);
          res.end();
        });
      })
    })

  }
})

var public_images = function(album, contain_px, callback) {
  var ret_string = "";

  var file = './meta.json'
  jsonfile.readFile(file, function(err, meta) {
    // console.dir(meta)

    for (var i=0; i<meta[album].length; i++) {
      for (var j=0; j<meta[album].length; j++) {
        var index = meta[album][j].index;
        if (i == index) {
          var photo_name = meta[album][j].photo_name;
          var caption = meta[album][j].caption;
          ret_string += util.format("https://quinnfostersreflection.com/img/portfolio/resized/%s/%s/%s|", contain_px, album, photo_name);
        }
      }
    }

    callback(ret_string);
  })
}

var edit_images = function(album, contain_px, callback) {
  var ret_string = "";
  var file = './meta.json'
  jsonfile.readFile(file, function(err, meta) {
    // console.dir(meta)

    for (var i=0; i<meta[album].length; i++) {
      for (var j=0; j<meta[album].length; j++) {
        var index = meta[album][j].index;
        if (i == index) {
          var photo_name = meta[album][j].photo_name;
          var caption = meta[album][j].caption;
          ret_string += util.format("https://quinnfostersreflection.com/img/portfolio/resized/%s/%s/%s,", contain_px, album, photo_name);
          ret_string += util.format("%s,", caption);
          ret_string += util.format("%s|", index);
          ret_string += util.format(";")
        }
      }
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
