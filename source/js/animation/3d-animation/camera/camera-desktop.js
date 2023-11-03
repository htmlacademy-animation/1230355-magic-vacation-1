import {degreesToRadians} from '../../../helpers/utils';
import easing from '../../../helpers/easing';
import {Camera} from './camera';

export class CameraDesktop extends Camera {
  constructor(startSceneIndex, sceneController) {
    super(startSceneIndex, sceneController);
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
          duration: 1900,
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
          pitchRotation: 0,
          pitchDepth: 1700,
        },
        animationParams: {
          duration: 1900,
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
          pitchRotation: 0,
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

  getKeyholeFullOpacityBp() {
    return -1900;
  }

  getKeyholeNoOpacityBp() {
    return -800;
  }

}
