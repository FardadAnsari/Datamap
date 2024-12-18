const citySelect = document.getElementById('city');
citySelect.addEventListener('change', function() {
    const selectedCity = citySelect.value;
    getCityData(selectedCity)
});

let cityBoundaryLayer;
function getCityData(selectedCity) {
    const url = `https://ons-dp-prod-cdn.s3.eu-west-2.amazonaws.com/maptiles/ap-geos/v3/${selectedCity.substring(0, 3)}/${selectedCity}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display the JSON response in the <pre> tag
            //document.getElementById('cityData').textContent = JSON.stringify(data, null, 4);

            // Check if the data contains "geometry" for boundary
            const boundaryGeoJSON = data.geometry;
            
            if (boundaryGeoJSON) {
                // Create a GeoJSON object for filtered features
                const filteredGeoJSON = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: boundaryGeoJSON,
                        properties: data.properties
                    }]
                };

                // Clear any previous boundary layer
                if (cityBoundaryLayer) {
                    map.removeLayer(cityBoundaryLayer);
                }

                // Add city boundary to the map
                cityBoundaryLayer = L.geoJSON(filteredGeoJSON).addTo(map);

                // Zoom map to the city boundary
                const bounds = cityBoundaryLayer.getBounds();
                // Fly to the city boundary with animation
                map.flyToBounds(bounds, {
                    duration: 2,  // Duration of the fly-to animation in seconds
                    easeLinearity: 0.5,  // Controls the curvature of the flight path
                });
            } else {
                alert("No boundary data found for this city.");
            }
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
            //document.getElementById('cityData').textContent = 'Error fetching data';
        });
}