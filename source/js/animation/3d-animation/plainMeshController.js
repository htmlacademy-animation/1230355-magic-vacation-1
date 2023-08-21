import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import vertexShader from './shaders/custom-vertex-shader.glsl';
import fragmentShader from './shaders/custom-fragment-shader.glsl';

const IMAGE_ASPECT_RATIO = 2;
const imageHeight = window.innerHeight / 1.5;
const imageWidth = imageHeight * IMAGE_ASPECT_RATIO;

const planeGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);

export const plainMeshController = {
  screen: ``,
  prevStoryTheme: 0,
  textureScreenImages: {
    intro: [`scene-0`],
    story: [`scene-1`, `scene-2`, `scene-3`, `scene-4`],
  },

  setStoryActiveMesh(index = this.prevStoryTheme) {
    if (this.screen !== `story`) {
      return;
    }

    scene.scene.children.forEach((mesh) => {
      if (!mesh.isMesh) {
        return;
      }
      if (mesh.name === this.textureScreenImages.story[index]) {
        mesh.visible = true;

        this.setMeshTransformations(mesh, index);

        return;
      }

      mesh.visible = false;
    });

    this.prevStoryTheme = index;
    scene.render();
  },

  clearScene() {
    scene.clearScene();
  },

  async addScreenMesh(name) {
    this.screen = name;

    const images = this.textureScreenImages[name];

    await Promise.all(
        images.map(
            (img) =>
              new Promise((resolve) => {
                scene.textureLoader.load(
                    `./img/module-5/scenes-textures/${img}.png`,
                    (texture) => {
                      const material = this.getEffectMaterial(texture);

                      const planeMesh = new THREE.Mesh(planeGeometry, material);
                      planeMesh.name = img;

                      scene.addSceneObject(planeMesh);

                      resolve();
                    }
                );
              })
        )
    );

    return Promise.resolve();
  },

  getEffectMaterial(texture) {
    return new THREE.RawShaderMaterial({
      uniforms: {
        map: new THREE.Uniform(texture),
        timestamp: new THREE.Uniform(0),
        bubble1: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -2 * 0.07),
          bubbleRadius: 0.05,
          startTime: 0,
          delay: 600,
          getPositionX: (time) =>
            0.3 + 0.02 * Math.exp(-0.05 * time) * Math.sin(Math.PI * time * 2.5),
          getPositionY: (y) => y + 0.007,
        }),
        bubble2: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -2 * 0.06),
          bubbleRadius: 0.065,
          startTime: 0,
          delay: 0,
          getPositionX: (time) =>
            0.4 + 0.03 * Math.exp(-0.05 * time) * Math.sin(Math.PI * time * 2.5),
          getPositionY: (y) => y + 0.007,
        }),
        bubble3: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -2 * 0.04),
          bubbleRadius: 0.03,
          startTime: 0,
          delay: 1000,
          getPositionX: (time) =>
            0.5 + 0.01 * Math.exp(-0.05 * time) * Math.sin(Math.PI * time * 2),
          getPositionY: (y) => y + 0.008,
        }),
        hasBubbles: new THREE.Uniform(false),
      },
      defines: {
        IMAGE_ASPECT_RATIO,
        BUBBLE_LINE_WIDTH: 0.002,
      },
      vertexShader,
      fragmentShader,
    });
  },
  setMeshTransformations(mesh, index) {
    const transformations = [];
    scene.clearTransformationsLoop();

    if (index === 1) {
      const bubble1 = mesh.material.uniforms.bubble1.value;
      const bubble2 = mesh.material.uniforms.bubble2.value;
      const bubble3 = mesh.material.uniforms.bubble3.value;

      const transformationCallback = (timestamp) => {
        mesh.material.uniforms.timestamp.value = timestamp;
        mesh.material.uniforms.hasBubbles.value = true;

        [bubble1, bubble2, bubble3].forEach((bubble) => {
          if (!bubble.startTime) {
            bubble.startTime = timestamp;
          }

          if (timestamp < bubble.startTime + bubble.delay) {
            return;
          }

          if (bubble.bubblePosition.y > 1.0 + 2 * bubble.bubbleRadius) {
            bubble.bubblePosition.y = -2 * bubble.bubbleRadius;
            bubble.startTime = timestamp;
          }

          const deltaTime = (timestamp - bubble.startTime) / 1000;

          bubble.bubblePosition.x = bubble.getPositionX(deltaTime);
          bubble.bubblePosition.y = bubble.getPositionY(
              bubble.bubblePosition.y
          );
        });
      };

      transformations.push(transformationCallback);
    }
    scene.addTransformationsToLoop(transformations);
  },
};
