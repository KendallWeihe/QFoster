var config = null;
var currentAlbum = null;
var endpoint = "https://s3.amazonaws.com/qfoster";

window.addEventListener("load", function(){
    GetConfig(function(data){
        // useful global variable
        config = data;

        // load album buttons
        var a = null;        
        var albums = config.albums;
        var album = null;
        // for (var album in albums)
        for (var i = 0; i < Object.keys(config.albums).length; i++)
        {
            album = Object.keys(config.albums)[i];
            a = document.getElementById(album);
            a.setAttribute("album", album);

            a.addEventListener("click", function(event)
            {
              console.log(event);
              currentAlbum = event.path[0].attributes["album"].value;    
              // load_album();
              load_main_img(currentAlbum);
            });

            if (album == "reflections"){
              currentAlbum = "reflections";
              // load_album();
              load_main_img(currentAlbum);
              document.getElementsByClassName("slick-current")[0].click();
            }
        }
    });
});

function GetConfig(callback){
    var configEndpoint = "https://s3.amazonaws.com/qfoster/config.json";
    $.getJSON(configEndpoint, function(results){
        console.log(results);
        callback(results);
    });
};

function load_album(){
    clear_list();

    var albums = config.albums;
    var albumList = albums[currentAlbum];

    var obj = null;
    var fileName = null;
    var captionTxt = null;
    var src = null;

    var slide = document.getElementById("main");
    var slideItem = null;
    var img = null;
    var caption = null;

    for (var i = 0; i < albumList.length; i++)
    {
        obj = albumList[i];
        fileName = obj["file"];
        captionTxt = obj["caption"];
        src = endpoint + "/" + currentAlbum + "/" + fileName;

        slideItem = document.getElementById(album + "-link");
        img = document.createElement("img");
        caption = document.createElement("p");

        slideItem.id = "slideItem";
        slideItem.setAttribute("file", fileName);
        slideItem.setAttribute("caption", captionTxt);
        img.src = src;
        img.id = "slideItem";
        caption.textContent = captionTxt;

        img.className = "main-slide-img"
        
        slideItem.appendChild(img);
        slideItem.appendChild(caption);
        slide.appendChild(slideItem);
    }

    $('#main').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 1,
        infinite: true,
        accessibility: true,
        // arrows: false,
        swipeToSlide: true,
        cssEase: 'linear',
        fade: true,
        mobileFirst: true,
        touchThreshold: 15,

        dots: false,
        prevArrow: false,
        nextArrow: false        
    });
};

function clear_list(){
    if ($('#main').children().length > 0){
        $('#main').slick('unslick');
    }
    var list = document.getElementById("main");

    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }    
};


// -----------


function load_main_img(currentAlbum) {
  if ($('.main-slide').children().length > 0){
    $('.main-slide').slick('unslick');
    var list = document.getElementById("main");
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }  
  }

  console.log(currentAlbum);
  var main_slide = document.getElementsByClassName("main-slide")[0];
  var albums = config.albums;
  var albumList = albums[currentAlbum];
  var div = null;
  var img = null;
  var caption = null;

  for (var i = 0; i < albumList.length; i++)
  {
      obj = albumList[i];
      fileName = obj["file"];
      captionTxt = obj["caption"];
      src = endpoint + "/" + currentAlbum + "/" + fileName;

      div = document.createElement("div");
      img = document.createElement("img");
      caption = document.createElement("div");

      img.src = src;
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.className = "main-slide-img"

      caption.innerText = captionTxt;
      caption.style.position = "relative";
      caption.style.bottom = "20px";
      caption.style.left = "70%";
      caption.style.color = "white";

      div.appendChild(img);
      div.appendChild(caption);
      div.style.height = "100%";
      main_slide.appendChild(div);
  }

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
        mobileFirst: true,
        touchThreshold: 15,

        dots: false,
        arrows: false     
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

  // TODO:
  //   - get number of pixels in between top of container and top of main image
  //   - get height of <a>
  //   - position
      // - 1px = (100vw / 500px) = 0.2vw

  var nav_x = width * 0.10;
  var nav_y = height * 0.03;
  document.getElementsByClassName("nav")[0].style.transform = "translate(" + nav_x.toString() + "px, " + nav_y.toString() + "px)";

  var main_x = width * 0.10;
  var main_y = nav_y + (height * 0.095);
  document.getElementsByClassName("main")[0].style.transform = "translate(" + main_x.toString() + "px, " + main_y.toString() + "px)";

  // var preview_x = width * 0.10;
  // var preview_y = main_y + (height * 0.60);
  // document.getElementsByClassName("preview")[0].style.transform = "translate(" + preview_x.toString() + "px, " + preview_y.toString() + "px)";
};


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
       // left arrow
       $(".main-slide").slick("slickPrev");
    }
    else if (e.keyCode == '39') {
       // right arrow
       $(".main-slide").slick("slickNext");
    }

}
