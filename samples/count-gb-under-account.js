// Sleep function that returns a promise
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to handle each account's API request with delay and collect all responses
async function fetchDataWithDelay(accounts) {
  const allBusinessInfo = [];  // Array to collect all responses

  for (const account of accounts) {
    const accountId = account.name.split('/')[1];  // Extract the digits after 'accounts/'

    // Make the second API request using the extracted accountId
    try {
      const response = await fetch(`https://takeawaytracker.mealzo.co.uk/business-info/${accountId}`);
      const businessInfo = await response.json();

      // Add the business info to the array
      allBusinessInfo.push({
        accountId: accountId,
        businessInfo: businessInfo
      });
    } catch (error) {
      console.error(`Error fetching business info for Account ID ${accountId}:`, error);
    }

    // Sleep for 2 seconds before the next request
    await sleep(2000);  // 2000ms = 2 seconds
  }

  // Add total count of objects in the final response
  const finalResponse = {
    totalAccounts: allBusinessInfo.length,  // Count the number of objects related to account IDs
    accountsData: allBusinessInfo           // All the business info data collected
  };

  return finalResponse;  // Return the final object containing total count and data
}

// First API request
fetch('https://takeawaytracker.mealzo.co.uk/account/')
  .then(response => response.json())
  .then(async data => {
    // Call the function with a delay for each account and gather all responses
    const allBusinessData = await fetchDataWithDelay(data.accounts);

    // Now you have all the business data with a count, you can log it or use it as needed
    console.log('Final Response with Total Accounts:', allBusinessData);

    // You can now use this `allBusinessData` in your application
  })
  .catch(error => {
    console.error('Error in first API request:', error);
  });
