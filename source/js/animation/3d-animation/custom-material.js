import * as THREE from 'three';

// eslint-disable-next-line no-undef
const vertexShader = require(`./shaders/custom-vertex-shader.glsl`);
// eslint-disable-next-line no-undef
const fragmentShader = require(`./shaders/custom-fragment-shader.glsl`);

export default class CustomMaterial extends THREE.RawShaderMaterial {
  constructor(map) {
    super({
      uniforms: {
        map: {
          value: map
        }
      },
      vertexShader,
      fragmentShader
    });
  }
}
