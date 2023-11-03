import Animation from './animation-2d';
import easing from '../../helpers/easing';
import canvasScene from './canvas-scene';

const ice = {
  objectId: `ice`,
  url: `./img/module-4/win-primary-images/ice.png`,
  x: 50,
  y: 69,
  size: 49,
  opacity: 0,
  transforms: {
    translateY: 30,
  },
};
const seaCalf = {
  objectId: `seaCalf`,
  url: `./img/module-4/win-primary-images/sea-calf-2.png`,
  x: 48,
  y: 60,
  size: 57,
  opacity: 0,
  transforms: {
    translateY: 30,
  },
};
const snowFlake1 = {
  objectId: `snowFlake1`,
  url: `./img/module-4/win-primary-images/snowflake.png`,
  x: 23,
  y: 55,
  size: 26,
  opacity: 0,
  transforms: {
    rotate: -30,
  },
};
const snowFlake2 = {
  objectId: `snowFlake2`,
  url: `./img/module-4/win-primary-images/snowflake.png`,
  x: 75,
  y: 65,
  size: 19,
  opacity: 0,
  transforms: {
    rotate: 30,
    scaleX: -1,
  },
};
const plane = {
  objectId: `plane`,
  url: `./img/module-4/win-primary-images/airplane.png`,
  x: 95,
  y: 45,
  size: 15,
  opacity: 0,
  transforms: {
    translateY: -10,
  },
};
const tree1 = {
  objectId: `tree1`,
  url: `./img/module-4/win-primary-images/tree-2.png`,
  x: 60,
  y: 55,
  size: 5,
  opacity: 0,
  transforms: {
    translateY: 30,
  },
};
const tree2 = {
  objectId: `tree2`,
  url: `./img/module-4/win-primary-images/tree.png`,
  x: 64,
  y: 58,
  size: 4,
  opacity: 0,
  transforms: {
    translateY: 30,
  },
};

const sceneObjectsArr = [
  plane,
  tree1,
  tree2,
  ice,
  seaCalf,
  snowFlake1,
  snowFlake2,
];

const local = {
  trace: {
    centerX: 40,
    centerY: 55,
    radius: 15,
    endX: 91,
    endY: 49,
    angle: 30,
    deltasLength: 10,
    opacity: 0,
  },
};

export default class SeaCalfScene extends canvasScene {
  constructor(options) {
    super({
      canvas: options.canvas,
      sceneObjects: sceneObjectsArr,
    });

    this.ObjectsInitEventListener = () => {
      this.objectsScene.plane.before = this.drawTrace.bind(this);
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
    this.initIceAndSeaCalfAnimations();
    this.initSnowFlakesAnimations();
    this.initTraceAnimations();
    this.initPlaneAnimations();
    this.initTreesAnimations();
  }

  drawTrace() {
    const trace = local.trace;
    const angle = (trace.angle * Math.PI) / 180;

    if (trace.opacity === 0) {
      return;
    }
    const s = this.size / 100;
    this.ctx.save();
    this.ctx.globalAlpha = trace.opacity;
    this.ctx.fillStyle = `#acc3ff`;
    this.ctx.beginPath();
    this.ctx.arc(
        trace.centerX * s,
        trace.centerY * s,
        trace.radius * s,
        Math.PI / 2,
        (Math.PI * 3) / 2
    );
    this.ctx.bezierCurveTo(
        (trace.centerX + 10) * s,
        (trace.centerY - trace.radius) * s,
        (trace.endX - trace.deltasLength * Math.sin(angle)) * s,
        (trace.endY + trace.deltasLength * Math.cos(angle)) * s,
        trace.endX * s,
        trace.endY * s
    );
    this.ctx.bezierCurveTo(
        (trace.endX - trace.deltasLength * Math.sin(angle)) * s,
        (trace.endY + trace.deltasLength * Math.cos(angle)) * s,
        (trace.centerX + 10) * s,
        (trace.centerY + trace.radius) * s,
        trace.centerX * s,
        (trace.centerY + trace.radius) * s
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  initIceAndSeaCalfAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.ice.transforms.translateY = 30 * progressReversed;
            this.objectsScene.ice.transforms.rotate = -30 * Math.sin(progressReversed * 2);
            this.objectsScene.seaCalf.transforms.translateY =
                30 * progressReversed;
            this.objectsScene.seaCalf.transforms.rotate = -30 * Math.sin(progressReversed * 2);
          },
          delay: 500,
          duration: 2000,
          easing: easing.easeOutElastic,
        })
    );

      this.animations.push(
          new Animation({
              func: (progress) => {
                  this.objectsScene.seaCalf.opacity = progress;
                  this.objectsScene.ice.opacity = progress;
              },
              delay: 500,
              duration: 300,
              easing: easing.easeInQuad,
          })
      );
  }

  initSnowFlakesAnimations() {
    this.animations.push(
        new Animation({
          func: (progress, details) => {
            this.objectsScene.snowFlake1.transforms.translateY =
                    2 *
                    Math.sin((1.5 * (details.currentTime - details.startTime)) / 1000);
          },
          duration: `infinite`,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress, details) => {
            this.objectsScene.snowFlake2.transforms.translateY =
                2 * Math.sin((1.5 * (details.currentTime - details.startTime)) / 1000);
          },
          delay: 700,
          duration: `infinite`,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.snowFlake1.opacity = progress;
          },
          duration: 1000,
          delay: 800,
          easing: easing.easeInQuad,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.snowFlake2.opacity = progress;
          },
          duration: 1000,
          delay: 1200,
          easing: easing.easeInQuad,
        })
    );
  }

  initPlaneAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            this.objectsScene.plane.transforms.translateX = -40 * progressReversed;
            this.objectsScene.plane.transforms.translateY =
                5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
            this.objectsScene.plane.transforms.rotate =
                45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
            this.objectsScene.plane.opacity = progress;
          },
          duration: 500,
          delay: 1100,
          easing: easing.easeInQuad,
        })
    );
  }

  initTreesAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.tree1.transforms.translateY = 30 * (1 - progress);
            this.objectsScene.tree1.opacity = progress;
          },
          duration: 500,
          delay: 1400,
          easing: easing.easeInQuad,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objectsScene.tree2.transforms.translateY = 30 * (1 - progress);
            this.objectsScene.tree2.opacity = progress;
          },
          duration: 500,
          delay: 1200,
          easing: easing.easeInQuad,
        })
    );
  }

  initTraceAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            const progressReversed = 1 - progress;
            local.trace.radius = 15 * progress;
            local.trace.centerY = 55 - 15 * progressReversed;
            local.trace.endX = 91 - 35 * progressReversed;
            local.trace.endY = 49 - 12 * progressReversed;
            local.trace.angle = 30 + 120 * progressReversed;
            local.trace.deltasLength = 10 * progress;
            local.trace.opacity = progress;
          },
          duration: 500,
          delay: 1200,
          easing: easing.easeInQuad,
        })
    );
  }

  startAnimation() {
    this.animations.forEach(animation => animation.start());
  }

  stopAnimation() {
    this.animations.forEach(animation => animation.stop());
  }
}
