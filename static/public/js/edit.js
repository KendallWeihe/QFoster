

var config = null;
var current_album = null;
var secretKey = null;
var accessKey = null;

window.addEventListener("load", function(){
    $.getJSON("https://s3.amazonaws.com/qfoster/config.json", function(data){
        // useful global variable
        config = data;

        // load album buttons
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

// TODO: pick up here!
document.getElementById("auth-file").addEventListener("change", function(e){
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        console.log(e);
      var contents = e.target.result;
      // Display file content
      console.log(contents);
    };
    reader.readAsText(file);
});

document.getElementById("new-album-btn").addEventListener("click", function(){

});

document.getElementById("save-btn").addEventListener("click", function(){
    var endpoint = "https://s3.amazonaws.com/qfoster/config.json";
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
    $.ajax(endpoint, {
        method: "PUT",
        contentType: "application/json",
        data: config
    }).done(function(data){
        console.log(data);
    });
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



