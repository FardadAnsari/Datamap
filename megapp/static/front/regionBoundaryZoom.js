window.RegionBoundaryLayer;
window.Region_Boundary_Selected = [];

async function getRegionData(selectedRegions) {
    for (const selectedRegion of selectedRegions) {
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
                continue; // ادامه برای منطقه بعدی
            }

            // ایجاد GeoJSON برای مرز
            const filteredGeoJSON = createGeoJSON(boundaryGeoJSON, data.properties);

            // مدیریت لایه مرز
            updateRegionBoundaryLayer(filteredGeoJSON);

            // ذخیره مرز جدید در Region_Boundary_Selected
            if (window.RegionBoundaryLayer && Array.isArray(window.RegionBoundaryLayer)) {
                const bounds = window.RegionBoundaryLayer[window.RegionBoundaryLayer.length - 1].getBounds();
                window.Region_Boundary_Selected.push(bounds);
            } else {
                console.error("RegionBoundaryLayer is invalid or does not have getBounds method.");
            }
            

            // زوم روی مناطق (اختیاری: زوم روی هر منطقه)
            zoomToRegion(window.RegionBoundaryLayer);

        } catch (error) {
            console.error('Error fetching Region data:', error);
        }
    }

    // اجرای جستجو پس از پردازش همه مناطق
    triggerSearch();
}

function createGeoJSON(geometry, properties) {
    if (!geometry || typeof geometry !== 'object') {
        console.error("Invalid geometry data:", geometry);
        return null; // بازگشت null در صورت وجود خطا
    }
    return {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            geometry: geometry,
            properties: properties || {}
        }]
    };
}

function updateRegionBoundaryLayer(filteredGeoJSON) {
    // ایجاد لایه جدید
    const regionLayer = L.geoJSON(filteredGeoJSON, {
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
    animateBoundaryLayer(regionLayer);

    // ذخیره لایه در یک آرایه (برای مدیریت چند لایه)
    if (!window.RegionBoundaryLayer) {
        window.RegionBoundaryLayer = [];
    }
    window.RegionBoundaryLayer.push(regionLayer);
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

function zoomToRegion(layers) {
    if (!Array.isArray(layers)) {
        layers = [layers]; // تبدیل به آرایه در صورتی که مقدار منفرد باشد
    }

    const allBounds = layers.map(layer => layer.getBounds());
    const combinedBounds = allBounds.reduce((acc, bounds) => acc.extend(bounds), L.latLngBounds());

    map.flyToBounds(combinedBounds, {
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










$(document).ready(function() {
    ////////////// Initialize Select2 for Region //////////////
    $('#Region').select2({
        maximumSelectionLength: 3,
        placeholder: "Select Regions...",
        allowClear: true,
    });
    // Listen for changes on the Select2 element (for selecting a region)
    $('#Region').on('change', function() {
        const selectedRegions = $(this).val(); // گرفتن آرایه مقادیر انتخاب‌شده
        if (selectedRegions && selectedRegions.length > 0) {
            getRegionData(selectedRegions);
        }
    });
    
    // لیسنر برای پاک کردن انتخاب‌ها
    $('#Region').on('select2:clear', function() {
        // Remove all region boundary layers
        if (window.RegionBoundaryLayer && Array.isArray(window.RegionBoundaryLayer)) {
            window.RegionBoundaryLayer.forEach(layer => {
                map.removeLayer(layer); // حذف هر لایه از نقشه
            });
        }
        // ریست کردن آرایه لایه‌ها
        window.RegionBoundaryLayer = [];
        // ریست کردن مرزهای منطقه انتخاب‌شده
        window.Region_Boundary_Selected = [];
        triggerSearch()
    });
});