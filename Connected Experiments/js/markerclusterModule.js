//execute only when window is fully loaded
window.onload = function() {
  var map = L.map('map').setView([39.5501, -105.7821], 7);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);


  var points = omnivore.csv('data/CO_Accidents_All.csv');
  //points.addTo(map);

  var markers = L.markerClusterGroup({
    showCoverageOnHover: false
  });

  map.addLayer(markers);

  points.on('ready', function() {
    console.log(points.getLayers().length)
    markers.addLayer(points);
  });
}