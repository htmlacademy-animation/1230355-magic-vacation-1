import Swiper from 'swiper';
import bodyTheme from '../helpers/theme';
import {plainMeshController} from '../../js/animation/3d-animation/plainMeshController';

export default () => {
  let storySlider;

  const setSlider = function () {
    bodyTheme.setAndApplyBodyTheme(`dark`);
    plainMeshController.setStoryActiveMesh();
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
              plainMeshController.setStoryActiveMesh(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              plainMeshController.setStoryActiveMesh(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              plainMeshController.setStoryActiveMesh(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              plainMeshController.setStoryActiveMesh(3);
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
              plainMeshController.setStoryActiveMesh(0);
            } else if (storySlider.activeIndex === 2) {
              bodyTheme.setAndApplyBodyTheme(`blue`);
              plainMeshController.setStoryActiveMesh(1);
            } else if (storySlider.activeIndex === 4) {
              bodyTheme.setAndApplyBodyTheme(`light-blue`);
              plainMeshController.setStoryActiveMesh(2);
            } else if (storySlider.activeIndex === 6) {
              bodyTheme.setAndApplyBodyTheme(`dark`);
              plainMeshController.setStoryActiveMesh(3);
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

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();

};
