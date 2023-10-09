import * as THREE from 'three';

export class RoomScene extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;
  }

  async constructChildren() {
    this.addFloor();
    await this.addWalls();
    await this.addStaticOutput();
  }

  addObject(object) {
    object.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    this.add(object);
  }

  async addWalls() {
    const wall = await this.pageSceneCreator.createObjectMesh(this.wall);

    this.addObject(wall);
  }

  addFloor() {
    const geometry = new THREE.CircleGeometry(2000, 8, 0, Math.PI / 2);

    const floor = new THREE.Mesh(geometry, this.floor.material);

    floor.rotation.set(0, -Math.PI / 2, -Math.PI / 2, `ZYX`);

    this.addObject(floor);
  }

  async addStaticOutput() {
    const obj = await this.pageSceneCreator.createObjectMesh(this.staticOutput);

    this.addObject(obj);
  }
}
