import * as THREE from 'three';

export class Snowman extends THREE.Group {
  constructor(options) {
    super();
    this.colorSphere = options.colorSphere;
    this.metalnessSphere = options.metalnessSphere;
    this.roughnessSphere = options.roughnessSphere;
    this.colorCone = options.colorCone;
    this.metalnessCone = options.metalnessCone;
    this.roughnessCone = options.roughnessCone;
    this.constructChildren();
  }

  constructChildren() {
    this.addTopSphere();
    this.addBottomSphere();
    this.addCone();
  }

  addTopSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSphere),
      metalness: this.metalnessSphere,
      roughness: this.roughnessSphere
    });
    const geometry = new THREE.SphereGeometry(44, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  addBottomSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSphere),
      metalness: this.metalnessSphere,
      roughness: this.roughnessSphere
    });
    const geometry = new THREE.SphereGeometry(78, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -108, 0);
    this.add(mesh);
  }

  addCone() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorCone),
      metalness: this.metalnessCone,
      roughness: this.roughnessCone
    });
    const geometry = new THREE.ConeGeometry(18, 75, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-90.0), `XYZ`));
    mesh.position.set(45, 0, 0);
    this.add(mesh);
  }
}
