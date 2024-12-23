// Add a change event listener to each toggle element matching the company keys in the Config_Companies.js
Object.keys(companies).forEach(companyId => {
    // Skip "GoogleBusinessManager"
    if (companyId === 'googleBusinessManager') {
        console.log(`Skipping toggle setup for ${companyId}`);
        return; // Skip this iteration
    }

    
    const toggleElement = document.getElementById(companyId);
    if (toggleElement) {
        toggleElement.addEventListener('change', () => handleToggleChange(companyId));
    } else {
        console.warn(`Toggle element not found for id: ${companyId}`);
    }
});





async function handleToggleChange(companyId) {
    const isChecked = document.getElementById(companyId).checked;
    const company = companies[companyId];

    if (!company) {
        console.error(`Company configuration not found for id: ${companyId}`);
        return;
    }

    if (isChecked) {
        console.log(`Fetching data for ${company.name}...`);

        // If data already exists, directly show them
        if (company.data && company.data.length > 0) {
            console.log(`Using existing data for ${company.name}...`);
            addMarkers(company.data, company);
            return;
        }

        try {
            // Fetch and cache data using fetchAndCacheData function
            const data = await fetchAndCacheData(company);

            // Now that we have the data (either from cache or API), add markers
            company.data = data; // Store data in the company configuration
            addMarkers(data, company);
        } catch (error) {
            console.error(`Error in fetching data for ${company.name}:`, error);
        }
    } else {
        console.log(`Clearing markers for ${company.name}...`);
        map.removeLayer(company.layer); // Remove layer from the map
        company.layer.clearLayers();   // Clear the markers

        // Remove the results from the UI
        document.querySelectorAll(`.${company.resultClass}`).forEach(element => {
            element.remove();
        });
    }
}
