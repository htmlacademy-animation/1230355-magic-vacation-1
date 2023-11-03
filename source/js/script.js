// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import animation from './modules/animation';
import './animation/3d-animation/init-animation-screen.js';
import {SceneController} from './animation/3d-animation/scene-controller.js';
import {Preloader} from './animation/3d-animation/preloader.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
animation();

export const preloader = new Preloader();
export const sceneController = new SceneController(preloader);

window.addEventListener(`load`, async () => {
  const isStoryPage = window.location.hash === `#story`;
  await sceneController.initScene(isStoryPage ? 1 : 0);
  const fullPageScroll = new FullPageScroll();
  fullPageScroll.init();
  document.body.classList.add(`loaded`);
});
