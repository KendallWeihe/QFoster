
document.getElementById("sports").addEventListener("click", function() {
  clear();
  get_images("sports");
}, false);

document.getElementById("portraits").addEventListener("click", function() {
  clear();
  get_images("portraits");
}, false);

document.getElementById("reflections").addEventListener("click", function() {
  clear();
  get_images("reflections");
}, false);

document.getElementById("italy").addEventListener("click", function() {
  clear();
  get_images("italy");
}, false);

// -----------------------------------

function get_images(current_album) {
  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  var contain_px = (Math.round(width / 100) * 100) + 50;

  // var host = "https://quinnfostersreflection.com/edit/images";
  var host = "https://localhost/edit/images";
  var parameters = {album: current_album, contain_px: contain_px};

  update_server(host, parameters, current_album);
};

function fill_grid(photo) {
  var photo_link = photo.split(",")[0];
  var caption = photo.split(",")[1];
  var index = photo.split(",")[2];
  var album = photo_link.split("/")[photo_link.split("/").length - 2];
  var file_name = photo_link.split("/")[photo_link.split("/").length - 1];

  if (photo_link != "") {
    var container = document.getElementsByClassName("main")[0];

    var div = document.createElement("div");
    var br = document.createElement("br");

    var img = document.createElement("img");
    img.src = photo_link;
    img.style.height = "70%";
    img.style.width = "100%";
    img.style.objectFit = "contain";

    var form = document.createElement("form");
    form.photo = file_name;
    form.album = album;

    var caption_label = document.createTextNode("Caption: ");
    var caption_input = document.createElement("input");
    caption_input.id = "caption-in";
    caption_input.type = "text";
    caption_input.value = caption;

    var index_label = document.createTextNode("Index: ")
    var index_input = document.createElement("input");
    index_input.id = "index-in";
    index_input.type = "text";
    index_input.value = index;

    form.appendChild(caption_label);
    form.appendChild(caption_input);
    form.appendChild(document.createElement("br"));
    form.appendChild(index_label);
    form.appendChild(index_input);

    var delete_button = document.createElement("button");
    delete_button.type = "submit";
    delete_button.id = file_name;
    delete_button.album = album;
    delete_button.photo = file_name;
    delete_button.innerText = "Delete";

    div.appendChild(img);
    div.appendChild(form);
    div.appendChild(document.createElement("br"));
    div.appendChild(delete_button);

    delete_button.addEventListener("click", function() { delete_one(this); });

    container.appendChild(div);
  }
};

function delete_all() {
  var container = document.getElementsByClassName("main")[0];
  var divs = container.getElementsByTagName("div");

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  var contain_px = (Math.round(width / 100) * 100) + 50;

  var parameters = {
    contain_px: contain_px,
    buttons: []
  }

  for (var i=0; i<divs.length; i++) {
    var button = divs[i].getElementsByTagName("button")[0];
    var album = button.album;
    var photo = button.photo;
    var params = {
      album: album,
      photo: photo
    }
    parameters.buttons.push(params);
  }

  var host = "https://quinnfostersreflection.com/delete";
  // var host = "https://localhost/delete";

  update_server(host, parameters, album);
};

function delete_one(button) {
  var album = button.album;
  var photo = button.photo;

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  var contain_px = (Math.round(width / 100) * 100) + 50;

  var host = "https://quinnfostersreflection.com/delete";
  // var host = "https://localhost/delete";
  var parameters = {
    contain_px: contain_px,
    buttons: [
      {
        album: album,
        photo: photo
      }
    ]
  }

  update_server(host, parameters, album);
}

function save_all() {
  var forms = document.getElementsByTagName("form");

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  var contain_px = (Math.round(width / 100) * 100) + 50;

  var parameters = {
    contain_px: contain_px,
    forms: []
  }

  for (var i=0; i<forms.length; i++) {
    var form = forms[i];

    var album = form.album; // TODO: album should be identified universally -- more than just here
    var photo = form.photo;
    var caption = form.elements["caption-in"].value;
    var index = form.elements["index-in"].value;

    var params = {
      album: album,
      photo: photo,
      caption: caption,
      index: index
    }
    parameters.forms.push(params);
  }

  var host = "https://quinnfostersreflection.com/update";
  // var host = "https://localhost/update";

  update_server(host, parameters, album);
};

// -----------------------------------

function clear() {
  var myNode = document.getElementsByClassName("main")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
};

function update_server(host, parameters, album) {
  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log(data);

    clear();

    var save_btn = document.createElement("button");
    save_btn.type = "submit";
    save_btn.innerText = "Save";
    save_btn.album = album;
    save_btn.addEventListener("click", function() { save_all(); })

    var delete_all_btn = document.createElement("button");
    delete_all_btn.type = "submit";
    delete_all_btn.innerText = "Delete All";
    delete_all_btn.album = album;
    delete_all_btn.addEventListener("click", function() { delete_all(); })

    var main = document.getElementsByClassName("main")[0];
    main.appendChild(save_btn);
    main.appendChild(delete_all_btn);

    var albums = data.split(";");
    var num_photos = 0;
    for (var i=0; i<albums.length - 1; i++) {
      var photos = albums[i].split("|");
      num_photos += photos.length - 1;

      for (var j=0; j<photos.length; j++) {
        fill_grid(photos[j]);
      }
    }
    console.log("Number of photos: ", num_photos);
  });
};

// -----------------------------------

function stylize(){
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  width = width * 0.90;
  height = height * 0.90;

  var nav_x = width * 0.10;
  var nav_y = height * 0.03;
  document.getElementsByClassName("nav")[0].style.transform = "translate(" + nav_x.toString() + "px, " + nav_y.toString() + "px)";

  var main_x = width * 0.10;
  var main_y = nav_y + (height * 0.095);
  document.getElementsByClassName("main")[0].style.transform = "translate(" + main_x.toString() + "px, " + main_y.toString() + "px)";

};


// ...
