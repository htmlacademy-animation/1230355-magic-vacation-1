export class AnimationManager {
  constructor() {
    this.animations = [];
  }

  addAnimations(...animations) {
    this.animations.push(...animations);
  }

  startAnimations() {
    this.animations.forEach((animation) => {
      animation.start();
    });
  }

  clearAnimations() {
    this.animations.forEach((animation) => {
      animation.stop();
    });

    this.animations = [];
  }
}
