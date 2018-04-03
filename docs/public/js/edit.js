
var endpoint = "https://s3.amazonaws.com/qfoster";
var config = null;
var currentAlbum = null;
var secretKey = null;
var accessKey = null;
var s3 = null;

window.addEventListener("load", function(){
    $.getJSON("https://s3.amazonaws.com/qfoster/config.json", function(data){
        // useful global variable
        config = data;
        console.log(config);

        // load album buttons
        var parent = document.getElementById("album-btns");
        var btn = null;        
        var albums = data.albums;
        for (var album in albums)
        {
            btn = document.createElement("button");
            btn.setAttribute("album", album);
            btn.innerText = album;
            parent.appendChild(btn);

            btn.addEventListener("click", function(event){
                currentAlbum = event.path[0].attributes["album"].value; 
                console.log(currentAlbum);   
                load_album();
            })
        }
    });
});

document.getElementById("auth-file").addEventListener("change", function(event){
    var file = event.target.files[0];
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
        authenticate();
        document.getElementById("hidden").style.visibility = "visible";        
    };

    reader.readAsText(file);
});

document.getElementById("new-album-btn").addEventListener("click", function(){
    let albumName = document.getElementById("album-name").value;
    config.albums[albumName] = []
    putConfig();
    document.getElementById("album-name").value = "";
});

document.getElementById("save-btn").addEventListener("click", function(){
    if (s3 == null){
        console.error("Not authenticated!");
        return;
    }

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

    config.albums[currentAlbum] = photos;
    putConfig();
});

document.getElementById("new-photo-btn").addEventListener("change", function(event){
    if (s3 == null){
        console.error("Not authenticated!");
        return;
    }

    var file = event.target.files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    var contents = null;
    var lines = null;
    reader.onload = function(e) {
        contents = e.target.result;
        console.log(e);
        uploadImage(file.name, contents);
    };

    // reader.readAsBinaryString(file);
    reader.readAsArrayBuffer(file);
});

document.getElementById("delete-album").addEventListener("click", function(){
    let params = null;
    for (let photo in config.albums[currentAlbum]){
        params = {
            Key: currentAlbum + "/" + photo.file,
            Bucket: "qfoster"
        };
        console.log(params);

        s3.deleteObject(params, function(err, data){
            console.log(err);
            console.log(data);
        });
    }
    
    delete config.albums[currentAlbum];
    putConfig();
});

function authenticate(){
    s3 = new AWS.S3({
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    });
}

function clear_list(){
    // Get the <ul> element with id="myList"
    var list = document.getElementById("items");

    // As long as <ul> has a child node, remove it
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }    
}

function load_album(){
    clear_list();

    var albums = config.albums;
    var album_list = albums[currentAlbum];

    var photo = null;
    var file_name = null;
    var caption_txt = null;
    var src = null;

    var ul = document.getElementById("items");
    var li = null;
    var img = null;
    var caption = null;
    var caption_text = null;
    var caption_btn = null;
    var delete_btn = null;

    for (var i = 0; i < album_list.length; i++)
    {
        photo = album_list[i];
        file_name = photo["file"];
        caption_txt = photo["caption"];
        src = endpoint + "/" + currentAlbum + "/" + file_name;

        li = document.createElement("li");
        img = document.createElement("img");
        caption = document.createElement("div");
        caption_text = document.createElement("input");
        caption_btn = document.createElement("button");
        delete_btn = document.createElement("button");

        li.setAttribute("file", file_name);
        li.setAttribute("caption", caption_txt);
        img.src = src;

        caption_text.type = "text";
        caption_text.value = caption_txt;
        caption_text.id = file_name;
        caption_btn.type = "button";
        caption_btn.innerText = "Save caption";
        caption_btn.setAttribute("file", file_name);
        caption_btn.addEventListener("click", function(event){
            SaveCaption(event);
        });

        caption.appendChild(caption_text);
        caption.appendChild(caption_btn);

        delete_btn.innerText = "Delete photo";
        delete_btn.setAttribute("file", file_name);
        delete_btn.setAttribute("album", currentAlbum);
        delete_btn.addEventListener("click", function(event){
            delete_photo(event);
        });

        li.appendChild(img);
        li.appendChild(caption);
        li.appendChild(delete_btn);
        ul.appendChild(li);
    }

    var options = {
        onMove: tmp
    };
    Sortable.create(ul, options);
};

function SaveCaption(){
    if (s3 == null){
        console.error("Not authenticated!");
        return;
    }

    var file_name = event.path[0].attributes["file"].value; 
    var text_value = document.getElementById(file_name).value;
    console.log(text_value);

    var albums = config.albums;
    var album_list = albums[currentAlbum];
    var delete_index = null;

    for (var i = 0; i < album_list.length; i++)
    {
        if (album_list[i]["file"] == file_name)
        {
            album_list[i]["caption"] = text_value;
            break;
        }        
    }

    config.albums[currentAlbum] = album_list;
    putConfig();
    console.log(config);
};

function delete_photo(event){
    if (s3 == null){
        console.error("Not authenticated!");
        return;
    }

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

    album_list.splice(delete_index, 1)
    config.albums[album] = album_list;
    putConfig();
    load_album();

    var params = {
        Bucket: "qfoster",
        Key: album + "/" + file
    };

    // console.log(params);
    s3.deleteObject(params, function(err, data){
        console.log(err);
        console.log(data);
    }); 
};

function putConfig()
{   
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

function uploadImage(file, contents){
    var photo = {};
    photo["file"] = file;
    photo["caption"] = "default - caption";
    config.albums[currentAlbum].push(photo);
    putConfig();

    var params = {
        Body: contents,
        Bucket: "qfoster",
        Key: currentAlbum + "/" + file,
        ACL: "public-read",
        ContentType: 'image/jpeg'
    }

    s3.putObject(params, function(err, data){
        console.log(err);
        console.log(data);
    });
};



function tmp(event, ui){
    console.log(event);
    console.log(ui);
};