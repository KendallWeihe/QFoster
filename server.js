const express = require('express');
const util = require('util');
const AWS = require('aws-sdk');

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  res.render("index");
})

app.get("/sports", function(req, res) {
  images("sports", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/portraits", function(req, res) {
  images("portraits", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/reflections", function(req, res) {
  images("reflections", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

app.get("/italy", function(req, res) {
  images("italy", req.query.contain_px, function(ret_string) {
    res.write(ret_string);
    res.end();
  });
})

// app.get('/main_images', function (req, res) {
//   console.log("/main_images");
//   console.log(req.query);
//   let album = req.query.album;
//   let contain_px = parseInt(req.query.contain_px, 10);
//
//   let s3 = new AWS.S3();
//   let path = util.format("resized/%d/%s", contain_px, album);
//   console.log(path);
//   let params = {
//     Bucket: "qfoster",
//     Prefix: path
//   };
//   console.log(params);
//
//   s3.listObjects(params, function(err, bucket_objects) {
//     if (err) {
//       throw err;
//     }
//
//     let num_objects = 0;
//
//     bucket_objects.Contents.forEach(function(object) {
//       if (object["Size"] == 0) {
//         return
//       }
//
//       if (object["Key"].includes(path)) {
//         num_objects += 1;
//       }
//     });
//
//     console.log("Num objects: ", num_objects);
//     let count = 0;
//     bucket_objects.Contents.forEach(function(object) {
//       if (object["Size"] == 0) {
//         return
//       }
//
//       if (object["Key"].includes(path)) {
//         count += 1;
//         let src_string = util.format("https://s3.amazonaws.com/qfoster/%s|", object.Key);
//         res.write(src_string);
//         if (count == num_objects) {
//           res.end();
//         }
//       }
//     });
//   });
// });
//
// app.get('/thumbnails', function (req, res) {
//   console.log("/thumbnails");
//   console.log(req.query);
//   let album = req.query.album;
//   let contain_px = parseInt(req.query.contain_px, 10);
//
//   let s3 = new AWS.S3();
//   let path = util.format("resized_thumbnails/%d/%s", contain_px, album);
//   console.log(path);
//   let params = {
//     Bucket: "qfoster",
//     Prefix: path
//   };
//   console.log(params);
//
//   s3.listObjects(params, function(err, bucket_objects) {
//     let num_objects = 0;
//
//     bucket_objects.Contents.forEach(function(object) {
//       if (object["Size"] == 0) {
//         return
//       }
//
//       if (object["Key"].includes(path)) {
//         num_objects += 1;
//       }
//     });
//
//     console.log("Num objects: ", num_objects);
//     let count = 0;
//     bucket_objects.Contents.forEach(function(object) {
//       if (object["Size"] == 0) {
//         return
//       }
//
//       if (object["Key"].includes(path)) {
//         count += 1;
//         let src_string = util.format("https://s3.amazonaws.com/qfoster/%s|", object.Key);
//         res.write(src_string);
//         if (count == num_objects) {
//           res.end();
//         }
//       }
//     });
//   });
//
// });
