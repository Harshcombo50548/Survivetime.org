// script.js
let previousStatus = null; // Variable to store the previous server status

function moveBackgroundDown() {
    const background = document.getElementById('grass');
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

// check server online ofline status, uncomment it to make it actually work


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




 const eskomSePushWorkerUrl = 'https://worker-bitter-mode-351b.harshcombo50548.workers.dev/'; // Replace with your Cloudflare Worker URL

// Function to make API request to Cloudflare Worker
async function getLoadSheddingInfo() {
    try {
        const response = await fetch(eskomSePushWorkerUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching load shedding information:', error.message);
        return null;
    }
}

// Function to update the HTML with load shedding information
function updateLoadSheddingInfo(info) {
    const loadSheddingInfoElement = document.getElementById('loadSheddingInfo');

    if (info && info.events && info.events.length > 0) {
        const event = info.events[0];
        const html = `<p>Load Shedding Event: ${event.note}, Start: ${event.start}, End: ${event.end}</p>`;
        loadSheddingInfoElement.innerHTML = html;
    } else {
        loadSheddingInfoElement.innerHTML = '<p>No load shedding information available.</p>';
    }
}

// Initial load shedding info update
getLoadSheddingInfo()
    .then(updateLoadSheddingInfo);

// Update load shedding info every hour
setInterval(async () => {
    const updatedInfo = await getLoadSheddingInfo();
    updateLoadSheddingInfo(updatedInfo);
}, 3600000); // 3600000 milliseconds = 1 hour */
