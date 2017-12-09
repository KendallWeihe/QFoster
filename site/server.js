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
  let album = req.query.album;
  let contain_px = parseInt(req.query.contain_px, 10);

  let s3 = new AWS.S3();
  let params = {
    Bucket: "qfoster",
    Delimiter: util.format("resized/%d/%s", contain_px, album)
  };
  console.log(params);
  s3.listObjects(params, function(err, bucket_objects) {
    console.log(bucket_objects);
    let num_objects = bucket_objects.Contents.length - 1;
    let count = 0;

    bucket_objects.Contents.forEach(function(object) {
      if (object["Size"] == 0) {
        return
      }
      console.log(object);

      let src_string = util.format("https://s3.amazonaws.com/qfoster/%s|", object.Key);
      console.log(src_string);
      res.write(src_string);
      count += 1;
      if (count == num_objects) {
        console.log("Final image found!");
        res.end();
      }
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
