// Function to ensure URL is properly formatted
let stored_data_Uber = [];
function formatUrl(url) {
    try {
        // Ensure the URL has a protocol
        if (!url.match(/^https?:\/\//i)) {
            url = 'http://' + url; // Prepend http:// if missing
        }
        const formattedUrl = new URL(url); // Check if it's a valid URL
        return formattedUrl.href; // Return the absolute URL
    } catch (e) {
        console.error('Invalid URL:', url);
        return '#'; // Return a fallback URL if invalid
    }
}

// Function to add markers to the map
    function addMarkersforubereats(locations) {
    // Clear existing markers from the cluster group
    // markers.clearLayers();
        map.removeLayer(ubereats);
        ubereats.clearLayers();

    // Loop through each location object in the response
    locations.forEach(location => {
        const lat = parseFloat(location.Latitude);
        const lng = parseFloat(location.Longitude);
        const name = location.name;  // Access 'name' field
        const url = location.shop_url ? formatUrl(location.shop_url) : '#';
        const rating = location.rating || 'No ratings';

        // Add marker if valid latitude and longitude exist
        if (!isNaN(lat) && !isNaN(lng)) {
            var popupContent = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/shop.png' alt="Shop" width="25" style="margin-right: 5px;">
                    <strong>${name}</strong>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/rating.png' alt="Rating" width="25" style="margin-right: 5px;">
                     ${rating}
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/app-store.png' alt="App Store" width="25" style="margin-right: 5px;">
                     <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>
                </div>
               
            `;
            const marker = L.marker([lat, lng],{icon:ubereats_icon}).bindPopup(popupContent);
            ubereats.addLayer(marker);  // Add marker to cluster group
        } else {
            console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
        }
    });
        map.addLayer(ubereats)
}


// Handle toggle switch for foodhub//
    document.getElementById('uber').addEventListener('change',
        function () {

            var isChecked = this.checked;

            if (isChecked) {

                console.log('Toggle is on, making API request...for ubereats');
                const chacheName ='ubereats'
                // Fetch data from your API with the X-API-KEY header

                caches.open(chacheName).then(cache =>
                {

                    cache.match('http://127.0.0.1:8000/api/ubereats/?fields=name,Latitude,Longitude,shop_url,rating')

                        .then(cachedResponse => {
                            if(cachedResponse){
                                console.log('Cached Response found',cachedResponse);
                                cachedResponse.json().then(data =>{
                                    addMarkersforubereats(data);
                                    stored_data_Uber = data;
                                })
                            }
                            else{
                                console.log("No cached data found....")

                                fetch('http://127.0.0.1:8000/api/ubereats/?fields=name,Latitude,Longitude,shop_url,rating')

                                    .then(response =>{
                                        console.log('Response Received:',response);
                                        const clonedResponse =response.clone();
                                        return response.json().then(data =>{

                                            cache.put('http://127.0.0.1:8000/api/ubereats/?fields=name,Latitude,Longitude,shop_url,rating',clonedResponse);

                                            console.log('Response received:',data)
                                            addMarkersforubereats(data);
                                            stored_data_Uber = data;
                                        })
                                    })
                            }
                        })

                })
                // fetch('http://datamap.mealzo.co.uk/api/ubereats/?fields=name,Latitude,Longitude')
                //     .then(response => {
                //         console.log('Response received:', response);
                //
                //         return response.json();
                //     })
                //     .then(data => {
                //         console.log('Data received:', data);
                //         addMarkersforubereats(data);
                //     })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }

            else {
                // Clear existing markers from the cluster group
                //markers.clearLayers();
                map.removeLayer(ubereats);



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
    const filteredData = stored_data_Uber.filter(item => {
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
    addMarkersforubereats(filteredData);
});
