import * as THREE from 'three';
import {degreesToRadians} from '../../../helpers/utils';
import Animation from '../../2d-animation/animation-2d';
import easing from '../../../helpers/easing';
import {AnimateControl} from './animate-control';

const KEYHOLE_FULL_OPACITY_BP = -2000;
const KEYHOLE_NO_OPACITY_BP = -500;

// todo: переименовать (Rig??)
export class CameraRigMobile extends THREE.Group {
  constructor(startSceneIndex, sceneController) {
    super();
    this.name = `CameraRig`;
    this.keyholeCover = sceneController.mainPageScene.keyholeCover;
    this.animationController = new AnimateControl();

    const stateParameters = this.getCameraRigStageState(startSceneIndex).newStateParams;
    this.sceneIndex = stateParameters.index || 0;
    this._depth = stateParameters.depth || 0;
    this._rotationAxisYAngle = stateParameters.rotationAxisYAngle || 0;
    this._horizonIncline = stateParameters.horizonIncline || 0;
    this._pitchRotation = stateParameters.pitchRotation || 0;
    this._pitchDepth = stateParameters.pitchDepth || 0;
    this._cameraRotationY = stateParameters.cameraRotationY || 0;   // todo: всегда 0?

    this._depthChanged = true;
    this._rotationAxisYAngleChanged = true;
    this._horizonInclineChanged = true;
    this._pitchRotationChanged = true;
    this._pitchDepthChanged = true;
    this._cameraRotationYChanged = true;


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
    this.cameraNull.rotation.y = degreesToRadians(3);
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

  get cameraRotationY() {
    return this._cameraRotationY;
  }

  set cameraRotationY(value) {
    if (value === this._cameraRotationY) {
      return;
    }

    this._cameraRotationY = value;
    this._cameraRotationYChanged = true;
  }

  redraw() {
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this.changeKeyHoleOpacityByDepth(this._depth);
      this._depthChanged = false;
    }

    if (this._horizonInclineChanged) {
      this.depthTrack.rotation.x = this._horizonIncline;
      this.pitchAxis.position.y = this._pitchDepth * Math.tan(this._horizonIncline);
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

    if (this._cameraRotationYChanged) {
      this.cameraNull.rotation.y = this._cameraRotationY;
      this._cameraRotationYChanged = false;
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
    const initCameraRotationY = this._cameraRotationY;

    this.animationController.start(
        new Animation({
          func: (progress) => {
            if (typeof newStateParams.depth === `number`) {
              this.depth = initDepth + (newStateParams.depth - initDepth) * progress;
            }

            if (typeof newStateParams.horizonIncline === `number`) {
              this.horizonIncline = initHorizonIncline + (newStateParams.horizonIncline - initHorizonIncline) * progress;
            }

            if (typeof newStateParams.rotationAxisYAngle === `number`) {
              this.rotationAxisYAngle = initRotationAxisYAngle + (newStateParams.rotationAxisYAngle - initRotationAxisYAngle) * progress;
            }

            if (typeof newStateParams.pitchRotation === `number`) {
              this.pitchRotation = initPitchRotation + (newStateParams.pitchRotation - initPitchRotation) * progress;
            }

            if (typeof newStateParams.pitchDepth === `number`) {
              this.pitchDepth = initPitchDepth + (newStateParams.pitchDepth - initPitchDepth) * progress;
            }

            if (typeof newStateParams.cameraRotationY === `number`) {
              this.cameraRotationY = initCameraRotationY + (newStateParams.cameraRotationY - initCameraRotationY) * progress;
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
          pitchDepth: 4405,
          cameraRotationY: 0,
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
          horizonIncline: -degreesToRadians(8),
          pitchRotation: 0,
          pitchDepth: 800,
          cameraRotationY: 0,
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
          horizonIncline: -degreesToRadians(8),
          pitchDepth: 800,
          cameraRotationY: 0,
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
    return 0;
  }

  getMaxDepth() {
    return -370;
  }

  getMaxPitchRotation() {
    return 10;
  }
}
