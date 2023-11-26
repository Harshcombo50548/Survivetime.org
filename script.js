// Function to move the background down
function moveBackgroundDown() {
    const dayBackground = document.getElementById('dayBackground');
    const nightBackground = document.getElementById('nightBackground');

    dayBackground.style.animation = 'moveDown 1s forwards';
    nightBackground.style.animation = 'moveDown 1s forwards';
}

// Function to check server status
function checkServerStatus() {
    const ipAddress = 'Survivetime.org'; // Domain
    const apiUrl = `https://api.mcsrvstat.us/2/${ipAddress}`;
    const statusElement = document.getElementById('status');
    const loader = document.getElementById('loader');
    const dayBackground = document.getElementById('dayBackground');
    const nightBackground = document.getElementById('nightBackground');

    // Display loader while checking server status
    loader.style.display = 'inline-block';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Server not reachable');
            }
            return response.json();
        })
        .then(data => {
            const isOnline = data.online || false;

            console.log('Server is online:', isOnline);

            // Set the status message based on server status
            statusElement.textContent = isOnline ? 'Server is online' : 'Server is offline';

            // Set day/night background based on server status
            if (isOnline) {
                console.log('Server is online. Showing day background.');
                nightBackground.style.display = 'none';
                dayBackground.style.display = 'block';
            } else {
                console.log('Server is offline. Showing night background.');
                dayBackground.style.display = 'none';
                nightBackground.style.display = 'block';
            }

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
