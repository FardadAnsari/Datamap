console.log('Toggle is on, making API request...');
            // Fetch data from your API with the X-API-KEY header
fetch('http://92.205.191.109:8000/foodhub-data-r-and-d/?fields=Name&fields=Longitude&fields=Latitude', {
    headers: {
        'X-API-KEY': 'a8105743-dee6-4149-9f67-190c11e32246'
    }
})
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        // addMarkers(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });