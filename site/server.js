const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const util = require('util')
const download = require('image-downloader')
const image_size = require('image-size');
const sharp = require('sharp');
const AWS = require('aws-sdk');
const Sync = require('sync');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render("index");
})

app.get('/main_images', function (req, res) {
  console.log("/main_images");
  console.log(req.query);
  let album = req.query.album;
  let contain_px = parseInt(req.query.contain_px, 10);

  let s3 = new AWS.S3();
  let params = {
    Bucket: "qfoster"
  };
  console.log(params);

  let path = util.format("resized/%d/%s", contain_px, album);
  console.log(path);
  s3.listObjects(params, function(err, bucket_objects) {
    let num_objects = 0;

    bucket_objects.Contents.forEach(function(object) {
      console.log(object["Key"]);
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
        console.log("Count: ", count);
        let src_string = util.format("https://s3.amazonaws.com/qfoster/%s|", object.Key);
        res.write(src_string);
        if (count == num_objects) {
          res.end();
        }
      }
    });
  });
});

app.get('/thumbnails', function (req, res) {
  console.log("/thumbnails");
  console.log(req.query);
  let album = req.query.album;
  let contain_px = parseInt(req.query.contain_px, 10);

  let s3 = new AWS.S3();
  let params = {
    Bucket: "qfoster"
  };
  console.log(params);

  let path = util.format("resized_thumbnails/%d/%s", contain_px, album);
  console.log(path);
  s3.listObjects(params, function(err, bucket_objects) {
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

      // console.log(object["Key"]);
      if (object["Key"].includes(path)) {
        count += 1;
        console.log("Count: ", count);
        let src_string = util.format("https://s3.amazonaws.com/qfoster/%s|", object.Key);
        res.write(src_string);
        if (count == num_objects) {
          res.end();
        }
      }
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
