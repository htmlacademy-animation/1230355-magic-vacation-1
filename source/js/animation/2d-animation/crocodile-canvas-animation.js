import Animation from './animation-2d';
import easing from '../../helpers/easing';
import canvasScene from './canvas-scene';

const key = {
  objectId: `key`,
  url: `./img/module-4/lose-images/key.png`,
  x: 50,
  y: 58,
  size: 0,
  opacity: 0,
  transforms: {},
};
const crocodile = {
  objectId: `crocodile`,
  url: `./img/module-4/lose-images/crocodile.png`,
  x: 49,
  y: 62,
  size: 68,
  opacity: 1,
  transforms: {
    translateX: 33,
    translateY: -15,
  },
};
const flamingo = {
  objectId: `flamingo`,
  url: `./img/module-4/lose-images/flamingo.png`,
  x: 31,
  y: 50,
  size: 0,
  opacity: 0,
  transforms: {
    translateX: 15,
    translateY: 5,
    rotate: 20,
  },
};
const leaf = {
  objectId: `leaf`,
  url: `./img/module-4/lose-images/leaf.png`,
  x: 75,
  y: 45,
  size: 0,
  opacity: 0,
  transforms: {
    translateX: -25,
    translateY: 10,
    rotate: -20,
  },
};
const saturn = {
  objectId: `saturn`,
  url: `./img/module-4/lose-images/saturn.png`,
  x: 75,
  y: 65,
  size: 0,
  opacity: 0,
  transforms: {
    translateX: -25,
    translateY: -10,
    rotate: 20,
  },
};
const snowflake = {
  objectId: `snowflake`,
  url: `./img/module-4/lose-images/snowflake.png`,
  x: 65,
  y: 55,
  size: 0,
  opacity: 0,
  transforms: {
    translateX: -15,
    translateY: 0,
    rotate: -20,
  },
};
const watermelon = {
  objectId: `watermelon`,
  url: `./img/module-4/lose-images/watermelon.png`,
  x: 20,
  y: 65,
  size: 0,
  opacity: 0,
  transforms: {
    translateX: 25,
    translateY: -10,
    rotate: 20,
  },
};
const drop = {
  objectId: `drop`,
  url: `./img/module-4/lose-images/drop.png`,
  x: 48,
  y: 68,
  size: 0,
  opacity: 0,
  transforms: {},
};
const sceneObjectsArr = [
  key,
  crocodile,
  flamingo,
  watermelon,
  leaf,
  snowflake,
  saturn,
  drop,
];
const maskKey = {
  mask: {
    centerX: key.x,
    centerY: key.y,
    opacity: 1,
  },
};

export default class CrocodileScene extends canvasScene {
  constructor(options) {
    super({
      canvas: options.canvas,
      sceneObjects: sceneObjectsArr,
    });

    this.ObjectsInitEventListener = () => {
      this.objectsScene.flamingo.before = this.drawMask.bind(this);
    };
    this.initObjects();
    this.animations.push(
        new Animation({
          func: () => {
            this.drawScene();
          },
          duration: `infinite`,
          fps: 60,
        })
    );

    this.initKeyAnimations();
    this.initCrocodileAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initDropAnimations();
  }

