/**
 * Manages data fetching with caching functionality.
 * First checks the cache; if not found, fetches from server and caches the data.
 * 
 * @param {string} apiUrl - The API URL to fetch data from.
 * @param {string} cacheName - The name of the cache to use.
 * @param {string} company.name - A human-readable name for logging purposes.
 * @returns {Promise<any>} - The fetched or cached data.
 */


async function fetchAndCacheData(company) {
    try {
        // Step 1: Check cache
        console.log(`Checking cache for ${company.name}...`);
        if (company.useCache) {
            const cachedData = await checkCache(company.cacheKey, company.apiUrl);
            if (cachedData) {
                console.log(`Cache hit for ${company.name}. Returning cached data.`);
                return cachedData;
            }
        }


        // Step 2: Fetch data from server
        console.log(`Cache miss for ${company.name}. Fetching data from server...`);
        const data = await FetchData(company.apiUrl, company.name, company.useToken);

        if (data && Array.isArray(data)) {
            console.log(`Fetched valid data for ${company.name}. Saving to cache...`);

            // Step 3: Save data to cache
            if (company.useCuseCache) {
                await saveToCache(company.useToken, company.apiUrl, data);
                console.log(`Data successfully cached for ${company.name}.`);
            }
            return data;
        } else {
            throw new Error(`Invalid data format received from ${company.name}`);
        }
    } catch (error) {
        console.error(`Error in manageDataWithCache for ${company.name}:`, error);
        throw error;
    }
}
