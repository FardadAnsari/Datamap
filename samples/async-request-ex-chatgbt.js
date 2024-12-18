// Select the button and the element by their IDs
let myButton = document.getElementById('myButton');
let myElement = document.getElementById('myElement');

// Define an async function to fetch data from an API
async function fetchData() {
    try {
        // Send a GET request to a hypothetical API and wait for the response
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

        // Convert the response into JSON format and wait for it to complete
        #let data = await response.json();

        // Update the element with the API data
        myElement.textContent = `Title: ${data.title}`;
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        myElement.textContent = 'Failed to fetch data';
    }
}

// Add a click event listener to the button to trigger the fetchData function
myButton.addEventListener('click', fetchData);