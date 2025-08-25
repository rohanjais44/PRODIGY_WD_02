let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

function updateDisplay(time) {
  const ms = Math.floor((time % 1000) / 10);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / 60000) % 60);
  const h = Math.floor(time / 3600000);
  display.textContent =
    (h < 10 ? '0' : '') + h + ':' +
    (m < 10 ? '0' : '') + m + ':' +
    (s < 10 ? '0' : '') + s + '.' +
    (ms < 10 ? '0' : '') + ms;
}

function start() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  }
}

function pause() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function reset() {
  pause();
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  laps.innerHTML = '';
}

function lap() {
  if (elapsedTime === 0) return;
  const li = document.createElement('li');
  li.innerText = display.textContent;
  laps.appendChild(li);
}

startBtn.onclick = start;
pauseBtn.onclick = pause;
resetBtn.onclick = reset;
lapBtn.onclick = lap;

updateDisplay(0);
