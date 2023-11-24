function moveBackgroundDown() {
    const dayBackground = document.getElementById('dayBackground');
    const nightBackground = document.getElementById('nightBackground');

    dayBackground.style.animation = 'moveDown 1s forwards';
    nightBackground.style.animation = 'moveDown 1s forwards';
}

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

function setInitialBackground() {
    console.log('Setting initial background...');

    const ipAddress = 'Survivetime.org';
    const apiUrl = `https://api.mcsrvstat.us/2/${ipAddress}`;
    const statusElement = document.getElementById('status');
    const loader = document.getElementById('loader');

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
            console.log('Server status response:', data);

            statusElement.textContent = data.online ? 'Server is online' : 'Server is offline';
            setDayNightBackground(data.online);

            if (data.online) {
                moveBackgroundDown();
            }
        })
        .catch(error => {
            console.error(error);
            statusElement.textContent = 'Error checking server status';
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

// Initial background check on page load
setInitialBackground();

// Subsequent background checks every 5 seconds
setInterval(() => {
    console.log('Checking server status...');
    setInitialBackground();
}, 5000);
