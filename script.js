let timer;
let isRunning = false;
let startTime = 0;
let lapStartTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        lapButton.disabled = true;
    } else {
        lapStartTime = Date.now() - startTime;
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
        lapButton.disabled = false;
    }
    isRunning = !isRunning;
}

function updateTime() {
    const currentTime = Date.now() - lapStartTime;
    display.textContent = formatTime(currentTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millisecondsPart = (date.getUTCMilliseconds() / 10).toFixed(0);

    return (
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (millisecondsPart < 10 ? '0' : '') + millisecondsPart
    );
}

function reset() {
    clearInterval(timer);
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapButton.textContent = 'Lap';
    lapButton.disabled = true;
    isRunning = false;
    startTime = 0;
    lapStartTime = 0;
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapsList.appendChild(lapItem);
    }
}
