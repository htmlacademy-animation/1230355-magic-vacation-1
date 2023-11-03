import * as THREE from 'three';
import {color3D, reflection3D} from '../../../helpers/3d-data';

export class Lantern extends THREE.Group {
  constructor() {
    super();
    this.lanternColor = color3D.Blue;
    this.metalness = reflection3D.soft.metalness;
    this.roughness = reflection3D.soft.roughness;
    this.constructChildren();
  }

  constructChildren() {
    this.addBottomCylinder();
    this.addSphere();
    this.addCentralCylinder();
    this.addBottomOfLamp();
    this.addCentralOfLamp();
    this.addTopOfLamp();
  }

  addBottomCylinder() {
    const geometry = new THREE.CylinderGeometry(16, 16, 220, 30);
    const material = this.createMaterial();
    const cylinder = new THREE.Mesh(geometry, material);
    this.add(cylinder);
  }

  addSphere() {
    const geometry = new THREE.SphereGeometry(16, 30, 30);
    const material = this.createMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 105, 0);
    this.add(sphere);
  }

  addCentralCylinder() {
    const geometry = new THREE.CylinderGeometry(7, 7, 230, 30);
    const material = this.createMaterial();
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 216, 0);
    this.add(cylinder);
  }

  addBottomOfLamp() {
    const geometry = new THREE.BoxGeometry(37, 4, 37);
    const material = this.createMaterial();
    const lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(0, 333, 0);
    this.add(lamp);
  }

  addCentralOfLamp() {
    const geometry = new THREE.CylinderGeometry(Math.hypot(42, 42) / 2, Math.hypot(34, 34) / 2, 60, 4);
    const material = this.createMaterial(0x052052);
    const lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(0, 365, 0);
    lamp.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0, `XYZ`));
    this.add(lamp);
  }

  addTopOfLamp() {
    const geometry = new THREE.CylinderGeometry(Math.hypot(45, 45) / 2, Math.hypot(57, 57) / 2, 6, 4);
    const material = this.createMaterial();
    const lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(0, 398, 0);
    lamp.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0, `XYZ`));
    this.add(lamp);
  }

  createMaterial(emissive) {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color3D.LightBlue),
      metalness: this.metalness,
      roughness: this.roughness,
      emissive: emissive ? emissive : 0x000000,
    });
  }
}
