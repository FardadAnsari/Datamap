let stored_data_FoodHouse = [];
    function addMarkersforfoodhouse(locations) {
    // Clear existing markers from the cluster group
        map.removeLayer(foodhouse);
        foodhouse.clearLayers();

    // Loop through each location object in the response
    locations.forEach(location => {
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        const name = location.name;  // Access 'name' field



        // Add marker if valid latitude and longitude exist
        if (!isNaN(lat) && !isNaN(lng)) {
            var popupContent = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src='./static/img/shop.png' alt="Shop" width="25" style="margin-right: 5px;">
                    <strong>${name}</strong>
                </div>
                
            `;
            const marker = L.marker([lat, lng],{icon:foodhouse_icon}).bindPopup(popupContent);
            foodhouse.addLayer(marker);  // Add marker to cluster group
        } else {
            console.warn(`Invalid coordinates for ${name}: ${lat}, ${lng}`);
        }
    });
    map.addLayer(foodhouse);
}

    // Handle toggle switch for justeat***//
    document.getElementById('foodhouse').addEventListener('change',
        function () {
        const cachedData = localStorage.getItem('foodhouse')
            var isChecked = this.checked;





            if (isChecked) {
                console.log('Toggle is on, making API request... for foodhouse');

                if (cachedData){
                    console.log('checking the LocalStorage... data.....')
                    const parsedData = JSON.parse(cachedData)
                     // Store data in local storage
                    // return JSON.parse(cachedData);
                    addMarkersforfoodhouse(parsedData);
                    stored_data_FoodHouse = parsedData;
                }

                else {
                    console.log("No cached data found.....")
                    // Fetch data from your API with the X-API-KEY header

                    fetch('http://localhost:8000/api/foodhouse/?fields=name,latitude,longitude')

                        .then(response => {
                            console.log('Response received:', response);

                            return response.json();
                        })
                        .then(data => {
                            console.log('Data received:', data);
                            localStorage.setItem('foodhouse',JSON.stringify(data));
                            addMarkersforfoodhouse(data);
                            stored_data_FoodHouse = data;
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
                map.removeLayer(foodhouse)
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
    const filteredData = stored_data_FoodHouse.filter(item => {
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
    addMarkersforfoodhouse(filteredData);
});
