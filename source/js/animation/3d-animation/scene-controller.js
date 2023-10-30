import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import {SvgLoader} from './svg-objects/svg-insert';
import {EXTRUDE_SETTINGS, OBJECT_ELEMENTS, SVG_ELEMENTS} from '../../helpers/constants';
import {MainPageComposition} from './scene-intro';
import {MaterialCreator} from './material/material-creator';
import {ExtrudeSvgCreator} from './svg-objects/extrude-svg';
import {ObjectsCreator} from '../../helpers/3d-object-creator';
import {PageSceneCreator} from './page-scene-creator';
import {LatheGeometryCreator} from './lathe-geometry';
import {RoomsPageScene} from './rooms/story-screen';
import {AnimationManager} from './animation-change';
import {CameraRigDesktop} from './rig/camera-desktop';
import {CameraRigMobile} from './rig/camera-mobile';
import easing from '../../helpers/easing';
import {createObjectTransformAnimation} from './animation-creator';
import {degreesToRadians} from '../../helpers/utils';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
import vertexShader from './shaders/custom-vertex-shader.glsl';
import fragmentShader from './shaders/custom-fragment-shader.glsl';
import Animation from '../2d-animation/animation-2d';

const textureLoader = new THREE.TextureLoader();
const materialCreator = new MaterialCreator(textureLoader);
const latheGeometryCreator = new LatheGeometryCreator();
const svgShapeLoader = new SvgLoader(SVG_ELEMENTS);
const extrudeSvgCreator = new ExtrudeSvgCreator(
    svgShapeLoader,
    EXTRUDE_SETTINGS
);
const objectCreator = new ObjectsCreator();
const pageSceneCreator = new PageSceneCreator(
    materialCreator,
    extrudeSvgCreator,
    objectCreator,
    latheGeometryCreator
);

const animationManager = new AnimationManager();

export class SceneController {
  constructor(preloader) {
    this.preloader = preloader;
    this.previousRoomIndex = 1;
    this.isSuitcaseAppear = false;
    this.isMainPageObjectsAppear = false;
    this.eventHandlerTick = null;
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.touchMoveHandler = this.touchMoveHandler.bind(this);
    this.onResize = this.onResize.bind(this);

    window.addEventListener(`resize`, this.onResize);
    this.setBubbleComposer();
  }

  onResize() {
    this.bubbleEffectPass.material.uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;
    this.addCameraRig();
  }

  async initScene(startSceneIndex) {
    this.sceneIndex = startSceneIndex;
    this.preloader.increasePercentage(5);
    await this.addMainPageScene();
    this.preloader.increasePercentage(25);
    await this.addRoomsPageScene();
    this.preloader.increasePercentage(5);
    await this.initSuitCase();
    this.preloader.increasePercentage(15);

    if (startSceneIndex === 0) {
      animationManager.startMainPageAnimations();
      this.isMainPageObjectsAppear = true;
    } else {
      animationManager.startRoomAnimations(0);
      animationManager.startSuitcaseAnimations();
      this.isSuitcaseAppear = true;
    }
    this.preloader.increasePercentage(25);

    this.addCameraRig();
    this.preloader.increasePercentage(25);
    scene.startAnimation();
  }

  async addMainPageScene() {
    this.mainPageScene = new MainPageComposition(pageSceneCreator, animationManager);
    this.mainPageScene.position.set(0, 0, 4000);

    await this.mainPageScene.constructChildren(this.preloader);
    scene.addSceneObject(this.mainPageScene);
  }

  async addRoomsPageScene() {
    this.roomsPageScene = new RoomsPageScene(
        pageSceneCreator,
        animationManager
    );
    await this.roomsPageScene.constructChildren(this.preloader);
    this.roomsPageScene.position.set(0, -200, 0);
    scene.addSceneObject(this.roomsPageScene);
  }
  initBubbleComposer() {
    const composer = new EffectComposer(scene.renderer);

    composer.setPixelRatio(scene.devicePixelRation);

    const renderPass = new RenderPass(
        scene.scene,
        scene.camera
    );

    const effectMaterial = this.getEffectMaterial();

    this.addBubbleAnimation(effectMaterial);

    this.bubbleEffectPass = new ShaderPass(effectMaterial, `map`);

    composer.addPass(renderPass);
    composer.addPass(this.bubbleEffectPass);

    return composer;
  }

  setBubbleComposer() {
    this.bubbleComposer = this.initBubbleComposer();
    scene.setRenderer(this.bubbleComposer);
  }

  removeBubbleComposer() {
    scene.resetRender();
  }

