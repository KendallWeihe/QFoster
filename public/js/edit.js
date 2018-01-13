
document.getElementById("sports").addEventListener("click", function() {
  var myNode = document.getElementsByClassName("main")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  get_edit_images("sports");
}, false);

document.getElementById("portraits").addEventListener("click", function() {
  var myNode = document.getElementsByClassName("main")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  get_edit_images("portraits");
}, false);

document.getElementById("reflections").addEventListener("click", function() {
  var myNode = document.getElementsByClassName("main")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  get_edit_images("reflections");
}, false);

document.getElementById("italy").addEventListener("click", function() {
  var myNode = document.getElementsByClassName("main")[0];
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  get_edit_images("italy");
}, false);


// onload = function(e) {
//     sels = document.getElementsByTagName('select');
//     for(i=0; i<sels.length; i++) {
//         document.getElementsByTagName('select')[i].addEventListener('change', function () { alert('test!'); }, false);
//     }
// }

// TODO:
//   - for each grid
//     - img tag
//     - form tag
//       - unique id
//       - caption field
//       - index field
//       - submit button
//     - delete button
//       - unique id
//     - add and event listener
//       - form
//       - delete button


function get_edit_images(current_album) {
  var path = window.location.pathname;
  var page = path.split("/").pop();

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  // var contain_px = (Math.round(width / 100) * 100) + 50;
  var contain_px = 450;

  // var host = "https://quinnfostersreflection/edit/images";
  var host = "https://localhost/edit/images";
  var parameters = {album: current_album, contain_px: contain_px};

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log(data);

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

function fill_grid(photo) {
  var photo_link = photo.split(",")[0];
  var caption = photo.split(",")[1];
  var index = photo.split(",")[2];
  var album = photo_link.split("/")[photo_link.split("/").length - 2];
  var file_name = photo_link.split("/")[photo_link.split("/").length - 1];
  // console.log(photo_link);
  // console.log(caption);
  // console.log(index);
  // console.log(album);

  if (photo_link != "") {
    // console.log(photos[j]);

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

    var submit_btn = document.createElement("input");
    submit_btn.type = "submit";

    form.appendChild(caption_label);
    form.appendChild(caption_input);
    form.appendChild(document.createElement("br"));
    form.appendChild(index_label);
    form.appendChild(index_input);
    form.appendChild(submit_btn);

    var delete_button = document.createElement("button");
    delete_button.type = "submit";
    delete_button.id = file_name;
    delete_button.album = album;
    delete_button.photo = photo;
    delete_button.innerText = "Delete";

    div.appendChild(img);
    div.appendChild(form);
    div.appendChild(document.createElement("br"));
    div.appendChild(delete_button);

    form.addEventListener("submit", function() { handle_form(this); });
    delete_button.addEventListener("click", function() { handle_delete(this); });

    container.appendChild(div);
  }
};

function handle_form(form) {
  // console.log(form.photo);
  // console.log(form.album);
  // console.log(form.elements["caption-in"].value);
  // console.log(form.elements["index-in"].value);

  var album = form.album;
  var photo = form.photo;
  var caption = form.elements["caption-in"].value;
  var index = form.elements["index-in"].value;

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  // var contain_px = (Math.round(width / 100) * 100) + 50;
  var contain_px = 450;

  // var host = "https://quinnfostersreflection/update";
  var host = "https://localhost/update";
  var parameters = {
    album: album,
    photo: photo,
    caption: caption,
    index: index,
    contain_px: contain_px
  }

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log(data);

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
}

function handle_delete(button) {
  console.log(button.album);
  console.log(button.photo);

  var album = button.album;
  var photo = button.photo;

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  // var contain_px = (Math.round(width / 100) * 100) + 50;
  var contain_px = 450;

  // var host = "https://quinnfostersreflection/delete";
  var host = "https://localhost/delete";
  var parameters = {
    album: album,
    photo: photo,
    contain_px: contain_px
  }

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log(data);

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
}

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
