window.stored_data_GBM = [];


function addMarkers_GB(locations) {
    let counter_GBM = 0;
    document.getElementById('totalCount_googlebusiness').textContent = locations.length;

    locations.forEach(location => {
        const lat = location.latlng?.latitude;
        const lng = location.latlng?.longitude;
        const popupContent = `
            <div class="popup-container">
                <h3>${location.title} <lable style="color: #3f82f9; margin-left: 3px; font-size: x-small;">GBM</lable></h3>
                <hr>
                <ul>
                    <li>
                        <i class="fa fa-fingerprint"></i>
                        <span style="font-weight: bold;">ID:</span>
                        <span>${location.name.replace("locations/", "")}</span>
                    </li>
                    <li>
                        <i class="fas fa-map-marker-alt"></i>
                        <span style="font-weight: bold;">Address:</span>
                        <span>${location.storefrontAddress.addressLines.join(', ')}, ${location.storefrontAddress.locality}</span>
                    </li>
                    <li style="opacity: ${location.postalCode};">
                        <i class="fas fa-envelope"></i>
                        <span style="font-weight: bold;">Postcode:</span>
                        <span>${location.storefrontAddress.postalCode || 'None'}</span>
                    </li>
                    <li>
                        <i class="fas fa-phone"></i>
                        <span style="font-weight: bold;">Phone:</span>
                        <span>${location.phoneNumbers.primaryPhone}</span>
                    </li>
                    <li style="opacity: 0.5;">
                        <i class="fas fa-star"></i>
                        <span style="font-weight: bold;">Rating:</span>
                        <span>None</span>
                    </li>
                    <li style="opacity: 0.5;">
                        <i class="fas fa-utensils"></i>
                        <span style="font-weight: bold;">Cuisines:</span>
                        <span>None</span>
                    </li>

                    <hr style="color: rgb(0 0 0 / 50%);">

                    <li>
                        <i class="fas fa-globe"></i>
                        <span style="font-weight: bold;">Website:</span>
                        <span><a href="${location.websiteUri}" target="_blank">${location.websiteUri}</a></span>
                    </li>
                    <li>
                        <i class="fas fa-map"></i>
                        <span style="font-weight: bold;">Maps Link:</span>
                        <span><a href="${location.metadata.mapsUri}" target="_blank">Google Maps</a></span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span style="font-weight: bold; color: ${location.metadata.hasGoogleUpdated ? 'green' : 'red'};">
                            Google Updated:
                        </span>
                        <span style="color: ${location.metadata.hasGoogleUpdated ? 'green' : 'red'};">
                            ${location.metadata.hasGoogleUpdated ? 'Yes' : 'No'}
                        </span>
                    </li>
                    <li>
                        <i class="fas fa-trash"></i>
                        <span style="font-weight: bold; color: ${location.metadata.canDelete ? 'green' : 'red'};">
                            Can Delete:
                        </span>
                        <span style="color: ${location.metadata.canDelete ? 'green' : 'red'};">
                            ${location.metadata.canDelete ? 'Yes' : 'No'}
                        </span>
                    </li>
                    <li>
                        <i class="fas fa-utensils"></i>
                        <span style="font-weight: bold; color: ${location.metadata.canHaveFoodMenus ? 'green' : 'red'};">
                            Can Have Food Menus:
                        </span>
                        <span style="color: ${location.metadata.canHaveFoodMenus ? 'green' : 'red'};">
                            ${location.metadata.canHaveFoodMenus ? 'Yes' : 'No'}
                        </span>
                    </li>
                    <li>
                        <i class="fas fa-comment-dots"></i>
                        <span style="font-weight: bold; color: ${location.metadata.hasVoiceOfMerchant ? 'green' : 'red'};">
                            Has Voice of Merchant:
                        </span>
                        <span style="color: ${location.metadata.hasVoiceOfMerchant ? 'green' : 'red'};">
                            ${location.metadata.hasVoiceOfMerchant ? 'Yes' : 'No'}
                        </span>
                    </li>
                </ul>
            </div>
        `;

        if (lat && lng) {
            const marker = L.marker([lat, lng], {icon: googlebusiness_icon}).bindPopup(popupContent);
            marker.on('mouseover', function (e) {
                const markerElement = e.target._icon;
                markerElement?.classList.add('marker-hover');
                this.openPopup();
            });
            marker.on('popupclose', function (e) {
                const markerElement = e.target._icon;
                if (markerElement) {
                    markerElement.classList.remove('marker-hover');
                }
            });

            googlebusiness.addLayer(marker);
            counter_GBM++;


            // Add Result Panel 
            if (counter_GBM < 100) {
                const listItem = document.createElement('li');
                listItem.classList.add('GBM_li');
                listItem.innerHTML = `
                    <strong>${location.title}</strong> <lable style="color: #3f82f9; margin-left: 3px; font-size: x-small;">GBM</lable>
                    <br>
                    <span style="font-weight: 100;">${location.storefrontAddress.postalCode || 'None'}</span>
                `;
                listItem.addEventListener('click', function() {
                    document.querySelectorAll('.GBM_li').forEach(item => item.classList.remove('li_selected'));
                    listItem.classList.add('li_selected');
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    map.flyTo([lat, lng], 18, { animate: true, duration: 1 });
                    setTimeout(() => {
                        marker.openPopup();
                        const markerElement = marker._icon;
                        markerElement?.classList.add('marker-hover');
                    }, 1300);
                });
                document.getElementById('resultsList').appendChild(listItem);
            }
        }
    });
    map.addLayer(googlebusiness);
    document.getElementById('validCount_googlebusiness').textContent = counter_GBM
    if (counter_GBM > 0) { 
        document.getElementById('counter_google').innerHTML = `(${counter_GBM})`;

        document.getElementById('counter_google').style.textShadow = "0px 0px 15px rgba(255, 0, 0, 1)";
        document.getElementById('counter_google').style.fontWeight = "bold";
        setTimeout(() => {
            document.getElementById('counter_google').style.textShadow = "none";
            document.getElementById('counter_google').style.fontWeight = "normal";
        }, 500);
        
    } else {
        document.getElementById('counter_google').innerHTML = `(${counter_GBM})`;
    }
}








