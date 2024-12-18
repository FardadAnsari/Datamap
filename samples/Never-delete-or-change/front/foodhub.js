// Function to add markers to the map
let stored_data = [];
    function addfoodhubMarkers(locations) {
    // Clear existing markers from the cluster group
    // markers.clearLayers();
        map.removeLayer(foodhub);
        foodhub.clearLayers();
    // Loop through each location object in the response
    locations.forEach(location => {
        const lat = parseFloat(location.Latitude);
        const lng = parseFloat(location.Longitude);
        const name = location.name;  // Access 'name' field
        const url = location.url ? formatUrl(location.url) : '#';
        const facebook = location.facebook;     
        const twitter = location.twitter;
        const android_link = location.android_link;
      
        

        if (!isNaN(lat) && !isNaN(lng)) {
            var popupContent = `
                <img src='./static/img/shop.png' alt="Facebook" width="25"> <strong>${name}</strong><br>
                <img src='./static/img/url.png' alt="Facebook" width="25"> <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a><br>
                <img src='./static/img/facebook.png' alt="Facebook" width="25">  <a href="${facebook}" target="_blank" rel="noopener noreferrer">${facebook}</a><br>
                <img src='./static/img/twitter.png' alt="Twitter" width="25">  <a href="${twitter}" target="_blank" rel="noopener noreferrer">${twitter}</a><br>
                <img src='./static/img/google-play.png' alt="Google Play" width="25" style="margin-right: 5px;">  <a href="${android_link}" target="_blank" rel="noopener noreferrer">${android_link}</a><br>
            `;
            const marker = L.marker([lat, lng], {icon: foodhub_icon}).bindPopup(popupContent);
            foodhub.addLayer(marker);  // Add marker to cluster group
        } else {
            console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
        }
    });
    map.addLayer(foodhub);
}

// Handle toggle switch for foodhub//
    document.getElementById('foodhub').addEventListener('change',
        function () {
            const cachedData = localStorage.getItem('foodhubData');
            var isChecked = this.checked;

            if (isChecked) {
                console.log('Toggle is on, making API request...for foodhub');
                const chacheName='foodhub'
                //if (cachedData) {
                    //console.log('checking the LocalStorage data.....')
                    //const parsedData = JSON.parse(cachedData)
                     // Store data in local storage
                    // return JSON.parse(cachedData);
                    //addfoodhubMarkers(parsedData);

                //}
                caches.open(chacheName).then(cache => {
                    cache.match('http://localhost:8000/api/foodhub/?fields=name,Latitude,Longitude,url,facebook,twitter,android_link,postcode,phone').then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('Cached response found:', cachedResponse);
                            cachedResponse.json().then(data => {
                                addfoodhubMarkers(data);
                                stored_data = data;
                            })
                        } else {
                            console.log("No cached data found ......")
                            // Fetch data from your API with the X-API-KEY header
                            fetch('http://localhost:8000/api/foodhub/?fields=name,Latitude,Longitude,url,facebook,twitter,android_link,postcode,phone')
                                .then(response => {
                                    console.log('Response received:', response);
                                    const clonedResponse = response.clone();
                                    return response.json().then(data => {
                                        cache.put('http://localhost:8000/api/foodhub/?fields=name,Latitude,Longitude,url,facebook,twitter,android_link,postcode,phone', clonedResponse);
                                        console.log('Response received:', data);
                                        addfoodhubMarkers(data);
                                        stored_data = data;
                                    });
                                })
                                // .then(data => {
                                //     console.log('Data received:', data);
                                //     localStorage.setItem('foodhubData', JSON.stringify(data));
                                //     addfoodhubMarkers(data);
                                // })
                                .catch(error => {
                                    console.error('Error fetching data:', error);
                                });
                            // Clear existing markers from the cluster group
                            // markers.clearLayers();
                        }
                    })
                })

        }
            else {
                map.removeLayer(foodhub)}
            });

// Function to ensure URL is properly formatted
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

document.querySelector('.btn.btn-primary').addEventListener('click', function() {
    console.log('filterpart');

    // Get search type and value
    var searchType = document.querySelector('input[name="searchType"]:checked').value;
    var searchValue = document.getElementById('exampleDataList').value.toLowerCase();
    console.log(searchType)
    console.log(searchValue)

    // Filter the data
    const filteredData = stored_data.filter(item => {
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
    addfoodhubMarkers(filteredData);
});
