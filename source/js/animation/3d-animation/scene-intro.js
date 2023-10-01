import * as THREE from 'three';
import {SVG_ELEMENTS, OBJECT_ELEMENTS, MATERIAL_TYPE} from '../../helpers/constants';
import {MaterialCreator} from './material-creator';
import {Saturn} from './3d-objects/saturn';
import easing from '../../helpers/easing';
import Animation from '../2d-animation/animation-2d';
import {createBounceAnimation, createObjectTransformAnimation} from "./animation-creator";

export class MainPageComposition extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();
    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;
    this.objectsLoaded = 0;
    this.meshExtrudedObjects = [
      {
        name: SVG_ELEMENTS.keyhole,
        extrude: {
          depth: 4,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
              MATERIAL_TYPE.SoftMaterial,
              {
                color: MaterialCreator.Colors.DarkPurple,
              }
          ),
        },
        transform: {
          from: {
            transformX: 1000,
            transformY: 1000,
            transformZ: 0,

            rotateX: 0,
            rotateY: 0,
            rotateZ: Math.PI,

            scale: 1,
          },
        },
      },
      {
        name: SVG_ELEMENTS.flamingo,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
              MATERIAL_TYPE.SoftMaterial,
              {
                color: MaterialCreator.Colors.LightDominantRed,
              }
          ),
        },
        transform: {
          from: {
            rotateX: 6.2,
            rotateY: 0.5,
            rotateZ: 3.6,

            scale: 0,
          },
          to: {
            transformX: -460,
            transformY: 270,
            transformZ: 140,

            rotateX: 6.2,
            rotateY: 0.5,
            rotateZ: 3.6,

            scale: 1,
          },
        },
      },
      {
        name: SVG_ELEMENTS.snowflake,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
              MATERIAL_TYPE.BasicMaterial,
              {
                color: MaterialCreator.Colors.Blue,
              }
          ),
        },
        transform: {
          from: {
            rotateX: 6.1,
            rotateY: -1,
            rotateZ: 0.3,

            scale: 0,
          },
          to: {
            transformX: -320,
            transformY: -20,
            transformZ: 90,

            rotateX: 6.1,
            rotateY: 0.7,
            rotateZ: 0.3,

            scale: 1,
          },
        },
      },
      {
        name: SVG_ELEMENTS.leaf,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
              MATERIAL_TYPE.BasicMaterial,
              {
                color: MaterialCreator.Colors.Green,
              }
          ),
        },
        transform: {
          from: {
            rotateX: -1,
            rotateY: 1,
            rotateZ: 4.3,

            scale: 0,
          },
          to: {
            transformX: 500,
            transformY: 290,
            transformZ: 100,

            rotateX: -0.2,
            rotateY: 2.5,
            rotateZ: 4.3,

            scale: 1,
          },
        },
      },
      {
        name: SVG_ELEMENTS.question,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
              MATERIAL_TYPE.BasicMaterial,
              {
                color: MaterialCreator.Colors.Blue,
              }
          ),
        },
        transform: {
          from: {
            rotateX: -1.6,
            rotateY: 2,
            rotateZ: 2.8,

            scale: 0,
          },
          to: {
            transformX: 140,
            transformY: -260,
            transformZ: 50,

            rotateX: -0.7,
            rotateY: 3.2,
            rotateZ: 2.8,

            scale: 1,
          },
        },
      },
    ];

    this.meshObjects = [
      {
        name: OBJECT_ELEMENTS.watermelon,
        bounceAnimation: true,
        transform: {
          from: {
            rotateX: 0,
            rotateY: 3.3,
            rotateZ: 0,

            scale: 0,
          },
          to: {
            transformX: -600,
            transformY: -240,
            transformZ: 200,

            rotateX: 0.3,
            rotateY: 3.3,
            rotateZ: 0.8,

            scale: 1.8,
          },
        },
      },
      // {
      //   name: OBJECT_ELEMENTS.airplane,
      //   transform: {
      //     transformX: 190,
      //     transformY: 120,
      //     transformZ: 70,

      //     rotateX: 0.7,
      //     rotateY: 2.4,
      //     rotateZ: 0,

      //     scale: 1,
      //   },
      //   material: this.pageSceneCreator.materialCreator.create(
      //       MATERIAL_TYPE.BasicMaterial,
      //       {
      //         color: MaterialCreator.Colors.White,
      //       }
      //   ),
      // },
      // {
      //   name: OBJECT_ELEMENTS.suitcase,
      //   transform: {
      //     transformX: -60,
      //     transformY: -120,
      //     transformZ: 120,

      //     rotateX: 0.5,
      //     rotateY: 3.8,
      //     rotateZ: 0.2,

      //     scale: 0.4,
      //   },
      // },
    ];

    this.constructChildren();
  }

  constructChildren() {
    this.addMeshObjects();
    this.addExtrudedSvgObjects();
    this.addPlaneMeshBehindKeyhole();

    this.addSaturn();
  }

  addMeshObjects() {
    this.meshObjects.forEach((config) => {
      this.pageSceneCreator.createObjectMesh(config, this.addObject(config));
    });
  }

  addExtrudedSvgObjects() {
    this.meshExtrudedObjects.forEach((config) => {
      this.pageSceneCreator.createExtrudedSvgMesh(
          config,
          this.addObject(config)
      );
    });
  }

  addObject(config) {
    return (obj) => {
      if (config.transform.to) {
        this.animationManager.addAnimations(
            createObjectTransformAnimation(obj, config.transform, {
              duration: 1500,
              delay: 500,
              easing: easing.easeOutCubic,
            })
        );
      }

      if (config.bounceAnimation) {
        this.animationManager.addAnimations(createBounceAnimation(obj));
      }

      this.addMesh(obj);
    };
  }

  addSaturn() {
    const saturn = new Saturn(this.pageSceneCreator.materialCreator, {
      darkMode: false,
      withRope: false,
    });

    const transform = {
      from: {
        rotateY: 3.6,
        rotateZ: 5,

        scale: 0,
      },
      to: {
        transformX: 350,
        transformY: -120,
        transformZ: 140,

        rotateY: 3.6,
        rotateZ: 3,

        scale: 0.5,
      },
    };

    this.pageSceneCreator.setTransformParams(saturn, transform.from);

    this.animationManager.addAnimations(
        createObjectTransformAnimation(saturn, transform, {
          duration: 1500,
          delay: 500,
          easing: easing.easeOutCubic,
        })
    );

    this.animationManager.addAnimations(createBounceAnimation(saturn));

    this.addMesh(saturn);
  }

  addPlaneMeshBehindKeyhole() {
    const meshBehindTheKeyHole = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400, 2, 2),
        this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.BasicMaterial,
            {
              color: MaterialCreator.Colors.Purple,
            }
        )
    );

    meshBehindTheKeyHole.position.set(0, 0, -10);

    this.addMesh(meshBehindTheKeyHole);
  }
  addMesh(mesh) {
    this.objectsLoaded++;

    this.add(mesh);

    if (
      this.objectsLoaded ===
      this.meshObjects.length + this.meshExtrudedObjects.length + 2
    ) {
      this.animationManager.startAnimations();
    }
  }

  getCurrentTransformPropertyByName(propertyName, {to, from}, progress) {
    const defaultValue = propertyName === `scale` ? 1 : 0;

    const fromValue =
      typeof from[propertyName] === `number`
        ? from[propertyName]
        : defaultValue;

    return typeof to[propertyName] === `number`
      ? fromValue + (to[propertyName] - fromValue) * progress
      : fromValue;
  }

  addObjectTransformAnimation(obj, transform) {
    this.addObjectAppearAnimation((progress) => {
      const scale = this.getCurrentTransformPropertyByName(
          `scale`,
          transform,
          progress
      );

      obj.position.set(
          ...[`transformX`, `transformY`, `transformZ`].map((name) =>
            this.getCurrentTransformPropertyByName(name, transform, progress)
          )
      );
      obj.rotation.set(
          ...[`rotateX`, `rotateY`, `rotateZ`].map((name) =>
            this.getCurrentTransformPropertyByName(name, transform, progress)
          )
      );
      obj.scale.set(scale, scale, scale);
    });
  }

  addObjectAppearAnimation(func) {
    this.animationManager.addAnimations(
        new Animation({
          func,
          duration: 1500,
          delay: 500,
          easing: easing.easeOutCubic,
        })
    );
  }

  addBounceAnimation(obj) {
    const amplitude = 0.3 + Math.random() / 1.5;
    const period = 700 + 300 * Math.random();

    this.animationManager.addAnimations(
        new Animation({
          func: (_, {startTime, currentTime}) => {
            obj.position.y =
            obj.position.y +
            amplitude * Math.sin((currentTime - startTime) / period);
          },
          duration: `infinite`,
          delay: 2000,
          easing: easing.easeOutCubic,
        })
    );
  }
}
