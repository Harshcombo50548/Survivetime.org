// Function to move the background down
function moveBackgroundDown() {
    const dayBackground = document.getElementById('dayBackground');
    const nightBackground = document.getElementById('nightBackground');


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
