import * as THREE from 'three';
import {getLathePoints} from '../../../helpers/utils';

export class Saturn extends THREE.Group {
  constructor() {
    super();

    this.colorSaturn = 0xfc2947;
    this.colorRing = 0x6c4acb;
    this.colorRope = 0x8388ab;
    this.widthRing = 40;
    this.thicknessRing = 2;
    this.innerRadiusRing = 80;

    this.constructChildren();
  }

  constructChildren() {
    this.addRope();
    this.addSmallSphere();
    this.addSphereBig();
    this.addRing();
  }

  addRope() {
    const material = new THREE.MeshStandardMaterial({
      color: this.colorRope,
      metalness: 0.05,
      emissive: 0x000000,
      roughness: 0.5
    });
    const geometry = new THREE.CylinderGeometry(1, 1, 1000, 10);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 500, 0);
    this.add(mesh);
  }

  addSmallSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: this.colorRing,
      metalness: 0.05,
      emissive: 0x000000,
      roughness: 0.5
    });
    const geometry = new THREE.SphereGeometry(10, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 120, 0);
    this.add(mesh);
  }

  addSphereBig() {
    const material = new THREE.MeshStandardMaterial({
      color: this.colorSaturn,
      metalness: 0.05,
      emissive: 0x000000,
      roughness: 0.5
    });
    const geometry = new THREE.SphereGeometry(60, 50, 50);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  addRing() {
    const points = getLathePoints(this.widthRing, this.thicknessRing, this.innerRadiusRing);
    const material = new THREE.MeshStandardMaterial({
      color: this.colorRing,
      metalness: 0.05,
      emissive: this.colorRing,
      roughness: 0.5
    });
    const geometry = new THREE.LatheGeometry(points, 50);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(20.0), 0, THREE.MathUtils.degToRad(18.0)), `XYZ`);
    this.add(mesh);
  }
}
