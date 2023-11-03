import * as THREE from 'three';
import Animation from '../../2d-animation/animation-2d';
import {AnimateController} from './animate-controller';

export class Camera extends THREE.Group {
    constructor(startSceneIndex, sceneController) {
        super();
        this.name = `CameraRig`;
        this.keyholeCover = sceneController.mainPageScene.keyholeCover;
        this.animateController = new AnimateController();

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

        this.constructElements();
        this.position.z = 0;
        this.redraw();
    }

    constructElements() {
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
  
        if (depth < this.getKeyholeFullOpacityBp()) {
          opacity = 1;
        } else if (depth > this.getKeyholeNoOpacityBp()) {
          opacity = 0;
        } else {
          opacity = (depth - this.getKeyholeNoOpacityBp()) / (this.getKeyholeFullOpacityBp() - this.getKeyholeNoOpacityBp());
        }
        this.keyholeCover.opacity = opacity;
        this.keyholeCover.redraw();
      }
    }

    changeStateTo({newStateParams, animationParams}, onComplete) {
      if (this.sceneIndex === newStateParams.index) {
        if (typeof onComplete === `function`) {
          onComplete();
        }
        return;
      }
      this.sceneIndex = newStateParams.index;
      const initDepth = this._depth;
      const initHorizonIncline = this._horizonIncline;
      const initRotationAxisYAngle = this._rotationAxisYAngle;
      const initPitchRotation = this._pitchRotation;
      const initPitchDepth = this._pitchDepth;
  
      this.animateController.start(
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
                this.pitchRotation = initPitchRotation + (this.getMaxPitchRotation() * newStateParams.pitchRotation - initPitchRotation) * progress;
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

    addObjectToRotationAxis(object) {
      this.rotationAxis.add(object);
    }
  
    addObjectToCameraNull(object) {
      this.cameraNull.add(object);
    }
}