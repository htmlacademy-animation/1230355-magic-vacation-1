import * as THREE from 'three';
import {degreesToRadians} from '../../../helpers/utils';
import {MaterialCreator} from '../material/material-creator';
import {MATERIAL_TYPE, MESH_NAMES} from '../../../helpers/constants';

export class Saturn extends THREE.Group {
  constructor(materialCreator, options) {
    super();
    this.name = MESH_NAMES.Saturn;
    this.materialCreator = materialCreator;
    this.options = options;
    this.constructChildren();
  }

  constructChildren() {
    this.addPlanet();
    this.addRing();
    if (this.options.withRope) {
      this.addRope();
      this.addSmallSphere();
    }
  }

  addRope() {
    const geometry = new THREE.CylinderGeometry(1, 1, 1000, 20);
    const material = this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {color: MaterialCreator.Colors.MetalGrey});
    const rope = new THREE.Mesh(geometry, material);
    rope.position.set(0, 500, 0);
    this.add(rope);
  }

  addPlanet() {
    const geometry = new THREE.SphereGeometry(60, 32, 32);
    const material = this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
      color: this.options.darkMode
        ? MaterialCreator.Colors.ShadowedDominantRed
        : MaterialCreator.Colors.DominantRed,
    });
    this.add(new THREE.Mesh(geometry, material));
  }

  addSmallSphere() {
    const geometry = new THREE.SphereGeometry(10, 16, 16);
    const material = this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
      color: this.options.darkMode
        ? MaterialCreator.Colors.ShadowedBrightPurple
        : MaterialCreator.Colors.BrightPurple,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 120, 0);
    this.add(sphere);
  }

  addRing() {
    const geometry = this.createGeometry(80, 40, 2);
    const material = this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
      color: this.options.darkMode
        ? MaterialCreator.Colors.ShadowedBrightPurple
        : MaterialCreator.Colors.BrightPurple,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.name = MESH_NAMES.SaturnRing;
    ring.rotateZ(degreesToRadians(-18));
    this.add(ring);
  }

  createGeometry(innerRadius, width, height) {
    const points = [];
    points.push(new THREE.Vector2(innerRadius + width, 0));
    points.push(new THREE.Vector2(innerRadius + width, height));
    points.push(new THREE.Vector2(innerRadius, height));
    points.push(new THREE.Vector2(innerRadius, 0));
    points.push(new THREE.Vector2(innerRadius + width, 0));
    return new THREE.LatheGeometry(points, 30);
  }
}
