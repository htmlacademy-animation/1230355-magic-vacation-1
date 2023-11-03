import * as THREE from 'three';
import {MATERIAL_TYPE, OBJECT_ELEMENTS} from '../../../helpers/constants';
import {MaterialCreator} from '../material/material-creator';

const FLIGHT_RADIUS_DEFAULT = 100;

export class Airplane extends THREE.Group {
  constructor(pageSceneCreator) {
    super();
    this.pageSceneCreator = pageSceneCreator;

    this.airplaneConfig = {
      name: OBJECT_ELEMENTS.airplane,
      transform: {
        rotation: {y: Math.PI / 2},
        scale: 1,
      },
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.BasicMaterial, {color: MaterialCreator.Colors.White}
      ),
    };

    this._flightRadius = FLIGHT_RADIUS_DEFAULT;
    this._flightRadiusChanged = true;
    this._flightHeight = -80;
    this._flightHeightChanged = true;
    this._flightRotationY = -Math.PI;
    this._flightRotationYChanged = true;
    this._flightRotationZ = 0;
    this._flightRotationZChanged = true;
    this._flightIncline = 0;
    this._flightInclineChanged = true;
    this.position.x = 110;
  }

  async init() {
    await this.addAirplaneObject();
  }

  get flightRadius() {
    return this._flightRadius;
  }

  set flightRadius(radius) {
    if (radius === this._flightRadius) {
      return;
    }

    this._flightRadius = radius;
    this._flightRadiusChanged = true;
  }

  get flightHeight() {
    return this._flightHeight;
  }

  set flightHeight(height) {
    if (height === this._flightHeight) {
      return;
    }

    this._flightHeight = height;
    this._flightHeightChanged = true;
  }

  get flightRotationY() {
    return this._flightRotationY;
  }

  set flightRotationY(rotation) {
    if (rotation === this._flightRotationY) {
      return;
    }

    this._flightRotationY = rotation;
    this._flightRotationYChanged = true;
  }

  get flightRotationZ() {
    return this._flightRotationZ;
  }

  set flightRotationZ(rotation) {
    if (rotation === this._flightRotationZ) {
      return;
    }

    this._flightRotationZ = rotation;
    this._flightRotationZChanged = true;
  }

  get flightIncline() {
    return this._flightIncline;
  }

  set flightIncline(rotation) {
    if (rotation === this._flightIncline) {
      return;
    }

    this._flightIncline = rotation;
    this._flightInclineChanged = true;
  }

  async addAirplaneObject() {
    this.airplaneObject = await this.pageSceneCreator.createObjectMesh(this.airplaneConfig);
    this.redraw();
    this.add(this.airplaneObject);
  }

  redraw() {
    if (this._flightRadiusChanged) {
      this.airplaneObject.position.z = this._flightRadius;
      this._flightRadiusChanged = false;
    }

    if (this._flightRotationZChanged) {
      this.airplaneObject.rotation.z = this._flightRotationZ;
      this._flightRotationZChanged = false;
    }

    if (this._flightHeightChanged) {
      this.position.y = this._flightHeight;
      this._flightHeightChanged = false;
    }

    if (this._flightRotationYChanged) {
      this.rotation.y = this._flightRotationY;
      this._flightRotationYChanged = false;
    }

    if (this._flightInclineChanged) {
      this.rotation.z = this._flightIncline;
      this._flightInclineChanged = false;
    }
  }
}
