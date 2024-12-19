window.addEventListener("unload", () => {
    // Clear Local Storage
    // localStorage.clear();

    // Clear Session Storage
    sessionStorage.clear();

    // Clear Cookies
    document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Clear Service Worker Cache
    if ("caches" in window) {
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
        });
    }

    // Unregister Service Workers
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            return Promise.all(registrations.map((registration) => registration.unregister()));
        });
    }

    // Clear IndexedDB
    if ("indexedDB" in window) {
        const dbsToDelete = indexedDB.databases ? indexedDB.databases() : Promise.resolve([]);
        dbsToDelete.then((dbs) => {
            dbs.forEach((db) => {
                indexedDB.deleteDatabase(db.name);
            });
        });
    }

    // Clear WebSQL Databases (Deprecated but still present in some browsers)
    // const dbsToClear = ["myDatabase1", "myDatabase2"]; // Replace with your database names if known
    // dbsToClear.forEach((dbName) => {
    //     try {
    //         const db = openDatabase(dbName, "1.0", "description", 1);
    //         db.transaction((tx) => {
    //             tx.executeSql("DROP TABLE IF EXISTS tableName"); // Replace `tableName` with actual table names
    //         });
    //     } catch (error) {
    //         console.error(`Error clearing WebSQL for ${dbName}:`, error);
    //     }
    // });

    // Log completion
    console.log("All cache, stored data, and website data cleared on tab close!");
});
