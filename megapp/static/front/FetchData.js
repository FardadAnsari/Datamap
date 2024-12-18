function FetchData(apiUrl, sourceName, useToken = true) {
    let headers = {};

    // If the company requires a token, add the Authorization header
    if (useToken) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error(`No token found in localStorage. Please log in to access ${sourceName}.`);
            return Promise.reject(new Error('Authentication token is missing.'));
        }
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                console.error(`Error fetching data from ${sourceName}:`, errData);
                throw new Error(`Failed to fetch data from ${sourceName}: ${errData.detail || 'Unknown error'}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(`Data fetched successfully from ${sourceName}:`);
        return data;
    })
    .catch(error => {
        console.error(`Error in FetchData for ${sourceName}:`, error);
        throw error;
    });
}
