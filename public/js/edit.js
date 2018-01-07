
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
  // var contain_px = (Math.round(width / 100) * 100) + 50;
  var contain_px = 1700;

  var host = "https://quinnfostersreflection/edit/images";
  // var host = "https://localhost/edit/images";
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
        // console.log(photo_link);
        // console.log(caption);
        // console.log(index);
        // console.log(album);

        if (photo_link != "") {
          // console.log(photos[j]);

          var img = document.createElement("img");
          img.src = photo_link;

          // var album_tag = document.createElement("p");
          // album_tag.innerText = album;
          //
          // var caption_tag = document.createElement("p");
          // caption_tag.innerText = caption;
          //
          // var index_tag = document.createElement("p");
          // index_tag.innerText = index
          //
          // var p_div = document.createElement("div");
          // p_div.appendChild(img);
          // p_div.appendChild(album_tag);
          // p_div.appendChild(caption_tag);
          // p_div.appendChild(index_tag);
          // main.appendChild(p_div);

          // TODO:
          //   - delete button
          //   - index form
          //   - upload button
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
