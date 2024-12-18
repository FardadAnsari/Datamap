window.RegionBoundaryLayer;
window.Region_Boundary_Selected = [];

async function getRegionData(selectedRegion) {
    const url = `https://ons-dp-prod-cdn.s3.eu-west-2.amazonaws.com/maptiles/ap-geos/v3/${selectedRegion.substring(0, 3)}/${selectedRegion}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch region data: ${response.statusText}`);
        }

        const data = await response.json();
        const boundaryGeoJSON = data.geometry;

        if (!boundaryGeoJSON) {
            console.warn("No boundary data found for this Region.");
            return;
        }

        // ایجاد GeoJSON برای مرز
        const filteredGeoJSON = createGeoJSON(boundaryGeoJSON, data.properties);

        // مدیریت لایه مرز
        updateRegionBoundaryLayer(filteredGeoJSON);

        // زوم روی منطقه
        zoomToRegion(window.RegionBoundaryLayer);

        // تنظیم مقدار Region_Boundary_Selected
        window.Region_Boundary_Selected = window.RegionBoundaryLayer.getBounds();

        // اجرای جستجو
        triggerSearch();

    } catch (error) {
        console.error('Error fetching Region data:', error);
    }
}

function createGeoJSON(geometry, properties) {
    return {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            geometry: geometry,
            properties: properties
        }]
    };
}

function updateRegionBoundaryLayer(filteredGeoJSON) {
    // حذف لایه قبلی (در صورت وجود)
    if (window.RegionBoundaryLayer) {
        map.removeLayer(window.RegionBoundaryLayer);
    }

    // ایجاد لایه جدید
    window.RegionBoundaryLayer = L.geoJSON(filteredGeoJSON, {
        style: {
            color: '#4B5AFC',
            weight: 2,
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0.5,
            fillColor: '#4B5AFC'
        }
    }).addTo(map);

    // انیمیشن شفافیت
    animateBoundaryLayer(window.RegionBoundaryLayer);
}

function animateBoundaryLayer(layer) {
    let currentOpacity = 0.6;
    const interval = setInterval(() => {
        currentOpacity -= 0.05;
        if (currentOpacity <= 0.3) {
            clearInterval(interval);
            layer.setStyle({
                fillOpacity: 0.3,
                fillColor: '#4B5AFC',
                dashArray: '3'
            });
        } else {
            layer.setStyle({
                fillOpacity: currentOpacity
            });
        }
    }, 70);
}

function zoomToRegion(layer) {
    const bounds = layer.getBounds();
    map.flyToBounds(bounds, {
        duration: 2,
        easeLinearity: 0.5
    });
}

function triggerSearch() {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.click();
    } else {
        console.warn("Search button not found");
    }
}









function loadCities() {
    const selectedRegion = document.getElementById('Region').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = ''; 

     // فیلتر کردن شهرهایی که با parentcd برابر با منطقه انتخابی هستند
    const filteredCities = Cities.filter(city => city.parentcd === selectedRegion);


    if (filteredCities.length > 0) {
        citySelect.innerHTML = `<option value="">City (${filteredCities.length})</option>`;
    } else {
        citySelect.innerHTML = '<option value="" disabled selected>City (0)</option>';
    }

    // اضافه کردن شهرهای فیلتر شده به فیلد انتخاب شهر
    filteredCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.areacd;
        option.text = city.areanm;
        citySelect.appendChild(option);
    });

    // اگر در زیر مجموعه اون منطقه شهری وجود ندارد، فیلد انتخاب شهر پنهان شود
    citySelect.style.display = filteredCities.length > 0 ? 'block' : 'none';
}


$(document).ready(function() {
    ////////////// Initialize Select2 for Region //////////////
    $('#Region').select2();


    // Listen for changes on the Select2 element (for selecting a region)
    $('#Region').on('change', function() {
        const selectedRegion = $(this).val(); // Get the selected region value
        // Check if the selectedRegion is not empty
        if (selectedRegion) {
            getRegionData(selectedRegion); // Call the function only if a Region is selected
            loadCities(selectedRegion); // Call to load cities based on selected Region
        }
    });






    ////////////// Initialize Select2 for City //////////////
    $('#city').select2();



    // Listen for changes on the City Select2 element
    $('#city').on('change', function() {
        const selectedCity = $(this).val(); // Get the selected value
        // Check if the selectedCity is not empty
        if (selectedCity) {
            getRegionData(selectedCity); // Call the function only if a city is selected
        }
    });
});