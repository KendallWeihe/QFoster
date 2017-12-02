
function get_physical_width() {
  var dpi_x = document.getElementById('dpi').offsetWidth;
  // var width = screen.width / dpi_x;
  var width = document.body.clientWidth / dpi_x;
  return width;
};

function get_physical_height() {
  var dpi_y = document.getElementById('dpi').offsetHeight;
  // var height = screen.height / dpi_y;
  var height = document.body.clientHeight / dpi_y;
  return height;
};

function style_padding() {
  // var doc_width = document.body.clientWidth;
  var doc_height = document.body.clientHeight;
  // console.log("doc_width: " + doc_width);
  console.log("doc_height: " + doc_height);

  var row_pad_height = (doc_height * 0.05);
  console.log("row_pad_height: " + row_pad_height);
  var pad_rows = document.getElementsByClassName('row-pad');
  for (var i=0; i<pad_rows.length; i++) {
    pad_rows[i].style.height = row_pad_height.toString() + "px";
    console.log("pad div: " + pad_rows[i]);
  }
};

function style_navbar_mobile() {
  var doc_width = document.body.clientWidth;
  var doc_height = document.body.clientHeight;
  console.log("doc_width: " + doc_width);
  console.log("doc_height: " + doc_height);

  var nav = document.getElementsByClassName("nav")[0];
  console.log("nav: " + nav);
  var nav_height = (doc_height * 0.10);
  nav.style.height = nav_height.toString() + "px";

  // TODO:
  //   - stack links

};

function style_navbar_desktop() {
  var doc_width = document.body.clientWidth;
  var doc_height = document.body.clientHeight;
  console.log("doc_width: " + doc_width);
  console.log("doc_height: " + doc_height);

  var nav = document.getElementsByClassName("nav")[0];
  console.log("nav: " + nav);
  var nav_height = (doc_height * 0.10);
  nav.style.height = nav_height.toString() + "px";

  var location_y = (doc_height * 0.10);
  var side_padding = (doc_width * 0.40);
  var link_width = ((doc_width * 0.60) / 5);
  var nav_links = document.getElementsByClassName("nav-link");
  console.log("location_y: " + location_y);
  console.log("side_padding: " + side_padding);
  console.log("link_width: " + link_width);
  console.log("nav_links: " + nav_links);
  console.log("nav_links.length: " + nav_links.length);
  for (var i=0; i<nav_links.length; i++) {
    nav_links[i].style.width = link_width.toString() + "px";
    console.log(nav_links[i].style.width);

    var location_x = ((side_padding / 2) + (i * link_width));
    console.log("location_x: " + location_x);
    console.log("location_y: " + location_y);

    nav_links[i].style.left = location_x.toString() + "px";
    nav_links[i].style.top = location_y.toString() + "px";
    console.log(nav_links[i].style.left);
    console.log(nav_links[i].style.top);
  }
}

function style_navbar() {
  var physical_width = get_physical_width();
  if (physical_width < 8) {
    style_navbar_mobile();
  }
  else {
    style_navbar_desktop();
  }
};

function stylize() {

  style_padding();
  style_navbar();

};

// TODO:
//   - if resize: then stylize again


// NOTE 's on positioning:
  // - two categories:
  //   - desktop
  //     - ...this includes tablets
  //   - mobile
  // - category is based on screen size rather than resolution
  // - get:
  //   - resolution
  //   - dpi
  // - compute window size (physical dimensions (inches))
  // - if:
  //   - small screen: then mobile
  //   - big screen: then desktop

  // - for now just use the code found online
  //   - it isn't accurate, but I think it's accurate enough



NOTE: "wireframing" idea...
  - design.json
    {
      "mobile": {

      },
      "desktop": {
        "grid": [
          "hpad": {
            "x": 1,
            "y": 1,
            "width": 100,
            "height": 5
          },
          "vpad": {
            "x": 1,
            "y": 2,
            "width": 10,
            "height": 10
          }
          "nav": {
            "x": 2,
            "y": 2,
            "height": 10,
            "width": 80,
            "sub-grid": [
              "nav-element": {
                "x": 1,
                "y": 1,
                "list": true,
                "overflow": false
              }
            ]
          },
          "vpad": {
            "x": 3,
            "y": 2,
            "width": 10,
            "height": 10
          },
          "hpad": {
            "x": 1,
            "y": 3,
            "width": 100,
            "height": 5
          },
          "vpad": {
            "x": 1,
            "y": 4,
            "height": 60,
            "width": 10
          },
          "main": {
            "x": 2,
            "y": 4,
            "height": 60,
            "width": 80
          },
          "vpad": {
            "x": 3,
            "y": 4,
            "height": 60,
            "width": 10
          },
          "hpad": {
            "x": 1,
            "y": 5,
            "width": 100,
            "height": 5
          },
          "vpad": {
            "x": 1,
            "y": 6,
            "height": 10,
            "width": 10
          },
          "list": {
            "x": 2,
            "y": 6,
            "height": 10,
            "width": 80
            "sub-grid": [
              "element": {
                "x": 1,
                "y": 1,
                "list": true,
                "overflow": true
              }
            ]
          },
          "vpad": {
            "x": 3,
            "y": 6,
            "height": 10,
            "width": 10
          },
          "hpad": {
            "x": 1,
            "y": 7,
            "width": 100,
            "height": 5
          }
        ]
      }
    }






//
