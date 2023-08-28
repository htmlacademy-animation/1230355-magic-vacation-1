import * as THREE from "three";

export class CarpetCustomMaterial extends THREE.MeshStandardMaterial {
  constructor(colors) {
    super();
    this.mainColor = colors.mainColor;
    this.additionalColor = colors.additionalColor;
  }
  onBeforeCompile(shader) {
    shader.uniforms = {
      ...shader.uniforms,
      mainColor: new THREE.Uniform(
          new THREE.Color(this.mainColor)
      ),
      additionalColor: new THREE.Uniform(
          new THREE.Color(this.additionalColor)
      ),
    };

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_pars_vertex>`,
        `varying vec2 vUv;`
    );

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_vertex>`,
        `vUv = uv;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `varying vec3 vViewPosition;`,
        `varying vec3 vViewPosition;
        varying vec2 vUv;
        uniform vec3 mainColor;
        uniform vec3 additionalColor;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `float strength = mod(vUv.x * 3.5, 1.0);
        strength = step(0.5, strength);
        vec3 color = strength < 0.5 ? mainColor : additionalColor;
        diffuseColor = vec4(color, vUv);`
    );
  }
}
