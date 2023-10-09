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
  }

  async constructRooms() {
    await this.addRoomOne();
    await this.addRoomTwo();
    await this.addRoomThree();
    await this.addRoomFour();
  }

  async addRoomOne() {
    const roomOne = new RoomOneScene(
        this.pageSceneCreator,
        this.animationManager
    );

    await roomOne.constructChildren();

    this.add(roomOne);
  }

  async addRoomTwo() {
    const roomTwo = new RoomTwoScene(
        this.pageSceneCreator,
        this.animationManager
    );

    await roomTwo.constructChildren();
    roomTwo.rotateY(Math.PI / 2);
    this.add(roomTwo);
  }

  async addRoomThree() {
    const roomThree = new RoomThreeScene(
        this.pageSceneCreator,
        this.animationManager
    );

    await roomThree.constructChildren();

    roomThree.rotateY(Math.PI);

    this.add(roomThree);
  }

  async addRoomFour() {
    const roomFour = new RoomFourScene(
        this.pageSceneCreator,
        this.animationManager
    );

    await roomFour.constructChildren();

    roomFour.rotateY(-Math.PI / 2);

    this.add(roomFour);
  }
}
