import TextAnimationWave from '../animation/text-animation-wave';

export default () => {
  window.onload = function () {
    document.querySelector(`body`).classList.add(`body-loaded`);
  };
};

const introTitleAnimation = new TextAnimationWave(`.intro__title`);
const introDateAnimation = new TextAnimationWave(`.intro__date`, `not_exists`);
const sliderTitleAnimation = new TextAnimationWave(`.slider__item-title`);
const prizesTitleAnimation = new TextAnimationWave(`.prizes__title`);
const rulesTitleAnimation = new TextAnimationWave(`.rules__title`);
const gameTitleAnimation = new TextAnimationWave(`.game__title`);

document.body.addEventListener(`screenChanged`, (e) => {
  introTitleAnimation.destroyAnimation();
  introDateAnimation.destroyAnimation();
  sliderTitleAnimation.destroyAnimation();
  prizesTitleAnimation.destroyAnimation();
  rulesTitleAnimation.destroyAnimation();
  gameTitleAnimation.destroyAnimation();

  switch (e.detail.screenName) {
    case `top`:
      setTimeout(() => introTitleAnimation.runAnimation(), 500);
      setTimeout(() => introDateAnimation.runAnimation(), 1250);
      break;
    case `story`:
      setTimeout(() => sliderTitleAnimation.runAnimation(), 500);
      break;
    case `prizes`:
      setTimeout(() => {
        prizesTitleAnimation.runAnimation();
        svgAnimateStart();
      }, 500);
      break;
    case `rules`:
      setTimeout(() => rulesTitleAnimation.runAnimation(), 500);
      break;
    case `game`:
      setTimeout(() => gameTitleAnimation.runAnimation(), 500);
      requestAnimationFrame(tick);
      break;
  }
});

// Запуск анимации призов
const svgAnimate = document.getElementById(`primaryAwardAppear`);
function svgAnimateStart() {
  if (!svgAnimate.hasAttribute(`shown`)) {
    svgAnimate.setAttribute(`shown`, ``);
    svgAnimate.beginElement();
  }
}

// Таймер игры
let fpsInterval = 1000;
let endTime = 300;
let now;
let then = Date.now();
let elapsed;

const counterMinutes = document.querySelector(`.min`);
const counterSeconds = document.querySelector(`.sec`);

function draw() {
  const minutes = new Date(endTime * 1000).getMinutes();
  const seconds = new Date(endTime * 1000).getSeconds();
  counterMinutes.textContent = String(minutes).padStart(2, 0);
  counterSeconds.textContent = String(seconds).padStart(2, 0);
  endTime -= 1;
}

function tick() {
  requestAnimationFrame(tick);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    draw();
  }
}
