Object.keys(locations).forEach(key => {
    const location = locations[key];
    const lat = parseFloat(location.Latitude);
    const lng = parseFloat(location.Longitude);
    const name = location.Name;

    if (!isNaN(lat) && !isNaN(lng)) {
        addMarker(lat, lng, name);
    } else {
        console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
    }
});

function addMarker(lat, lng, name) {
    const marker = L.marker([lat, lng]).bindPopup(name);
    markers.addLayer(marker);
}