import * as THREE from 'three';

export class Pyramid extends THREE.Group {
  constructor(options) {
    super();
    this.pyramidColor = options.pyramidColor;
    this.metalness = options.metalness;
    this.roughness = options.roughness;
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const geometry = new THREE.ConeGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.pyramidColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const pyramid = new THREE.Mesh(geometry, material);
    this.add(pyramid);
  }
}
