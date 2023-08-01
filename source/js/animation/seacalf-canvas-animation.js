import Animation from '../animation/animation-2d';
import easing from '../helpers/easing';

export default class SeaCalfScene {
    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext(`2d`);
        this.canvas.width = 1000;
        this.canvas.height = 1000;

        this.size = 1000;

        this.airplaneImg = new Image();
        this.iceImg = new Image();
        this.seaCalfImg = new Image();
        this.snowFlake1Img = new Image();
        this.snowFlake2Img = new Image();
        this.tree1Img = new Image();
        this.tree2Img = new Image();

        this.loadingCounter = 0;

        this.ice = {
            img: this.iceImg,
            x: 50,
            y: 69,
            size: 49,
            opacity: 0,
            transforms: {
                translateY: 30,
            },
        };

        this.seaCalf = {
            img: this.seaCalfImg,
            x: 48,
            y: 60,
            size: 57,
            opacity: 0,
            transforms: {
                translateY: 30,
            },
        };

        this.snowFlake1 = {
            img: this.snowFlake1Img,
            x: 23,
            y: 55,
            size: 26,
            opacity: 0,
            transforms: {
                rotate: -30
            },
        };

        this.snowFlake2 = {
            img: this.snowFlake2Img,
            x: 75,
            y: 65,
            size: 19,
            opacity: 0,
            transforms: {
                rotate: 30,
                scaleX: -1,
            },
        };

        this.trace = {
            centerX: 40,
            centerY: 55,
            radius: 15,
            endX: 91,
            endY: 49,
            angle: 30,
            deltasLength: 10,
            opacity: 0,
        };

        this.plane = {
            img: this.airplaneImg,
            x: 95,
            y: 45,
            size: 15,
            opacity: 0,
            transforms: {
                translateY: -10,
            },
        };

        this.tree1 = {
            img: this.tree2Img,
            x: 60,
            y: 55,
            size: 5,
            opacity: 0,
            transforms: {
                translateY: 30,
            },
        };

        this.tree2 = {
            img: this.tree1Img,
            x: 64,
            y: 58,
            size: 4,
            opacity: 0,
            transforms: {
                translateY: 30,
            },
        };

        this.loadImages();
        this.initEventListeners();

        this.animations = [];

