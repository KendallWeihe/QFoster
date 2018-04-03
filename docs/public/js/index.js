

var config = null;
var currentAlbum = null;
var endpoint = "https://s3.amazonaws.com/qfoster";

window.addEventListener("load", function(){
    GetConfig(function(data){
        // useful global variable
        config = data;

        // load album buttons
        var nav = document.getElementById("nav");
        var a = null;        
        var albums = config.albums;
        var album = null;
        // for (var album in albums)
        for (var i = 0; i < Object.keys(config.albums).length; i++)
        {
            console.log(i);
            album = Object.keys(config.albums)[i];
            a = document.createElement("a");
            a.href = "#";
            a.setAttribute("album", album);
            a.innerText = album;
            nav.appendChild(a);

            a.addEventListener("click", function(event)
            {
                currentAlbum = event.path[0].attributes["album"].value;    
                load_album();
            });

            if (album == "reflections"){
                currentAlbum = "reflections";
                load_album();
            }

            if (i == (Object.keys(config.albums).length / 2 - 1)){
                console.log(i);
                a = document.createElement("a");
                a.href = "#";
                a.innerText = "QF";
                a.style.fontStyle = "";
                nav.appendChild(a);
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

        slideItem = document.createElement("div");
        img = document.createElement("img");
        caption = document.createElement("p");

        slideItem.id = "slideItem";
        slideItem.setAttribute("file", fileName);
        slideItem.setAttribute("caption", captionTxt);
        img.src = src;
        img.id = "slideItem";
        caption.textContent = captionTxt;

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