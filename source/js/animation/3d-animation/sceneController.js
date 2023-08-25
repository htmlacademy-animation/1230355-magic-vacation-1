import * as THREE from 'three';
import { scene } from './initAnimationScreen';
// import { SvgLoader } from './svg-objects/svg-insert';
// import { EXTRUDE_SETTINGS, SVG_FORMS } from '../../helpers/constants';
// import { ExtrudeSvgObjects } from './svg-objects/extrude-svg';
// import { LatheGeometryCreator } from './3d-objects/LatheGeometryCreator';
import { Saturn } from './3d-objects/saturn';
import { Pyramid } from './3d-objects/pyramid';
import { Snowman } from './3d-objects/snowman';
import { Lantern } from './3d-objects/lantern';
import SvgLoader from './3d-objects/intro-screen'
import { reflection3D } from '../../helpers/3d-data';
import { color3D } from '../../helpers/3d-data';

export const sceneController = {
    clearScene() {
        scene.clearScene();
    },

    // async addSvgImages() {
    //     const svgShapeLoader = new SvgLoader(SVG_FORMS);
    //     const extrudeSvgObjects = new ExtrudeSvgObjects(
    //         svgShapeLoader,
    //         EXTRUDE_SETTINGS
    //     );

    //     const flamingoMesh = await extrudeSvgObjects.createAndAddToScene(
    //         SVG_FORMS.flamingo,
    //         { depth: 8, bevelThickness: 2, bevelSize: 2 }
    //     );
    //     const snowflakeMesh = await extrudeSvgObjects.createAndAddToScene(
    //         SVG_FORMS.snowflake,
    //         { depth: 8, bevelThickness: 2, bevelSize: 2 }
    //     );
    //     const questionMesh = await extrudeSvgObjects.createAndAddToScene(
    //         SVG_FORMS.question,
    //         { depth: 8, bevelThickness: 2, bevelSize: 2 }
    //     );
    //     const leafMesh = await extrudeSvgObjects.createAndAddToScene(
    //         SVG_FORMS.leaf,
    //         { depth: 8, bevelThickness: 2, bevelSize: 2 }
    //     );

    //     const flowerMesh = await extrudeSvgObjects.createAndAddToScene(
    //         SVG_FORMS.flower,
    //         { depth: 4, bevelThickness: 2, bevelSize: 2 }
    //     );

    //     const keyholeMesh = await extrudeSvgObjects.createAndAddToScene(
    //         SVG_FORMS.keyhole,
    //         { depth: 4, bevelThickness: 2, bevelSize: 2 }
    //     );

    //     flamingoMesh.position.set(-100, 62, 0);
    //     flamingoMesh.rotateX(Math.PI);

    //     questionMesh.position.set(0, 200, 0);
    //     questionMesh.rotateZ(Math.PI);
    //     questionMesh.rotateY(Math.PI);

    //     leafMesh.position.set(120, 0, 0);

    //     flowerMesh.rotateZ(Math.PI);
    //     flowerMesh.position.set(200, -50, 0);

    //     keyholeMesh.position.set(-1000, -1000, -200);

    //     scene.addSceneObject(flamingoMesh);
    //     scene.addSceneObject(snowflakeMesh);
    //     scene.addSceneObject(questionMesh);
    //     scene.addSceneObject(leafMesh);
    //     scene.addSceneObject(flowerMesh);
    //     scene.addSceneObject(keyholeMesh);
    // },

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
        const keyHoleGroup = new SvgLoader({
            colorFlatness: color3D.Purple,
            metalnessFlatness: reflection3D.basic.metalness,
            roughnessFlatness: reflection3D.basic.roughness
        });
        const keyHole = new SvgLoader(`keyHole`).createSvgGroup();
        const scale = 1.5;
        keyHole.position.set(-1000 * scale, 1000 * scale, 0);
        keyHole.scale.set(scale, -scale, scale);
        scene.addSceneObject(keyHole);

        const flatnessGeometry = new THREE.PlaneGeometry(500, 500);
        const flatnessMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(options.colorFlatness),
            metalness: options.metalnessFlatness,
            roughness: options.roughnessFlatness,
        });
        const flatnessMesh = new THREE.Mesh(flatnessGeometry, flatnessMaterial);
        flatnessMesh.position.z = 2;
        scene.addSceneObject(flatnessMesh);

        scene.addSceneObject(keyHoleGroup);
    },

    async addScreenMesh() {
        this.addSaturn();
        this.addDarkSaturn();
        this.addPyramid();
        this.addSnowman();
        this.addLantern();
        this.addKeyHole();
    },
};
