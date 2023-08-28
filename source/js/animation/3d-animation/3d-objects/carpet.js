import * as THREE from 'three';
import {getLathePoints, getLatheDegrees} from '../../../helpers/utils';
import {reflection3D} from '../../../helpers/3d-data';
import {CarpetCustomMaterial} from './carpet-custom-material';

export class Carpet extends THREE.Group {
  constructor(options) {
    super();

    this.width = 180;
    this.thickness = 3;
    this.innerRadius = 763;
    this.startDeg = 16;
    this.finishDeg = 74;
    this.mainColor = options.mainColor;
    this.additionalColor = options.additionalColor;

    this.constructChildren();
  }

  constructChildren() {
    this.addCarpet();
  }

  addCarpet() {
    const points = getLathePoints(this.width, this.thickness, this.innerRadius);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const material = new CarpetCustomMaterial({
      mainColor: this.mainColor,
      additionalColor: this.additionalColor,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness,
    });
    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
}
