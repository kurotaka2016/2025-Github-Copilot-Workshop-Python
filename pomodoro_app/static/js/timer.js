// timer.js

const TIMER_DURATION = 25 * 60; // 25分
let timeLeft = TIMER_DURATION;
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressCircle = document.getElementById('progress');

function updateTimerDisplay() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${min}:${sec}`;
    // 円グラフ進捗
    const percent = (TIMER_DURATION - timeLeft) / TIMER_DURATION;
    const dashoffset = 502 * (1 - percent);
    progressCircle.setAttribute('stroke-dashoffset', dashoffset);
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.textContent = '一時停止';
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = '開始';
            // タイマー終了時の通知
            alert('ポモドーロ終了！お疲れさまです。');
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    startBtn.textContent = '開始';
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    timeLeft = TIMER_DURATION;
    updateTimerDisplay();
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

// 初期表示
updateTimerDisplay();
