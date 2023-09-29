// import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import {SvgLoader} from "./svg-objects/svg-insert";
import {EXTRUDE_SETTINGS, SVG_ELEMENTS} from '../../helpers/constants';
import {MainPageComposition} from './scene-intro';
import {MaterialCreator} from './material-creator';
import {ExtrudeSvgCreator} from './svg-objects/extrude-svg';
import {ObjectsCreator} from '../../helpers/3d-object-creator';
import {TransformationGuiHelper} from '../../helpers/transformation-gui-helper';
import {PageSceneCreator} from './page-scene-creator';
import {degreesToRadians} from '../../helpers/utils';
// import {RoomsComposition} from './rooms/rooms-scene';
import {LatheGeometryCreator} from './lathe-geometry';
import {RoomsPageScene} from './rooms/story-screen';
import {AnimationManager} from './animation-change';


const materialCreator = new MaterialCreator();
const latheGeometryCreator = new LatheGeometryCreator();
const svgShapeLoader = new SvgLoader(SVG_ELEMENTS);
const extrudeSvgCreator = new ExtrudeSvgCreator(
    svgShapeLoader,
    EXTRUDE_SETTINGS
);
const objectCreator = new ObjectsCreator();
const transformationGuiHelper = new TransformationGuiHelper();
const pageSceneCreator = new PageSceneCreator(
    materialCreator,
    extrudeSvgCreator,
    objectCreator,
    latheGeometryCreator,
    transformationGuiHelper
);

const animationManager = new AnimationManager();

export const sceneController = {
  ainPageScene: null,
  roomsPageScene: null,
  clearScene() {
    scene.clearScene();
  },

  addMainPageScene() {
    this.clearScene();

    if (!this.mainPageScene) {
      this.mainPageScene = new MainPageComposition(pageSceneCreator, animationManager);
    }

    scene.addSceneObject(this.mainPageScene);
  },

  addRoomsPageScene() {
    this.clearScene();
    const positionZ = 2550;
    const positionY = 700;

    scene.camera.position.set(0, positionY, positionZ);
    scene.lightGroup.position.set(0, positionY, positionZ);

    scene.controls.target.set(
        0,
        positionY - positionZ * Math.tan(degreesToRadians(15)),
        0
    );

    if (!this.roomsPageScene) {
      this.roomsPageScene = new RoomsPageScene(pageSceneCreator, scene);
    }

    scene.addSceneObject(this.roomsPageScene);
  },

  addScene() {
    this.addMainPageScene();
    // this.addRoomsPageComposition();
  },
};
