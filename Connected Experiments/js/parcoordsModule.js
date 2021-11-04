"use strict";
var selectedPoints;

window.onload = function() {
  // load csv file and create the parcoords chart
  d3.csv('data/stupidaccidentsv4.csv', function(data) {
    parcoords
      .data(data)
      .hideAxis(["lat", "lng", "Description", "Start_Time", "Civil_Twilight"])
      .render()
      .brushMode("1D-axes")
      .reorderable();
  });

  // make a color scale
  var blue_to_brown = d3.scale.linear()
    .domain([2, 4])
    .range(["steelblue", "brown"])
    .interpolate(d3.interpolateLab);

  // link the scale to the "Severity" property
  var color = function(d) {
    return blue_to_brown(d['Severity']);
  };

  // actually load the plot.  seperate from the other 'create plot' for some unexplanable reason
  var parcoords = d3.parcoords()("#pcp")
    .color(color)
    .alpha(0.4);

  // create the leaflet map
  var map = L.map('map').setView([39.5501, -105.7821], 7);

  // create the background of the map, and add it to the map
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);


  //set the default value of points to the whole CSV file
  var points = omnivore.csv('data/stupidaccidentsv4.csv');
  var clusters = L.markerClusterGroup();
  points.on('ready', function() {
    clusters.addLayer(points);
  });
  map.addLayer(clusters);

  // on brushing
  parcoords.on("brush", function() {
    selectedPoints = GeoJSON.parse(parcoords.brushed(), {
      Point: ['lat', 'lng'],
      include: ['Description']
    });
    points.clearLayers();
    points.addData(selectedPoints);
    clusters.clearLayers();
    clusters.addLayer(points);
  });


}