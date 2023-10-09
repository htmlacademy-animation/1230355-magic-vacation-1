export class AnimationManager {
  constructor() {
    this.animations = {
      mainPage: [],
      roomsPage: [[], [], [], []],
      suitcase: [],
    };
  }

  addMainPageAnimations(...animations) {
    this.animations.mainPage.push(...animations);
  }

  addRoomsPageAnimations(key, ...animations) {
    this.animations.roomsPage[key].push(...animations);
  }

  addSuitcaseAnimations(...animations) {
    this.animations.suitcase.push(...animations);
  }

  startAnimations(key) {
    this.animations[key].forEach((animation) => {
      animation.start();
    });
  }

  startMainPageAnimations() {
    this.animations.mainPage.forEach((animation) => {
      animation.start();
    });
  }

  startSuitcaseAnimations() {
    this.animations.suitcase.forEach((animation) => {
      animation.start();
    });
  }

  startRoomAnimations(roomIndex) {
    this.animations.roomsPage[roomIndex].forEach((animation) => {
      animation.start();
    });
  }

  clearAnimations(key) {
    this.animations[key].forEach((animation) => {
      animation.stop();
    });

    this.animations[key] = [];
  }
}
