function GetPopup_JustEat(location) {
    let cuisines;
    if (location.cuisines) {
        cuisines = cleanCuisines(location.cuisines);
    } else {
        cuisines = "None";
    }
    const popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.justeat.color}; margin-left: 3px; font-size: x-small;">${companies.justeat.name}</lable></h3>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.shop_id}</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-Weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.city && location.city !== 'None' ? location.city : "",
                            location.area && location.area !== 'None' ? location.area : "",
                            location.address && location.address !== 'None' ? location.address : ""
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode || 'None'}</span>
                </li>
                <li style="opacity: 0.5;">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>None</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${cuisines && cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${cuisines || 'None'}</span>
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_JustEat(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.justeat.color}; margin-left: 3px; font-size: x-small;">${companies.justeat.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}




function GetPopup_FoodHub(location) {
    const popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.foodhub.color}; margin-left: 3px; font-size: x-small;">${companies.foodhub.name}</lable></h3>
            <p style="font-size: x-small; color: #333;">
                ${location.description || 'None'}
            </p>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.shop_id}</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.region && location.region !== 'None' ? location.region : "",
                            location.city && location.city !== 'None' ? location.city : "",
                            location.town && location.town !== 'None' ? location.town : "",
                            location.street && location.street !== 'None' ? location.street : "",
                            location.number && location.number !== 'None' ? location.number : ""
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.host && location.host !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">host:</span>
                    <span>${location.host || 'None'}</span>
                </li>
                <li style="opacity: ${location.delivery_time && location.delivery_time !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-truck"></i>
                    <span style="font-weight: bold;">Delivery Time:</span>
                    <span>${location.delivery_time || 'None'}</span>
                </li>
                <li style="opacity: ${location.collection_time && location.collection_time !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-clock"></i>
                    <span style="font-weight: bold;">Collection Time:</span>
                    <span>${location.collection_time || 'None'}</span>
                </li>
                <li style="opacity: ${location.title && location.title !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-info-circle"></i>
                    <span style="font-weight: bold;">Title:</span>
                    <span>${location.title || 'None'}</span>
                </li>
                <li style="opacity: ${location.keywords && location.keywords !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-key"></i>
                    <span style="font-weight: bold;">Keywords:</span>
                    <span>${location.keywords || 'None'}</span>
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_FoodHub(location) {
    return  `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.foodhub.color}; margin-left: 3px; font-size: x-small;">${companies.foodhub.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}





function GetPopup_Uber(location) {
    // Start building the popup content
    let popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.ubereats.color}; margin-left: 3px; font-size: x-small;">${companies.ubereats.name}</lable></h3>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.shop_id}</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-Weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.country && location.country !== 'None' ? location.country : "",
                            location.region && location.region !== 'None' ? location.region : "",
                            location.city_slug && location.city_slug !== 'None' ? location.city_slug : "",
                            location.city && location.city !== 'None' ? location.city : "",
                            location.street_address && location.street_address !== 'None' ? location.street_address : "",
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode || 'None'}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_Uber(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.ubereats.color}; margin-left: 3px; font-size: x-small;">${companies.ubereats.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}





function GetPopup_WhatTheFork(location) {
    // Start building the popup content
    let popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.whatthefork.color}; margin-left: 3px; font-size: x-small;">${companies.whatthefork.name}</lable></h3>
            <p style="font-size: x-small; color: #333;">
                ${location.about_text}
            </p>
            <hr>
            <ul>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-Weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.region && location.region !== 'None' ? location.region : "",
                            location.city && location.city !== 'None' ? location.city : "",
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode || 'None'}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.categories ? '1' : '0.5'};">
                    <i class="fas fa-tags"></i>
                    <span style="font-weight: bold;">Categories:</span>
                    <span>${location.categories || 'No categories available'}</span>
                </li>
                <li style="opacity: ${location.url_map ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">Map:</span>
                    ${location.url_map ? `<a href="${location.url_map}" target="_blank">Google Maps</a>` : 'No map available'}
                </li>
                <li style="opacity: ${location.email ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Email:</span>
                    <span>${location.email || 'No email available'}</span>
                </li>
                <li style="opacity: ${(location.instagram_url || location.facebook_url) ? '1' : '0.5'};">
                    <i class="fas fa-globe"></i>
                    <span style="font-weight: bold;">Social Media:</span>
                    ${location.instagram_url ? `<a href="${location.instagram_url}" target="_blank">Instagram</a>` : 'None'}
                    ${location.facebook_url ? `<a href="${location.facebook_url}" target="_blank">Facebook</a>` : 'None'}
                </li>
                <li style="opacity: ${(location.google_play_link || location.app_store_link) ? '1' : '0.5'};">
                    <i class="fas fa-mobile-alt"></i>
                    <span style="font-weight: bold;">Apps:</span>
                    ${location.google_play_link ? `<a href="${location.google_play_link}" target="_blank">Google Play</a>` : 'None'}
                    ${location.app_store_link ? `<a href="${location.app_store_link}" target="_blank">App Store</a>` : 'None'}
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_WhatTheFork(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.whatthefork.color}; margin-left: 3px; font-size: x-small;">${companies.whatthefork.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}





function GetPopup_foodhouse(location) {
    const appsLinks = location.apps && location.apps !== 'None'
        ? location.apps.split(',').map(app => `<a href="${app.trim()}" target="_blank">Download</a>`).join(" | ")
        : 'No app links available';

    const socialMediaLinks = location.social_media && location.social_media !== 'None'
        ? location.social_media.split(',').map(link => `<a href="${link.trim()}" target="_blank">Social Media</a>`).join(" | ")
        : 'No social media links available';

    return `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.foodhouse.color}; margin-left: 3px; font-size: x-small;">${companies.foodhouse.name}</lable></h3>
            <hr>
            <ul>
                <li style="opacity: 0.5;">
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>None</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.address && location.address !== 'None' ? location.address : ""
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode || 'None'}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">phone:</span>
                    <span>${location.phone}</span>
                </li>
                <li style="opacity: 0.5;">
                    <i class="fas fa-star"></i>
                    <span style="font-Weight: bold;">Rating:</span>
                    <span>None</span>
                </li>
                <li style="opacity: 0.5;">
                <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>None</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.website && location.website !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">Website:</span>
                    <a href="${location.website && location.website !== 'None' ? location.website : '#'}" target="_blank">
                        ${location.website && location.website !== 'None' ? location.website.replace(/^https?:\/\//, '') : 'No website available'}
                    </a>
                </li>
                <li style="opacity: ${location.social_media && location.social_media !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-globe"></i>
                    <span style="font-weight: bold;">Social Media:</span>
                    ${socialMediaLinks}
                </li>
                <li style="opacity: ${location.apps && location.apps !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-mobile-alt"></i>
                    <span style="font-weight: bold;">Apps:</span>
                    ${appsLinks}
                </li>
                <li style="opacity: ${location.map_url && location.map_url !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-map"></i>
                    <span style="font-weight: bold;">Map:</span>
                    <a href="${location.map_url}" target="_blank">View Google Maps</a>
                </li>
            </ul>
        </div>
    `;
}
function getResultItemContent_foodhouse(location) {
    return  `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.foodhouse.color}; margin-left: 3px; font-size: x-small;">${companies.foodhouse.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
    `;
}






function GetPopup_MenuList(location) {
    let cuisines;
    if (location.cuisines) {
        cuisines = cleanCuisines(location.cuisines);
    } else {
        cuisines = "None";
    }

    const socialMediaLinks = location.social_media && location.social_media !== 'None'
    ? location.social_media.split(',').map(link => `<a href="${link.trim()}" target="_blank">Social Media</a>`).join(" | ")
    : 'No social media links available';

    const popupContent = `
    <div class="popup-container">
        <h3>${location.shop_name} <lable style="color: ${companies.menulist.color}; margin-left: 3px; font-size: x-small;">${companies.menulist.name}</lable></h3>
        <p style="font-size: x-small; color: #333;">
            ${location.description || 'None'}
        </p>
        <hr>
        <ul>
            <li>
                <i class="fa fa-fingerprint"></i>
                <span style="font-weight: bold;">ID:</span>
                <span>${location.shop_id}</span>
            </li>
            <li>
                <i class="fas fa-map-marker-alt"></i>
                <span style="font-Weight: bold;">Address:</span>
                <span>
                    ${[
                        location.city && location.city !== 'None' ? location.city : "",
                        location.address && location.address !== 'None' ? location.address : ""
                    ].filter(Boolean).join(", ")}
                </span>
            </li>
            <li style="opacity: 0.5;">
                <i class="fas fa-envelope"></i>
                <span style="font-weight: bold;">Postcode:</span>
                <span>None</span>
            </li>
            <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                <i class="fas fa-phone"></i>
                <span style="font-weight: bold;">Phone:</span>
                <span>${location.phone || 'None'}</span>
            </li>
            <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                <i class="fas fa-star"></i>
                <span style="font-weight: bold;">Rating:</span>
                <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
            </li>
            <li style="opacity: ${cuisines && cuisines !== 'None' ? '1' : '0.5'};">
                <i class="fas fa-utensils"></i>
                <span style="font-weight: bold;">Cuisines:</span>
                <span>${cuisines || 'None'}</span>
            </li>

            <hr style="color: rgb(0 0 0 / 50%);">

            <li style="opacity: ${location.url && location.url !== 'None' ? '1' : '0.5'};">
                <i class="fas fa-link"></i>
                <span style="font-weight: bold;">url:</span>
                ${location.url ? `<a href="${location.url}" target="_blank">menulist.menu</a>` : 'None'}
            </li>
            <li style="opacity: ${location.website && location.website !== 'None' ? '1' : '0.5'};">
                <i class="fas fa-link"></i>
                <span style="font-weight: bold;">website:</span>
                <span>${location.website || 'None'}</span>
            </li>
            <li style="opacity: ${location.social_media && location.social_media !== 'None' ? '1' : '0.5'};">
                <i class="fas fa-globe"></i>
                <span style="font-weight: bold;">Social Media:</span>
                ${socialMediaLinks}
            </li>
        </ul>
    </div>
`;
    return popupContent;
}
function getResultItemContent_Menulist(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.menulist.color}; margin-left: 3px; font-size: x-small;">${companies.menulist.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}






function GetPopup_scoffable(location) {
    const popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.scoffable.color}; margin-left: 3px; font-size: x-small;">${companies.scoffable.name}</lable></h3>
            <p style="font-size: x-small; color: #333;">
                ${location.description || 'None'}
            </p>
            <hr>
            <ul>
                <li style="opacity: 0.5;">
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>None</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-Weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.city && location.city !== 'None' ? location.city : "",
                            location.street && location.street !== 'None' ? location.street : ""
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode || 'None'}</span>
                </li>
                <li style="opacity: 0.5;">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>None</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.url && location.url !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">url:</span>
                    ${location.url ? `<a href="${location.url}" target="_blank">scoffable.com</a>` : 'None'}
                </li>

                <li style="opacity: ${location.title && location.title !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-info-circle"></i>
                    <span style="font-weight: bold;">Title:</span>
                    <span>${location.title || 'None'}</span>
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_scoffable(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.scoffable.color}; margin-left: 3px; font-size: x-small;">${companies.scoffable.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}







function GetPopup_mealzo(location) {
    return `
        <div class="popup-container">
            <h3>${location.Account_Name || 'None'} <lable style="color: ${companies.mealzo.color}; margin-left: 3px; font-size: x-small;">${companies.mealzo.name}</lable></h3>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.id || 'None'}</span>
                </li>
                <li style="opacity: 0.5;">
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-weight: bold;">Address:</span>
                    <span>None</span>
                </li>
                <li style="opacity: ${location.Billing_Code ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.Billing_Code || 'None'}</span>
                </li>
                <li style="opacity: ${location.Phone ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.Phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.Rating && location.Rating !== 'Not Installed' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.Rating || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.Account_Number ? '1' : '0.5'};">
                    <i class="fas fa-key"></i>
                    <span style="font-weight: bold;">Account Number:</span>
                    <span>${location.Account_Number || 'None'}</span>
                </li>
                <li style="opacity: ${location.Installation_date ? '1' : '0.5'};">
                    <i class="fas fa-calendar-alt"></i>
                    <span style="font-weight: bold;">Installation Date:</span>
                    <span>${location.Installation_date || 'None'}</span>
                </li>
                <li style="opacity: ${location.Package ? '1' : '0.5'};">
                    <i class="fas fa-box"></i>
                    <span style="font-weight: bold;">Package:</span>
                    <span>${location.Package || 'None'}</span>
                </li>
                <li style="opacity: ${location.GB_Status ? '1' : '0.5'};">
                    <i class="fas fa-check-circle"></i>
                    <span style="font-weight: bold;">GB Status:</span>
                    <span>${location.GB_Status || 'None'}</span>
                </li>
                <li style="opacity: ${location.IOS_App_Link ? '1' : '0.5'};">
                    <i class="fas fa-apple"></i>
                    <span style="font-weight: bold;">iOS App Link:</span>
                    <span>${location.IOS_App_Link ? `<a href="${location.IOS_App_Link}" target="_blank">Download</a>` : 'None'}</span>
                </li>
                <li style="opacity: ${location.Customer_Data_Base ? '1' : '0.5'};">
                    <i class="fas fa-database"></i>
                    <span style="font-weight: bold;">Customer Data Base:</span>
                    <span>${location.Customer_Data_Base || 'None'}</span>
                </li>
                <li style="opacity: ${location.Social_Responsible ? '1' : '0.5'};">
                    <i class="fas fa-user"></i>
                    <span style="font-weight: bold;">Social Responsible:</span>
                    <span>${location.Social_Responsible ? location.Social_Responsible.name : 'None'}</span>
                </li>
                <li style="opacity: ${location.Last_Caller ? '1' : '0.5'};">
                    <i class="fas fa-user-check"></i>
                    <span style="font-weight: bold;">Last Caller:</span>
                    <span>${location.Last_Caller ? location.Last_Caller.name : 'None'}</span>
                </li>
                <li>
                    <i class="fas fa-check-circle"></i>
                    <span style="font-weight: bold; color: ${location.View_in_Mealzo ? 'green' : 'red'};">View in Mealzo:</span>
                    <span style="color: ${location.View_in_Mealzo ? 'green' : 'red'};">${location.View_in_Mealzo ? 'Yes' : 'No'}</span>
                </li>
                <li>
                    <i class="fas fa-check-circle"></i>
                    <span style="font-weight: bold; color: ${location.APOS ? 'green' : 'red'};">APOS:</span>
                    <span style="color: ${location.APOS ? 'green' : 'red'};">${location.APOS ? 'Yes' : 'No'}</span>
                </li>
                <li>
                    <i class="fas fa-truck"></i>
                    <span style="font-weight: bold; color: ${location.Delivery_Bag ? 'green' : 'red'};">Delivery Bag:</span>
                    <span style="color: ${location.Delivery_Bag ? 'green' : 'red'};">${location.Delivery_Bag ? 'Yes' : 'No'}</span>
                </li>
                <li>
                    <i class="fas fa-check-circle"></i>
                    <span style="font-weight: bold; color: ${location.Self_Ordering_Kiosk ? 'green' : 'red'};">Self Ordering Kiosk:</span>
                    <span style="color: ${location.Self_Ordering_Kiosk ? 'green' : 'red'};">${location.Self_Ordering_Kiosk ? 'Yes' : 'No'}</span>
                </li>
                <li>
                    <i class="fas fa-check-circle"></i>
                    <span style="font-weight: bold; color: ${location.Booking ? 'green' : 'red'};">Booking:</span>
                    <span style="color: ${location.Booking ? 'green' : 'red'};">${location.Booking ? 'Yes' : 'No'}</span>
                </li>
            </ul>
        </div>
    `;
}
function getResultItemContent_mealzo(location) {
    return `
        <strong>${location.Account_Name}</strong> <lable style="color: ${companies.mealzo.color}; margin-left: 3px; font-size: x-small;">${companies.mealzo.name}</lable>
        <br>
        <span style="font-size: x-small;">${location.Rating}</span>
    `;
}









function GetPopup_Deliveroo(location) {
    const popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.deliveroo.color}; margin-left: 3px; font-size: x-small;">${companies.deliveroo.name}</lable></h3>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.shop_id}</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-Weight: bold;">Address:</span>
                    <span>${location.address && location.address !== 'None' ? location.address : ""}</span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode || 'None'}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.url && location.url !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">url:</span>
                    ${location.url ? `<a href="https://deliveroo.co.uk${location.url}" target="_blank">deliveroo.co.uk</a>` : 'None'}
                </li>
                <li style="opacity: ${location.map_url ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">Map:</span>
                    ${location.map_url ? `<a href="${location.map_url}" target="_blank">Google Maps</a>` : 'No map available'}
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_Deliveroo(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.deliveroo.color}; margin-left: 3px; font-size: x-small;">${companies.deliveroo.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}






function GetPopup_Straightfrom(location) {
    const popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.straightfrom.color}; margin-left: 3px; font-size: x-small;">${companies.straightfrom.name}</lable></h3>
            <p style="font-size: x-small; color: #333;">
                ${location.description || 'None'}
            </p>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.shop_id}</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.country && location.country !== 'None' ? location.country : "",
                            location.region && location.region !== 'None' ? location.region : "",
                            location.city && location.city !== 'None' ? location.city : "",
                            location.street && location.street !== 'None' ? location.street : ""
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.created_at && location.created_at !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-clock"></i>
                    <span style="font-weight: bold;">Created at:</span>
                    <span>
                        ${location.created_at && location.created_at !== 'None' 
                            ? new Date(location.created_at * 1000).toLocaleString('en-GB') 
                            : 'None'}
                    </span>
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_Straightfrom(location) {
    return  `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.straightfrom.color}; margin-left: 3px; font-size: x-small;">${companies.straightfrom.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}





