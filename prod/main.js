

// TODO:
//   - on page load:
//     - load the first image in the list into main-img
//     - load thumbnail images into list list-imgs
//   - on image click (from list):
//     - load image clicked into main-img


function on_load() {
  // TODO:
  //   - get html file name
  //   - each page gets it's own S3 bucket
  //   - each bucket has a info file
  //   - get the number of images in the bucket from the info file
  //   - generate images html with the above info

  var img_tag =

  var main_img = "<img class=\"img-responsive\" src=\"https://s3.amazonaws.com/qfoster/1.jpg\" alt=\"Chania\">";
  document.getElementById("main-img").innerHTML = main_img;

  var num = 11;
  var list_imgs = "";


}
