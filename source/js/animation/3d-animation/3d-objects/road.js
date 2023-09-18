// import * as THREE from 'three';
// import {getLathePoints, getLatheDegrees} from '../../../helpers/utils';
// import {reflection3D} from '../../../helpers/3d-data';
// import {RoadCustomMaterial} from './road-custom-material';

// export class Road extends THREE.Group {
//   constructor() {
//     super();

//     this.widthBase = 160;
//     this.thicknessBase = 3;
//     this.innerRadiusBase = 732;
//     this.startDeg = 0;
//     this.finishDeg = 90;

//     this.constructChildren();
//   }

//   constructChildren() {
//     this.addRoad();
//   }

//   addRoad() {
//     const points = getLathePoints(this.widthBase, this.thicknessBase, this.innerRadiusBase);
//     const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
//     const material = new RoadCustomMaterial({
//       metalness: reflection3D.soft.metalness,
//       roughness: reflection3D.soft.roughness,
//     });
//     const geometry = new THREE.LatheGeometry(points, 50, start, length);
//     const mesh = new THREE.Mesh(geometry, material);
//     this.add(mesh);
//   }
// }
import * as THREE from "three";
import {MATERIAL_TYPE} from "../../../helpers/constants";

export class Road {
  constructor(pageSceneCreator) {
    const geometry = pageSceneCreator.latheGeometryCreator.createGeometry(732, 160, 3, 0, 90);
    const material = pageSceneCreator.materialCreator.create(MATERIAL_TYPE.CustomRoadMaterial);

    return new THREE.Mesh(geometry, material);
  }
}
