"use strict";
let lightFill = "#74D2FE";
let medFill = "#427C97";
let darkFill = "#162F3B";


$(document).ready(function() {
  var dimensions = {
    "Severity": {
      tickValues: [1, 2, 3]
    },
    "Visibility (mi)": {},
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

  // actually load the plot.  seperate from the other 'create plot' for some unexplanable reason
  var parcoords = d3.parcoords()("#pcp")
    .color(color)
    .alpha(0.4);

  // load csv file and create the parcoords chart
  d3.csv('data/stupidaccidentsV5.csv', function(data) {
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
    //make some variables to hold the address and the stolen value.
    let theDescription = "";
    let theHour = "";
    let theMonth = "";

    //this will check if the feature has a property named location
    if (feature.properties && feature.properties.Description) {
      //put said location property into a variable!
      theDescription = feature.properties.Description;
    } else {
      //else, put "NULL"
      theDescription = "NULL";
    }

    if (feature.properties && feature.properties.hour) {
      //put said location property into a variable!
      theHour = feature.properties.hour;
    } else {
      //else, put "NULL"
      theHour = "NULL";
    }

    if (feature.properties && feature.properties.month) {
      //put said location property into a variable!
      theMonth = feature.properties.month;
    } else {
      //else, put "NULL"
      theMonth = "NULL";
    }

    //concatinate a big string with the HTML formatting and some headers
    let myString = "<b> Description: </b><br>" + theDescription + "<br> <b>Month: </b>" + theMonth + " <b>Hour: </b>" + theHour;
    //bind that big string to the popup!
    layer.bindPopup(myString);
  }

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
  var points = omnivore.csv('data/stupidaccidentsV5.csv', null, omnivoreStyleHelper);
  //initialize the marker clusters
  var clusters = L.markerClusterGroup({
    showCoverageOnHover: false
  });
  points.on('ready', function() {
    clusters.addLayer(points);

  });
  map.addLayer(clusters);

  // on brushing, update the selected points with the most bass-ackwards method of deleting and re-adding layers
  parcoords.on("brush", function() {
    var selectedPoints = GeoJSON.parse(parcoords.brushed(), {
      Point: ['lat', 'lng'],
      include: ['Description', "Severity", "hour", "month"]
    });
    points.clearLayers();
    points.addData(selectedPoints);
    clusters.clearLayers();
    clusters.addLayer(points);
  });









  jQuery(document).ready(function() {
    // Position Tipso
    jQuery('.right').tipso({
      position: 'right',
      background: 'rgba(0,0,0,0.8)',
      titleBackground: 'tomato',
      useTitle: false,
    });
    jQuery('.left').tipso({
      position: 'left',
      background: 'tomato',
      useTitle: false,
    });
    jQuery('.bottom').tipso({
      position: 'bottom',
      background: '#2574A9',
      useTitle: false,
    });
    jQuery('.top, .destroy, .update, .update-tipso-content').tipso({
      position: 'top',
      background: '#F62459',
      useTitle: false,
      width: '',
      maxWidth: 300
    });
    jQuery('.hover-tipso-tooltip').tipso({
      position: 'top',
      background: '#000',
      useTitle: false,
      width: false,
      maxWidth: 300,
      tooltipHover: true,
      content: function() {
        return 'You can <a href="javascript:;">CLICK ME</a> now!';
      }
    });

    jQuery('.top-right').tipso({
      position: 'top-right',
      background: 'rgba(0,0,0,0.8)',
      titleBackground: 'tomato',
      titleContent: 'Some title',
      useTitle: false,
      tooltipHover: true
    });

    jQuery('.top-left').tipso({
      position: 'top-left',
      background: 'rgba(0,0,0,0.8)',
      titleBackground: 'tomato',
      titleContent: 'Some title',
      useTitle: false,
      tooltipHover: true
    });

    jQuery('.bottom-right').tipso({
      position: 'bottom-right',
      background: 'rgba(50,50,50,0.8)',
      titleBackground: 'tomato',
      titleContent: 'Some title',
      useTitle: false,
      tooltipHover: true
    });

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