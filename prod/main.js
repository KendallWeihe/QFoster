
// TODO:
//   - onload:
//     - loads full size image into main frame
//     - loads thumbnails into thumbnail list
//   - onclick:
//     - get full size from S3

function on_load() {
  // TODO:
  //   - get html file name
  //   - each page gets it's own S3 bucket
  //   - each bucket has a info file
  //   - get the number of images in the bucket from the info file
  //   - generate images html with the above info

  var img_tag = "<img class=\"img-responsive\" src=\"%s\" alt=\"Chania\">";

  var main_img = "<img class=\"img-responsive\" src=\"https://s3.amazonaws.com/qfoster/sports/1.JPG\">";
  console.log(main_img);
  document.getElementById("main-img").innerHTML = main_img;

  var slide1 = "<div class=\"img-thumbnail\"><img src=\"https://s3.amazonaws.com/qfoster/sports/2.JPG\"></div>"
  var slide2 = "<div class=\"img-thumbnail\"><img src=\"https://s3.amazonaws.com/qfoster/sports/3.JPG\"></div>"
  var slide3 = "<div class=\"img-thumbnail\"><img src=\"https://s3.amazonaws.com/qfoster/sports/4.JPG\"></div>"
  document.getElementById("img-list").innerHTML = slide1 + "\n" + slide2 + "\n" + slide3

}
