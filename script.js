// Function to move the background down
function moveBackgroundDown() {
    const dayBackground = document.getElementById('dayBackground');
    const nightBackground = document.getElementById('nightBackground');

    dayBackground.style.animation = 'moveDown 1s forwards';
    nightBackground.style.animation = 'moveDown 1s forwards';
}

// Function to set the day/night background based on server status
function setDayNightBackground(isOnline) {
    console.log('Setting background. Server online status:', isOnline);

    const dayBackground = document.getElementById('dayBackground');
    const nightBackground = document.getElementById('nightBackground');

    if (isOnline) {
        console.log('Server is online. Showing day background.');
        nightBackground.style.display = 'none';
        dayBackground.style.display = 'block';
    } else {
        console.log('Server is offline. Showing night background.');
        dayBackground.style.display = 'none';
        nightBackground.style.display = 'block';
    }
}

// Function to check server status
function checkServerStatus() {
    const ipAddress = 'Survivetime.org'; // Domain
    const apiUrl = `https://api.mcsrvstat.us/2/${ipAddress}`;
    const statusElement = document.getElementById('status');
    const loader = document.getElementById('loader');

    // Display loader while checking server status
    loader.style.display = 'inline-block';

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Server not reachable');
            }
        })
        .then(data => {
            const isOnline = data.online !== undefined ? data.online : false; // Ensure the correct field is used

            console.log('Server is online:', isOnline);

            // Set the status message based on server status
            statusElement.textContent = isOnline ? 'Server is online' : 'Server is offline';

            // Set day/night background based on server status
            setDayNightBackground(isOnline);

            // Move background down if the server is online
            if (isOnline) {
                moveBackgroundDown();
            }

            // Hide loader after checking server status
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error(error);
            statusElement.textContent = 'Error checking server status';

            // Hide loader in case of an error
            loader.style.display = 'none';
        });
}

// Initial background check on page load
checkServerStatus();

// Subsequent background checks every 5 seconds
setInterval(() => {
    console.log('Checking server status...');
    checkServerStatus();
}, 5000);


// Function to get the next load shedding times for the given area
function getNextLoadSheddingTimes(areaId) {
    const apiUrl = `https://developer.sepush.co.za/business/2.0/area?id=tshwane-14-wierdapark&test=current`;

    fetch(apiUrl, {
        headers: {
            'token': '00A61794-FB014AB3-A1B246E4-45428574' // Replace with your actual token
        }
    })
    .then(response => response.json())
    .then(data => {
        const nextLoadSheddingEvent = data.events && data.events.length > 0 ? data.events[0] : null;

        if (nextLoadSheddingEvent) {
            const startTime = new Date(nextLoadSheddingEvent.start);
            const endTime = new Date(nextLoadSheddingEvent.end);

            // Format the time to display
            const formattedStartTime = startTime.toLocaleTimeString();
            const formattedEndTime = endTime.toLocaleTimeString();

            // Update the HTML element with the next load shedding times
            const loadSheddingTimesElement = document.getElementById('loadSheddingTimes');
            loadSheddingTimesElement.innerHTML = `Next Load Shedding: ${formattedStartTime} to ${formattedEndTime}`;
        } else {
            // If there are no upcoming load shedding events
            const loadSheddingTimesElement = document.getElementById('loadSheddingTimes');
            loadSheddingTimesElement.innerHTML = 'No upcoming load shedding events.';
        }
    })
    .catch(error => {
        console.error('Error fetching load shedding times:', error);
    });
}

// Call the function with the area ID (replace 'eskde-10-fourwaysext10cityofjohannesburggauteng' with your actual area ID)
getNextLoadSheddingTimes('eskde-10-fourwaysext10cityofjohannesburggauteng');
