import * as THREE from 'three';
import {degreesToRadians} from '../../../helpers/utils';
import Animation from '../../2d-animation/animation-2d';
import {AnimateControl} from './animate-control';
import easing from '../../../helpers/easing';

const KEYHOLE_FULL_OPACITY_BP = -1900;
const KEYHOLE_NO_OPACITY_BP = -1200;

// todo: переименовать (Rig??)
// todo: общий код вынести в родительский чат
export class CameraRigDesktop extends THREE.Group {
  constructor(startSceneIndex, sceneController) {
    super();
    this.name = `CameraRig`;
    this.keyholeCover = sceneController.mainPageScene.keyholeCover;
    this.AnimateControl = new AnimateControl();

    const stateParameters = this.getCameraRigStageState(startSceneIndex).newStateParams;
    this.sceneIndex = stateParameters.index || 0;
    this._depth = stateParameters.depth || 0;
    this._rotationAxisYAngle = stateParameters.rotationAxisYAngle || 0;
    this._horizonIncline = stateParameters.horizonIncline || 0;
    this._pitchRotation = stateParameters.pitchRotation || 0;
    this._pitchDepth = stateParameters.pitchDepth || 0;

    this._depthChanged = true;
    this._rotationAxisYAngleChanged = true;
    this._horizonInclineChanged = true;
    this._pitchRotationChanged = true;
    this._pitchDepthChanged = true;

    this.constructRigElements();
    this.position.z = 0;
    this.redraw();
  }

  constructRigElements() {
    this.rotationAxis = new THREE.Group();
    this.depthTrack = new THREE.Group();
    this.pitchAxis = new THREE.Group();
    this.cameraNull = new THREE.Group();

    this.add(this.rotationAxis);
    this.rotationAxis.add(this.depthTrack);
    this.depthTrack.add(this.pitchAxis);
    this.pitchAxis.add(this.cameraNull);
    this.pitchAxis.position.z = this.pitchDepth;
  }

  get depth() {
    return this._depth;
  }

  set depth(value) {
    if (value === this._depth) {
      return;
    }
    this._depth = value;
    this._depthChanged = true;
  }

  get horizonIncline() {
    return this._horizonIncline;
  }

  set horizonIncline(value) {
    if (value === this._horizonIncline) {
      return;
    }

    this._horizonIncline = value;
    this._horizonInclineChanged = true;
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

  get pitchRotation() {
    return this._pitchRotation;
  }

  set pitchRotation(value) {
    if (value === this._pitchRotation) {
      return;
    }

    this._pitchRotation = value;
    this._pitchRotationChanged = true;
  }

  get pitchDepth() {
    return this._pitchDepth;
  }

  set pitchDepth(value) {
    if (value === this._pitchDepth) {
      return;
    }

    this._pitchDepth = value;
    this._pitchDepthChanged = true;
  }

  redraw() {
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this.pitchAxis.position.y = this._pitchDepth * Math.tan(this._horizonIncline);
      this.changeKeyHoleOpacityByDepth(this._depth);
      this._depthChanged = false;
    }

    if (this._horizonInclineChanged) {
      this.depthTrack.rotation.x = this._horizonIncline;
      this._horizonInclineChanged = false;
    }

    if (this._rotationAxisYAngleChanged) {
      this.rotationAxis.rotation.y = this._rotationAxisYAngle;
      this._rotationAxisYAngleChanged = false;
    }
    if (this._pitchRotationChanged) {
      this.cameraNull.position.y = Math.tan(this._pitchRotation) * this._pitchDepth;
      this.cameraNull.rotation.x = -this._pitchRotation;
      this._pitchRotationChanged = false;
    }

    if (this._pitchDepthChanged) {
      this.pitchAxis.position.z = this._pitchDepth;
      this._pitchDepthChanged = false;
    }
  }

