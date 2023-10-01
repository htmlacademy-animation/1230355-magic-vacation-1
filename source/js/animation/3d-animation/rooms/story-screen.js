import * as THREE from 'three';
import {OBJECT_ELEMENTS} from '../../../helpers/constants';
import {RoomsComposition} from './rooms-scene';
import {createObjectTransformAnimation} from '../animation-creator';
import easing from '../../../helpers/easing';

export class RoomsPageScene extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;

    this.constructChildren();
  }

  constructChildren() {
    this.addRooms();

    this.addSuitCase();
  }

  addRooms() {
    const roomsComposition = new RoomsComposition(
        this.pageSceneCreator,
        this.animationManager
    );

    roomsComposition.rotateY(-Math.PI / 4);

    this.add(roomsComposition);
  }

  addSuitCase() {
    this.pageSceneCreator.createObjectMesh(
        {
          name: OBJECT_ELEMENTS.suitcase,
          enableGui: true,
          transform: {
            transformX: -340,
            transformY: 150,
            transformZ: 750,

            rotateY: -0.4,
          },
        },
        (obj) => {
          obj.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
            }
          });

          this.animationManager.addAnimations(
              createObjectTransformAnimation(
                  obj,
                  {
                    position: {
                      y: 0,
                    },
                    scale: {
                      x: 0.95,
                      y: 1.1,
                      z: 0.95
                    },
                  },
                  {
                    duration: 300,
                    easing: easing.easeInCubic,
                  }
              ),
              createObjectTransformAnimation(
                  obj,
                  {
                    position: {
                      y: 2,
                    },
                    scale: {
                      x: 1.05,
                      y: 0.93,
                      z: 1.05
                    },
                  },
                  {
                    duration: 150,
                    delay: 300,
                    easing: easing.easeOutCubic,
                  }
              ),
              createObjectTransformAnimation(
                  obj,
                  {
                    position: {
                      y: 1,
                    },
                    scale: {
                      x: 0.98,
                      y: 1.04,
                      z: 0.98
                    },
                  },
                  {
                    duration: 150,
                    delay: 450,
                    easing: easing.easeInOutSine,
                  }
              ),
              createObjectTransformAnimation(
                  obj,
                  {
                    position: {
                      y: 0,
                    },
                    scale: {
                      x: 1,
                      y: 1,
                      z: 1,
                    },
                  },
                  {
                    duration: 150,
                    delay: 600,
                    easing: easing.easeInCubic,
                  }
              )
          );
          this.animationManager.startAnimations();

          this.add(obj);
        }
    );
  }
}
