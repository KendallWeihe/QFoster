function load_main_img() {
  var width = document.getElementsByClassName("main-slide")[0].clientWidth;
  var height = document.getElementsByClassName("main-slide")[0].clientHeight;

  var contain_px = 0;
  if (width < height) {
    contain_px = (Math.round(height / 100) * 100) + 50;
  }
  else if (height < width) {
    contain_px = (Math.round(width / 100) * 100) + 50;
  }
  else {
    contain_px = (Math.round(height / 100) * 100) + 50;
  }

  // var host = "http://34.204.68.57:3000/main_images";
  var host = "http://localhost:3000/main_images";
  var current_album = document.getElementsByClassName('main-slide')[0].id;
  var parameters = {album: current_album, contain_px: contain_px};

  console.log("Main parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log("RETURN DATA");
    console.log(data); // note: this should return a list of <div><img></div> tags
    var main_slide = document.getElementsByClassName("main-slide")[0];
    var srcs = data.split("|");
    for (var i=0; i < srcs.length - 1; i++) {
      var div = document.createElement("div");
      var img = document.createElement("img");
      img.src = srcs[i];
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.className = "main-slide-img"
      div.appendChild(img);
      div.style.height = "100%";
      main_slide.appendChild(div);
    };
    console.log("main-slide...");
    $('.main-slide').slick({
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 1,
      infinite: true,
      accessibility: true,
      // arrows: false,
      swipeToSlide: true,
      cssEase: 'linear',
      fade: true,
      dots: true,
      mobileFirst: true,
      touchThreshold: 12
    });

    $(document).find('.slick-list').attr('tabindex', 0).focus();
    var num_dots = document.getElementsByClassName("slick-dots")[0].getElementsByTagName("li").length;
    var dots_spacing = ((width * 0.9) / num_dots) / 4;
    console.log(dots_spacing);
    var ul = document.getElementsByClassName("slick-dots")[0];
    var items = ul.getElementsByTagName("li");
    console.log(items);
    for (var i = 0; i < items.length; ++i) {
      // items[i].style.marginLeft = dots_spacing;
      // items[i].style.marginRight = dots_spacing;
      items[i].style.margin = "0 " + dots_spacing.toString() + "px";
      console.log(items[i]);
    }
  });
};

function load_thumbnails() {
  var height = document.getElementsByClassName("preview-slide")[0].clientHeight;
  var contain_px = (Math.round(height / 10) * 10) + 10;
  var host = "http://34.204.68.57:3000/thumbnails";
  var current_album = document.getElementsByClassName('preview-slide')[0].id;
  var parameters = {album: current_album, contain_px: contain_px};

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log("RETURN DATA");
    console.log(data);
    var main_slide = document.getElementsByClassName("preview-slide")[0];
    var srcs = data.split("|");
    for (var i=0; i < srcs.length - 1; i++) {
      var div = document.createElement("div");
      var img = document.createElement("img");
      img.src = srcs[i];
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.className = "preview-slide-img"
      div.appendChild(img);
      div.style.height = "100%";
      main_slide.appendChild(div);
    };
    console.log("preview-slide...");
    $('.preview-slide').slick({
      slidesToShow: 5,
      arrows: false,
      dots: false,
      variableWidth: true,
      padding: "5px",
      infinite: true
    });
  });
};

function stylize(){
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  var container_x = width * 0.05;
  var container_y = height * 0.05;
  document.getElementsByClassName("container")[0].style.transform = "translate(" + container_x.toString() + "px, " + container_y.toString() + "px)";

  width = width * 0.90;
  height = height * 0.90;

  var nav_x = width * 0.10;
  var nav_y = height * 0.03;
  document.getElementsByClassName("nav")[0].style.transform = "translate(" + nav_x.toString() + "px, " + nav_y.toString() + "px)";

  var main_x = width * 0.10;
  var main_y = nav_y + (height * 0.10);
  document.getElementsByClassName("main")[0].style.transform = "translate(" + main_x.toString() + "px, " + main_y.toString() + "px)";

  // var preview_x = width * 0.10;
  // var preview_y = main_y + (height * 0.60);
  // document.getElementsByClassName("preview")[0].style.transform = "translate(" + preview_x.toString() + "px, " + preview_y.toString() + "px)";
};
