import {Scene3d} from './scene-3d';

export const scene = new Scene3d({
  elementId: `animation-screen-3d`,
  cameraConfig: {fov: 35, positionZ: 1000, near: 1, far: 5500},
});
