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
        journeysAnimation.animate();
        casesAnimation.animate();
        codesAnimation.animate();
      }, 500);
      break;
    case `rules`:
      setTimeout(() => rulesTitleAnimation.runAnimation(), 500);
      break;
    case `game`:
      setTimeout(() => gameTitleAnimation.runAnimation(), 500);
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


