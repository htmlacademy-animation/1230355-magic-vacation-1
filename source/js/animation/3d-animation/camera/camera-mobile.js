import {degreesToRadians} from '../../../helpers/utils';
import easing from '../../../helpers/easing';
import {Camera} from './camera';

export class CameraMobile extends Camera {
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
          pitchDepth: 4405,
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
          pitchDepth: 1000,
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
          pitchRotation: 0,
          pitchDepth: 1000,
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
    return -50;
  }

  getMaxDepth() {
    return -370;
  }

  getMaxPitchRotation() {
    return 0.8;
  }

  getKeyholeFullOpacityBp() {
    return -300;
  }

  getKeyholeNoOpacityBp() {
    return -100;
  }

}