  async initSuitCase() {
    const suitcase = await pageSceneCreator.createObjectMesh({
      name: OBJECT_ELEMENTS.suitcase,
      transform: {
        position: {
          x: -340,
          y: 150,
          z: 750,
        },
        rotation: {
          y: -0.4,
        },
      },
    });
    this.suitcase = new THREE.Group();
    this.suitcase.position.y = this.roomsPageScene.position.y;
    this.suitcase.add(suitcase);

    suitcase.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    animationManager.addSuitcaseAnimations(
        createObjectTransformAnimation(
            suitcase,
            {
              position: {
                y: 0,
              },
              scale: {
                x: 0.95,
                y: 1.1,
                z: 0.95,
              },
            },
            {
              duration: 300,
              easing: easing.easeInCubic,
            }
        ),
        createObjectTransformAnimation(
            suitcase,
            {
              position: {
                y: 2,
              },
              scale: {
                x: 1.05,
                y: 0.93,
                z: 1.05,
              },
            },
            {
              duration: 150,
              delay: 300,
              easing: easing.easeOutCubic,
            }
        ),
        createObjectTransformAnimation(
            suitcase,
            {
              position: {
                y: 1,
              },
              scale: {
                x: 0.98,
                y: 1.04,
                z: 0.98,
              },
            },
            {
              duration: 150,
              delay: 450,
              easing: easing.easeInOutSine,
            }
        ),
        createObjectTransformAnimation(
            suitcase,
            {
              position: {
                y: 0,
              },
              scale: {
                x: 1,
                y: 1,
                z: 1,
              },
            },
            {
              duration: 150,
              delay: 600,
              easing: easing.easeInCubic,
            }
        )
    );
  }

  addDepsToCameraRig(cameraRigInstance) {
    cameraRigInstance.addObjectToCameraNull(scene.camera);
    cameraRigInstance.addObjectToCameraNull(scene.lightGroup);
    cameraRigInstance.addObjectToRotationAxis(this.suitcase);

    const pointerLight = new THREE.Group();
    pointerLight.position.z = 2250;
    pointerLight.add(scene.pointerLight);
    cameraRigInstance.addObjectToRotationAxis(pointerLight);
  }

  subscribeScreenMove() {
    if (`ontouchmove` in window) {
      window.addEventListener(`touchmove`, this.touchMoveHandler);
    } else {
      window.addEventListener(`mousemove`, this.mouseMoveHandler);
    }
  }

  unsubscribeScreenMove() {
    if (`ontouchmove` in window) {
      window.removeEventListener(`touchmove`, this.touchMoveHandler);
    } else {
      window.removeEventListener(`mousemove`, this.mouseMoveHandler);
    }

    if (this.eventHandlerTick) {
      window.cancelAnimationFrame(this.eventHandlerTick);
    }
  }

