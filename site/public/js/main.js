function load_main_img() {
  var width = document.getElementsByClassName("main-slide")[0].clientWidth;
  var height = document.getElementsByClassName("main-slide")[0].clientHeight;

  var contain_px = 0;
  if (width < height) {
    contain_px = Math.round(width / 100) * 100;
  }
  else if (height < width) {
    contain_px = Math.round(height / 100) * 100;
  }
  else {
    contain_px = Math.round(width / 100) * 100;
  }

  var host = "http://localhost:3000/main_images";
  var current_album = document.getElementsByClassName('main-slide')[0].id;
  var parameters = {album: current_album, contain_px: contain_px};

  $.get(host, parameters, function(data) {
    console.log("RETURN DATA");
    console.log(data); // note: this should return a list of <div><img></div> tags
    var main_slide = document.getElementsByClassName("main-slide")[0];
    var srcs = data.split("|");
    for (var i=0; i < srcs.length - 1; i++) {
      var div = document.createElement("div");
      var img = document.createElement("img");
      img.src = srcs[i];
      img.className = "main-slide-img"
      div.appendChild(img);
      main_slide.appendChild(div);
    };
    console.log("main-slide...");
    $('.main-slide').slick({
      centerMode: true,
      slidesToShow: 1,
      arrows: false
    });
  });
};


function stylize(){
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  var container_x = width * 0.05;
  var container_y = height * 0.05;
  document.getElementsByClassName("container")[0].style.transform = "translate(" + container_x.toString() + "px, " + container_y.toString() + "px)";

  var nav_x = width * 0.10;
  var nav_y = height * 0.10;
  document.getElementsByClassName("nav")[0].style.transform = "translate(" + nav_x.toString() + "px, " + nav_y.toString() + "px)";

  var main_x = width * 0.10;
  var main_y = nav_y + (height * 0.10);
  document.getElementsByClassName("main")[0].style.transform = "translate(" + main_x.toString() + "px, " + main_y.toString() + "px)";

  var preview_x = width * 0.10;
  var preview_y = main_y + (height * 0.60);
  document.getElementsByClassName("preview")[0].style.transform = "translate(" + preview_x.toString() + "px, " + preview_y.toString() + "px)";
}
