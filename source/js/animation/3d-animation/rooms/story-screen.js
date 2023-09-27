import * as THREE from 'three';
import {OBJECT_ELEMENTS} from '../../../helpers/constants';
import {RoomsComposition} from './rooms-scene';

export class RoomsPageScene extends THREE.Group {
  constructor(pageSceneCreator, scene) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.scene = scene;

    this.constructChildren();
  }

  constructChildren() {
    this.addRooms();

    this.addSuitCase();
  }

  addRooms() {
    const roomsComposition = new RoomsComposition(this.pageSceneCreator);

    roomsComposition.rotateY(-Math.PI / 4);
    roomsComposition.rotateY(-Math.PI / 2);
    roomsComposition.rotateY(-Math.PI / 2);

    this.scene.addTransformationsToLoop([()=>{
      roomsComposition.rotateY(-0.002);
    }]);

    this.add(roomsComposition);
  }

  addSuitCase() {
    this.pageSceneCreator.createObjectMesh(
        {
          name: OBJECT_ELEMENTS.suitcase,
          transform: {
            transformX: -340,
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

          this.add(obj);
        }
    );
  }
}
