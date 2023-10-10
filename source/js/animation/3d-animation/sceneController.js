import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import {SvgLoader} from "./svg-objects/svg-insert";
import {EXTRUDE_SETTINGS, OBJECT_ELEMENTS, SVG_ELEMENTS} from '../../helpers/constants';
import {MainPageComposition} from './scene-intro';
import {MaterialCreator} from './material-creator';
import {ExtrudeSvgCreator} from './svg-objects/extrude-svg';
import {ObjectsCreator} from '../../helpers/3d-object-creator';
import {PageSceneCreator} from './page-scene-creator';
import {LatheGeometryCreator} from './lathe-geometry';
import {RoomsPageScene} from './rooms/story-screen';
import {AnimationManager} from './animation-change';
import {CameraRig} from './rig/camera';
import easing from '../../helpers/easing';
import {createObjectTransformAnimation} from "./animation-creator";

const materialCreator = new MaterialCreator();
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
  constructor() {
    this.previousRoomSceneIndex = 1;
    this.isSuitcaseAppear = false;
    this.isMainPageObjectsAppear = false;
  }

  async initScene(startSceneIndex) {
    await this.addMainPageScene();
    await this.addRoomsPageScene();
    await this.initSuitCase();

    if (startSceneIndex === 0) {
      animationManager.startMainPageAnimations();
      this.isMainPageObjectsAppear = true;
    } else {
      animationManager.startRoomAnimations(0);
      animationManager.startSuitcaseAnimations();
      this.isSuitcaseAppear = true;
    }

    this.addCameraRig(startSceneIndex);
  }

  async addMainPageScene() {
    this.mainPageScene = new MainPageComposition(pageSceneCreator, animationManager);
    this.mainPageScene.position.set(0, 0, 4000);

    await this.mainPageScene.constructChildren();

    scene.addSceneObject(this.mainPageScene);
  }

  async addRoomsPageScene() {
    this.roomsPageScene = new RoomsPageScene(
        pageSceneCreator,
        animationManager
    );
    await this.roomsPageScene.constructChildren();
    this.roomsPageScene.position.set(0, -330, 0);

    scene.addSceneObject(this.roomsPageScene);
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

  addCameraRig(startSceneIndex) {
    this.cameraRig = new CameraRig(
        CameraRig.getCameraRigStageState(startSceneIndex),
        this
    );

    this.cameraRig.addObjectToCameraNull(scene.camera);
    this.cameraRig.addObjectToCameraNull(scene.lightGroup);
    this.cameraRig.addObjectToRotationAxis(this.suitcase);

    const pointerLight = new THREE.Group();
    pointerLight.position.z = -CameraRig.getMinDepth();
    pointerLight.add(scene.pointerLight);
    this.cameraRig.addObjectToRotationAxis(pointerLight);
    scene.scene.add(this.cameraRig);
  }

  showMainScene() {
    this.cameraRig.changeStateTo(CameraRig.getCameraRigStageState(0));
    setTimeout(() => {
      if (!this.isMainPageObjectsAppear) {
        animationManager.startMainPageAnimations();
        this.isMainPageObjectsAppear = true;
      }
    }, 500);
  }

  showRoomScene(index) {
    if (typeof index === `number`) {
      this.previousRoomSceneIndex = index;
    }

    this.cameraRig.changeStateTo(
        CameraRig.getCameraRigStageState(index || this.previousRoomSceneIndex)
    );
    animationManager.startRoomAnimations(
        (index || this.previousRoomSceneIndex) - 1
    );

    setTimeout(() => {
      if (!this.isSuitcaseAppear) {
        animationManager.startSuitcaseAnimations();
        this.isSuitcaseAppear = true;
      }
    }, 800);
  }
}
