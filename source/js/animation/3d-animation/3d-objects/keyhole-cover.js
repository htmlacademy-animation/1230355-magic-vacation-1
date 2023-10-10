import * as THREE from 'three';
import {MATERIAL_TYPE} from '../../../helpers/constants';
import {MaterialCreator} from '../material-creator';

export class KeyholeCover extends THREE.Mesh {
  constructor(pageSceneCreator) {
    super(
        new THREE.PlaneGeometry(400, 400, 2, 2),
        pageSceneCreator.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
          color: MaterialCreator.Colors.Purple,
          transparent: true,
        }),
    );

    this.name = `keyholeCover`;

    this._opacity = 1;
    this._isOpacityChanged = false;
  }

  set opacity(value) {
    if (value === this._opacity) {
      return;
    }

    this._opacity = value;
    this._isOpacityChanged = true;
  }

  get opacity() {
    return this._opacity;
  }

  invalidate() {
    if (this._isOpacityChanged) {
      this.material.opacity = this._opacity;

      this._isOpacityChanged = false;
    }
  }
}
