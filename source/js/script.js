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
import '../js/animation/3d-animation/initAnimationScreen.js';
import {SceneController} from './animation/3d-animation/sceneController';

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


export const sceneController = new SceneController();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  setTimeout(()=>{
    document.body.classList.add(`loaded`);
  }, 2000);
});
