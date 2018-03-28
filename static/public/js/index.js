

var config = null;
var currentAlbum = null;
var endpoint = "https://s3.amazonaws.com/qfoster";
var s3 = new AWS.S3();

window.addEventListener("load", function(){
    // TODO: GetConfig() callback
    GetConfig(function(data){
        console.log(data);
    });

    // $.getJSON("https://s3.amazonaws.com/qfoster/config.json", function(data){
    //     // useful global variable
    //     config = data;

    //     // load album buttons
    //     var nav = document.getElementById("nav");
    //     var a = null;        
    //     var albums = data.albums;
    //     for (var album in albums)
    //     {
    //         a = document.createElement("a");
    //         a.href = "#";
    //         a.setAttribute("album", album);
    //         a.innerText = album;
    //         nav.appendChild(a);

    //         a.addEventListener("click", function(event)
    //         {
    //             currentAlbum = event.path[0].attributes["album"].value;    
    //             load_album();
    //         });
    //     }
    // });
});

function GetConfig(callback){
    var params = {
        Bucket: "qfoster",
        Key: "config.json"
    };

    s3.getObject(params, function(err, data)
    {
        console.log(data);
        callback(data);
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

        slideItem.setAttribute("file", fileName);
        slideItem.setAttribute("caption", captionTxt);
        img.src = src;
        caption.textContent = captionTxt;

        slideItem.appendChild(img);
        slideItem.appendChild(caption);
        slide.appendChild(slideItem);
    }
    $('#main').slick('slick');    
};

function clear_list(){
    $('#main').slick('unslick');
    var list = document.getElementById("main");

    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }    
};