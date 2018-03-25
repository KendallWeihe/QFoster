

var config = null;
var current_album = null;

window.addEventListener("load", function(){
    $.getJSON("https://s3.amazonaws.com/qfoster/config.json", function(data){
        // useful global variable
        config = data;

        var parent = document.getElementById("album-btns");
        var btn = null;        
        var albums = data.albums;
        for (var album in albums)
        {
            btn = document.createElement("button");
            btn.id = album; 
            btn.value = album;
            parent.appendChild(btn);

            btn.addEventListener("click", function(){
                current_album = album;
                load_album(album);
            })
        }
    });
});

document.getElementById("new-album-btn").addEventListener("click", function(){

});

document.getElementById("save-btn").addEventListener("click", function(){
    var ul = document.getElementById("items");
    var lis = ul.getElementsByTagName("li");
    var li = null;
    var photos = [];

    for (var i = 0; i < lis.length; i++)
    {
        li = lis[i];
        console.log(li.className);
        photos.push(li.className);
    }

    config.albums[current_album] = photos;
});

function load_album(album){
    var endpoint = "https://s3.amazonaws.com/qfoster";
    var albums = config.albums;
    var album_list = albums[album];

    var photo = null;
    var src = null;

    var ul = document.getElementById("items");
    var li = null;
    var img = null;
    var caption = null;

    for (var i = 0; i < album_list.length; i++)
    {
        photo = album_list[i];
        src = endpoint + "/" + album + "/" + photo;

        li = document.createElement("li");
        img = document.createElement("img");
        caption = document.createElement("p");

        li.className = photo;
        img.src = src;
        caption.textContent = "this is a caption";
        li.appendChild(img);
        li.appendChild(caption);
        ul.appendChild(li);
    }

    Sortable.create(ul);
};