  drawMask() {
    const mask = maskKey.mask;
    const width = this.objectsScene.key.widthImg;
    const height = this.objectsScene.key.heightImg;
    const s = this.size / 100;

    if (mask.opacity === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.globalAlpha = mask.opacity;
    this.ctx.fillStyle = `#acc3ff`;

    this.ctx.beginPath();

    this.ctx.arc(
        (mask.centerX + width * 0.0008) * s,
        (mask.centerY - height * 0.0217) * s,
        width * 0.48,
        0,
        180
    );

    this.ctx.moveTo(
        (mask.centerX + width * 0.030) * s,
        (mask.centerY - height * 0.01) * s
    );
    this.ctx.lineTo(
        (mask.centerX + width * 0.060) * s,
        (mask.centerY + height * 0.08) * s
    );
    this.ctx.lineTo(
        (mask.centerX - width * 0.25) * s,
        (mask.centerY + height * 0.08) * s
    );
    this.ctx.lineTo(
        (mask.centerX - width * 0.25) * s,
        (mask.centerY - height * 0.05) * s
    );
    this.ctx.lineTo(
        (mask.centerX - width * 0.9) * s,
        (mask.centerY - height * 0.5) * s
    );

    this.ctx.globalCompositeOperation = `destination-in`;

    this.ctx.fill();
    this.ctx.restore();
  }

  initKeyAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.key.opacity = progress;
            this.objectsScene.key.size = 15 * progress;
          },
          duration: 400,
        })
    );
  }

  initCrocodileAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.crocodile.transforms.translateX =
                        25 * progressReversed;
            this.objectsScene.crocodile.transforms.translateY = -15 * progressReversed;
          },
          delay: 1000,
          duration: 500,
        })
    );

    this.animations.push(
        new Animation({
          func: () => {
            this.objectsScene.crocodile.opacity = 1;
          },
        })
    );
  }

  initFlamingoAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.flamingo.opacity = progress;
          },
          duration: 100,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.flamingo.size = 20 * progress;
            this.objectsScene.flamingo.transforms.translateX =
                        15 * progressReversed;
            this.objectsScene.flamingo.transforms.translateY =
                        5 * progressReversed;
            this.objectsScene.flamingo.transforms.rotate = 20 * progressReversed;
          },
          easing: easing.easeOutCubic,
          delay: 100,
          duration: 800,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.flamingo.transforms.translateY = 40 * progress;
          },
          easing: easing.easeInCubic,
          delay: 900,
          duration: 600,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.flamingo.opacity = progressReversed;
          },
          delay: 1400,
          duration: 100,
        })
    );
  }

  initWatermelonAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.watermelon.opacity = progress;
          },
          duration: 100,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.watermelon.size = 16 * progress;
            this.objectsScene.watermelon.transforms.translateX =
                        25 * progressReversed;
            this.objectsScene.watermelon.transforms.translateY = -8 * progressReversed;
            this.objectsScene.watermelon.transforms.rotate =
                        20 * progressReversed;
          },
          easing: easing.easeOutCubic,
          delay: 100,
          duration: 800,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.watermelon.transforms.translateY = 35 * progress;
          },
          easing: easing.easeInCubic,
          delay: 900,
          duration: 600,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.watermelon.opacity = progressReversed;
          },
          delay: 1400,
          duration: 100,
        })
    );
  }

  initLeafAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.leaf.opacity = progress;
          },
          duration: 100,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;

            this.objectsScene.leaf.size = 19 * progress;
            this.objectsScene.leaf.transforms.translateX = -25 * progressReversed;
            this.objectsScene.leaf.transforms.translateY = 10 * progressReversed;
            this.objectsScene.leaf.transforms.rotate = -18 * progressReversed;
          },
          easing: easing.easeOutCubic,
          delay: 100,
          duration: 800,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.leaf.transforms.translateY = 40 * progress;
          },
          easing: easing.easeInCubic,
          delay: 900,
          duration: 400,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.leaf.opacity = progressReversed;
          },
          delay: 1200,
          duration: 100,
        })
    );
  }

  initSnowflakeAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.snowflake.opacity = progress;
          },
          duration: 100,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.snowflake.size = 12 * progress;
            this.objectsScene.snowflake.transforms.translateX = -15 * progressReversed;
            this.objectsScene.snowflake.transforms.translateY =
                        0 * progressReversed;
            this.objectsScene.snowflake.transforms.rotate = -20 * progressReversed;
          },
          easing: easing.easeOutCubic,
          delay: 100,
          duration: 800,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.snowflake.transforms.translateY = 40 * progress;
          },
          easing: easing.easeInCubic,
          delay: 900,
          duration: 600,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.snowflake.opacity = progressReversed;
          },
          delay: 1400,
          duration: 100,
        })
    );
  }

  initSaturnAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.saturn.opacity = progress;
          },
          duration: 100,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;

            this.objectsScene.saturn.size = 14 * progress;
            this.objectsScene.saturn.transforms.translateX = -20 * progressReversed;
            this.objectsScene.saturn.transforms.translateY = -10 * progressReversed;
            this.objectsScene.saturn.transforms.rotate = 15 * progressReversed;
          },
          easing: easing.easeOutCubic,
          delay: 100,
          duration: 800,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.saturn.transforms.translateY = 35 * progress;
          },
          easing: easing.easeInCubic,
          delay: 900,
          duration: 600,
        })
    );

    this.animations.push(
        new Animation({
          func: (progress) => {
            let progressReversed = 1 - progress;

            this.objectsScene.saturn.opacity = progressReversed;
          },
          delay: 1400,
          duration: 100,
        })
    );
  }

  initDropAnimations() {
    this.animationsDrop.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.drop.size = 2.5 * progress;
            this.objectsScene.drop.opacity = progress;
          },
          duration: 700,
        }));

    this.animationsDrop.push(new Animation({
      func: (progress) => {
        this.objectsScene.drop.transforms.translateY = 8 * progress;
      },
      delay: 700,
      duration: 500,
    }));

    this.animationsDrop.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objectsScene.drop.size = 2.8 * progressReversed;
        this.objectsScene.drop.opacity = progressReversed;
      },
      delay: 1100,
      duration: 200,
    }));

    this.animationsDrop.push(new Animation({
      func: () => {
        this.objectsScene.drop.transforms.translateY = 0;
        this.objectsScene.drop.opacity = 0;
      },
      delay: 1200,
      duration: 100
    }));
  }

  startDropAnimation() {
    this.dropTimeoutId = setTimeout(() => {
      this.animationsDrop.forEach(animation => animation.start());
      this.startDropAnimation();
    }, 2000);
  }

  startAnimation() {
    this.animations.forEach(animation => animation.start());
    this.startDropAnimation();
  }

  stopAnimation() {
    if (this.dropTimeoutId) {
      clearTimeout(this.dropTimeoutId);
    }
    this.animations.forEach(animation => {
      animation.stop();
    });
  }
}
