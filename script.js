// Function to make API request and update schedule
async function updateLoadSheddingSchedule() {
    const apiUrl = 'https://developer.sepush.co.za/business/2.0/area?id=tshwane-14-wierdapark';
    const apiToken = '00A61794-FB014AB3-A1B246E4-45428574'; // Replace with your actual API token

    try {
        // Make API request
        const response = await fetch(apiUrl, {
            headers: {
                'Token': apiToken,
            },
        });

        if (response.ok) {
            // Parse JSON response
            const data = await response.json();
            const schedule = generateScheduleHTML(data);
            
            // Update HTML with schedule
            document.getElementById('loadSheddingSchedule').innerHTML = schedule;
        } else {
            console.error('Error fetching data from API:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Function to generate HTML for load shedding schedule
function generateScheduleHTML(data) {
    // Modify this function based on the API response structure
    // Use data to extract load shedding schedule information
    // Return HTML string representing the schedule

    // Example: Displaying the first event's start and end times
    const event = data.events[0];
    const scheduleHTML = `<p>Load shedding today from ${event.start} to ${event.end}</p>`;
    
    return scheduleHTML;
}

// Initial update when the page loads
updateLoadSheddingSchedule();

// Schedule periodic updates (every hour in this example)
setInterval(updateLoadSheddingSchedule, 3600000); // 3600000 milliseconds = 1 hour
