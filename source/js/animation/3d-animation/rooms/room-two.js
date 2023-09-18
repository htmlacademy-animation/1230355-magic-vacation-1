import {RoomScene} from './room';
import * as THREE from 'three';
import {MATERIAL_TYPE, OBJECT_ELEMENTS, SVG_ELEMENTS} from "../../../helpers/constants";
import {MaterialCreator} from "../material-creator";
import {Lantern} from '../3d-objects/lantern';

export class RoomTwoScene extends RoomScene {
  constructor(pageSceneCreator) {
    super(pageSceneCreator);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.BasicMaterial,
          {
            color: MaterialCreator.Colors.Blue,
            side: THREE.DoubleSide,
          }
      ),
    };
    this.floor = {
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.BrightBlue,
          }
      ),
    };

    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput2,
    };

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();

    this.addLeaves();
    this.addPyramid();
    this.addLantern();
  }

  addLeaves() {
    const config = {
      name: SVG_ELEMENTS.leaf,
      extrude: {
        depth: 2,
        bevelThickness: 1,
        bevelSize: 1,
      },
      transform: {
        transformX: 80,
        transformY: 90,
        transformZ: 480,

        rotateX: -2.6,
        rotateY: -Math.PI / 2,

        scale: 1.1,
      },
    };

    this.pageSceneCreator.createExtrudedSvgMesh(config, (leaf1) => {
      const leaf2 = leaf1.clone();

      this.pageSceneCreator.setTransformParams(leaf2, {
        transformX: 80,
        transformY: 300,
        transformZ: 400,

        rotateX: 2.9,
        rotateY: -Math.PI / 2,

        scale: 2.5,
      });

      this.addObject(leaf1);
      this.addObject(leaf2);
    });
  }

  addPyramid() {
    const pyramid = new THREE.Mesh(
        new THREE.ConeGeometry(250 / Math.pow(2, 0.5), 280, 4),
        this.pageSceneCreator.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.Blue,
        })
    );

    const transform = {
      transformX: 190,
      transformY: 140,
      transformZ: 230,

      rotateY: -Math.PI / 4,

      scale: 1,
    };

    this.pageSceneCreator.setTransformParams(pyramid, transform);

    this.addObject(pyramid);
  }

  addLantern() {
    const lantern = new Lantern(this.pageSceneCreator.materialCreator);

    const transform = {
      transformX: 640,
      transformY: 0,
      transformZ: 110,

      rotateY: -0.3,

      scale: 1,
    };

    this.pageSceneCreator.setTransformParams(lantern, transform);

    this.addObject(lantern);
  }
}
