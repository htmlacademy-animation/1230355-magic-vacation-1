import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import {Saturn} from './3d-objects/saturn';
import {Pyramid} from './3d-objects/pyramid';
import {Snowman} from './3d-objects/snowman';
import {Lantern} from './3d-objects/lantern';
import SvgLoader from './3d-objects/intro-screen';
import {Carpet} from './3d-objects/carpet';
import {Road} from './3d-objects/road';
import {reflection3D} from '../../helpers/3d-data';
import {color3D} from '../../helpers/3d-data';
import {loadModel} from '../../helpers/3d-object-creator';

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  addSaturn() {
    const saturn = new Saturn({
      colorSaturn: color3D.DominantRed,
      colorRing: color3D.BrightPurple,
      colorRope: color3D.MetalGrey,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    saturn.position.set(0, 200, 200);
    scene.addSceneObject(saturn);
  },
  addDarkSaturn() {
    const saturn = new Saturn({
      colorSaturn: color3D.ShadowedDominantRed,
      colorRing: color3D.ShadowedBrightPurple,
      colorRope: color3D.MetalGrey,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    saturn.position.set(300, 200, 200);
    scene.addSceneObject(saturn);
  },
  addPyramid() {
    const pyramid = new Pyramid({
      pyramidColor: color3D.Blue,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    pyramid.position.set(-230, 150, 350);
    scene.addSceneObject(pyramid);
  },
  addSnowman() {
    const snowman = new Snowman({
      colorSphere: color3D.SnowColor,
      metalnessSphere: reflection3D.strong.metalness,
      roughnessSphere: reflection3D.strong.roughness,
      colorCone: color3D.Orange,
      metalnessCone: reflection3D.soft.metalness,
      roughnessCone: reflection3D.soft.roughness
    });
    snowman.position.set(-500, 190, 350);
    scene.addSceneObject(snowman);
  },
  addLantern() {
    const lantern = new Lantern({
      lanternColor: color3D.Blue,
      lampColor: color3D.LightBlue,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    lantern.position.set(450, 60, 220);
    scene.addSceneObject(lantern);
  },
  addKeyHole() {
    const scale = 1.5;
    const keyHoleGroup = new THREE.Group();
    const keyHole = new SvgLoader(`keyHole`).createSvgGroup();
    keyHole.position.set(-1000 * scale, 1000 * scale, 0);
    keyHole.scale.set(scale, -scale, scale);
    keyHoleGroup.add(keyHole);

    const flatnessGeometry = new THREE.PlaneGeometry(500, 500);
    const flatnessMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color3D.Purple),
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness
    });
    const flatnessMesh = new THREE.Mesh(flatnessGeometry, flatnessMaterial);
    flatnessMesh.position.z = 2;
    keyHoleGroup.add(flatnessMesh);

    scene.addSceneObject(keyHoleGroup);
  },
  addFlamingo() {
    const flamingo = new SvgLoader(`flamingo`).createSvgGroup();
    const scale = 2;
    flamingo.position.set(-520, 380, 80);
    flamingo.scale.set(-scale, -scale, scale);
    flamingo.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-5.0), THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(25.0)), `XYZ`);
    scene.addSceneObject(flamingo);
  },
  addQuestion() {
    const question = new SvgLoader(`question`).createSvgGroup();
    const scale = 2;
    question.position.set(100, -330, 100);
    question.scale.set(scale, -scale, scale);
    question.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-40.0), THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(20.0)), `XYZ`);
    scene.addSceneObject(question);
  },
  addSnowFlake() {
    const snowflake = new SvgLoader(`snowflake`).createSvgGroup();
    const scale = 1.7;
    snowflake.position.set(-450, -10, 120);
    snowflake.scale.set(scale, scale, scale);
    snowflake.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-10.0), THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(10.0)), `XYZ`);
    scene.addSceneObject(snowflake);
  },
  addLeaf() {
    const leaf = new SvgLoader(`leaf`).createSvgGroup();
    const scale = 1.7;
    leaf.position.set(660, 340, 200);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(7.0), THREE.MathUtils.degToRad(-70.0), THREE.MathUtils.degToRad(-70.0)), `XYZ`);
    scene.addSceneObject(leaf);
  },
  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 1;
    flower.position.set(300, -200, 200);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-40.0), THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(20.0)), `XYZ`);
    scene.addSceneObject(flower);
  },
  addCarpet() {
    const carpet = new Carpet({
      mainColor: color3D.LightPurple,
      additionalColor: color3D.AdditionalPurple,
    });
    const scale = 0.7;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(25, 215, 20);
    carpet.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(13.0), THREE.MathUtils.degToRad(-52.0), 0), `XYZ`);
    scene.addSceneObject(carpet);
  },
  addRoad() {
    const road = new Road({
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness,
    });
    road.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-46.0), 0), `XYZ`);
    scene.addSceneObject(road);
  },
  addAirplane() {
    const name = `airplane`;
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color3D.White),
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness
    });
    loadModel(name, material, (mesh) => {
      mesh.name = name;
      mesh.position.set(250, 150, 100);
      mesh.scale.set(1.4, 1.4, 1.4);
      scene.addSceneObject(mesh);
    });
  },
  addSuitcase() {
    const name = `suitcase`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(-120, 0, 120);
      mesh.scale.set(0.8, 0.8, 0.8);
      scene.addSceneObject(mesh);
    });
  },
  addWatermelon() {
    const name = `watermelon`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(100, 250, 60);
      mesh.scale.set(2.2, 2.2, 2.2);
      scene.addSceneObject(mesh);
    });
  },

  async addScreenMesh() {
    // this.addSaturn();
    // this.addDarkSaturn();
    // this.addPyramid();
    // this.addSnowman();
    // this.addLantern();

    // this.addFlamingo();
    // this.addQuestion();
    // this.addSnowFlake();
    // this.addLeaf();
    // this.addFlowers();
    // this.addCarpet();
    // this.addRoad();

    this.addKeyHole();
    this.addAirplane();
    this.addWatermelon();
    this.addSuitcase();
  },
};
