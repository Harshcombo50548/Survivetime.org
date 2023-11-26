// script.js
let previousStatus = null; // Variable to store the previous server status

function moveBackgroundDown() {
    const background = document.getElementById('background');
    background.style.animation = 'moveDown 1s forwards';
}

function showDayOnline() {
    const dayOnline = document.getElementById('Day/Online');
    dayOnline.style.display = 'block';
}

function showNightOffline() {
    const nightOffline = document.getElementById('night/offline');
    nightOffline.style.display = 'block';
}

function hideDayOnline() {
    const dayOnline = document.getElementById('Day/Online');
    dayOnline.style.display = 'none';
}

function hideNightOffline() {
    const nightOffline = document.getElementById('night/offline');
    nightOffline.style.display = 'none';
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
            if (data.online) {
                statusElement.textContent = 'Server is online';
                if (previousStatus !== true) {
                    showDayOnline();
                    hideNightOffline();
                }
                previousStatus = true;
            } else {
                statusElement.textContent = 'Server is offline';
                if (previousStatus !== false) {
                    showNightOffline();
                    hideDayOnline();
                }
                previousStatus = false;
            }
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
