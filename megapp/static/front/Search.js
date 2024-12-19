// Attach search button click event
document.getElementById('searchButton').addEventListener('click', () => {
    Object.keys(companies).forEach(companyId => Search(companyId));
});

document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.click();
    } else {
        console.warn("Search button not found");
    }
});


function Search(companyId) {
    const company = companies[companyId];
    if (!company) {
        console.error(`Company configuration not found for id: ${companyId}`);
        return;
    }

    const isChecked = document.getElementById(companyId).checked;
    if (!isChecked) return;

    let filteredData;
    const searchValue = document.getElementById('searchInput').value.trim().replace(/\s+/g, ' ');

    // استفاده از داده‌های داخل کانفیک
    const storedData = company.data;

    if (!searchValue) {
        filteredData = storedData;
    } else {
        const options = {
            keys: company.searchKeys || [], // استفاده از کلیدهای خاص کمپانی
            threshold: 0.1,
            useExtendedSearch: true
        };
        const fuse = new Fuse(storedData, options);
        const results = fuse.search(searchValue);
        filteredData = results.map(result => result.item);
    }

    // فیلتر کردن براساس مناطق انتخاب‌شده
    if (window.Region_Boundary_Selected && Array.isArray(window.Region_Boundary_Selected) && window.Region_Boundary_Selected.length > 0) {
        filteredData = filteredData.filter(location => {
            // بررسی وجود مقادیر و معتبر بودن لت و لانگ
            if (!location.latitude || !location.longitude) {
                return false;
            }

            const latitude = parseFloat(location.latitude);
            const longitude = parseFloat(location.longitude);

            // بررسی معتبر بودن مقادیر لت و لانگ
            if (isNaN(latitude) || isNaN(longitude)) {
                return false;
            }

            // چک کردن اینکه لت و لانگ داخل محدوده یکی از مناطق انتخاب‌شده هست یا خیر
            const latLng = L.latLng(latitude, longitude);
            
            // بررسی اینکه آیا این نقطه در هر یک از محدوده‌های مناطق انتخاب‌شده قرار دارد
            return window.Region_Boundary_Selected.some(regionBounds => regionBounds.contains(latLng));
        });
    }




    // اضافه کردن مارکرها و به‌روزرسانی نقشه
    addMarkers(filteredData, company);
    if (filteredData.length > 0) {
        // فیلتر کردن داده‌ها برای اطمینان از مقادیر معتبر لت و لانگ
        const validLocations = filteredData.filter(location => {
            const latitude = parseFloat(location.latitude);
            const longitude = parseFloat(location.longitude);
            return !isNaN(latitude) && !isNaN(longitude);
        });
        if (validLocations.length > 0) {
            const bounds = L.latLngBounds(validLocations.map(location => [location.latitude, location.longitude]));
            map.flyToBounds(bounds, { duration: 1.5 });
        }
    }
    
    if (window.Region_Boundary_Selected && typeof window.Region_Boundary_Selected.contains === 'function') {
        map.flyToBounds(window.Region_Boundary_Selected, { duration: 2, easeLinearity: 0.5 });
    }
}








document.getElementById('Reset_btn').addEventListener('click', function () {
    // Scroll sidebar to top
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn('Sidebar not found');
    }

    // Reset search input and dropdowns
    document.getElementById('searchInput').value = '';
    document.getElementById('Region').selectedIndex = 0;
    $('#Region').val(null).trigger('change');




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




    // Reset toggle buttons and counters
    Object.keys(companies).forEach(companyId => {
        const toggleElement = document.getElementById(companyId);
        const counterElement = document.getElementById(companies[companyId].counterId);
        if (toggleElement) {
            toggleElement.checked = false;
            toggleElement.dispatchEvent(new Event('change')); // Triggers the toggle change logic
        }
        if (counterElement) {
            counterElement.innerHTML = '(0)';
        }
    });
    document.getElementById('googleBusinessManager').checked = false;
    document.getElementById('googleBusinessManager').dispatchEvent(new Event('change'));
    document.getElementById('counter_google').innerHTML = `(0)`;


    // Reset search results panel
    const searchResults = document.getElementById('searchResults');
    if (searchResults.style.right === '3%') {
        searchResults.style.right = '-40%';
        document.getElementById('half-circle-button-searchResults').innerHTML = '<i class="fas fa-chevron-left"></i>';
    }



    // Reset map view
    map.flyTo([53.719009658267055, -3.0252257374101705], 7, {
        animate: true,
        duration: 1
    });
});





// for open searchResults panel
document.getElementById('searchButton').addEventListener('click', function() {
    if (document.getElementById('searchResults').style.right == '-40%') {
        setTimeout(() => {
            document.getElementById('searchResults').style.right = '3%';
            document.getElementById('half-circle-button-searchResults').innerHTML = '<i class="fas fa-chevron-right"></i>';
        }, 3000);
    }
});