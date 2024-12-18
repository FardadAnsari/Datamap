


// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);  // Coordinates for London

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Create MarkerCluster Groups for each category
const restaurantCluster = L.markerClusterGroup();
const shopCluster = L.markerClusterGroup();

// Add restaurant markers
const restaurant1 = L.marker([51.505, -0.09]).bindPopup('Restaurant 1');
const restaurant2 = L.marker([51.515, -0.1]).bindPopup('Restaurant 2');
restaurantCluster.addLayer(restaurant1);
restaurantCluster.addLayer(restaurant2);

// Add shop markers
const shop1 = L.marker([51.52, -0.09]).bindPopup('Shop 1');
const shop2 = L.marker([51.525, -0.1]).bindPopup('Shop 2');
shopCluster.addLayer(shop1);
shopCluster.addLayer(shop2);

// Add both clusters to the map initially
restaurantCluster.addTo(map);
shopCluster.addTo(map);

// Functions to toggle marker clusters
function toggleRestaurants() {
    if (map.hasLayer(restaurantCluster)) {
        map.removeLayer(restaurantCluster);
    } else {
        map.addLayer(restaurantCluster);
    }
}

function toggleShops() {
    if (map.hasLayer(shopCluster)) {
        map.removeLayer(shopCluster);
    } else {
        map.addLayer(shopCluster);
    }
}
