import * as THREE from 'three';
import {degreesToRadians} from '../../helpers/utils';

export class LatheGeometryCreator {
  createGeometry(innerRadius, width, height, angleStart, angleEnd) {
    const points = [];
    points.push(new THREE.Vector2(innerRadius + width, 0));
    points.push(new THREE.Vector2(innerRadius + width, height));
    points.push(new THREE.Vector2(innerRadius, height));
    points.push(new THREE.Vector2(innerRadius, 0));
    points.push(new THREE.Vector2(innerRadius + width, 0));
    return new THREE.LatheGeometry(
        points,
        30,
        degreesToRadians(angleStart),
        degreesToRadians(angleEnd - angleStart)
    );
  }
}
