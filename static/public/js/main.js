
document.getElementById("sports").addEventListener("click", function() {
  $('.main-slide').slick('removeSlide', null, null, true);
  $('.main-slide').slick("unslick");
  var myNode = document.getElementsByClassName("main-slide")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  load_main_img("sports");
}, false);

document.getElementById("portraits").addEventListener("click", function() {
  $('.main-slide').slick('removeSlide', null, null, true);
  $('.main-slide').slick("unslick");
  var myNode = document.getElementsByClassName("main-slide")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  load_main_img("portraits");
}, false);

document.getElementById("reflections").addEventListener("click", function() {
  $('.main-slide').slick('removeSlide', null, null, true);
  $('.main-slide').slick("unslick");
  var myNode = document.getElementsByClassName("main-slide")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  load_main_img("reflections");
}, false);

document.getElementById("italy").addEventListener("click", function() {
  $('.main-slide').slick('removeSlide', null, null, true);
  $('.main-slide').slick("unslick");
  var myNode = document.getElementsByClassName("main-slide")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  load_main_img("italy");
}, false);

function load_main_img(current_album) {
  console.log(current_album);
  console.log("getting json...");
  $.getJSON("https://s3.amazonaws.com/qfoster/config.json", function(data){
    var main_slide = document.getElementsByClassName("main-slide")[0];
    var endpoint = "https://s3.amazonaws.com/qfoster";
    var albums = data.albums;
    var album = albums[current_album];
    for (var i = 0; i < album.length; i++)
    {
      console.log(endpoint);
      var photo = album[i];
      console.log(photo);
      var src = endpoint + "/" + current_album + "/" + photo;
      console.log(src);
      
      var div = document.createElement("div");
      var img = document.createElement("img");
      img.src = src;
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.className = "main-slide-img"
      div.appendChild(img);
      div.className = "main-image";
      div.style.height = "100%";
      div.style.visibility = "hidden";
      // HIDE VISIBILITY
      main_slide.appendChild(div);

      if (i == (album.length-1))
      {
        console.log("here");
        slide_stylize();
      }
    }
  });
};

function slide_stylize()
{
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
    touchThreshold: 15
  });

  var width = document.getElementsByClassName("main-slide")[0].clientWidth;
  $(document).find('.slick-list').attr('tabindex', 0).focus();
  var num_dots = document.getElementsByClassName("slick-dots")[0].getElementsByTagName("li").length;
  var dots_spacing = ((width * 0.9) / num_dots) / 4;
  console.log(dots_spacing);
  var ul = document.getElementsByClassName("slick-dots")[0];
  var items = ul.getElementsByTagName("li");
  console.log(items);
  for (var i = 0; i < items.length; ++i) {
    items[i].style.margin = "0 " + dots_spacing.toString() + "px";
    console.log(items[i]);
  }

  var imgs = document.getElementsByClassName("main-image");
  console.log(imgs);
  for (var i = 0; i < imgs.length; i++)
  {
    imgs[i].style.visibility = "visible";
  }
}

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
  var main_y = nav_y + (height * 0.095);
  document.getElementsByClassName("main")[0].style.transform = "translate(" + main_x.toString() + "px, " + main_y.toString() + "px)";
};
