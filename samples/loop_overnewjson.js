locations.forEach(location => {
    const lat = parseFloat(location.Latitude);
    const lng = parseFloat(location.Longitude);
    const name = location.name;  // Changed to lowercase 'name'

    // Add marker if valid latitude and longitude exist
    if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng]).bindPopup(name);
        markers.addLayer(marker);  // Add marker to cluster group
    } else {
        console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
    }
});