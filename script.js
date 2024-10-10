// Identifiers for reference of html contents
const start_stop = document.getElementById('start_stop');
const lap_reset = document.getElementById('lap_reset');
const timeDisplay = document.getElementById('timeDisplay');
const lapsContainer = document.getElementById('lapsContainer');

// Variables 
let timer;
let isRunning = false;
let elapsedTime = 0;
let lapCount = 0; // Count of laps

// Update the timer
function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Start and Stop Stopwatch
function handleStartStop() {
    if (!isRunning) {
        start_stop.classList.remove('btn-outline-danger');
        start_stop.classList.add('btn-danger');
        start_stop.textContent = 'STOP';
        lap_reset.removeAttribute('disabled');
        lap_reset.textContent = 'LAP';

        // Start the timer
        timer = setInterval(() => {
            elapsedTime += 10; // increment by 10 milliseconds
            updateDisplay();
        }, 10);
    } else {
        clearInterval(timer);
        start_stop.classList.remove('btn-danger');
        start_stop.classList.add('btn-outline-danger');
        start_stop.textContent = 'RESUME';
        lap_reset.textContent = 'RESET'
    }
    isRunning = !isRunning; // toggle the running state
}

// Lap and Reset Stopwatch
function handleLapReset() {
    if (isRunning) {
        lapCount++;
        const lapTime = timeDisplay.textContent;

        // Create a new lap entry
        const lapEntry = document.createElement('div');
        lapEntry.className = 'd-flex justify-content-between px-5 fs-3 laps_container';
        lapEntry.innerHTML = `<div>Lap ${lapCount}</div><div>${lapTime}</div>`;

        const hr = document.createElement('hr');
        hr.className = 'my-2 opacity-50';

        // Insert the new lap entry at the top
        lapsContainer.insertBefore(lapEntry, lapsContainer.firstChild);
        lapsContainer.insertBefore(hr, lapsContainer.firstChild);
    } else {
        // Reset the timer
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        start_stop.textContent = 'START';
        lap_reset.textContent = 'LAP';
        lap_reset.setAttribute('disabled', 'true');
        lapsContainer.textContent = '';

        const hr = document.createElement('hr');
        hr.className = 'my-2 opacity-50';

        lapsContainer.appendChild(hr);
    }
}