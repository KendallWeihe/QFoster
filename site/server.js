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
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render("index");
})

app.get('/main_images', function (req, res) {
  let album = req.query.album;
  let x = parseInt(req.query.x, 10);
  let y = parseInt(req.query.y, 10);
  console.log(util.format("X: %d, Y: %d", x, y));

  let s3 = new AWS.S3();
  let params = {
    Bucket: "qfoster",
    Key: util.format("%s/info.json", album)
  };

  let completed_search = 0
  let found_matching_size = 0
  s3.getObject(params, function(err, data) {
    console.log("inside get object");
    let count = 0;

    let bucket_info = JSON.parse(data["Body"].toString());
    bucket_info.existing_images.forEach(function(object) {
      let num_objects = bucket_objects.Contents.length - 1;

      console.log("inside for each");
      let width = object["width"];
      let height = object["height"];

      if (((width*0.9) <= x <= (width*1.1)) && ((height*0.9) <= y <= (height*1.1))) {
        console.log("Matching album found!")
        found_matching_size = 1;
      };

      // count += 1
      // if (count == )
    });
  });
  console.log("after get info");

  // if (found_matching_size != 1) {
  //   let html_string = "";
  //   let params = {
  //     Bucket: "qfoster",
  //     Prefix: util.format("%s/original", album);
  //   };
  //
  //   s3.listObjects(params, function(err, bucket_objects) { // get the bucket objects
  //     let num_objects = bucket_objects.Contents.length - 1;
  //     console.log(num_objects);
  //     let count = 0;
  //     bucket_objects.Contents.forEach(function(object) { // iterate through each object
  //       if (object["Size"] == 0) {
  //         return
  //       }
  //
  //       let key = object["Key"];
  //       var params = {
  //         Bucket: "qfoster",
  //         Key: key
  //       };
  //       s3.getObject(params, function(err, data) {
  //         let buffer = data["Body"];
  //
  //         var dimensions = image_size(buffer);
  //         let height = dimensions.height;
  //         let width = dimensions.width;
  //
  //         let new_width = -1;
  //         let new_height = -1;
  //
  //         if (width > height) {
  //           new_width = x;
  //           new_height = (new_width * height) / width;
  //         }
  //         else if (height > width) {
  //           new_height = y;
  //           new_width = (new_height * width) / height;
  //         }
  //         else {
  //           new_width = x;
  //           new_height = y;
  //         }
  //
  //         console.log("")
  //         // sharp(buffer).resize(parseInt(new_width, 10), parseInt(new_height, 10)).toBuffer(function(err, data, info){
  //         //   let new_key = util.format("%d-%d/%s.jpg", x, y, key);
  //         //   let new_key = util.format("%s/")
  //         //   var params = {
  //         //     Body: data,
  //         //     Bucket: "qfoster",
  //         //     Key: new_key,
  //         //     ACL: "public-read"
  //         //   };
  //         //   var options = {};
  //         //
  //         //   s3.upload(params, options, function(err, data) {
  //         //     if (err) throw err;
  //         //     else {
  //         //       let html_string = util.format("%s|", data.Location);
  //         //       console.log("HTML STRING");
  //         //       console.log(html_string);
  //         //       res.write(html_string);
  //         //       count += 1;
  //         //       console.log(count);
  //         //       if (count == num_objects) {
  //         //         console.log("Final image resized");
  //         //         res.end();
  //         //       }
  //         //     }
  //         //   });
  //         // });
  //       });
  //     });
  //   });
  // };
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


function resize(buffer, x, y) {
  var dimensions = image_size(buffer);
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

  let resized = sharp(buffer).resize(parseInt(new_width, 10), parseInt(new_height, 10)).toBuffer();
  return resized;
}



//
// let params = {
//   Bucket: "qfoster"
// };
// s3.listObjects(params, function(err, bucket_objects) {
//   bucket_objects.Contents.forEach(function(object) { // iterate through each object
//     if (object["Size"] != 0) {
//       return;
//     }
//     console.log(object);
//
//     let key = object["Key"];
//     if (key.split("/").length > 2) {
//       return;
//     }
//
//     let dimensions = key.split("-");
//     if (dimensions.length != 2) {
//       return;
//     }
//
//     let width = dimensions[0];
//     let height = dimensions[1];
//     console.log(width);
//     console.log(height);
//     if (((width*0.9) <= x <= (width*1.1)) && ((height*0.9) <= y <= (height*1.1))) {
//       console.log("Width found!");
//     }
//   });
// });
