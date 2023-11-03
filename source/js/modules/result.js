import SeaCalfScene from '../animation/2d-animation/seacalf-canvas-animation.js';
import CrocodileScene from '../animation/2d-animation/crocodile-canvas-animation.js';
import {sonyaStartAnimation, sonyaEndAnimation} from '../animation/sonia-animation.js';

export default () => {
  const showResultEls = document.querySelectorAll(`.js-show-result`);
  const results = document.querySelectorAll(`.screen--result`);
  let CrocodileCanvasAnimate;

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        sonyaEndAnimation();
        const target = showResultEls[i].getAttribute(`data-target`);
        toggleResult(target);

        if (target === `result`) {
          let SeaCalfCanvasAnimate = new SeaCalfScene({
            canvas: document.querySelector(`#sea-calf-canvas`)
          });
          SeaCalfCanvasAnimate.startAnimation();
        } else if (target === `result3`) {
          if (!CrocodileCanvasAnimate) {
            CrocodileCanvasAnimate = new CrocodileScene({
              canvas: document.querySelector(`#crocodile-canvas`)
            });
          }
          CrocodileCanvasAnimate.startAnimation();
        }
      });
    }

    const playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, () => {
        toggleResult();
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  const toggleResult = (target) => {
    [].slice.call(results).forEach((el) => {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });
    if (CrocodileCanvasAnimate) {
      CrocodileCanvasAnimate.stopAnimation();
    }

    if (target) {
      const targetEl = [].slice.call(results).filter((el) => el.getAttribute(`id`) === target);
        setTimeout(() => {
          targetEl[0].classList.add(`screen--show`);
          targetEl[0].querySelector(`svg animate`).beginElement();
        }, 100);
        targetEl[0].classList.remove(`screen--hidden`);
    } else {
      sonyaStartAnimation();
    }
  }
};
