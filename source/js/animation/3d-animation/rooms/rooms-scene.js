import * as THREE from 'three';
import {RoomOneScene} from './room-one';
import {RoomTwoScene} from './room-two';
import {RoomThreeScene} from './room-three';
import {RoomFourScene} from './room-four';

export class RoomsComposition extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;
    this.constructChildren();
  }

  constructChildren() {
    this.addRoomOne();
    this.addRoomTwo();
    this.addRoomThree();
    this.addRoomFour();
  }

  addRoomOne() {
    this.add(new RoomOneScene(this.pageSceneCreator, this.animationManager));
  }

  addRoomTwo() {
    const roomTwo = new RoomTwoScene(
        this.pageSceneCreator,
        this.animationManager
    );

    roomTwo.rotateY(Math.PI / 2);

    this.add(roomTwo);
  }

  addRoomThree() {
    const roomTwo = new RoomThreeScene(
        this.pageSceneCreator,
        this.animationManager
    );

    roomTwo.rotateY(Math.PI);

    this.add(roomTwo);
  }

  addRoomFour() {
    const roomTwo = new RoomFourScene(
        this.pageSceneCreator,
        this.animationManager
    );

    roomTwo.rotateY(-Math.PI / 2);

    this.add(roomTwo);
  }
}
