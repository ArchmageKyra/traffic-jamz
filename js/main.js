"use strict";
let lightFill = "#74D2FE";
let medFill = "#427C97";
let darkFill = "#162F3B";


$(document).ready(function() {
  var dimensions = {
    "Severity": {
      tickValues: [1, 2, 3]
    },
    "Weather_Condition": {
      orient: 'left'
    }
  }

  // link the scale to the "Severity" property
  var color = function(d) {
    if (d['Severity'] === '3') {
      return darkFill;
    } else if (d['Severity'] === '2') {
      return medFill;
    } else if (d['Severity'] === '1') {
      return lightFill;
    } else {
      return 'black';
    }
  };

  // initialize the PCP plot
  var parcoords = d3.parcoords()("#pcp")
    .color(color)
    .alpha(0.4);

  // load csv file an put it into the PCP
  d3.csv('data/stupidaccidentsV6.csv', function(data) {
    parcoords
      .data(data)
      .dimensions(dimensions)
      .hideAxis(["lat", "lng", "hour", "day", "month", "Description"])
      .render()
      .shadows()
      .interactive()
      .brushMode("1D-axes-multi");
  });

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
    let theDescription = "";
    let theHour = "";
    let theDay = "";
    let theMonth = "";

    if (feature.properties && feature.properties.Description) {
      theDescription = feature.properties.Description;
    } else {
      theDescription = "NULL";
    }

    if (feature.properties && feature.properties.hour) {
      theHour = feature.properties.hour;
    } else {
      theHour = "NULL";
    }

    if (feature.properties && feature.properties.day) {
      theDay = feature.properties.day;
    } else {
      theDay = "NULL";
    }

    if (feature.properties && feature.properties.month) {
      theMonth = feature.properties.month;
    } else {
      theMonth = "NULL";
    }

    //concatinate a big string with the HTML formatting and some headers
    let myString = "On " + theMonth + "/" + theDay + " around " + theHour + ":00<br><b>Description: </b>" + theDescription

    //bind that big string to the popup!
    layer.bindPopup(myString);
  };

  //customize the appearance of the markers
  function pointToCircle(feature, latlng) {
    //color the points based on Severity
    let fillColorVar = "";
    if (feature.properties.Severity === '3') {
      fillColorVar = darkFill;
    } else if (feature.properties.Severity === '2') {
      fillColorVar = medFill;
    } else if (feature.properties.Severity === '1') {
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
  var points = omnivore.csv('data/stupidaccidentsV6.csv', null, omnivoreStyleHelper);

  //initialize the marker clusters
  var clusters = L.markerClusterGroup({
    showCoverageOnHover: false
  });
  points.on('ready', function() {
    clusters.addLayer(points);

  });
  map.addLayer(clusters);

  //make a variable to store how many points are selected, and set it to a default value of "all of them"
  var pointCount = "6088";

  //add a hovering box ("legend") that displays the number of points that are selected
  var legend = L.control({
    position: "bottomleft"
  });

  //some functions to control legend updating
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<b>Points Selected: </b><br>" + pointCount
    return div;
  };

  legend.onRemove = function(map) {
    delete map.legend;
  };

  legend.updateCount = function(str) {
    this.getContainer().innerHTML = "<b>Points Selected: </b><br>" + pointCount
  };

  legend.addTo(map);

  // on brushing, update the selected points with the most bass-ackwards method of deleting and re-adding layers
  parcoords.on("brush", function() {
    var selectedPoints = GeoJSON.parse(parcoords.brushed(), {
      Point: ['lat', 'lng'],
      include: ['Description', "Severity", "hour", , "day", "month"]
    });
    points.clearLayers();
    points.addData(selectedPoints);
    clusters.clearLayers();
    clusters.addLayer(points);
    pointCount = points.getLayers().length;
    legend.updateCount(pointCount);
  });

  //tipsos
  jQuery(document).ready(function() {

    jQuery('.bottom-left').tipso({
      position: 'bottom-left',
      background: 'rgba(0,0,0,0.8)',
      titleBackground: 'tomato',
      useTitle: false,
      tooltipHover: true
    });

    jQuery('.bottom-left-WChyperlink').tipso({
      position: 'bottom-left',
      background: 'rgba(0,0,0,0.8)',
      titleBackground: 'tomato',
      useTitle: false,
      tooltipHover: true,
      content: function() {
        return 'Natural language description of weather condition at time of accident.  Was generalized from data source using the <a href = " https://ops.fhwa.dot.gov/weather/q1_roadimpact.htm" > FHWA categories of hazardous weather </a>.';
      }
    });
    jQuery(window).on('load', function() {
      // Show Tipso on Load
      jQuery('.page-load').tipso('show');
    });
  });
});