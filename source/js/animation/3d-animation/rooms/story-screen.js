import * as THREE from 'three';
import {RoomsComposition} from './rooms-scene';

export class RoomsPageScene extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();
    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;
  }

  async constructChildren() {
    await this.addRooms();
  }

  async addRooms() {
    const roomsComposition = new RoomsComposition(this.pageSceneCreator, this.animationManager);
    await roomsComposition.constructRooms();
    roomsComposition.rotateY(-Math.PI / 4);
    this.add(roomsComposition);
  }
}
