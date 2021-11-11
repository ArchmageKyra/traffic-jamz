"use strict";

$(document).ready(function() {
  // create the leaflet map
  var map = L.map('map').setView([39, -105.65833333], 7);

  // create the background of the map, and add it to the map
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  //make some popups and include the text from the "description" field
  function addPopups(feature, layer) {
    if (feature.properties && feature.properties.Description) {
      layer.bindPopup(feature.properties.Description);
    }
  }

  //customize the appearance of the markers
  function pointToCircle(feature, latlng) {
    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "yellow",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    return circleMarker;
  }

  //make a helper to actually apply the styling options with Omnivore
  var omnivoreStyleHelper = L.geoJSON(null, {
    onEachFeature: addPopups,
    pointToLayer: pointToCircle
  });

  //set the default value of points to the whole CSV file, and call the style helper
  var points = omnivore.csv('data/stupidaccidentsv4.csv', null, omnivoreStyleHelper);
  //initialize the marker clusters
  var clusters = L.markerClusterGroup();
  points.on('ready', function() {
    clusters.addLayer(points);

  });
  map.addLayer(clusters);

  // on brushing, update the selected points with the most bass-ackwards method of deleting and re-adding layers
  parcoords.on("brush", function() {
    var selectedPoints = GeoJSON.parse(parcoords.brushed(), {
      Point: ['lat', 'lng'],
      include: ['Description']
    });
    points.clearLayers();
    points.addData(selectedPoints);
    clusters.clearLayers();
    clusters.addLayer(points);
  });

});