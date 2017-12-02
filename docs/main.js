

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

function style_navbar() {
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
};

function stylize() {

  style_padding();
  style_navbar();

};

// TODO:
//   - if resize: then stylize again