  addCameraRig() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height < 1 || width < 1) {
      return;
    }

    if (width > height) {
      if (this.cameraRig instanceof CameraRigDesktop) {
        return;
      }

      scene.scene.remove(this.cameraRig);
      this.cameraRigDesktop = new CameraRigDesktop(this.sceneIndex, this);
      this.addDepsToCameraRig(this.cameraRigDesktop);
      this.cameraRig = this.cameraRigDesktop;
      scene.scene.add(this.cameraRig);
    } else {
      if (this.cameraRig instanceof CameraRigMobile) {
        return;
      }

      scene.scene.remove(this.cameraRig);
      this.cameraRigMobile = new CameraRigMobile(this.sceneIndex, this);
      this.addDepsToCameraRig(this.cameraRigMobile);
      this.cameraRig = this.cameraRigMobile;
      scene.scene.add(this.cameraRig);
    }

  }

  showMainScene() {
    this.bubbleEffectPass.enabled = false;
    this.sceneIndex = 0;

    this.unsubscribeScreenMove();
    this.cameraRig.changeStateTo(
        this.cameraRig.getCameraRigStageState(0, this.previousRoomIndex),
        () => {
          this.subscribeScreenMove();
        }
    );
    setTimeout(() => {
      if (!this.isMainPageObjectsAppear) {
        animationManager.startMainPageAnimations();
        this.isMainPageObjectsAppear = true;
      }
    }, 500);
  }

  showRoomScene(nextRoomIndex) {
    if (this.previousRoomIndex === nextRoomIndex) {
      return;
    }
    this.sceneIndex = nextRoomIndex || this.previousRoomIndex;
    this.bubbleEffectPass.enabled = false;
    this.unsubscribeScreenMove();
    if (typeof nextRoomIndex === `number`) {
      this.previousRoomIndex = nextRoomIndex;
    }

    this.cameraRig.changeStateTo(
        this.cameraRig.getCameraRigStageState(
            nextRoomIndex,
            this.previousRoomIndex
        ),
        () => {
          this.subscribeScreenMove();
          if (this.sceneIndex === 2) {
            this.bubbleEffectPass.enabled = true;
          }
        }
    );
    animationManager.startRoomAnimations(this.sceneIndex - 1);

    setTimeout(() => {
      if (!this.isSuitcaseAppear) {
        animationManager.startSuitcaseAnimations();
        this.isSuitcaseAppear = true;
      }
    }, 800);
  }

  mouseMoveHandler(ev) {
    const targetPositionY = ev.y;

    this.handleMove(targetPositionY);
  }

  touchMoveHandler(ev) {
    const targetPositionY = ev.targetTouches[0].clientY;

    this.handleMove(targetPositionY);
  }

  handleMove(targetPositionY) {
    if (this.eventHandlerTick) {
      window.cancelAnimationFrame(this.eventHandlerTick);
    }

    const windowHeight = window.innerHeight;

    const targetPositionYNormalized =
      (2 * (windowHeight / 2 - targetPositionY)) / windowHeight;

    const targetPitchRotation = degreesToRadians(
        this.cameraRig.getMaxPitchRotation() * targetPositionYNormalized
    );

    let currentPitchRotation = this.cameraRig.pitchRotation;

    const movePitchRotationCloserToTarget = (increase) => {
      if (
        (increase && currentPitchRotation > targetPitchRotation) ||
        (!increase && currentPitchRotation < targetPitchRotation)
      ) {
        window.cancelAnimationFrame(this.eventHandlerTick);
        return;
      }

      if (increase) {
        currentPitchRotation += 0.0003;
      } else {
        currentPitchRotation -= 0.0003;
      }

      this.cameraRig.pitchRotation = currentPitchRotation;
      this.cameraRig.redraw();

      this.eventHandlerTick = requestAnimationFrame(() => {
        movePitchRotationCloserToTarget(increase);
      });
    };

    movePitchRotationCloserToTarget(
        targetPitchRotation > this.cameraRig.pitchRotation
    );
  }
  getEffectMaterial(texture) {
    return new THREE.RawShaderMaterial({
      uniforms: {
        map: new THREE.Uniform(texture),
        aspectRatio: new THREE.Uniform(window.innerWidth / window.innerHeight),
        timestamp: new THREE.Uniform(0),
        bubble1: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -2 * 0.07),
          bubbleRadius: 0.06,
          startTime: 0,
          startPositionX: 0.3,
          delay: 600,
          getPositionX(time) {
            return (
              this.startPositionX +
              0.02 * Math.exp(-0.05 * time) * Math.sin(Math.PI * time * 2.5)
            );
          },
          getPositionY: (y) => y + 0.005,
        }),
        bubble2: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -2 * 0.06),
          bubbleRadius: 0.07,
          startTime: 0,
          startPositionX: 0.4,
          delay: 0,
          getPositionX(time) {
            return (
              this.startPositionX +
              0.03 * Math.exp(-0.05 * time) * Math.sin(Math.PI * time * 2.5)
            );
          },
          getPositionY: (y) => y + 0.005,
        }),
        bubble3: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -2 * 0.04),
          bubbleRadius: 0.04,
          startPositionX: 0.5,
          startTime: 0,
          delay: 1000,
          getPositionX(time) {
            return (
              this.startPositionX +
              0.01 * Math.exp(-0.05 * time) * Math.sin(Math.PI * time * 2)
            );
          },
          getPositionY: (y) => y + 0.006,
        }),
        hasBubbles: new THREE.Uniform(false),
      },
      defines: {
        BUBBLE_LINE_WIDTH: 0.002,
      },
      vertexShader,
      fragmentShader,
    });
  }

  addBubbleAnimation(material) {
    const bubble1 = material.uniforms.bubble1.value;
    const bubble2 = material.uniforms.bubble2.value;
    const bubble3 = material.uniforms.bubble3.value;

    animationManager.addRoomsPageAnimations(
        1,
        new Animation({
          func: (_, {startTime, currentTime}) => {
            material.uniforms.timestamp.value = currentTime;

            material.uniforms.hasBubbles.value = true;

            [bubble1, bubble2, bubble3].forEach((bubble) => {
              if (!bubble.startTime) {
                bubble.startTime = startTime;
              }

              if (currentTime < bubble.startTime + bubble.delay) {
                return;
              }

              if (bubble.bubblePosition.y > 1.0 + 2 * bubble.bubbleRadius) {
                bubble.bubblePosition.y = -2 * bubble.bubbleRadius;
                bubble.startPositionX = Math.random();
                bubble.startTime = currentTime;
              }

              const deltaTime = (currentTime - bubble.startTime) / 1000;

              bubble.bubblePosition.x = bubble.getPositionX(deltaTime);
              bubble.bubblePosition.y = bubble.getPositionY(
                  bubble.bubblePosition.y
              );
            });
          },
          duration: `infinite`,
          easing: easing.easeLinear,
        })
    );
  }

}
