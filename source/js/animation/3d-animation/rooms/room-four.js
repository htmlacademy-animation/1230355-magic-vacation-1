import * as THREE from 'three';
import {RoomScene} from './room';
import {MATERIAL_TYPE, OBJECT_ELEMENTS, SVG_ELEMENTS} from '../../../helpers/constants';
import {MaterialCreator} from '../material-creator';
import {Saturn} from '../3d-objects/saturn';
import {Carpet} from '../3d-objects/carpet';
import Animation from '../../2d-animation/animation-2d';
import {degreesToRadians} from "../../../helpers/utils";
import easing from '../../../helpers/easing';

export class RoomFourScene extends RoomScene {
  constructor(pageSceneCreator, animationManager) {
    super(pageSceneCreator, animationManager);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.BasicMaterial,
          {
            color: MaterialCreator.Colors.ShadowedPurple,
            side: THREE.DoubleSide,
          }
      ),
    };
    this.floor = {
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.ShadowedDarkPurple,
          }
      ),
    };
    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput4,
    };
    this.constructChildren();
  }
  constructChildren() {
    super.constructChildren();
    this.addFlower();
    this.addDarkSaturn();
    this.addCarpet();
    this.addSonya();
  }
  addFlower() {
    const config = {
      name: SVG_ELEMENTS.flower,
      extrude: {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.SoftMaterial,
            {
              color: MaterialCreator.Colors.ShadowedAdditionalPurple,
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
    this.pageSceneCreator.createExtrudedSvgMesh(config, (obj) => {
      this.addObject(obj);
    });
  }
  addDarkSaturn() {
    const saturn = new Saturn(this.pageSceneCreator.materialCreator, {
      darkMode: true,
      withRope: true,
    });

    const transform = {
      position: {
        x: 350,
        y: 500,
        z: 280,
      },
      rotation: {
        y: -Math.PI / 2,
      },
      scale: 1,
    };
    this.pageSceneCreator.setTransformParams(saturn, transform);
    this.addObject(saturn);
  }
  addCarpet() {
    const carpet = new Carpet(this.pageSceneCreator);
    this.addObject(carpet);
  }
  addSonya() {
    this.pageSceneCreator.createObjectMesh(
        {
          name: OBJECT_ELEMENTS.sonya,
          transform: {
            position: {
              x: 440,
              y: 120,
              z: 280,
            },
          },
        },
        (sonya) => {
          this.animationManager.addAnimations(
              new Animation({
                func: (_, {startTime, currentTime}) => {
                  sonya.position.y =
                120 + 10 * Math.sin((currentTime - startTime) / 500);
                },
                duration: `infinite`,
                easing: easing.easeInOutSine,
              })
          );

          sonya.traverse((obj) => {
            if (obj.name === `RightHand`) {
              this.animationManager.addAnimations(
                  new Animation({
                    func: (_, {startTime, currentTime}) => {
                      obj.rotation.y =
                    degreesToRadians(-55) +
                    degreesToRadians(5) *
                      Math.cos(1.5 + (currentTime - startTime) / 500);
                    },
                    duration: `infinite`,
                    easing: easing.easeInQuad,
                  })
              );
            } else if (obj.name === `LeftHand`) {
              this.animationManager.addAnimations(
                  new Animation({
                    func: (_, {startTime, currentTime}) => {
                      obj.rotation.y =
                    degreesToRadians(55) +
                    degreesToRadians(5) *
                      Math.cos(-1.5 + (currentTime - startTime) / 500);
                    },
                    duration: `infinite`,
                    easing: easing.easeInQuad,
                  })
              );
            }
          });

          this.addObject(sonya);
          this.animationManager.startAnimations();
        }
    );
  }
}
