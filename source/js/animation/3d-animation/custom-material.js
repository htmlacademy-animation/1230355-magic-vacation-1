import vertexShader from '../3d-animation/shaders/custom-vertex-shader.glsl';
import fragmentShader from '../3d-animation/shaders/custom-fragment-shader.glsl';

export default (texture, arg) => ({
  uniforms: {
    map: {
      value: texture
    },
    options: {
      value: arg
    }
  },
  vertexShader,
  fragmentShader
});
