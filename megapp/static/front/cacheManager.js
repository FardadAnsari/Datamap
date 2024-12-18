async function checkCache(cacheName, apiUrl) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(apiUrl);

        if (cachedResponse) {
            console.log(`Cached data found for ${apiUrl}.`);
            return await cachedResponse.json();
        }
        console.log(`No cached data for ${apiUrl}.`);
        return null; // اگر داده‌ای در کش نبود
    } catch (error) {
        console.error(`Error checking cache for ${apiUrl}:`, error);
        throw error;
    }
}



async function saveToCache(cacheName, apiUrl, data) {
    try {
        const cache = await caches.open(cacheName);
        const responseToCache = new Response(JSON.stringify(data));
        await cache.put(apiUrl, responseToCache);
        console.log(`Data cached successfully for ${apiUrl}.`);
    } catch (error) {
        console.error(`Error saving data to cache for ${apiUrl}:`, error);
        throw error;
    }
}
