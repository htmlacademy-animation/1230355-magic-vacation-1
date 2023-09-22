import * as THREE from 'three';
import {color3D, reflection3D} from '../../../helpers/3d-data';

export class Lantern extends THREE.Group {
  constructor() {
    super();
    this.lanternColor = color3D.Blue;
    this.lampColor = color3D.LightBlue;
    this.metalness = reflection3D.soft.metalness;
    this.roughness = reflection3D.soft.roughness;
    this.constructChildren();
  }

  constructChildren() {
    this.addBottomCylinder();
    this.addSphere();
    this.addCentralCylinder();
    this.addBottomLamp();
    this.addCentralLamp();
    this.addTopLamp();
  }

  addBottomCylinder() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(16, 16, 120, 30);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  addSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.SphereGeometry(16, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 60, 0);
    this.add(mesh);
  }

  addCentralCylinder() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(7, 7, 230, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 191, 0);
    this.add(mesh);
  }

  addBottomLamp() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.BoxGeometry(37, 4, 37);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 303, 0);
    this.add(mesh);
  }

  addCentralLamp() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lampColor),
      metalness: this.metalness,
      roughness: this.roughness,
      emissive: 0x052052,
    });
    const geometry = new THREE.CylinderGeometry(Math.hypot(42, 42) / 2, Math.hypot(34, 34) / 2, 60, 4);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 335, 0);
    mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0, `XYZ`));
    this.add(mesh);
  }

  addTopLamp() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(Math.hypot(45, 45) / 2, Math.hypot(57, 57) / 2, 6, 4);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 368, 0);
    mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0, `XYZ`));
    this.add(mesh);
  }
}
