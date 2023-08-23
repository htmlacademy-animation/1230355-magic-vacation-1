import {scene} from './initAnimationScreen';
// import { ObjectsScene } from './objects-scene';
import {SvgLoader} from './svg-obgects/svg-insert';
import {EXTRUDE_SETTINGS, SVG_FORMS} from '../../helpers/constants';
import {ExtrudeSvgObjects} from './svg-obgects/extrude-svg';

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  // addScreenMesh() {
  //     scene.addSceneObject(new ObjectsScene());
  // },

  async addScreenMesh() {
    // scene.addSceneObject(new SceneWithLantern());

    const svgShapeLoader = new SvgLoader(SVG_FORMS);
    const extrudeSvgObjects = new ExtrudeSvgObjects(
        svgShapeLoader,
        EXTRUDE_SETTINGS
    );

    const flamingoMesh = await extrudeSvgObjects.createAndAddToScene(
        SVG_FORMS.flamingo,
        {depth: 8, bevelThickness: 2, bevelSize: 2}
    );
    const snowflakeMesh = await extrudeSvgObjects.createAndAddToScene(
        SVG_FORMS.snowflake,
        {depth: 8, bevelThickness: 2, bevelSize: 2}
    );
    const questionMesh = await extrudeSvgObjects.createAndAddToScene(
        SVG_FORMS.question,
        {depth: 8, bevelThickness: 2, bevelSize: 2}
    );
    const leafMesh = await extrudeSvgObjects.createAndAddToScene(
        SVG_FORMS.leaf,
        {depth: 8, bevelThickness: 2, bevelSize: 2}
    );

    const flowerMesh = await extrudeSvgObjects.createAndAddToScene(
        SVG_FORMS.flower,
        {depth: 4, bevelThickness: 2, bevelSize: 2}
    );

    const keyholeMesh = await extrudeSvgObjects.createAndAddToScene(
        SVG_FORMS.keyhole,
        {depth: 4, bevelThickness: 2, bevelSize: 2}
    );

    flamingoMesh.position.set(-100, 62, 0);
    flamingoMesh.rotateX(Math.PI);

    questionMesh.position.set(0, 200, 0);
    questionMesh.rotateZ(Math.PI);
    questionMesh.rotateY(Math.PI);

    leafMesh.position.set(120, 0, 0);

    flowerMesh.rotateZ(Math.PI);
    flowerMesh.position.set(200, -50, 0);

    keyholeMesh.position.set(-1000, -1000, -200);

    scene.addSceneObject(flamingoMesh);
    scene.addSceneObject(snowflakeMesh);
    scene.addSceneObject(questionMesh);
    scene.addSceneObject(leafMesh);
    scene.addSceneObject(flowerMesh);
    scene.addSceneObject(keyholeMesh);
  }

};
