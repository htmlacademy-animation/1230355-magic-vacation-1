import * as THREE from 'three';
import {color3D, reflection3D} from '../../../helpers/3d-data';

export class Snowman extends THREE.Group {
  constructor() {
    super();
    this.colorSphere = color3D.White;
    this.metalnessSphere = reflection3D.strong.metalness;
    this.roughnessSphere = reflection3D.strong.roughness;
    this.constructChildren();
  }

  constructChildren() {
    this.addTopSphere();
    this.addBottomSphere();
    this.addCone();
  }

  addTopSphere() {
    const geometry = new THREE.SphereGeometry(44, 30, 30);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSphere),
      metalness: this.metalnessSphere,
      roughness: this.roughnessSphere,
      emissive: 0x243452,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.add(sphere);
  }

  addBottomSphere() {
    const geometry = new THREE.SphereGeometry(78, 30, 30);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSphere),
      metalness: this.metalnessSphere,
      roughness: this.roughnessSphere,
      emissive: 0x243452,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, -108, 0);
    this.add(sphere);
  }

  addCone() {
    const geometry = new THREE.ConeGeometry(18, 75, 30);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color3D.Orange),
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    const cone = new THREE.Mesh(geometry, material);
    cone.rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-90.0), `XYZ`));
    cone.position.set(45, 0, 0);
    this.add(cone);
  }
}
