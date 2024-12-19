// Initialize the map
var map = L.map('map', {
    zoomControl: false,
    minZoom: 3,
}).setView([53.719009658267055, -3.0252257374101705], 7);

// Load and display the tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
// Layer switcher co3ntrol (toggle between layers)
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var satelliteMap = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap
};


// topleft: بالا سمت چپ
// topright: بالا سمت راست (پیش‌فرض)
// bottomleft: پایین سمت چپ
// bottomright: پایین سمت راست
L.control.layers(baseMaps, null, { position: 'bottomright' }).addTo(map);
// // Create a layer group for clustering
// var markers = L.markerClusterGroup();
// map.addLayer(markers);