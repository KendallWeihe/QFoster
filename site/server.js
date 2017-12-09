const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const util = require('util')
const download = require('image-downloader')
const image_size = require('image-size');
const sharp = require('sharp');
const AWS = require('aws-sdk');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render("index");
})

app.get('/main_images', function (req, res) {
  let bucket_url = "https://s3.amazonaws.com/qfoster"
  let album = req.query.album;
  let bucket_objects = get_bucket_objects(album);
  console.log(bucket_objects);

  let x = req.query.x;
  let y = req.query.y;
  let html_string = "";
  bucket_objects.forEach(function(value) {
    let key = value["Key"];
    let url = util.format("%s/%s/%s", bucket_url, album, key);

    let img_path = download_image(url);
    let resized_img_path = resize_img(img_path, x, y);
    let s3_img_path = upload_img(resized_img_path);

    let div_tag = util.format("<div><img src=\"%s\"></div>", s3_img_path);
    html_string += div_tag;
  });

  // ...
  res.send(html_string);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function get_bucket_objects(album) {
  let params = {
    Bucket: "qfoster",
    Prefix: album
  };

  let s3 = new AWS.S3();
  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log("Error");
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log("Success");
      console.log(data); // successful response
      return data;
    }
  });
}

function download_image(url) {
  // Download to a directory and save with the original filename
  const options = {
    url: url,
    dest: '/tmp/tmp.jpg'                  // Save to /path/to/dest/image.jpg
  }

  download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename);
      return filename;
    }).catch((err) => {
      throw err
    })
}

function resize_img(img_path, x, y) {
  let dimensions = image_size(img_path);
  let height = dimensions.height;
  let width = dimensions.width;
  let new_width = 100;
  let new_height = 100;

  if (width > height) {
    new_width = x;
    new_height = (new_width * height) / width;
  }
  else if (height > width) {
    new_height = y;
    new_width = (new_height * width) / height;
  }
  else {
    new_width = x;
    new_height = y;
  }

  let resized_path = "tmp/tmp_resized.jpg";
  sharp(img_path).resize(new_width, new_height).toFile(resized_path);
  return resized_path;
}

function upload_img(img_path) {

}
