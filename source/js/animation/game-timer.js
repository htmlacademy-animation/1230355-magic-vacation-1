const TIMER_DURATION_SEC = 300;

let timeLeft;
let drawMinIntervalMs = 1000;
let now;
let drawLastTime = Date.now();
let elapsed;

const counterMinutes = document.querySelector(`.min`);
const counterSeconds = document.querySelector(`.sec`);

function draw() {
  if (timeLeft > 0) {
    timeLeft -= 1;
    const minutes = new Date(timeLeft * 1000).getMinutes();
    const seconds = new Date(timeLeft * 1000).getSeconds();
    counterMinutes.textContent = String(minutes).padStart(2, 0);
    counterSeconds.textContent = String(seconds).padStart(2, 0);
  }
}

function tick() {
  now = Date.now();
  elapsed = now - drawLastTime;

  if (elapsed > drawMinIntervalMs) {
    drawLastTime = now - (elapsed % drawMinIntervalMs);
    draw();
  }
  if (timeLeft > 0) {
    requestAnimationFrame(tick);
  }
}

export default function timerStart() {
  if (timeLeft === undefined) {
    timeLeft = TIMER_DURATION_SEC;
    requestAnimationFrame(tick);
  }
}
