//tipsos
jQuery(document).ready(function() {

  //tipso styling for "regular" tipso
  jQuery('.bottom-left').tipso({
    position: 'bottom-left',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    useTitle: false,
    tooltipHover: true
  });

  //custom tipso with URL for FHWA
  jQuery('.bottom-left-WChyperlink').tipso({
    position: 'bottom-left',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    useTitle: false,
    tooltipHover: true,
    content: function() {
      return 'Natural language description of weather condition at time of accident.  Was generalized from data source using the <a href = " https://ops.fhwa.dot.gov/weather/q1_roadimpact.htm" >FHWA categories of hazardous weather</a>.';
    }
  });

  //custom tipso with sources
  jQuery('.bottom-left-sources').tipso({
    position: 'bottom-left',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    useTitle: false,
    tooltipHover: true,
    width: 500,
    content: function() {
      return 'Kyra Slovacek, Mykael Pineda,Taylor Cunningham, Tyler Kemp <br> Made for Morteza Karimzadeh’s GEOG4043 Clas <br> Built using <a href = "https://leafletjs.com/" >Leaflet</a>, <a href = "https://github.com/Leaflet/Leaflet.markercluster" >MarkerCluser</a>,  <a href = "https://github.com/mapbox/leaflet-omnivore" >Omnivore</a>, <a href = "https://d3js.org/" >D3</a>, <a href = "https://syntagmatic.github.io/parallel-coordinates/" >ParCoords</a>, <a href = "https://github.com/caseycesari/GeoJSON.js" >GeoJSON Parser</a>, and <a href = "https://github.com/object505/tipso" >Tipso</a>.';
    }
  });

  jQuery(window).on('load', function() {
    // Show Tipso on Load
    jQuery('.page-load').tipso('show');
  });

});