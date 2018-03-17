
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
  var main_y = nav_y + (height * 0.095);
  document.getElementsByClassName("main")[0].style.transform = "translate(" + main_x.toString() + "px, " + main_y.toString() + "px)";
};
