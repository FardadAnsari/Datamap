// Function to add markers to the map
function addfoodhubMarkers(locations) {
    // Clear existing markers from the cluster group
    map.removeLayer(foodhub);

    // Loop through each location object in the response
    locations.forEach(location => {
        const lat = parseFloat(location.Latitude);
        const lng = parseFloat(location.Longitude);
        const name = location.name;  // Access 'name' field

        // Add marker if valid latitude and longitude exist
        if (!isNaN(lat) && !isNaN(lng)) {
            const marker = L.marker([lat, lng], { icon: foodhub_icon }).bindPopup(name);
            foodhub.addLayer(marker);  // Add marker to cluster group
        } else {
            console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
        }
    });
    map.addLayer(foodhub);
}

// Handle toggle switch for foodhub
document.getElementById('foodhub').addEventListener('change', function () {
    const cachedData = localStorage.getItem('foodhubapiData');
    const isChecked = this.checked;

    if (isChecked) {
        console.log('Toggle is on, checking cache for foodhub...');

        if (cachedData) {
            console.log('Cached data found, loading markers...');
            const parsedData = JSON.parse(cachedData);  // Parse the cached string to an object
            addfoodhubMarkers(parsedData);
        } else {
            console.log('No cached data found, making API request...');
            // Fetch data from your API with the X-API-KEY header
            fetch('http://localhost:8000/api/foodhub/?fields=name,Latitude,Longitude')
                .then(response => response.json())  // Get JSON from the response
                .then(data => {
                    console.log('Data received from API:', data);
                    // Store the fetched data in localStorage
                    localStorage.setItem('foodhubapiData', JSON.stringify(data));
                    addfoodhubMarkers(data);  // Add the markers with the fetched data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    } else {
        // Remove foodhub markers if toggle is off
        console.log('Toggle is off, removing foodhub markers...');
        map.removeLayer(foodhub);
    }
});
