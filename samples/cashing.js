// Function to fetch data from API with localStorage caching
function fetchData(apiUrl) {
    // Check if data is already in localStorage
    const cachedData = localStorage.getItem('apiData');

    if (cachedData) {
        console.log('Data fetched from local storage');
        const data = JSON.parse(cachedData);  // Parse the cached data

        // You can now work with the cached data
        handleData(data);  // Call a function to process the data

    } else {
        // If data is not in localStorage, fetch it from the API
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched from API');

            // Store the data in localStorage for future use
            localStorage.setItem('apiData', JSON.stringify(data));

            // Work with the fetched data
            handleData(data);  // Call a function to process the data
        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });
    }
}

// Function to handle the data (for example, to display it on the map)
function handleData(data) {
    data.forEach(location => {
        console.log(`Name: ${location.name}, Latitude: ${location.Latitude}, Longitude: ${location.Longitude}`);

        // Here, you could update your map with the location data, e.g.,
        // addMarkerToMap(location.Latitude, location.Longitude, location.name);
    });
}

// Example: When the toggle button is checked, fetch the data
document.querySelector('#toggleButton').addEventListener('change', function(event) {
    if (event.target.checked) {
        // URL of your API endpoint
        const apiUrl = 'https://your-api-url.com/data';
        fetchData(apiUrl);
    }
});
