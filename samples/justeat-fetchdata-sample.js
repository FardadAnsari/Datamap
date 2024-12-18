


                    console.log('No cached data found');
                    // Fetch data from your API with the X-API-KEY header
                    fetch(apiUrl)
                        .then(response => {
                            console.log('Response received:', response);
                            const clonedResponse = response.clone();
                            return response.json().then(data => {
                                // Cache the cloned response for future use
                                cache.put(apiUrl, clonedResponse);
                                console.log('Data received:', data);
                                stored_data_justeat = data;
                                addMarkersforjusteat(data);
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });

