import * as THREE from 'three';
import {MATERIAL_TYPE} from "../../../helpers/constants";

export class Carpet {
  constructor(pageSceneCreator) {
    const geometry = pageSceneCreator.latheGeometryCreator.createGeometry(740, 180, 3, 16, 74);
    const material = pageSceneCreator.materialCreator.create(MATERIAL_TYPE.CustomCarpetMaterial);

    return new THREE.Mesh(geometry, material);
  }
}
