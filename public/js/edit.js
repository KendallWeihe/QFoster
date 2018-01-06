

function get_edit_images() {
  var path = window.location.pathname;
  var page = path.split("/").pop();

  var height = document.getElementsByClassName("container")[0].clientHeight;
  var contain_px = (Math.round(height / 10) * 10) + 10;
  var host = "https://localhost/edit/images";
  var current_album = document.getElementsByClassName('container')[0].id;
  var parameters = {album: current_album, contain_px: contain_px};

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    var container = document.getElementsByClassName("container")[0];

    var albums = data.split(";");
    var num_photos = 0;
    for (var i=0; i<albums.length - 1; i++) {
      var photos = albums[i].split("|");
      num_photos += photos.length - 1;
    }

    // container.style.display = "grid";
    console.log("Number of photos: ", num_photos);
  });
};
