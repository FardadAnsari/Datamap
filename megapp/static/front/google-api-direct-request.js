window.stored_data_GBM = [];


function addMarkers_GB(locations) {
    let counter_GBM = 0;
    document.getElementById('totalCount_googlebusiness').textContent = locations.length;

    locations.forEach(location => {
        const lat = location.latlng?.latitude;
        const lng = location.latlng?.longitude;
        const popupContent = GetPopup_GBM(location);

        if (lat && lng) {
            const marker = L.marker([lat, lng], {icon: companies.googleBusinessManager.icon}).bindPopup(popupContent);
            marker.on('mouseover', function (e) {
                const markerElement = e.target._icon;
                markerElement?.classList.add('marker-hover');
                // this.openPopup();
            });
            marker.on('popupclose', function (e) {
                const markerElement = e.target._icon;
                if (markerElement) {
                    markerElement.classList.remove('marker-hover');
                }
            });

            companies.googleBusinessManager.layer.addLayer(marker);
            counter_GBM++;


            // Add Result Panel 
            if (counter_GBM < 100) {
                const listItem = document.createElement('li');
                listItem.classList.add('GBM_li');
                listItem.innerHTML = getResultItemContent_GBM(location);
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
    map.addLayer(companies.googleBusinessManager.layer);
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









document.getElementById('googleBusinessManager').addEventListener('change', function () {
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
        map.removeLayer(companies.googleBusinessManager.layer);  
        companies.googleBusinessManager.layer.clearLayers(); 
        document.querySelectorAll('.GBM_li').forEach(element => {
            element.remove();
        });
        // Hide the info panel
        document.getElementById('infoPanel_googlebusiness').style.display = 'none';
    }
});





document.getElementById('searchButton').addEventListener('click', function() {
    map.removeLayer(companies.googleBusinessManager.layer);
    companies.googleBusinessManager.layer.clearLayers();
    document.querySelectorAll('.GBM_li').forEach(element => {
        element.remove();
    });
    if (document.getElementById('googleBusinessManager').checked) {
        // Flatten the array of lists into a single list
        const flattenedData = window.stored_data_GBM.flat();
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

        // فیلتر کردن براساس مناطق انتخاب‌شده
        if (window.Region_Boundary_Selected && Array.isArray(window.Region_Boundary_Selected) && window.Region_Boundary_Selected.length > 0) {
            filteredData = filteredData.filter(location => {
                const lat = location.latlng?.latitude;
                const lng = location.latlng?.longitude;
        
                // بررسی وجود مقادیر و معتبر بودن لت و لانگ
                if (!lat || !lng) {
                    return false;
                }
        
                const latitude = parseFloat(lat);
                const longitude = parseFloat(lng);
        
                // بررسی معتبر بودن مقادیر لت و لانگ
                if (isNaN(latitude) || isNaN(longitude)) {
                    return false;
                }
        
                // چک کردن اینکه لت و لانگ داخل محدوده یکی از مناطق انتخاب‌شده هست یا خیر
                const latLng = L.latLng(latitude, longitude);
                const isWithinBounds = window.Region_Boundary_Selected.some(regionBounds => {
                    return regionBounds.contains(latLng);
                });
                return isWithinBounds;
            })
        }
        
        counter_GBM = 0;
        addMarkers_GB(filteredData);
    }
});