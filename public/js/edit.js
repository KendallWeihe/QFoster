

function get_edit_images() {
  var path = window.location.pathname;
  var page = path.split("/").pop();

  var width = document.getElementsByClassName("container")[0].clientWidth / 4;
  var contain_px = (Math.round(width / 100) * 100) + 50;

  var host = "https://localhost/edit/images";
  var current_album = document.getElementsByClassName('container')[0].id;
  var parameters = {album: current_album, contain_px: contain_px};

  console.log("Thumbnail parameters: ", parameters);
  $.get(host, parameters, function(data) {
    console.log(data);

    var container = document.getElementsByClassName("container")[0];

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

          var album_tag = document.createElement("p");
          album_tag.innerText = album;

          var caption_tag = document.createElement("p");
          caption_tag.innerText = caption;

          var index_tag = document.createElement("p");
          index_tag.innerText = index

          var p_div = document.createElement("div");
          p_div.appendChild(img);
          p_div.appendChild(album_tag);
          p_div.appendChild(caption_tag);
          p_div.appendChild(index_tag);
          container.appendChild(p_div);
        }
      }
    }

    console.log("Number of photos: ", num_photos);
  });
};