        this.updateSceneSizing();
        this.initResizeListener();
    }
    initResizeListener() {
        window.addEventListener(`resize`, this.updateSceneSizing.bind(this));
    }
    updateSceneSizing() {
        this.size = Math.min(window.innerWidth, window.innerHeight);

        this.canvas.height = this.size;
        this.canvas.width = this.size;
    }
    increaseLoadingCounter() {
        this.loadingCounter++;

        if (this.loadingCounter === 7) {
            this.drawScene();
        }
    }
    initEventListeners() {
        this.airplaneImg.onload = () => {
            this.increaseLoadingCounter();
        };

        this.iceImg.onload = () => {
            this.increaseLoadingCounter();
        };

        this.seaCalfImg.onload = () => {
            this.increaseLoadingCounter();
        };

        this.snowFlake1Img.onload = () => {
            this.increaseLoadingCounter();
        };

        this.snowFlake2Img.onload = () => {
            this.increaseLoadingCounter();
        };

        this.tree1Img.onload = () => {
            this.increaseLoadingCounter();
        };

        this.tree2Img.onload = () => {
            this.increaseLoadingCounter();
        };
    }
    loadImages() {
        this.airplaneImg.src = `./img/module-4/win-primary-images/airplane.png`;
        this.iceImg.src = `./img/module-4/win-primary-images/ice.png`;
        this.seaCalfImg.src = `./img/module-4/win-primary-images/sea-calf-2.png`;
        this.snowFlake1Img.src = `./img/module-4/win-primary-images/snowflake.png`;
        this.snowFlake2Img.src = `./img/module-4/win-primary-images/snowflake.png`;
        this.tree1Img.src = `./img/module-4/win-primary-images/tree.png`;
        this.tree2Img.src = `./img/module-4/win-primary-images/tree-2.png`;
    }
    drawImage(object) {
        let x = object.x;
        let y = object.y;
        let size = object.size;
        let opacity = object.opacity;
        let image = object.img;
        let transforms = object.transforms;

        let width = this.size * (size / 100);
        let height = (this.size * (size / 100) * image.height) / image.width;

        x = this.size * (x / 100) - width / 2;
        y = this.size * (y / 100) - height / 2;

        if (opacity === 0) {
            return;
        }
        if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
            return;
        }
        this.ctx.save();
        if (transforms) {
            if (transforms.translateX) {
                x += this.size * (transforms.translateX / 100);
            }
            if (transforms.translateY) {
                y += this.size * (transforms.translateY / 100);
            }
            if (transforms.rotate) {
                this.ctx.translate(x + width / 2, y + height / 2);
                this.ctx.rotate((transforms.rotate * Math.PI) / 180);
            }
            if (transforms.scaleX) {
                width *= transforms.scaleX;
                if (transforms.scaleX < 0) {
                    this.ctx.scale(-1, 1);
                    x = -x;
                }
            }
            if (transforms.scaleY) {
                height *= transforms.scaleY;
                if (transforms.scaleY < 0) {
                    this.ctx.scale(1, -1);

                    y = -y;
                }
            }
            if (transforms.rotate) {
                this.ctx.translate(-x - width / 2, -y - height / 2);
            }
        }
        if (opacity) {
            this.ctx.globalAlpha = opacity;
        }
        this.ctx.drawImage(image, x, y, width, height);
        this.ctx.restore();
    }

    drawTrace() {
        const trace = this.trace;
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
    drawScene() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawTrace();
        this.drawImage(this.plane);
        this.drawImage(this.tree1);
        this.drawImage(this.tree2);
        this.drawImage(this.ice);
        this.drawImage(this.seaCalf);
        this.drawImage(this.snowFlake1);
        this.drawImage(this.snowFlake2);
    }
    initSnowFlakesAnimations() {
        this.animations.push(
            new Animation({
                func: (progress, details) => {
                    this.snowFlake1.transforms.translateY = 2 * Math.sin((1.5 * (details.currentTime - details.startTime)) / 1000);
                },
                duration: `infinite`,
            })
        );

        this.animations.push(
            new Animation({
                func: (progress, details) => {
                    this.snowFlake2.transforms.translateY =
                        2 *
                        Math.sin((1.5 * (details.currentTime - details.startTime)) / 1000);
                },
                delay: 700,
                duration: `infinite`,
            })
        );

        this.animations.push(
            new Animation({
                func: (progress) => {
                    this.snowFlake1.opacity = progress;
                },
                duration: 1000,
                delay: 800,
                easing: easing.easeInQuad,
            })
        );

        this.animations.push(
            new Animation({
                func: (progress) => {
                    this.snowFlake2.opacity = progress;
                },
                duration: 1000,
                delay: 1200,
                easing: easing.easeInQuad,
            })
        );
    }

    initIceAndSeaCalfAnimations() {
        this.animations.push(
            new Animation({
                func: (progress) => {
                    const progressReversed = 1 - progress;

                    this.ice.transforms.translateY = 30 * progressReversed;
                    this.ice.transforms.rotate = -30 * Math.sin(progressReversed * 2);

                    this.seaCalf.transforms.translateY = 30 * progressReversed;
                    this.seaCalf.transforms.rotate = -30 * Math.sin(progressReversed * 2);
                },
                delay: 500,
                duration: 2000,
                easing: easing.easeOutElastic,
            })
        );

        this.animations.push(
            new Animation({
                func: (progress) => {
                    this.seaCalf.opacity = progress;
                    this.ice.opacity = progress;
                },
                delay: 500,
                duration: 300,
                easing: easing.easeInQuad,
            })
        );
    }

    initPaneAnimations() {
        this.animations.push(
            new Animation({
                func: (progress) => {
                    const progressReversed = 1 - progress;
                    this.plane.transforms.translateX = -40 * progressReversed;
                    this.plane.transforms.translateY =
                        5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
                    this.plane.transforms.rotate =
                        45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
                    this.plane.opacity = progress;
                },
                duration: 500,
                delay: 1100,
                easing: easing.easeInQuad,
            })
        );
    }

    initTraceAnimations() {
        this.animations.push(
            new Animation({
                func: (progress) => {
                    const progressReversed = 1 - progress;
                    this.trace.radius = 15 * progress;
                    this.trace.centerY = 55 - 15 * progressReversed;
                    this.trace.endX = 91 - 35 * progressReversed;
                    this.trace.endY = 49 - 12 * progressReversed;
                    this.trace.angle = 30 + 120 * progressReversed;
                    this.trace.deltasLength = 10 * progress;
                    this.trace.opacity = progress;
                },
                duration: 500,
                delay: 1200,
                easing: easing.easeInQuad,
            })
        );
    }

    initTreesAnimations() {
        this.animations.push(
            new Animation({
                func: (progress) => {
                    this.tree1.transforms.translateY = 30 * (1 - progress);
                    this.tree1.opacity = progress;
                },
                duration: 500,
                delay: 1400,
                easing: easing.easeInQuad,
            })
        );

        this.animations.push(
            new Animation({
                func: (progress) => {
                    this.tree2.transforms.translateY = 30 * (1 - progress);
                    this.tree2.opacity = progress;
                },
                duration: 500,
                delay: 1200,
                easing: easing.easeInQuad,
            })
        );
    }

    startAnimation() {
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
        this.initPaneAnimations();
        this.initTreesAnimations();

        this.animations.forEach((animation) => {
            animation.start();
        });
    }

    stoptAnimation() {
        this.animations.forEach((animation) => {
            animation.stop();
        });
    }
}