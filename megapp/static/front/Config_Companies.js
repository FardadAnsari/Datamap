    const companies = {
        justeat: {
            icon: "",
            name: "JustEat",
            color: "#ff8000",
            layer: L.markerClusterGroup(),
            resultClass: "justeat_li",
            counterId: "counter_justeat",
            apiUrl: API_URL_JUSTEAT,
            useToken: true,
            useCache: true,
            cacheKey: 'justeatCache',
            getPopupContent: GetPopup_JustEat,
            getResultItemContent: getResultItemContent_JustEat,
            searchKeys: ["shop_name", "cuisines", "address", "city", "area", "postcode"],
            data: []
        },
        foodhub: {
            icon: "",
            name: "FoodHub",
            color: "#cc171b",
            layer: L.markerClusterGroup(),
            resultClass: "Foodhub_li",
            counterId: "counter_foodhub",
            apiUrl: API_URL_FOODHUB,
            useToken: true,
            useCache: true,
            cacheKey: 'foodhubCache',
            getPopupContent: GetPopup_FoodHub,
            getResultItemContent: getResultItemContent_FoodHub,
            searchKeys: ["shop_name", "cuisines", "city", "town", "phone", "postcode"],
            data: []
        },
        ubereats: {
            icon: "",
            name: "Uber Eats",
            color: "#0bab0b",
            layer: L.markerClusterGroup(),
            resultClass: "uber_li",
            counterId: "counter_ubereats",
            apiUrl: API_URL_UBEREATS,
            useToken: true,
            useCache: true,
            cacheKey: 'ubereatsCache',
            getPopupContent: GetPopup_Uber,
            getResultItemContent: getResultItemContent_Uber,
            searchKeys: ["shop_name", "country", "region", "city_slug", "city", "postcode", "phone", "cuisines"],
            data: []
        },
        whatthefork: {
            icon: "",
            name: "WhatTheFork",
            color: "#f7d205",
            layer: L.markerClusterGroup(),
            resultClass: "whatthefork_li",
            counterId: "counter_whatthefork",
            apiUrl: API_URL_WHATTHEFORK,
            useToken: true,
            useCache: true,
            cacheKey: 'whattheforkCache',
            getPopupContent: GetPopup_WhatTheFork,
            getResultItemContent: getResultItemContent_WhatTheFork,
            searchKeys: ["shop_name", "region", "city", "postcode", "phone", "cuisines"],
            data: []
        },
        foodhouse: {
            icon: "",
            name: "foodhouse",
            color: "#c2008e",
            layer: L.markerClusterGroup(),
            resultClass: "foodhouse_li",
            counterId: "counter_foodhouse",
            apiUrl: API_URL_FOODHOUSE,
            useToken: true,
            useCache: true,
            cacheKey: 'foodhouseCache',
            getPopupContent: GetPopup_foodhouse,
            getResultItemContent: getResultItemContent_foodhouse,
            searchKeys: ["shop_name", "cuisines", "address", "phone", "postcode"],
            data: []
        },
        menulist: {
            icon: "",
            name: "MenuList",
            color: "#7f9741",
            layer: L.markerClusterGroup(),
            resultClass: "menulist_li",
            counterId: "counter_menulist",
            apiUrl: API_URL_MENULIST,
            useToken: true,
            useCache: true,
            cacheKey: 'menulistCache',
            getPopupContent: GetPopup_MenuList,
            getResultItemContent: getResultItemContent_Menulist,
            searchKeys: ["shop_name", "cuisines", "address", "city", "phone"],
            data: []
        },
        scoffable: {
            icon: "",
            name: "scoffable",
            color: "#e7131a",
            layer: L.markerClusterGroup(),
            resultClass: "scoffable_li",
            counterId: "counter_scoffable",
            apiUrl: API_URL_SCOFFABLE,
            useToken: true,
            useCache: true,
            cacheKey: 'scoffableCache',
            getPopupContent: GetPopup_scoffable,
            getResultItemContent: getResultItemContent_scoffable,
            searchKeys: ["shop_name", "cuisines", "address", "phone", "postcode"],
            data: []
        },
        mealzo: {
            icon: "",
            name: "mealzo",
            color: "#e9540d",
            layer: L.markerClusterGroup(),
            resultClass: "mealzo_li",
            counterId: "counter_mealzo",
            apiUrl: API_URL_MEALZO,
            useToken: false,
            useCache: false,
            cacheKey: 'mealzoCache',
            getPopupContent: GetPopup_mealzo,
            getResultItemContent: getResultItemContent_mealzo,
            searchKeys: ["Account_Number", "Last_Caller.name", "Billing_Code", "Account_Name", "Phone", "Website", "Rating"],
            data: []
        },
        deliveroo: {
            icon: "",
            name: "deliveroo",
            color: "#00a396",
            layer: L.markerClusterGroup(),
            resultClass: "deliveroo_li",
            counterId: "counter_deliveroo",
            apiUrl: API_URL_DELIVEROO,
            useToken: true,
            useCache: true,
            cacheKey: 'deliverooCache',
            getPopupContent: GetPopup_Deliveroo,
            getResultItemContent: getResultItemContent_Deliveroo,
            searchKeys: ["shop_name", "cuisines", "city", "address", "phone", "postcode"],
            data: []
        },
        straightfrom: {
            icon: "",
            name: "Straightfrom",
            color: "#d92d79",
            layer: L.markerClusterGroup(),
            resultClass: "straightfrom_li",
            counterId: "counter_straightfrom",
            apiUrl: API_URL_STRAIGHTFROM,
            useToken: true,
            useCache: true,
            cacheKey: 'straightfromCache',
            getPopupContent: GetPopup_Straightfrom,
            getResultItemContent: getResultItemContent_Straightfrom,
            searchKeys: ["shop_name", "cuisines", "region", "city", "street", "phone", "postcode"],
            data: []
        },
        kuick: {
            icon: "",
            name: "Kuick",
            color: "#d53238",
            layer: L.markerClusterGroup(),
            resultClass: "kuick_li",
            counterId: "counter_kuick",
            apiUrl: API_URL_KUICK,
            useToken: true,
            useCache: true,
            cacheKey: 'kuickCache',
            getPopupContent: GetPopup_kuick,
            getResultItemContent: getResultItemContent_kuick,
            searchKeys: ["shop_name", "cuisines", "city", "address", "address", "phone", "postcode", "seo_name", "keywords"],
            data: []
        },
        googleBusinessManager: {
            icon: "",
            name: "GoogleBusinessManager",
            color: "#3f82f9",
            layer: L.markerClusterGroup(),
            resultClass: "GBM_li",
            counterId: "counter_google",
            apiUrl: API_URL_GOOGLEBUSINESS,
            useToken: false,
            useCache: false,
            cacheKey: 'GoogleBusinessCache',
            getPopupContent: GetPopup_GBM,
            getResultItemContent: getResultItemContent_GBM,
            searchKeys: ["name", "title", "phoneNumbers.primaryPhone", "storefrontAddress.postalCode", "storefrontAddress.locality", "storefrontAddress.addressLines"],
            data: []
        }
    };
    



    // Initialize 'icon' for each company
    for (const [company, data] of Object.entries(companies)) {
        // مقداردهی آیکون برای هر شرکت
        data.icon = createCompanyIcon(data.color);
        
        // استفاده از نام شرکت به جای شیء data برای شناسایی عنصر
        const iconElement = document.getElementById(`${company}_icon`);
        if (iconElement) {
            iconElement.src = generateSVG_Marker(data.color);  // تخصیص URL معتبر برای src
        }
    }







    // Function to generate the SVG marker based on company color
    function generateSVG_Marker(color) {
        const customSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 50 50">
                <path fill="${color}" d="M25 2C13.56 2 6.25 14.21 11.67 24.29l12.45 23.18c.38.71 1.38.71 1.76 0l12.45-23.18c1.25-2.33 1.82-4.77 1.82-7.15C40.15 9.22 33.8 2 25 2zm-1.52 21.31c-2.42-.54-4.38-2.49-4.92-4.92a6.62 6.62 0 0 1 7.96-7.94c2.42.54 4.38 2.5 4.92 4.92 1.07 4.82-3.13 9.01-7.96 7.94z"/>
            </svg>
        `;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(customSVG)}`;
    }
    // Function to create the company icon
    function createCompanyIcon(companyColor) {
        return L.icon({
            iconUrl: generateSVG_Marker(companyColor),
            // iconSize: [35, 35],  // size of the icon
            // iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            // popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
            // shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            // shadowSize: [35, 35] // size of the shadow
        });
    }