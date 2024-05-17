// script.js

// 現在の時刻を表示する時計の機能
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// ストップウォッチの機能
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatch() {
    const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(stopwatchTime % 60).padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${hours}:${minutes}:${seconds}`;
}

function saveStopwatchTime() {
    localStorage.setItem('stopwatchTime', stopwatchTime);
}

function loadStopwatchTime() {
    const savedTime = localStorage.getItem('stopwatchTime');
    if (savedTime !== null) {
        stopwatchTime = parseInt(savedTime, 10);
        updateStopwatch();
    }
}

document.getElementById('startStopwatch').addEventListener('click', () => {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatch();
            saveStopwatchTime();
        }, 1000);
    }
});

document.getElementById('stopStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    saveStopwatchTime();
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    updateStopwatch();
    localStorage.removeItem('stopwatchTime');
});

let laps = [];

document.getElementById('lapStopwatch').addEventListener('click', () => {
    const lapTime = document.getElementById('stopwatch').textContent;
    laps.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    document.getElementById('laps').appendChild
    lapItem.textContent = lapTime;
    document.getElementById('laps').appendChild(lapItem);
});

// タイマーの機能
let timerInterval;
let timerTime = 300; // 初期値は5分 (300秒)

function updateTimer() {
    const minutes = String(Math.floor(timerTime / 60)).padStart(2, '0');
    const seconds = String(timerTime % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

// Start Timer ボタンのクリックイベント
document.getElementById('startTimer').addEventListener('click', () => {
    const inputMinutes = parseInt(document.getElementById('minutes').value) || 0;
    const inputSeconds = parseInt(document.getElementById('seconds').value) || 0;
    timerTime = (inputMinutes * 60) + inputSeconds;

    // すでにタイマーが実行中でない場合にのみタイマーを開始する
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                document.getElementById('alertSound').play();
                alert('Time is up!');
            }
        }, 1000);
    }
});

// Stop Timer ボタンのクリックイベント
document.getElementById('stopTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset Timer ボタンのクリックイベント
document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerTime = 300; // 初期値に戻す
    updateTimer();
});


// プリセットボタンの機能
document.querySelectorAll('.preset').forEach(button => {
    button.addEventListener('click', () => {
        timerTime = parseInt(button.getAttribute('data-time'));
        updateTimer();
    });
});

// ダークモードの切り替え機能
document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

function loadDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

loadStopwatchTime();
loadDarkMode();
