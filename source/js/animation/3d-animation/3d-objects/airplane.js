import * as THREE from 'three';
import {MATERIAL_TYPE, OBJECT_ELEMENTS} from '../../../helpers/constants';
import {MaterialCreator} from '../material-creator';

export class Airplane extends THREE.Group {
  constructor(pageSceneCreator) {
    super();

    this.pageSceneCreator = pageSceneCreator;

    this.airplaneConfig = {
      name: OBJECT_ELEMENTS.airplane,
      transform: {
        rotation: {
          y: Math.PI / 2,
        },
        scale: 1,
      },
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.BasicMaterial,
          {
            color: MaterialCreator.Colors.White,
          }
      ),
    };

    this._flightRadius = 100;
    this._flightRadiusChanged = true;

    this._flightHeight = -100;
    this._flightHeightChanged = true;

    this._rigRotationY = -Math.PI;
    this._rigRotationYChanged = true;

    this._planeRotationZ = 0;
    this._planeRotationZChanged = true;
    this._planeIncline = 0;
    this._planeInclineChanged = true;
  }

  async constructRig() {
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

  get rigRotationY() {
    return this._rigRotationY;
  }

  set rigRotationY(rotation) {
    if (rotation === this._rigRotationY) {
      return;
    }

    this._rigRotationY = rotation;
    this._rigRotationYChanged = true;
  }

  get maxFlightRadius() {
    return 200;
  }

  get maxFlightHeight() {
    return 100;
  }

  get planeRotationZ() {
    return this._planeRotationZ;
  }

  set planeRotationZ(rotation) {
    if (rotation === this._planeRotationZ) {
      return;
    }

    this._planeRotationZ = rotation;
    this._planeRotationZChanged = true;
  }

  get planeIncline() {
    return this._planeIncline;
  }

  set planeIncline(rotation) {
    if (rotation === this._planeIncline) {
      return;
    }

    this._planeIncline = rotation;
    this._planeInclineChanged = true;
  }

  async addAirplaneObject() {
    this.airplaneObject = await this.pageSceneCreator.createObjectMesh(
        this.airplaneConfig
    );

    this.airplaneInclineGroup = new THREE.Group();

    this.airplaneInclineGroup.add(this.airplaneObject);

    this.invalidate();
    this.add(this.airplaneInclineGroup);
  }

  invalidate() {
    if (this._flightRadiusChanged) {
      this.airplaneObject.position.z = this._flightRadius;
      this._flightRadiusChanged = false;
    }

    if (this._flightHeightChanged) {
      this.position.y = this._flightHeight;
      this._flightHeightChanged = false;
    }

    if (this._rigRotationYChanged) {
      this.rotation.y = this._rigRotationY;
      this._rigRotationYChanged = false;
    }

    if (this._planeRotationZChanged) {
      this.airplaneObject.rotation.z = this._planeRotationZ;
      this._planeRotationZChanged = false;
    }

    if (this._planeInclineChanged) {
      this.airplaneInclineGroup.rotation.z = this._planeIncline;
      this._planeInclineChanged = false;
    }
  }
}
