const username = localStorage.getItem('username');  // Get username from localStorage
const password = localStorage.getItem('password');  // Get password from localStorage

// Function to get token from a specified URL
function getToken(username, password, url) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Sending username and password
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to get token');
        }
        return response.json();
    })
    .then(data => {
        return data.access; // Assuming the token is returned in the response
    });
}

async function storeToken(username, password, url, storageKey) {
    try {
        const token = await getToken(username, password, url);
        localStorage.setItem(storageKey, token);
    } catch (error) {
        console.error('Error retrieving or storing token:', error);
    }
}

storeToken(username, password, API_URL_TOKEN, 'token');