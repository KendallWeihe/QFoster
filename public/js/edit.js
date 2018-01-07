
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


function get_edit_images(current_album) {
  var path = window.location.pathname;
  var page = path.split("/").pop();

  var width = document.getElementsByClassName("main")[0].clientWidth / 4;
  var contain_px = (Math.round(width / 100) * 100) + 50;

  // var host = "https://quinnfostersreflection/edit/images";
  var host = "https://localhost/edit/images";
  var parameters = {album: current_album, contain_px: contain_px};

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log(data);

    var main = document.getElementsByClassName("main")[0];
    var albums = data.split(";");

    var num_photos = 0;
    for (var i=0; i<albums.length - 1; i++) {
      var photos = albums[i].split("|");
      num_photos += photos.length - 1;

      for (var j=0; j<photos.length; j++) {
        var photo_link = photos[j].split(",")[0];
        var caption = photos[j].split(",")[1];
        var index = photos[j].split(",")[2];
        var album = photo_link.split("/")[photo_link.split("/").length - 2];
        var file_name = photo_link.split("/")[photo_link.split("/").length - 1];
        // console.log(photo_link);
        // console.log(caption);
        // console.log(index);
        // console.log(album);

        if (photo_link != "") {
          // console.log(photos[j]);

          var object = document.createElement("div");

          var img = document.createElement("img");
          img.src = photo_link;

          var index_form = document.createElement("form");
          index_form.action = "/update_index";
          index_form.method = "POST";
          var current_index = document.createElement("label");
          current_index.for = "index_input"
          current_index.innerText = "Current index: ";
          var index_input = document.createElement("input");
          index_input.id = "index_input"
          index_input.type = "text";
          index_input.value = index;
          var save_btn = document.createElement("input");
          save_btn.type = "submit";
          save_btn.value = "Update";
          index_form.appendChild(current_index);
          index_form.appendChild(index_input);
          index_form.appendChild(save_btn);

          var delete_photo_form = document.createElement("form");
          delete_photo_form.action = "/delete_photo"
          delete_photo_form.method = "POST"
          var delete_photo_btn = document.createElement("input");
          delete_photo_btn.type = "submit"
          delete_photo_btn.value = "Delete";
          delete_photo_form.appendChild(delete_photo_btn)

          object.appendChild(img);
          object.appendChild(index_form);
          object.appendChild(delete_photo_form);
          main.appendChild(object);

        }
      }
    }

    console.log("Number of photos: ", num_photos);
  });
};


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
