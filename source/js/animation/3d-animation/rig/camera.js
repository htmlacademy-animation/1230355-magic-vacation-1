import * as THREE from 'three';
import {degreesToRadians} from '../../../helpers/utils';
import Animation from '../../2d-animation/animation-2d';
import {AnimateControl} from './animate-control';
import easing from '../../../helpers/easing';

export class CameraRig extends THREE.Group {
  static getCameraRigStageState(index) {
    if (index === 0) {
      return {
        index,
        depth: -4750,
        rotationAxisYAngle: 0,
        horizonIncline: 0,
      };
    }

    if ([1, 2, 3, 4].includes(index)) {
      return {
        index,
        depth: -1750,
        rotationAxisYAngle: ((index - 1) * Math.PI) / 2,
        horizonIncline: -degreesToRadians(15),
      };
    }

    return {};
  }

  constructor(stateParameters) {
    super();

    this.stateParameters = stateParameters;

    // Set internal parameters
    this._depth = this.stateParameters.depth || 0;
    this._rotationAxisYAngle = this.stateParameters.rotationAxisYAngle || 0;
    this._horizonIncline = this.stateParameters.horizonIncline || 0;

    this._depthChanged = true;
    this._rotationAxisYAngleChanged = true;
    this._horizonInclineChanged = true;

    this.AnimateControl = new AnimateControl();

    this.constructRigElements();

    this.position.z = 0;

    // Set Rig to the initial state
    this.invalidate();
  }

  constructRigElements() {
    // Construct parts
    const depthTrack = new THREE.Group();
    const rotationAxis = new THREE.Group();
    const cameraNull = new THREE.Group();

    // Connect
    this.add(rotationAxis);
    rotationAxis.add(depthTrack);
    depthTrack.add(cameraNull);

    this.depthTrack = depthTrack;
    this.rotationAxis = rotationAxis;
    this.cameraNull = cameraNull;
  }

  setState(newStateParameters) {
    this.stateParameters = newStateParameters;
  }

  set depth(value) {
    if (value === this._depth) {
      return;
    }
    this._depth = value;
    this._depthChanged = true;
  }

  get depth() {
    return this._depth;
  }

  set horizonIncline(value) {
    if (value === this._horizonIncline) {
      return;
    }

    this._horizonIncline = value;
    this._horizonInclineChanged = true;
  }

  get horizonIncline() {
    return this._horizonIncline;
  }

  get rotationAxisYAngle() {
    return this._rotationAxisYAngle;
  }

  set rotationAxisYAngle(value) {
    if (value === this._rotationAxisYAngle) {
      return;
    }

    this._rotationAxisYAngle = value;
    this._rotationAxisYAngleChanged = true;
  }

  invalidate() {
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this._depthChanged = false;
    }

    if (this._horizonInclineChanged) {
      this.depthTrack.rotation.x = this._horizonIncline;
      this._horizonInclineChanged = false;
    }

    if (this._rotationAxisYAngle) {
      this.rotationAxis.rotation.y = this._rotationAxisYAngle;
      this._rotationAxisYAngleChanged = false;
    }
  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  changeStateTo(newStateParameters) {
    const initDepth = this._depth;
    const initHorizonIncline = this._horizonIncline;
    const initRotationAxisYAngle = this._rotationAxisYAngle;

    this.AnimateControl.start(
        new Animation({
          func: (progress) => {
            this.depth = initDepth + (newStateParameters.depth - initDepth) * progress;
            this.horizonIncline = initHorizonIncline + (newStateParameters.horizonIncline - initHorizonIncline) * progress;
            this.rotationAxisYAngle = initRotationAxisYAngle + (newStateParameters.rotationAxisYAngle - initRotationAxisYAngle) * progress;
            this.invalidate();
          },
          duration: this.getTransitionDuration(newStateParameters.index),
          easing: easing.easeInOutSine,
          callback: () => {
            this.setState(newStateParameters);
          },
        })
    );
  }

  getTransitionDuration(nextStateParametersIndex) {
    if (nextStateParametersIndex === 0 || this.stateParameters.index === 0) {
      return 1500;
    }

    return 700;
  }
}
