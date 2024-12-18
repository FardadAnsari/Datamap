
    // Initialize the map
    var map = L.map('map').setView([0, 0], 2); // Set to world view

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define custom icons
    var customIcon = L.icon({
      iconUrl: 'https://example.com/path/to/icon.png', // replace with your icon URL
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41]
    });

    // Fetch data from the API
    fetch('https://yourapi.com/data')  // Replace with your API URL
      .then(response => response.json())
      .then(data => {
        // Loop through the data to create markers
        data.forEach(item => {
          var marker = L.marker([item.Latitude, item.Longitude], { icon: customIcon }).addTo(map);

          // Create the popup content
          var popupContent = `
            <strong>${item.name}</strong><br>
            Latitude: ${item.Latitude}<br>
            Longitude: ${item.Longitude}<br>
            <img src="https://example.com/path/to/icon.png" alt="icon" width="50" />
          `;

          marker.bindPopup(popupContent);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
