// Define an async function to handle the API request
async function fetchData() {
  try {
    // Make an asynchronous fetch request to a sample API
    const response = await fetch('http://localhost:8000/api/foodhouse/?fields=name,latitude,longitude');

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the received data
    console.log(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

// Call the async function
fetchData();
