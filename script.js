// script.js
function moveBackgroundDown() {
    const background = document.getElementById('background');
    background.style.animation = 'moveDown 1s forwards';
}

function checkServerStatus() {
    const ipAddress = 'Survivetime.org'; // Domain
    const apiUrl = `https://api.mcsrvstat.us/2/${ipAddress}`;
    const statusElement = document.getElementById('status');

    // Display loader while checking server status
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
            statusElement.textContent = data.online ? 'Server is online' : 'Server is offline';
        })
        .catch(error => {
            console.error(error);
            statusElement.textContent = 'Error checking server status';
        })
        .finally(() => {
            // Hide loader after checking server status
            loader.style.display = 'none';
        });
}

// Check server status on page every 5 sec
checkServerStatus();
setInterval(checkServerStatus, 5000);
