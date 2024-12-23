window.addEventListener("unload", () => {
    // Clear Local Storage
    //localStorage.clear();

    // Clear Session Storage
    sessionStorage.clear();

    // Clear Cookies
    document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Clear Service Worker Cache
    if ('caches' in window) {
        caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => caches.delete(cacheName));
        });
    }

    // Unregister Service Workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
        });
    }

    console.log("All cache and stored data cleared on tab close!");
});