function GetPopup_kuick(location) {
    const appsLinks = location.apps && location.apps !== 'None'
    ? location.apps.split(',').map(app => `<a href="${app.trim()}" target="_blank">Download</a>`).join(" | ")
    : 'No app links available';

    const popupContent = `
        <div class="popup-container">
            <h3>${location.shop_name} <lable style="color: ${companies.kuick.color}; margin-left: 3px; font-size: x-small;">${companies.kuick.name}</lable></h3>
            <p style="font-size: x-small; color: #333;">
                ${location.description || 'None'}
            </p>
            <hr>
            <ul>
                <li>
                    <i class="fa fa-fingerprint"></i>
                    <span style="font-weight: bold;">ID:</span>
                    <span>${location.shop_id}</span>
                </li>
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span style="font-weight: bold;">Address:</span>
                    <span>
                        ${[
                            location.country && location.country !== 'None' ? location.country : "",
                            location.city && location.city !== 'None' ? location.city : "",
                            location.address && location.address !== 'None' ? location.address : ""
                        ].filter(Boolean).join(", ")}
                    </span>
                </li>
                <li style="opacity: ${location.postcode && location.postcode !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-envelope"></i>
                    <span style="font-weight: bold;">Postcode:</span>
                    <span>${location.postcode}</span>
                </li>
                <li style="opacity: ${location.phone && location.phone !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-phone"></i>
                    <span style="font-weight: bold;">Phone:</span>
                    <span>${location.phone || 'None'}</span>
                </li>
                <li style="opacity: ${location.rating !== 'None' && location.total_reviews !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-star"></i>
                    <span style="font-weight: bold;">Rating:</span>
                    <span>${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
                </li>
                <li style="opacity: ${location.cuisines && location.cuisines !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-utensils"></i>
                    <span style="font-weight: bold;">Cuisines:</span>
                    <span>${location.cuisines || 'None'}</span>
                </li>

                <hr style="color: rgb(0 0 0 / 50%);">

                <li style="opacity: ${location.website && location.website !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-link"></i>
                    <span style="font-weight: bold;">website:</span>
                    <span>${location.website || 'None'}</span>
                </li>
                <li style="opacity: ${location.apps && location.apps !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-mobile-alt"></i>
                    <span style="font-weight: bold;">Apps:</span>
                    ${appsLinks}
                </li>
                <li style="opacity: ${location.seo_name && location.seo_name !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-key"></i>
                    <span style="font-weight: bold;">Seo Name:</span>
                    <span>${location.seo_name || 'None'}</span>
                </li>
                <li style="opacity: ${location.keywords && location.keywords !== 'None' ? '1' : '0.5'};">
                    <i class="fas fa-key"></i>
                    <span style="font-weight: bold;">Keywords:</span>
                    <span>${location.keywords || 'None'}</span>
                </li>
            </ul>
        </div>
    `;
    return popupContent;
}
function getResultItemContent_kuick(location) {
    return `
        <strong>${location.shop_name}</strong> <lable style="color: ${companies.kuick.color}; margin-left: 3px; font-size: x-small;">${companies.kuick.name}</lable>
        <br>
        <span style="font-weight: 100;">${location.postcode || 'None'}</span>
        <br>
        <span style="font-size: x-small;">${location.rating || 'None'} (${location.total_reviews || 'None'} reviews)</span>
    `;
}






function cleanCuisines(cuisines) {
    const unwantedTags = ["50% off", "Deals", "Convenience", '*NEW*', 'Cheeky Tuesd', '40% off or more', 'Local Legends', 'Freebie', 'Low Delivery Fee', 'Low Deliver', 'Cheek', 'Low Deliv', 'Freeb', 'Household', 'Cheeky', 'Cheeky Tues', 'Freebies', 'Dea', 'Collect stamps', 'Freebi', 'Flowers', 'Smoke House', 'Shops',  'Deli', 'Gifts', 'Low', 'Business Lunch', '*Nottingham Loves*', 'All Night Alcohol', 'Subways', 'Low Delivery Fe', 'Ch', '50% off', 'Free', 'Cheeky Tuesda'];
    const itemsArray = cuisines.split(',').map(item => item.trim());
    const filteredItems = itemsArray.filter(item => !unwantedTags.includes(item));
    return filteredItems.join(', ');
}