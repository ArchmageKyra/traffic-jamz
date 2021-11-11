"use strict";
let lightFill = "#74D2FE";
let medFill = "#427C97";
let darkFill = "#162F3B";


$(document).ready(function() {
  // load csv file and create the parcoords chart
  d3.csv('data/stupidaccidentsv4.csv', function(data) {
    parcoords
      .data(data)
      .hideAxis(["lat", "lng", "hour", "month", "Description", "Start_Time", "Civil_Twilight"])
      .render()
      .shadows()
      .reorderable()
      .brushMode("1D-axes");
  });

  // link the scale to the "Severity" property
  var color = function(d) {
    if (d['Severity'] === '4') {
      return darkFill;
    } else if (d['Severity'] === '3') {
      return medFill;
    } else if (d['Severity'] === '2') {
      return lightFill;
    } else {
      return 'black';
    }
  };

  // actually load the plot.  seperate from the other 'create plot' for some unexplanable reason
  var parcoords = d3.parcoords()("#pcp")
    .color(color)
    .alpha(0.4);

  // create the leaflet map
  var map = L.map('map', {
    maxZoom: 16,
    minZoom: 7,
    maxBounds: [
      //south west
      [36.57, -109.52],
      //north east
      [41.45, -101.36]
    ],
  }).setView([39, -105.65833333], 7);

  // create the background of the map, and add it to the map
  L.tileLayer('https://api.mapbox.com/styles/v1/mykmarie1/ckvsr9enk14ev15pekynxurb0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXlrbWFyaWUxIiwiYSI6ImNrdGFvbDUzNjFvOHIydXBnbHg0eG9mbGYifQ.FrOD0LfTVItLeQU6E4ONJg', {
    //dont forget your attribution!
    attribution: 'Map data: &copy; <a href=”https://www.mapbox.com/about/maps/”>Mapbox</a> &copy; <a href=”http://www.openstreetmap.org/copyright”>OpenStreetMap</a>'
  }).addTo(map);

  //make some popups and include the text from the "description" field
  function addPopups(feature, layer) {
    if (feature.properties && feature.properties.Description) {
      layer.bindPopup(feature.properties.Description);
    }
  }

  //customize the appearance of the markers
  function pointToCircle(feature, latlng) {
    //color the points based on Severity
    let fillColorVar = "";
    if (feature.properties.Severity === '4') {
      fillColorVar = darkFill;
    } else if (feature.properties.Severity === '3') {
      fillColorVar = medFill;
    } else if (feature.properties.Severity === '2') {
      fillColorVar = lightFill;
    } else {
      fillColorVar = "black";
    }

    var geojsonMarkerOptions = {
      radius: 8,
      weight: 5,
      color: fillColorVar,
      opacity: 0.6,
      fillColor: fillColorVar,
      fillOpacity: 0.9
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
      include: ['Description', "Severity"]
    });
    points.clearLayers();
    points.addData(selectedPoints);
    clusters.clearLayers();
    clusters.addLayer(points);
  });

});