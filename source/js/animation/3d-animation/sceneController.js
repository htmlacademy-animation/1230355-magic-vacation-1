// import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import {SvgLoader} from "./svg-objects/svg-insert";
import {EXTRUDE_SETTINGS, SVG_ELEMENTS} from "../../helpers/constants";
import {MainPageComposition} from "./scene-intro";
import {MaterialCreator} from "./material-creator";
import {ExtrudeSvgCreator} from "./svg-objects/extrude-svg";
import {ObjectsCreator} from "../../helpers/object-creator";

const materialCreator = new MaterialCreator();
const svgShapeLoader = new SvgLoader(SVG_ELEMENTS);
const extrudeSvgCreator = new ExtrudeSvgCreator(
    svgShapeLoader,
    EXTRUDE_SETTINGS
);
const objectCreator = new ObjectsCreator(materialCreator);

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  addMainPageComposition() {
    const mainPageComposition = new MainPageComposition(
        materialCreator,
        extrudeSvgCreator,
        objectCreator
    );

    scene.addSceneObject(mainPageComposition);
  },

  async addScreenMesh() {
    this.addMainPageComposition();
  },
};
