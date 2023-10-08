import {scene} from './initAnimationScreen';
import {SvgLoader} from "./svg-objects/svg-insert";
import {EXTRUDE_SETTINGS, SVG_ELEMENTS} from '../../helpers/constants';
import {MainPageComposition} from './scene-intro';
import {MaterialCreator} from './material-creator';
import {ExtrudeSvgCreator} from './svg-objects/extrude-svg';
import {ObjectsCreator} from '../../helpers/3d-object-creator';
import {PageSceneCreator} from './page-scene-creator';
import {LatheGeometryCreator} from './lathe-geometry';
import {RoomsPageScene} from './rooms/story-screen';
import {AnimationManager} from './animation-change';
import {CameraRig} from './rig/camera';

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
    this.isInit = false;
    this.previousRoomSceneIndex = 1;
  }

  addMainPageScene() {
    if (!this.mainPageScene) {
      this.mainPageScene = new MainPageComposition(
          pageSceneCreator,
          animationManager
      );
    }
    this.mainPageScene.position.set(0, 0, 4000);

    scene.addSceneObject(this.mainPageScene);
  }

  addRoomsPageScene() {
    this.roomsPageScene = new RoomsPageScene(
        pageSceneCreator,
        animationManager
    );

    this.roomsPageScene.position.set(0, -330, 0);

    scene.addSceneObject(this.roomsPageScene);
  }

  initScene(startSceneIndex) {
    this.addMainPageScene();
    this.addRoomsPageScene();

    this.addCameraRig(startSceneIndex);

    this.isInit = true;
  }

  addCameraRig(startSceneIndex) {
    this.cameraRig = new CameraRig(
        CameraRig.getCameraRigStageState(startSceneIndex)
    );

    this.cameraRig.addObjectToCameraNull(scene.camera);
    this.cameraRig.addObjectToCameraNull(scene.lightGroup);
    scene.scene.add(this.cameraRig);
  }

  showMainScene() {
    this.cameraRig.changeStateTo(CameraRig.getCameraRigStageState(0));
  }

  showRoomScene(index) {
    if (typeof index === `number`) {
      this.previousRoomSceneIndex = index;
    }

    this.cameraRig.changeStateTo(
        CameraRig.getCameraRigStageState(index || this.previousRoomSceneIndex)
    );
  }
}
