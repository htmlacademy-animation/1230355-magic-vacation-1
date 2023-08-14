precision mediump float;
uniform sampler2D map;

varying vec2 vUv;

uniform float shiftHue;

struct optionsStruct {
  float hue;
};

uniform optionsStruct options;

vec3 hueShift(vec3 color, float hue) {
  const vec3 k = vec3(0.57735, 0.57735, 0.57735);
  float cosAngle = cos(hue);
  return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {

  vec4 texel = texture2D( map, vUv );

  gl_FragColor = texel;
  if (options.hue != 0.0) {
    vec3 hueShifted = hueShift(texel.rgb, options.hue);
    gl_FragColor = vec4(hueShifted.rgb, 1);
  } else {
    gl_FragColor = texel;
  }

}