  /**
   * Анимация прозрачности дверной скважены при переходе
   * @param {*} depth Глубина приближения
   */
  changeKeyHoleOpacityByDepth(depth) {
    if (this.keyholeCover) {
      let opacity;

      if (depth < KEYHOLE_FULL_OPACITY_BP) {
        opacity = 1;
      } else if (depth > KEYHOLE_NO_OPACITY_BP) {
        opacity = 0;
      } else {
        opacity = (depth - KEYHOLE_NO_OPACITY_BP) / (KEYHOLE_FULL_OPACITY_BP - KEYHOLE_NO_OPACITY_BP);
      }
      this.keyholeCover.opacity = opacity;
      this.keyholeCover.redraw();
    }
  }

  addObjectToRotationAxis(object) {
    this.rotationAxis.add(object);
  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  changeStateTo({newStateParams, animationParams}, onComplete) {
    if (this.sceneIndex === newStateParams.index) {
      return;
    }
    this.sceneIndex = newStateParams.index;
    const initDepth = this._depth;
    const initHorizonIncline = this._horizonIncline;
    const initRotationAxisYAngle = this._rotationAxisYAngle;
    const initPitchRotation = this._pitchRotation;
    const initPitchDepth = this._pitchDepth;

    this.AnimateControl.start(
        new Animation({
          func: (progress) => {
            if (typeof newStateParams.depth === `number`) {
              this.depth = initDepth + (newStateParams.depth - initDepth) * progress;
            }

            if (typeof newStateParams.horizonIncline === `number`) {
              this.horizonIncline = initHorizonIncline + (newStateParams.horizonIncline - initHorizonIncline) * progress;
            }

            if (typeof newStateParams.rotationAxisYAngle === `number`) {
              this.rotationAxisYAngle = initRotationAxisYAngle + (newStateParams.rotationAxisYAngle - initRotationAxisYAngle) *
                progress;
            }

            if (typeof newStateParams.pitchRotation === `number`) {
              this.pitchRotation = initPitchRotation + (this.getMaxPitchRotation() * newStateParams.pitchRotation -
                initPitchRotation) * progress;
            }

            if (typeof newStateParams.pitchDepth === `number`) {
              this.pitchDepth = initPitchDepth + (newStateParams.pitchDepth - initPitchDepth) * progress;
            }
            this.redraw();
          },
          duration: animationParams.duration,
          easing: animationParams.easing,
          callback: () => {
            if (typeof onComplete === `function`) {
              onComplete();
            }
          },
        })
    );
  }

  getCameraRigStageState(nextSceneIndex, prevRoomIndex = 1) {
    if (nextSceneIndex === 0) {
      return {
        newStateParams: {
          index: nextSceneIndex,
          depth: this.getMaxDepth(),
          rotationAxisYAngle: 0,
          horizonIncline: 0,
          pitchRotation: 0,
          pitchDepth: 1405,
        },
        animationParams: {
          duration: 1500,
          easing: easing.easeInOutSine,
        },
      };
    }

    if (typeof nextSceneIndex !== `number`) {
      return {
        newStateParams: {
          index: prevRoomIndex,
          depth: this.getMinDepth(),
          rotationAxisYAngle: ((prevRoomIndex - 1) * Math.PI) / 2,
          horizonIncline: -degreesToRadians(10),
          pitchDepth: 1700,
        },
        animationParams: {
          duration: 1500,
          easing: easing.easeInOutSine,
        },
      };
    }

    if ([1, 2, 3, 4].includes(nextSceneIndex)) {
      return {
        newStateParams: {
          index: nextSceneIndex,
          depth: this.getMinDepth(),
          rotationAxisYAngle: ((nextSceneIndex - 1) * Math.PI) / 2,
          horizonIncline: -degreesToRadians(10),
          pitchDepth: 1700,
        },
        animationParams: {
          duration: 700,
          easing: easing.easeInOutSine,
        },
      };
    }

    return {newStateParams: {}, animationParams: {}};
  }

  getMinDepth() {
    return 600;
  }

  getMaxDepth() {
    return -2900;
  }

  getMaxPitchRotation() {
    return 0.6;
  }
}
