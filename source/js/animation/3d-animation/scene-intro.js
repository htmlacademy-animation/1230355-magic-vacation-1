import * as THREE from 'three';
import {SVG_ELEMENTS, OBJECT_ELEMENTS, MATERIAL_TYPE} from '../../helpers/constants';
import {MaterialCreator} from './material-creator';
import {Saturn} from './3d-objects/saturn';
import easing from '../../helpers/easing';
import {createBounceAnimation, createObjectTransformAnimation} from './animation-creator';
import Animation from '../2d-animation/animation-2d';
import {Airplane} from "./3d-objects/airplane";

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
          position: {
            x: 1000,
            y: 1000,
          },
          rotation: {
            z: Math.PI,
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
          rotation: {
            x: 6.2,
            y: 0.5,
            z: 3.6,
          },
          scale: 0,
        },
        transformAppear: {
          position: {
            x: -460,
            y: 370,
            z: 140,
          },
          rotation: {
            x: 6.2,
            y: 0.5,
            z: 3.6,
          },
          scale: 1,
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
          rotation: {
            x: 6.1,
            y: -1,
            z: 0.3,
          },
          scale: 0,
        },
        transformAppear: {
          position: {
            x: -320,
            y: -20,
            z: 90,
          },
          rotation: {
            x: 6.1,
            y: 0.7,
            z: 0.3,
          },
          scale: 1,
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
          rotation: {
            x: -1,
            y: 1,
            z: 4.3,
          },
          scale: 0,
        },
        transformAppear: {
          position: {
            x: 500,
            y: 290,
            z: 100,
          },
          rotation: {
            x: -0.2,
            y: 2.5,
            z: 4.3,
          },
          scale: 1,
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
          rotation: {
            x: -1.6,
            y: 2,
            z: 2.8,
          },
          scale: 0,
        },
        transformAppear: {
          position: {
            x: 140,
            y: -260,
            z: 50,
          },
          rotation: {
            x: -0.7,
            y: 3.2,
            z: 2.8,
          },
          scale: 1,
        },
      },
    ];
    this.meshObjects = [
      {
        name: OBJECT_ELEMENTS.watermelon,
        bounceAnimation: true,
        transform: {
          rotation: {
            x: 0,
            y: 3.3,
            z: 0,
          },
          scale: 0,
        },
        transformAppear: {
          position: {
            x: -600,
            y: -240,
            z: 200,
          },
          rotation: {
            x: 0.3,
            y: 3.3,
            z: 0.8,
          },
          scale: 1.8,
        },
      },
      {
        name: OBJECT_ELEMENTS.suitcase,
        enableGui: true,
        transform: {
          scale: 0,
        },
      },
    ];

    this.constructChildren();

  }
  constructChildren() {
    this.addMeshObjects();
    this.addExtrudedSvgObjects();
    this.addPlaneMeshBehindKeyhole();
    this.addSaturn();
    this.addAirplane();
  }
  addAirplane() {
    const airplane = new Airplane(this.pageSceneCreator);

    airplane.position.x = 135;

    const initialFightRadius = airplane.flightRadius;
    const initialFightHeight = airplane.flightHeight;
    const initialRigRotationY = airplane.rigRotationY;
    const initialPlaneRotationZ = airplane.planeRotationZ;
    const initialPlaneIncline = airplane.planeIncline;

    this.animationManager.addAnimations(
        new Animation({
          func: (progress) => {
            airplane.flightRadius =
            initialFightRadius +
            (airplane.maxFlightRadius - initialFightRadius) * progress;

            airplane.flightHeight =
            initialFightHeight +
            (airplane.maxFlightHeight - initialFightHeight) * progress;

            airplane.rigRotationY =
            initialRigRotationY + (progress * 5 * Math.PI) / 4;

            airplane.planeRotationZ =
            progress < 0.5
              ? initialPlaneRotationZ - progress * Math.PI
              : initialPlaneRotationZ -
                0.5 * Math.PI +
                (progress - 0.5) * Math.PI;

            airplane.planeIncline =
            initialPlaneIncline + (progress * Math.PI) / 5;

            airplane.invalidate(progress);
          },
          duration: 2000,
          delay: 1400,
          easing: easing.easeOutExpo,
        }),
        createBounceAnimation(airplane)
    );

    this.addMesh(airplane);
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
      if (config.name === OBJECT_ELEMENTS.suitcase) {
        const suitcase = this.addSuitCaseAnimation(obj);

        this.addMesh(suitcase);
        return;
      }

      if (config.transformAppear) {
        this.animationManager.addAnimations(
            createObjectTransformAnimation(obj, config.transformAppear, {
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
    this.pageSceneCreator.setTransformParams(saturn, {
      rotation: {y: 3.6, z: 1},
      scale: 0,
    });
    this.animationManager.addAnimations(
        createObjectTransformAnimation(
            saturn,
            {
              position: {x: 350, y: -120, z: 140},
              rotation: {y: 3.6, z: 0},
              scale: 0.5,
            },
            {
              duration: 1500,
              delay: 500,
              easing: easing.easeOutCubic,
            }
        )
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
    meshBehindTheKeyHole.position.set(0, 0, -200);
    this.addMesh(meshBehindTheKeyHole);
  }
  addMesh(mesh) {
    this.objectsLoaded++;
    this.add(mesh);
    if (
      this.objectsLoaded ===
this.meshObjects.length + this.meshExtrudedObjects.length + 3
    ) {
      this.animationManager.startAnimations();
    }
  }

  addSuitCaseAnimation(suitcase) {
    const suitcasePositionWrapper = new THREE.Group();
    const suitcaseRotateWrapper = new THREE.Group();

    suitcaseRotateWrapper.add(suitcase);
    suitcasePositionWrapper.add(suitcaseRotateWrapper);

    suitcaseRotateWrapper.rotation.set(0.2, -1.5, 1.3, `YZX`);

    this.animationManager.addAnimations(
        new Animation({
          func: (progress) => {
            suitcaseRotateWrapper.rotation.set(
                0.2 - 0.6 * progress,
                -1.5,
                1.3,
                `YZX`
            );
          },
          duration: 500,
          delay: 500,
          easing: easing.easeInOutSine,
        }),
        new Animation({
          func: (progress) => {
            suitcaseRotateWrapper.rotation.set(
                -0.4,
                -1.5 - progress,
                1.3 * (1 - progress),
                `YZX`
            );
          },
          duration: 500,
          delay: 1000,
          easing: easing.easeInOutSine,
        })
    );

    this.animationManager.addAnimations(
        new Animation({
          func: (progress) => {
            suitcasePositionWrapper.position.y = progress * 70;
            suitcasePositionWrapper.position.z = progress * 60;
          },
          duration: 500,
          delay: 500,
          easing: easing.easeInOutSine,
        }),
        new Animation({
          func: (progress) => {
            suitcasePositionWrapper.position.x = -60 * progress;
            suitcasePositionWrapper.position.y = 70 - 220 * progress;
            suitcasePositionWrapper.position.z = 60 + progress * 60;
          },
          duration: 600,
          delay: 1000,
          easing: easing.easeInOutSine,
        })
    );

    this.animationManager.addAnimations(
        new Animation({
          func: (progress) => {
            const scale = 0.4 * progress;

            suitcase.scale.set(scale, scale, scale);
          },
          duration: 1000,
          delay: 500,
          easing: easing.easeInOutSine,
        })
    );

    this.animationManager.addAnimations(
        createBounceAnimation(suitcasePositionWrapper)
    );

    return suitcasePositionWrapper;
  }
}
