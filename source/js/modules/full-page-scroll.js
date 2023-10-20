import throttle from 'lodash/throttle';
import bodyTheme from '../helpers/theme';
import {sceneController} from '../script';
import {scene} from '../animation/3d-animation/initAnimationScreen';
import {sonyaStartAnimation, sonyaEndAnimation} from '../animation/sonia-animation';

const prizes = document.querySelector(`.screen--prizes`);
const transitionBlock = document.querySelector(`.transition-block`);

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChangedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChangedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const prevActiveScreen = document.querySelector(`.screen.active`);
    const nextActiveScreen = this.screenElements[this.activeScreen];

    if (prevActiveScreen === nextActiveScreen) {
      return;
    }

    if (nextActiveScreen.classList.contains(`screen--intro`)) {
      scene.startAnimation();
      sceneController.showMainScene();
    } else if (nextActiveScreen.classList.contains(`screen--story`)) {
      scene.startAnimation();
      sceneController.showRoomScene();
      bodyTheme.applyTheme();
    } else if (nextActiveScreen.classList.contains(`screen--game`)) {
      sonyaStartAnimation();
      scene.stopAnimation();
    } else {
      scene.stopAnimation();
    }

    if (prevActiveScreen && prevActiveScreen.classList.contains(`screen--story`)) {
      bodyTheme.clearBodyTheme();
    } else if (prevActiveScreen && prevActiveScreen.classList.contains(`screen--game`)) {
      sonyaEndAnimation();
    }

    let showDelay = prevActiveScreen ? 500 : 0;
    setTimeout(() => {
      if (this.screenElements[this.activeScreen] === prizes) {
        transitionBlock.classList.add(`animate-forwards`);
        setTimeout(() => {
          this.screenElements.forEach((screen) => {
            screen.classList.add(`screen--hidden`);
            screen.classList.remove(`active`);
          });
          this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
          this.screenElements[this.activeScreen].classList.add(`active`);
          document.body.setAttribute(`data-screen`, this.screenElements[this.activeScreen].id);
        }, showDelay);
      } else {
        transitionBlock.classList.remove(`animate-forwards`);
        this.screenElements.forEach((screen) => {
          screen.classList.add(`screen--hidden`);
          screen.classList.remove(`active`);
        });
        this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
        setTimeout(() => {
          this.screenElements[this.activeScreen].classList.add(`active`);
          document.body.setAttribute(`data-screen`, this.screenElements[this.activeScreen].id);
        }, 100);
      }
    }, showDelay);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
