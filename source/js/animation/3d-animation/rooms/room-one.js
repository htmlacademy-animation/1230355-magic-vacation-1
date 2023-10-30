import {RoomScene} from './room';
import * as THREE from 'three';
import {MATERIAL_TYPE, OBJECT_ELEMENTS, MESH_NAMES, SVG_ELEMENTS} from '../../../helpers/constants';
import {MaterialCreator} from '../material/material-creator';
import {Saturn} from '../3d-objects/saturn';
import {Carpet} from '../3d-objects/carpet';
import Animation from '../../2d-animation/animation-2d';
import {degreesToRadians} from '../../../helpers/utils';
import easing from '../../../helpers/easing';

export class RoomOneScene extends RoomScene {
  constructor(pageSceneCreator, animationManager) {
    super(pageSceneCreator, animationManager);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.Purple,
            side: THREE.DoubleSide,
          }
      ),
    };
    this.floor = {
      name: OBJECT_ELEMENTS.floor,
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.DarkPurple,
          }
      ),
    };
    this.staticOutput = {name: OBJECT_ELEMENTS.staticOutput1};
  }

  async constructChildren() {
    await super.constructChildren();
    await this.addFlower();
    this.addSaturn();
    this.addCarpet();
    await this.addDog();
  }

  async addFlower() {
    const config = {
      name: SVG_ELEMENTS.flower,
      extrude: {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.SoftMaterial,
            {
              color: MaterialCreator.Colors.ShadowedLightPurple,
            }
        ),
      },
      transform: {
        position: {
          x: 60,
          y: 410,
          z: 440,
        },
        rotation: {
          x: Math.PI,
          y: -Math.PI / 2,
        },
        scale: 1,
      },
    };
    const obj = await this.pageSceneCreator.createExtrudedSvgMesh(config);
    this.addObject(obj);
  }

  addSaturn() {
    const group = new THREE.Group();
    group.position.set(250, 1500, 280);

    const saturn = new Saturn(this.pageSceneCreator.materialCreator, {
      darkMode: false,
      withRope: true,
    });

    const transform = {
      position: {
        x: 0,
        y: -1000,
        z: 0,
      },
      rotation: {
        y: -Math.PI / 2,
      },
      scale: 1,
    };

    this.pageSceneCreator.setTransformParams(saturn, transform);
    group.add(saturn);

    const bounceAngle = 1;
    this.animationManager.addRoomsPageAnimations(
        0,
        new Animation({
          func: (_, {startTime, currentTime}) => {
            group.rotation.z =
            degreesToRadians(bounceAngle) *
            Math.sin((currentTime - startTime) / 1000);
            group.rotation.x =
            degreesToRadians(bounceAngle) *
            Math.sin((currentTime - startTime) / 1000);
          },
          duration: `infinite`,
          easing: easing.easeOutCubic,
        })
    );

    saturn.traverse((obj) => {
      if (obj.isMesh && obj.name === MESH_NAMES.SaturnRing) {
        this.animationManager.addRoomsPageAnimations(
            0,
            new Animation({
              func: (_, {startTime, currentTime}) => {
                obj.rotation.x =
                degreesToRadians(-5) *
                Math.sin((currentTime - startTime) / 1000);
                obj.rotation.y =
                degreesToRadians(10) *
                Math.sin((currentTime - startTime) / 1000);
                obj.rotation.z =
                degreesToRadians(-18) +
                degreesToRadians(5) *
                  Math.sin((currentTime - startTime) / 1000);
              },
              duration: `infinite`,
              easing: easing.easeOutCubic,
            })
        );
      }
    });
    this.addObject(group);
  }

  addCarpet() {
    const carpet = new Carpet(this.pageSceneCreator);
    this.addObject(carpet);
  }

  async addDog() {
    const dog = await this.pageSceneCreator.createObjectMesh({
      name: OBJECT_ELEMENTS.dog,
      transform: {
        position: {
          x: 480,
          z: 420,
        },
        rotation: {
          y: 1.1,
        },
        scale: 1,
      },
    });

    dog.traverse((obj) => {
      if (obj.name === `Tail`) {
        this.animationManager.addRoomsPageAnimations(
            0,
            new Animation({
              func: (_, {startTime, currentTime}) => {
                const time = ((currentTime - startTime) / 70) % (Math.PI * 6.5);
                if (time > 0 && time < Math.PI) {
                  obj.rotation.x = (degreesToRadians(30) * time) / Math.PI;
                } else {
                  obj.rotation.x = -degreesToRadians(30) * Math.cos(time);
                }
              },
              duration: `infinite`,
              easing: easing.easeLinear,
            })
        );
      }
    });

    this.addObject(dog);
  }
}
