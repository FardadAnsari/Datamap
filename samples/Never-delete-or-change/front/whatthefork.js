let stored_data_WTF = [];
    function addMarkersforwhatthefork(locations) {
    // Clear existing markers from the cluster group
        map.removeLayer(whatthefork);
        whatthefork.clearLayers();

    // Loop through each location object in the response
    locations.forEach(location => {
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lng);
        const name = location.name;  // Access 'name' field
        const instagram_url = location.instagram_url;
        const facebook_url = location.facebook_url;
        const twitter_url = location.twitter_url;
        const google_play_link = location.google_play_link;
        const app_store_link = location.app_store_link;


        // Add marker if valid latitude and longitude exist
        if (!isNaN(lat) && !isNaN(lng)) {
            var popupContent = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/shop.png' alt="Shop" width="25" style="margin-right: 5px;">
                    <strong>${name}</strong>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/social.png' alt="Social" width="25" style="margin-right: 5px;">
                    <a href="${instagram_url}" target="_blank" rel="noopener noreferrer">${instagram_url}</a>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/facebook.png' alt="Facebook" width="25" style="margin-right: 5px;">
                    <a href="${facebook_url}" target="_blank" rel="noopener noreferrer">${facebook_url}</a>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/twitter.png' alt="Twitter" width="25" style="margin-right: 5px;">
                    <a href="${twitter_url}" target="_blank" rel="noopener noreferrer">${twitter_url}</a>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/google-play.png' alt="Google Play" width="25" style="margin-right: 5px;">
                    <a href="${google_play_link}" target="_blank" rel="noopener noreferrer">${google_play_link}</a>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/app-store.png' alt="App Store" width="25" style="margin-right: 5px;">
                    <a href="${app_store_link}" target="_blank" rel="noopener noreferrer">${app_store_link}</a>
                </div>
            `;
            const marker = L.marker([lat, lng],{icon:whatthefork_icon}).bindPopup(popupContent);
            whatthefork.addLayer(marker);  // Add marker to cluster group
        } else {
            console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
        }
    });
    map.addLayer(whatthefork);
}

    // Handle toggle switch for justeat***//
    document.getElementById('wtf').addEventListener('change',
        function () {
        const cachedData = localStorage.getItem('whattheforkapiData')
            var isChecked = this.checked;

            if (isChecked) {
                console.log('Toggle is on, making API request... for whatthefork');

                if (cachedData){
                    console.log('checking the LocalStorage... data.....')
                    const parsedData = JSON.parse(cachedData)
                     // Store data in local storage
                    // return JSON.parse(cachedData);
                    addMarkersforwhatthefork(parsedData);
                    stored_data_WTF = parsedData;
                }

                else {
                    console.log("No cached data found.....")
                    // Fetch data from your API with the X-API-KEY header

                    fetch('http://localhost:8000/api/whatthefork/?fields=name,lat,lng,instagram_url,facebook_url,twitter_url,google_play_link,app_store_link,')

                        .then(response => {
                            console.log('Response received:', response);

                            return response.json();
                        })
                        .then(data => {
                            console.log('Data received:', data);
                            localStorage.setItem('whattheforkapiData',JSON.stringify(data));
                            addMarkersforwhatthefork(data);
                            stored_data_WTF = data;
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                }
            }


            else {
                // Clear existing markers from the cluster group
                //markers.clearLayers();
                // console.error('Error fetching data:', error);
                map.removeLayer(whatthefork)
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
    const filteredData = stored_data_WTF.filter(item => {
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
    addMarkersforwhatthefork(filteredData);
});
