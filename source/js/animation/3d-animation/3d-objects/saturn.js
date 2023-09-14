import * as THREE from "three";
import {degreesToRadians} from "../../../helpers/utils";
import {MaterialCreator} from "../material-creator";
import {MATERIAL_TYPE} from "../../../helpers/constants";

export class Saturn extends THREE.Group {
  constructor(materialCreator, options) {
    super();
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

    const cylinder = new THREE.Mesh(
        geometry,
        this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.MetalGrey,
        })
    );
    cylinder.position.set(0, 500, 0);
    this.add(cylinder);
  }
  addPlanet() {
    const geometry = new THREE.SphereGeometry(60, 32, 32);
    this.add(
        new THREE.Mesh(
            geometry,
            this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
              color: this.options.darkMode
                ? MaterialCreator.Colors.ShadowedDominantRed
                : MaterialCreator.Colors.DominantRed,
            })
        )
    );
  }
  addSmallSphere() {
    const geometry = new THREE.SphereGeometry(10, 16, 16);

    const sphere = new THREE.Mesh(
        geometry,
        this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: this.options.darkMode
            ? MaterialCreator.Colors.ShadowedBrightPurple
            : MaterialCreator.Colors.BrightPurple,
        })
    );
    sphere.position.set(0, 120, 0);
    this.add(sphere);
  }
  addRing() {
    const geometry = this.createGeometry(80, 40, 2);

    const ring = new THREE.Mesh(
        geometry,
        this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: this.options.darkMode
            ? MaterialCreator.Colors.ShadowedBrightPurple
            : MaterialCreator.Colors.BrightPurple,
        })
    );
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
