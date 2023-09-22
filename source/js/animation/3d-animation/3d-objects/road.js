import * as THREE from "three";
import {MATERIAL_TYPE} from "../../../helpers/constants";

export class Road {
  constructor(pageSceneCreator) {
    const geometry = pageSceneCreator.latheGeometryCreator.createGeometry(732, 190, 3, 0, 90);
    const material = pageSceneCreator.materialCreator.create(MATERIAL_TYPE.CustomRoadMaterial);

    return new THREE.Mesh(geometry, material);
  }
}
