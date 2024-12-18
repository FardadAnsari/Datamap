
let stored_data_justeat = [];
function addMarkersforjusteat(locations) {
    // Clear existing markers from the cluster group
    map.removeLayer(justeat);
    justeat.clearLayers();

    // Loop through each location object in the response
    locations.forEach(location => {
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lng);
        const name = location.name;  // Access 'name' field
        const rating = location.rating || 'No ratings';
        const starRating = location.starRating || 'No star rating';

        // Ensure cuisines is always an array
        let cuisinesArray = [];
        try {
            if (typeof location.cuisines === 'string') {
                // Convert single quotes to double quotes for valid JSON
                const jsonString = location.cuisines.replace(/'/g, '"');
                cuisinesArray = JSON.parse(jsonString);
            } else if (Array.isArray(location.cuisines)) {
                cuisinesArray = location.cuisines;
            }
        } catch (error) {
            cuisinesArray = [];
        }

        // Extract the 'name' values from 'cuisines' and join them
        const cuisines = cuisinesArray.length > 0
            ? cuisinesArray.map(cuisine => {
                // Return the name if it exists, else return 'Unknown cuisine'
                return cuisine && cuisine.name ? cuisine.name : 'Unknown cuisine';
            }).join(', ')
            : 'No cuisines available';  // Default value if array is empty

        if (!isNaN(lat) && !isNaN(lng)) {
            var popupContent = `
                <img src='./static/img/shop.png' alt="Shop" width="25"> <strong>${name}</strong><br>
                <img src='./static/img/rating.png' alt="Rating" width="25"> ${starRating}<br>
                Review count: ${rating}<br>
                Shop type: ${cuisines}<br>
            `;
            const marker = L.marker([lat, lng], { icon: justeat_icon }).bindPopup(popupContent);
            justeat.addLayer(marker);  // Add marker to cluster group
        } else {
            console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
        }
    });
    map.addLayer(justeat);
}
// Handle toggle switch for justeat
document.getElementById('just').addEventListener('change', function () {
    var isChecked = this.checked;
    const cacheName = 'justeatCache';

    const apiUrl = 'http://localhost:8000/api/justeat/?fields=name,lat,lng,rating,starRating,cuisines,postcode,';


    if (isChecked) {
        console.log('Toggle is on, making API request... for justeat');

        caches.open(cacheName).then(cache => {
            cache.match(apiUrl).then(cachedResponse => {
                if (cachedResponse) {
                    console.log('Cached response found:', cachedResponse);
                    cachedResponse.json().then(data => {
                        addMarkersforjusteat(data);
                        stored_data_justeat = data;
                    });
                } else {
                    console.log('No cached data found');
                    // Fetch data from your API with the X-API-KEY header
                    fetch(apiUrl)
                        .then(response => {
                            console.log('Response received:', response);
                            const clonedResponse = response.clone();
                            return response.json().then(data => {
                                // Cache the cloned response for future use
                                cache.put(apiUrl, clonedResponse);
                                console.log('Data received:', data);
                                stored_data_justeat = data;
                                addMarkersforjusteat(data);
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                }
            });
        });
    } else {
        // Clear existing markers from the cluster group
        map.removeLayer(justeat);
    }
});
document.querySelector('.btn.btn-primary').addEventListener('click', function() {
    console.log('filterpart');

    // Get search type and value
    var searchType = document.querySelector('input[name="searchType"]:checked').value;
    var searchValue = document.getElementById('exampleDataList').value.toLowerCase();
    console.log(searchType)
    console.log(searchValue)

    // Filter the data
    const filteredData = stored_data_justeat.filter(item => {
        let matchesSearch = false;

        if (searchType === 'name') {
            matchesSearch = item.name.toLowerCase().includes(searchValue);
        } else if (searchType === 'postcode') {
            matchesSearch = item.postcode.toLowerCase().includes(searchValue);
        } else if (searchType === 'phone') {
            matchesSearch = item.phone.includes(searchValue);
        }

        return matchesSearch;
    });

    // Add filtered markers to the map
    addMarkersforjusteat(filteredData);
});
