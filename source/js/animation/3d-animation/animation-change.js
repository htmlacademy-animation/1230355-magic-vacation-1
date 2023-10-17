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
    this.stopRoomAnimations();

    this.startAnimations(`mainPage`);
  }

  startSuitcaseAnimations() {
    this.animations.suitcase.forEach((animation) => {
      animation.start();
    });
  }

  startRoomAnimations(roomIndex) {
    this.stopRoomAnimations();

    this.animations.roomsPage[roomIndex].forEach((animation) => {
      animation.start();
    });
  }

  stopRoomAnimations() {
    this.animations.roomsPage.forEach((room) =>
      room.forEach((animation) => {
        animation.stop();
      })
    );
  }

  clearAnimations(key) {
    this.animations[key].forEach((animation) => {
      animation.stop();
    });

    this.animations[key] = [];
  }
}
