import * as THREE from 'three';
import {SVG_ELEMENTS, OBJECT_ELEMENTS, MATERIAL_TYPE, MESH_NAMES} from '../../helpers/constants';
import {MaterialCreator} from './material-creator';
import {Saturn} from './3d-objects/saturn';
import easing from '../../helpers/easing';
import {createBounceAnimation, createObjectTransformAnimation} from './animation-creator';
import Animation from '../2d-animation/animation-2d';
import {Airplane} from "./3d-objects/airplane";
import {KeyholeCover} from './3d-objects/keyhole-cover';

export class MainPageComposition extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();
    this.isPortraitMode = window.innerWidth < window.innerHeight;
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
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.flamingo),
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
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.snowflake),
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
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.leaf),
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
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.question),
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
          position: this.getMeshTransformPositionByName(OBJECT_ELEMENTS.watermelon),
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

    this.mainPageGroup = new THREE.Group();

    this.onResize = this.onResize.bind(this);

    window.addEventListener(`resize`, this.onResize);
  }

  onResize() {
    const isPortraitMode = window.innerWidth < window.innerHeight;

    if (this.isPortraitMode === isPortraitMode) {
      return;
    }

    this.isPortraitMode = isPortraitMode;

    this.mainPageGroup.children.forEach((obj) => {
      const transformPosition = this.getMeshTransformPositionByName(obj.name);

      if (transformPosition) {
        obj.position.copy(transformPosition);
      }
    });
  }

  getMeshTransformPositionByName(name) {
    switch (name) {
      case SVG_ELEMENTS.flamingo:
        return this.isPortraitMode
          ? {
            x: -180,
            y: 370,
            z: 140,
          }
          : {
            x: -460,
            y: 370,
            z: 140,
          };

      case SVG_ELEMENTS.snowflake:
        return this.isPortraitMode
          ? {x: -160, y: 20, z: 90}
          : {x: -320, y: -20, z: 90};

      case SVG_ELEMENTS.leaf:
        return this.isPortraitMode
          ? {x: 250, y: 290, z: 100}
          : {x: 600, y: 290, z: 100};

      case SVG_ELEMENTS.question:
        return this.isPortraitMode
          ? {x: 30, y: -330, z: 50}
          : {x: 140, y: -310, z: 50};

      case OBJECT_ELEMENTS.watermelon:
        return this.isPortraitMode
          ? {x: -200, y: -240, z: 200}
          : {x: -600, y: -240, z: 200};

      case MESH_NAMES.Saturn:
        return this.isPortraitMode
          ? {x: 150, y: -150, z: 140}
          : {x: 350, y: -120, z: 140};
    }

    return undefined;
  }

  async constructChildren() {
    await this.addMeshObjects();
    await this.addExtrudedSvgObjects();
    this.addKeyholeCover();

    this.addSaturn();

    await this.addAirplane();
  }
  async addAirplane() {
    const airplane = new Airplane(this.pageSceneCreator);
    await airplane.constructRig();
    airplane.position.x = 110;

    const initialFightRadius = airplane.flightRadius;
    const initialFightHeight = airplane.flightHeight;
    const initialRigRotationY = airplane.rigRotationY;
    const initialPlaneRotationZ = airplane.planeRotationZ;
    const initialPlaneIncline = airplane.planeIncline;

    this.animationManager.addMainPageAnimations(
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
  async addMeshObjects() {
    await Promise.all(
        this.meshObjects.map(async (config) => {
          const obj = await this.pageSceneCreator.createObjectMesh(config);

          this.addObject(config)(obj);
        })
    );
  }
  async addExtrudedSvgObjects() {
    await Promise.all(
        this.meshExtrudedObjects.map(async (config) => {
          const obj = await this.pageSceneCreator.createExtrudedSvgMesh(config);

          this.addObject(config)(obj);
        })
    );
  }

  addObject(config) {
    return (obj) => {
      if (config.name === OBJECT_ELEMENTS.suitcase) {
        const suitcase = this.addSuitCaseAnimation(obj);

        this.addMesh(suitcase);
        return;
      }

      if (config.transformAppear) {
        this.animationManager.addMainPageAnimations(
            createObjectTransformAnimation(obj, config.transformAppear, {
              duration: 1500,
              delay: 500,
              easing: easing.easeOutCubic,
            })
        );
      }
      if (config.bounceAnimation) {
        this.animationManager.addMainPageAnimations(createBounceAnimation(obj));
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
    this.animationManager.addMainPageAnimations(
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
    this.animationManager.addMainPageAnimations(createBounceAnimation(saturn));
    this.addMesh(saturn);
  }

  addKeyholeCover() {
    const keyholeCover = new KeyholeCover(this.pageSceneCreator);
    keyholeCover.position.set(0, 0, -200);
    this.addMesh(keyholeCover);
  }

  addMesh(mesh) {
    this.add(mesh);
  }

  addSuitCaseAnimation(suitcase) {
    const suitcasePositionWrapper = new THREE.Group();
    const suitcaseRotateWrapper = new THREE.Group();

    suitcaseRotateWrapper.add(suitcase);
    suitcasePositionWrapper.add(suitcaseRotateWrapper);

    suitcaseRotateWrapper.rotation.set(0.2, -1.5, 1.3, `YZX`);

    this.animationManager.addMainPageAnimations(
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

    this.animationManager.addMainPageAnimations(
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
            suitcasePositionWrapper.position.x = -80 * progress;
            suitcasePositionWrapper.position.y = 70 - 220 * progress;
            suitcasePositionWrapper.position.z = 60 + progress * 60;
          },
          duration: 600,
          delay: 1000,
          easing: easing.easeInOutSine,
        })
    );

    this.animationManager.addMainPageAnimations(
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

    this.animationManager.addMainPageAnimations(
        createBounceAnimation(suitcasePositionWrapper)
    );

    return suitcasePositionWrapper;
  }
}
