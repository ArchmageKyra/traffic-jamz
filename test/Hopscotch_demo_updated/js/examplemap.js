var map;
window.onload = function () {
    renderMyMap();
}
//Map
function renderMyMap() {
    map = L.map('exmap').setView([44, -105], 5);
    L.tileLayer('https://api.mapbox.com/styles/v1/tyke4081/ckvpxck1a3ybf15nybsupn1er/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlrZTQwODEiLCJhIjoiY2t0YW5kZnppMW5zcDJucGdyMWZxeXlmciJ9.RPyq43ZS7WpI0dh5SHjUYw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.light'
    }).addTo(map);
//Create route
   L.Routing.control({
    waypoints: [
      L.latLng(39.9779, -105.2628), //My House
      L.latLng(46.8603, -113.9660), //My Sisters House
    ]  
   }).addTo(map);
} 