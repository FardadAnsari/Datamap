console.log('Toggle is on, making API request...');
            // Fetch data from your API with the X-API-KEY header
fetch('http://datamap.mealzo.co.uk/api/foodhub/?fields=name,Latitude,Longitude,url')
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