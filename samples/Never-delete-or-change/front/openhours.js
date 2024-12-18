document.addEventListener("DOMContentLoaded", function() {
    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get location ID from the URL
    const locationId = getQueryParam('location_id');
    if (!locationId) {
        console.error('Location ID not found in URL');
        alert('Error: Location ID not found in URL. Please try again.');
        return;
    }

    console.log("Location ID:", locationId);

    // Function to show notifications
    function showNotification(message, title = "Thank You!", isSuccess = true) {
        const overlay = document.getElementById('notification-overlay');
        const notification = document.getElementById('custom-notification');
        const messageElement = document.getElementById('notification-message');
        const titleElement = document.getElementById('notification-title');
        const iconElement = document.querySelector('.notification-icon svg');

        messageElement.textContent = message;
        titleElement.textContent = title;
        iconElement.setAttribute('fill', isSuccess ? '#28a745' : '#dc3545');
        titleElement.textContent = isSuccess ? title : 'Error';

        overlay.style.display = 'block';
        notification.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        document.getElementById('notification-ok-button').addEventListener('click', function() {
            notification.classList.add('hidden');
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Set up the dashboard link
    const shopName = encodeURIComponent(document.querySelector('header h1').textContent.trim());
    const dashboardUrl = `/map_detail?shop_name=${shopName}`;
    document.getElementById('dashboard-link').href = dashboardUrl;

    // Handle status checkbox changes
    document.querySelectorAll('.status-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const day = this.id.split('-')[0];
            const statusLabel = document.querySelector(`label[for=${this.id}]`);
            const openHours = document.querySelectorAll(`#${day}-open-hour-1, #${day}-open-hour-2`);
            const openMinutes = document.querySelectorAll(`#${day}-open-minute-1, #${day}-open-minute-2`);
            const closeHours = document.querySelectorAll(`#${day}-close-hour-1, #${day}-close-hour-2`);
            const closeMinutes = document.querySelectorAll(`#${day}-close-minute-1, #${day}-close-minute-2`);

            const isOpen = this.checked;
            statusLabel.textContent = 'Edit';
            openHours.forEach(hour => hour.disabled = !isOpen);
            openMinutes.forEach(minute => minute.disabled = !isOpen);
            closeHours.forEach(hour => hour.disabled = !isOpen);
            closeMinutes.forEach(minute => minute.disabled = !isOpen);
        });
    });

    // Initialize the status checkboxes
    document.querySelectorAll('.status-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        const day = checkbox.id.split('-')[0];
        const statusLabel = document.querySelector(`label[for=${checkbox.id}]`);
        statusLabel.textContent = 'Edit';
        const openHours = document.querySelectorAll(`#${day}-open-hour-1, #${day}-open-hour-2`);
        const openMinutes = document.querySelectorAll(`#${day}-open-minute-1, #${day}-open-minute-2`);
        const closeHours = document.querySelectorAll(`#${day}-close-hour-1, #${day}-close-hour-2`);
        const closeMinutes = document.querySelectorAll(`#${day}-close-minute-1, #${day}-close-minute-2`);

        openHours.forEach(hour => hour.disabled = true);
        openMinutes.forEach(minute => minute.disabled = true);
        closeHours.forEach(hour => hour.disabled = true);
        closeMinutes.forEach(minute => minute.disabled = true);
    });

    // Declare the additionalPeriods array in the global scope
    let additionalPeriods = [];

    // Add event listeners to the Add buttons
    document.querySelectorAll(".add-button").forEach(function(button) {
        button.addEventListener("click", function() {
            const day = this.id.split('-')[2];
            const warningDiv = document.getElementById(`warning-${day}`);

            if (warningDiv) {
                warningDiv.remove();
            }

            const existingPeriods = document.querySelectorAll(`[id^="${day}-open-hour-"]`).length;
            const newPeriodIndex = existingPeriods + 1;
            
            const timeSelectors = `
                <div class="day-row specific-day-row">
                    <div class="specific-time-selectors">
                        <div class="specific-time-section">
                            <div class="specific-time-header">Open Time</div>
                            <div class="specific-time-select-container">
                                <select id="${day.toLowerCase()}-open-hour-${newPeriodIndex}" class="specific-time-select">
                                    <!-- Generate hour options dynamically -->
                                    ${generateHourOptions()}
                                </select> 
                                <span>:</span>
                                <select id="${day.toLowerCase()}-open-minute-${newPeriodIndex}" class="specific-time-select">
                                    <!-- Generate minute options dynamically -->
                                    ${generateMinuteOptions()}
                                </select>
                                <span>-</span>
                            </div>
                        </div>
                        <div class="specific-time-section">
                            <div class="specific-time-header">Close Time</div>
                            <div class="specific-time-select-container">
                                <select id="${day.toLowerCase()}-close-hour-${newPeriodIndex}" class="specific-time-select">
                                    <!-- Generate hour options dynamically -->
                                    ${generateHourOptions()}
                                </select> 
                                <span>:</span>
                                <select id="${day.toLowerCase()}-close-minute-${newPeriodIndex}" class="specific-time-select">
                                    <!-- Generate minute options dynamically -->
                                    ${generateMinuteOptions()}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            this.insertAdjacentHTML('afterend', timeSelectors);

            // Add to additional periods array for later use in the Edit button handler
            additionalPeriods.push({
                day: day.toUpperCase(),
                periodIndex: newPeriodIndex
            });

            this.classList.add("disabled");
            this.disabled = true;
            console.log("Current additionalPeriods array:", additionalPeriods);

            generateRequestBody();

        });
    });
        function generateRequestBody() {
        const regularHours = { periods: [] };

        additionalPeriods.forEach(function(period) {
            const day = period.day;
            const index = period.periodIndex;

            const openHour = parseInt(document.getElementById(`${day.toLowerCase()}-open-hour-${index}`).value, 10);
            const openMinute = parseInt(document.getElementById(`${day.toLowerCase()}-open-minute-${index}`).value, 10);
            const closeHour = parseInt(document.getElementById(`${day.toLowerCase()}-close-hour-${index}`).value, 10);
            const closeMinute = parseInt(document.getElementById(`${day.toLowerCase()}-close-minute-${index}`).value, 10);

            regularHours.periods.push({
                openDay: day,
                openTime: { hours: openHour, minutes: openMinute },
                closeDay: day,
                closeTime: { hours: closeHour, minutes: closeMinute }
            });
        });

        const requestBody = JSON.stringify({ regularHours });
        console.log("Request body to send to GMB API:", requestBody);
    }

    // Add event listener to the edit button
    document.getElementById('edit-button').addEventListener('click', function() {
        const shopName = document.querySelector('header h1').textContent.trim();
        const openingHours = {};

        // Loop through all status checkboxes to gather opening hours data
        document.querySelectorAll('.status-checkbox').forEach(checkbox => {
            const day = checkbox.id.split('-')[0].toUpperCase();
            const periods = [];

            // Loop through possible time slots (assuming 1 or 2 slots per day)
            for (let i = 1; i <= 2; i++) {
                const openHour = document.getElementById(`${day.toLowerCase()}-open-hour-${i}`);
                const openMinute = document.getElementById(`${day.toLowerCase()}-open-minute-${i}`);
                const closeHour = document.getElementById(`${day.toLowerCase()}-close-hour-${i}`);
                const closeMinute = document.getElementById(`${day.toLowerCase()}-close-minute-${i}`);

                // Only add periods that have all time components
                if (openHour && closeHour && openMinute && closeMinute) {
                    const openTime = `${openHour.value || '00'}:${openMinute.value || '00'}`;
                    const closeTime = `${closeHour.value || '00'}:${closeMinute.value || '00'}`;

                    periods.push({
                        open: openTime,
                        close: closeTime,
                        open_hour: openHour.value || '00',
                        open_minute: openMinute.value || '00',
                        close_hour: closeHour.value || '00',
                        close_minute: closeMinute.value || '00'
                    });
                }
            }

            // Store the periods for the day
            openingHours[day] = {
                periods: periods,
                has_opening_times: checkbox.checked
            };
        });

         additionalPeriods.forEach(function(period) {
        const day = period.day;
        const index = period.periodIndex;

        const openHour = parseInt(document.getElementById(`${day.toLowerCase()}-open-hour-${index}`).value, 10);
        const openMinute = parseInt(document.getElementById(`${day.toLowerCase()}-open-minute-${index}`).value, 10);
        const closeHour = parseInt(document.getElementById(`${day.toLowerCase()}-close-hour-${index}`).value, 10);
        const closeMinute = parseInt(document.getElementById(`${day.toLowerCase()}-close-minute-${index}`).value, 10);

        const newPeriod = {
            open: `${openHour}:${openMinute}`,
            close: `${closeHour}:${closeMinute}`,
            open_hour: openHour || '00',
            open_minute: openMinute || '00',
            close_hour: closeHour || '00',
            close_minute: closeMinute || '00'
        };

        // Check if the day exists in the openingHours object
        if (openingHours[day]) {
            openingHours[day].periods.push(newPeriod);
        } else {
            openingHours[day] = {
                periods: [newPeriod],
                has_opening_times: true
            };
        }
    });

    console.log("Using Location ID:", openingHours);

    // Send data via POST request
    fetch('/edit/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': '{{ csrf_token }}',  // Ensure CSRF token is included
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            shopName: shopName,
            locationId: locationId,
            opening_hours: openingHours
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showNotification('Edit successful!');
        } else {
            showNotification('Edit failed: ' + data.message, false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('An unexpected error occurred.', false);
    });
});

    // Functions to generate time options dynamically
    function generateHourOptions() {
        let options = '';
        for (let i = 0; i < 24; i++) {
            let hour = i.toString().padStart(2, '0');
            options += `<option value="${hour}">${hour}</option>`;
        }
        return options;
    }

    function generateMinuteOptions() {
        let options = '';
        for (let i = 0; i < 60; i += 30) {
            let minute = i.toString().padStart(2, '0');
            options += `<option value="${minute}">${minute}</option>`;
        }
        return options;
            }
        });