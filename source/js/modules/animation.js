import TextAnimationWave from '../animation/text-animation-wave';
import timerStart from '../animation/game-timer';
import NumberUpAnimation from '../animation/number-up-animation';

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

const journeysAnimation = new NumberUpAnimation(document.querySelector(`.prizes-count-journeys`), 3, 1);
const casesAnimation = new NumberUpAnimation(document.querySelector(`.prizes-count-cases`), 7, 1);
const codesAnimation = new NumberUpAnimation(document.querySelector(`.prizes-count-codes`), 900, 180);
codesAnimation.setCountCurrent(11);

document.body.addEventListener(`screenChanged`, (e) => {
  introTitleAnimation.destroyAnimation();
  introDateAnimation.destroyAnimation();
  sliderTitleAnimation.destroyAnimation();
  prizesTitleAnimation.destroyAnimation();
  rulesTitleAnimation.destroyAnimation();
  gameTitleAnimation.destroyAnimation();

  switch (e.detail.screenName) {
    case `top`:
      setTimeout(() => introTitleAnimation.runAnimation(), 600);
      setTimeout(() => introDateAnimation.runAnimation(), 1250);
      break;
    case `story`:
      setTimeout(() => sliderTitleAnimation.runAnimation(), 600);
      break;
    case `prizes`:
      setTimeout(() => {
        prizesTitleAnimation.runAnimation();
        svgAnimateStart();
        journeysAnimation.animate();
      }, 1100);
      setTimeout(() => casesAnimation.animate(), 3000);
      setTimeout(() => codesAnimation.animate(), 5500);
      break;
    case `rules`:
      setTimeout(() => rulesTitleAnimation.runAnimation(), 600);
      break;
    case `game`:
      setTimeout(() => gameTitleAnimation.runAnimation(), 600);
      timerStart();
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


