"use strict";

$(document).ready(function() {
  // establish "global" variables
  let lightFill = "#74D2FE";
  let medFill = "#427C97";
  let darkFill = "#162F3B";
  var dataLoad;
  var theID;

  // customize axes for PCP
  var dimensions = {
    "Severity": {
      tickValues: [1, 2, 3]
    },
    "Weather_Condition": {
      orient: 'left'
    }
  }

  // link the colors to the "Severity" property
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

  // initialize the PCP plot.  assign color and alpha
  var parcoords = d3.parcoords()("#pcp")
    .color(color)
    .alpha(0.4);

  // load csv file an put it into the PCP
  d3.csv('data/stupidaccidentsV6.csv', function(data) {
    parcoords
      .data(data)
      .dimensions(dimensions)
      .hideAxis(["ID", "lat", "lng", "hour", "day", "month", "Description"])
      .render()
      .shadows()
      .interactive()
      .brushMode("1D-axes-multi");
    // for the later highlighing operation
    dataLoad = data;
  });

  // on brushing, update the selected points with the most bass-ackwards method of deleting and re-adding layers
  parcoords.on("brush", function() {
    //load the selected points into a variable, and convert them to a GeoJSON
    var selectedPoints = GeoJSON.parse(parcoords.brushed(), {
      Point: ['lat', 'lng'],
      include: ['Description', "Severity", "hour", , "day", "month", "ID"]
    });
    //clear all the points from the Points layer
    points.clearLayers();
    //put the "selected points" into the Points layer
    points.addData(selectedPoints);
    //clear the markerclusters
    clusters.clearLayers();
    //put the new points into the clusters
    clusters.addLayer(points);
    //ger the length of the Points layer to use as the # of points
    pointCount = points.getLayers().length;
    //update the point count
    legend.updateCount(pointCount);
  });

  // create the leaflet map
  var map = L.map('map', {
    // restrict zoom so you cant leave the data extents
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

  //make some popups and include the text from the "description" field.  summon the highlighting on hover, too
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
    layer.bindTooltip(myString);

    //run the highlighter code
    layer.on({
      mouseover: highlightLine,
      mouseout: resetHighlight
    })
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

  // highlight lines on hovering using the ID property
  function highlightLine(e) {
    theID = this.feature.properties.ID
    for (var i = 0; i < dataLoad.length; i++) {
      if (dataLoad[i].ID == theID) {
        parcoords.highlight([dataLoad[i]]);
      }
    }
  }

  //reset highlighting
  function resetHighlight() {
    parcoords.unhighlight([dataLoad[theID]]);
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

});