import Swiper from 'swiper';
import bodyTheme from '../helpers/theme';
import {sceneController} from '../script';

export default () => {
  let storySlider;

  const setSlider = () => {
    bodyTheme.setAndApplyBodyTheme(`dark`);
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              sceneController.showRoomScene(1);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sceneController.showRoomScene(2);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sceneController.showRoomScene(3);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sceneController.showRoomScene(4);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              bodyTheme.setAndApplyBodyTheme(`purple`);
              sceneController.showRoomScene(1);
            } else if (storySlider.activeIndex === 2) {
              bodyTheme.setAndApplyBodyTheme(`blue`);
              sceneController.showRoomScene(2);
            } else if (storySlider.activeIndex === 4) {
              bodyTheme.setAndApplyBodyTheme(`light-blue`);
              sceneController.showRoomScene(3);
            } else if (storySlider.activeIndex === 6) {
              bodyTheme.setAndApplyBodyTheme(`dark`);
              sceneController.showRoomScene(4);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, () => {
      if (storySlider) {
        storySlider.destroy();
      }
      setSlider();
    });

  setSlider();

};
