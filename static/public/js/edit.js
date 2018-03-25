
var endpoint = "https://s3.amazonaws.com/qfoster";
var config = null;
var current_album = null;
var secretKey = null;
var accessKey = null;

window.addEventListener("load", function(){
    $.getJSON("https://s3.amazonaws.com/qfoster/config.json", function(data){
        // useful global variable
        console.log(data);
        config = data;

        // load album buttons
        var parent = document.getElementById("album-btns");
        var btn = null;        
        var albums = data.albums;
        for (var album in albums)
        {
            btn = document.createElement("button");
            btn.setAttribute("album", album);
            parent.appendChild(btn);

            btn.addEventListener("click", function(event){
                load_album(event);
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
    var contents = null;
    var lines = null;
    reader.onload = function(e) {
        contents = e.target.result;
        lines = contents.split("\n");
        accessKey = lines[1].split(" ")[2];
        secretKey = lines[2].split(" ")[2];
    };

    reader.readAsText(file);
});

document.getElementById("new-album-btn").addEventListener("click", function(){

});

document.getElementById("save-btn").addEventListener("click", function(){
    var ul = document.getElementById("items");
    var lis = ul.getElementsByTagName("li");
    var li = null;
    var photos = [];
    var photo = null;

    for (var i = 0; i < lis.length; i++)
    {
        li = lis[i];
        photo = {};
        photo["file"] = li.getAttribute("file");
        photo["caption"] = li.getAttribute("caption");
        photos.push(photo);
    }

    config.albums[current_album] = photos;
    putConfig();
});

function load_album(event){
    current_album = event.path[0].attributes["album"].value;    
    var albums = config.albums;
    var album_list = albums[current_album];

    var photo = null;
    var file_name = null;
    var caption_txt = null;
    var src = null;

    var ul = document.getElementById("items");
    var li = null;
    var img = null;
    var caption = null;
    var delete_btn = null;

    console.log(config);
    for (var i = 0; i < album_list.length; i++)
    {
        photo = album_list[i];
        file_name = photo["file"];
        caption_txt = photo["caption"];
        src = endpoint + "/" + current_album + "/" + file_name;

        li = document.createElement("li");
        img = document.createElement("img");
        caption = document.createElement("p");
        delete_btn = document.createElement("button");

        li.setAttribute("file", file_name);
        li.setAttribute("caption", caption_txt);
        img.src = src;
        caption.textContent = caption_txt;
        delete_btn.value = "Delete";
        delete_btn.setAttribute("file", file_name);
        delete_btn.setAttribute("album", current_album);
        delete_btn.addEventListener("click", function(event){
            delete_photo(event);
        });

        li.appendChild(img);
        li.appendChild(caption);
        li.appendChild(delete_btn);
        ul.appendChild(li);
    }

    Sortable.create(ul);
};

function delete_photo(event){
    var album = event.path[0].attributes["album"].value; 
    var file = event.path[0].attributes["file"].value; 

    var albums = config.albums;
    var album_list = albums[album];
    var delete_index = null;

    for (var i = 0; i < album_list.length; i++)
    {
        if (album_list[i]["file"] == file)
        {
            delete_index = i;
            break;
        }        
    }

    album_list.splice(delete_index, delete_index+1)
    config.albums[album] = album_list;
    putConfig();
};

function putConfig()
{
    var s3 = new AWS.S3({
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    });
    
    var params = {
        Body: JSON.stringify(config),
        Bucket: "qfoster",
        Key: "config.json",
        ACL: "public-read"
    };

    s3.putObject(params, function(err, data){
        console.log(err);
        console.log(data);
    });
}