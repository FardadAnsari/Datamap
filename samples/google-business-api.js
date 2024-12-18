// First API request
fetch('https://takeawaytracker.mealzo.co.uk/account/')
  .then(response => response.json())
  .then(data => {
    // Iterate over the accounts and extract the digits after 'accounts/'
    data.accounts.forEach(account => {
      const accountId = account.name.split('/')[1];  // Extract the digits after 'accounts/'

      // Second API request using the extracted accountId
      fetch(`https://takeawaytracker.mealzo.co.uk/business-info/${accountId}`)
        .then(response => response.json())
        .then(secondApiData => {
          // Handle the data from the second API
          console.log(`Data for Account ID ${accountId}:`, secondApiData);
        })
        .catch(error => {
          console.error('Error in second API request:', error);
        });
    });
  })
  .catch(error => {
    console.error('Error in first API request:', error);
  });
