document.getElementById('foodhub').addEventListener('change', function () {
    const isChecked = this.checked;

    if (isChecked) {
        console.log('Toggle is on, checking Cache API for foodhub...');

        // Define cache name and URL for the API request
        const cacheName = 'foodhubCache';
        const apiUrl = 'http://datamap.mealzo.co.uk/api/foodhub/?fields=name,Latitude,Longitude';

        // Open the cache
        caches.open(cacheName).then(cache => {
            // Try to match the request in the cache
            cache.match(apiUrl).then(cachedResponse => {
                if (cachedResponse) {
                    console.log('Cached response found:', cachedResponse);
                    // Parse the cached response and add markers
                    cachedResponse.json().then(data => {
                        addfoodhubMarkers(data);
                    });
                } else {
                    console.log('No cached response, fetching from API...');
                    // If no cached data, fetch from the API
                    fetch(apiUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            // Clone the response for caching
                            cache.put(apiUrl, response.clone());
                            return response.json();  // Parse as JSON
                        })
                        .then(data => {
                            console.log('Data received from API:', data);
                            addfoodhubMarkers(data);  // Add the markers with fetched data
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                }
            }).catch(error => {
                console.error('Error opening cache or matching cache:', error);
            });
        });
    } else {
        console.log('Toggle is off, removing foodhub markers...');
        map.removeLayer(foodhub);
    }
});