function fetchDataGBM() {
    const apiUrl = API_URL_GOOGLEBUSINESS;
    return fetch(apiUrl, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json(); // Return the JSON response
    })
    .then(data => {

        return data; // Return the fetched data
    })
    .catch(error => {
        console.error('Error fetching GBM data:', error); // Handle any errors
    });
}









document.getElementById('google').addEventListener('change', function () {
    const isChecked = this.checked;
    if (isChecked) {
        fetchDataGBM()
            .then(data => {
                addMarkers_GB(data)
                window.stored_data_GBM = data;
                document.getElementById('infoPanel_googlebusiness').style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching GBM data:', error);
            });
    } else {
        // Remove the Google Business map layer
        map.removeLayer(googlebusiness);  
        googlebusiness.clearLayers(); 
        document.querySelectorAll('.GBM_li').forEach(element => {
            element.remove();
        });
        // Hide the info panel
        document.getElementById('infoPanel_googlebusiness').style.display = 'none';
    }
});







document.getElementById('searchButton').addEventListener('click', function() {
    map.removeLayer(googlebusiness);
    googlebusiness.clearLayers();
    document.querySelectorAll('.GBM_li').forEach(element => {
        element.remove();
    });
    if (document.getElementById('google').checked) {
        // Flatten the array of lists into a single list
        const flattenedData = window.stored_data_GBM.flat();
        let filteredData;
        const searchValue = document.getElementById('searchInput').value.trim().replace(/\s+/g, ' ');
        if (!searchValue) {
            filteredData = flattenedData;
        } else {
            const options = {
                keys: ["name", "title", "phoneNumbers.primaryPhone", "storefrontAddress.postalCode", "storefrontAddress.locality", "storefrontAddress.addressLines"],
                threshold: 0.3,
                useExtendedSearch: true
            };
            const fuse = new Fuse(flattenedData, options);
            let results = fuse.search(searchValue);
            filteredData = results.map(result => result.item);
        }
        
        if (window.Region_Boundary_Selected && typeof window.Region_Boundary_Selected.contains === 'function') {
            filteredData = filteredData.filter(location => {
                const latitude = parseFloat(location.latitude);
                const longitude = parseFloat(location.longitude);
                
                if (!isNaN(latitude) && !isNaN(longitude)) {
                    const latLng = L.latLng(latitude, longitude);
                    return window.Region_Boundary_Selected.contains(latLng);
                }
                return false;
            });
        }
        counter_GBM = 0;
        addMarkers_GB(filteredData);
        
    }
});

