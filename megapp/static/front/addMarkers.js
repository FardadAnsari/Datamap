
function addMarkers(locations, company) {
    let counter = 0;

    // پاک کردن مارکرها و لیست نتایج قبلی
    map.removeLayer(company.layer);
    company.layer.clearLayers();
    document.querySelectorAll(`.${company.resultClass}`).forEach(element => element.remove());

    locations.forEach(location => {
        const latitude = 
            location.latitude !== undefined ? parseFloat(location.latitude) : 
            location.Latitude !== undefined ? parseFloat(location.Latitude) : 
            null;
        const longitude = 
            location.longitude !== undefined ? parseFloat(location.longitude) : 
            location.Longitude !== undefined ? parseFloat(location.Longitude) : 
            null;
        if (!isNaN(latitude) && !isNaN(longitude)) {
            const popupContent = company.getPopupContent(location);
            const marker = L.marker([latitude, longitude], { icon: company.icon }).bindPopup(popupContent);
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

            company.layer.addLayer(marker);
            counter++;

            // افزودن به لیست نتایج
            if (counter < 100) {
                const listItem = document.createElement('li');
                listItem.classList.add(company.resultClass);
                listItem.innerHTML = company.getResultItemContent(location);
                listItem.addEventListener('click', function () {
                    document.querySelectorAll(`.${company.resultClass}`).forEach(item => item.classList.remove('li_selected'));
                    listItem.classList.add('li_selected');
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    map.flyTo([latitude, longitude], 18, { animate: true, duration: 1 });
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

    map.addLayer(company.layer);

    // نمایش تعداد مارکرها
    const counterElement = document.getElementById(company.counterId);
    if (counter > 0) {
        counterElement.innerHTML = `(${counter})`;
        counterElement.style.textShadow = "0px 0px 15px rgba(255, 0, 0, 1)";
        counterElement.style.fontWeight = "bold";
        setTimeout(() => {
            counterElement.style.textShadow = "none";
            counterElement.style.fontWeight = "normal";
        }, 500);
    } else {
        counterElement.innerHTML = `(0)`;
    }
}
