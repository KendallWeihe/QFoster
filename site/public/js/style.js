var design;

$( document ).ready(function() {
  $.getJSON("design.json", function(json) {
    console.log("Reading JSON file...");
    console.log(json);
    design = json;
  }).done(function(data) {
    stylize();
  });
});

function stylize() {
  console.log("Styling the web page...");

  var physical_window_width = get_physical_width();
  if (physical_window_width < 8) {
    generate_grid("mobile");
  }
  else {
    generate_grid("desktop");
  }
}

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

function embed_grid(grid, coordinates) {
  console.log("Embedding grid...");
  console.log(grid);
  var doc_width = document.body.clientWidth;
  var doc_height = document.body.clientHeight;
  console.log("doc_width: " + doc_width);
  console.log("doc_height: " + doc_height);

  for (var i=0; i < grid.length; i++) {
    var grid_obj = grid[i];
    var class_name = grid_obj.class;    var height, width;
    console.log(grid_obj);
    console.log("class_name: " + class_name);

    height = doc_height * (grid_obj.height / 100.0);
    width = doc_width * (grid_obj.width / 100.0);
    document.getElementsByClassName(class_name)[0].style.float = "left";
    document.getElementsByClassName(class_name)[0].style.height = height.toString() + "px";
    document.getElementsByClassName(class_name)[0].style.width = width.toString() + "px";

    var x, y;
    x = grid_obj.x;
    y = grid_obj.y;
    if (x == 1) {
      coordinates["previous_x_pixel"] = 0.0;
    }

    document.getElementsByClassName(class_name)[0].style.left = coordinates["starting_x_pixel"] + coordinates["previous_x_pixel"];
    document.getElementsByClassName(class_name)[0].style.top = coordinates["starting_y_pixel"] + coordinates["previous_y_pixel"];
    console.log("coordinates[\"previous_x_pixel\"]: " + coordinates["previous_x_pixel"]);
    console.log("coordinates[\"previous_y_pixel\"]: " + coordinates["previous_y_pixel"]);

    if (grid_obj.hasOwnProperty("sub_grid")) {
      console.log("sub grid found...");
      console.log(grid_obj.sub_grid);

      sub_coordinates = {
        "previous_x_coordinate": 0,
        "previous_y_coordinate": 0,
        "starting_x_pixel": coordinates["previous_x_pixel"],
        "starting_y_pixel": coordinates["starting_y_pixel"],
        "previous_x_pixel": 0.0,
        "previous_y_pixel": 0.0
      }

      embed_grid(grid_obj.sub_grid, sub_coordinates);
    }

    if (x > coordinates["previous_x_coordinate"]) {
      coordinates["previous_x_pixel"] += width;
    }

    if (y > coordinates["previous_y_coordinate"]) {
      coordinates["previous_y_pixel"] += height;
    }

    coordinates["previous_x_coordinate"] = x;
    coordinates["previous_y_coordinate"] = y;
  }
};

function generate_grid(type) {
  var grid;
  if (type == "mobile") {
    grid = design.mobile.grid;
  }
  else {
    grid = design.desktop.grid;
  }

  coordinates = {
    "previous_x_coordinate": 0,
    "previous_y_coordinate": 0,
    "starting_x_pixel": 0.0,
    "starting_y_pixel": 0.0,
    "previous_x_pixel": 0.0,
    "previous_y_pixel": 0.0
  }

  embed_grid(grid, coordinates);
};
