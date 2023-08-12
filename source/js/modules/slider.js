import Swiper from 'swiper';
import SceneStory from '../animation/3d-animation/3d-scene-story';
import bodyTheme from '../helpers/theme';

export default () => {
  let storySlider;
  const story = new SceneStory();

  const setSlider = function () {
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
              story.setScene(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              story.setScene(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              story.setScene(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              story.setScene(3);
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
              story.setScene(0);
            } else if (storySlider.activeIndex === 2) {
              bodyTheme.setAndApplyBodyTheme(`blue`);
              story.setScene(1);
            } else if (storySlider.activeIndex === 4) {
              story.setScene(2);
              bodyTheme.setAndApplyBodyTheme(`light-blue`);
            } else if (storySlider.activeIndex === 6) {
              bodyTheme.setAndApplyBodyTheme(`dark`);
              story.setScene(3);
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
    document.body.addEventListener(`screenChanged`, (e) => {
      if (e.detail.screenName === `story`) {
        story.init();
        story.setScene(0);
      }
    });
  });

  setSlider();
  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `story`) {
      story.init();
      story.setScene(0);
    }
  });
};
