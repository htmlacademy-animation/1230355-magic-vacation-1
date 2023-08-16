import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import vertexShader from './shaders/custom-vertex-shader.glsl';
import fragmentShader from './shaders/custom-fragment-shader.glsl';

const IMAGE_ASPECT_RATIO = 2;
const imageHeight = window.innerHeight / 100;
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
      if (mesh.name === this.textureScreenImages.story[index]) {
        mesh.visible = true;

        this.setMeshTransformations(mesh, index);

        return;
      }

      mesh.visible = false;
    });

    this.prevStoryTheme = index;
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
        delta: new THREE.Uniform(0),
        bubble1: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, 0),
          bubbleRadius: 0.07,
        }),
        bubble2: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -0.2),
          bubbleRadius: 0.06,
        }),
        bubble3: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -0.7),
          bubbleRadius: 0.04,
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
      const transformationCallback = (timestamp) => {
        mesh.material.uniforms.delta.value = Math.cos(timestamp / 1000) * 20;
        mesh.material.uniforms.hasBubbles.value = true;

        const bubble1position =
          mesh.material.uniforms.bubble1.value.bubblePosition;
        const bubble2position =
          mesh.material.uniforms.bubble2.value.bubblePosition;
        const bubble3position =
          mesh.material.uniforms.bubble3.value.bubblePosition;

        if (bubble1position.y > 1.5) {
          bubble1position.y = -0.5;
        }
        if (bubble2position.y > 1.5) {
          bubble2position.y = -0.5;
        }
        if (bubble3position.y > 1.5) {
          bubble3position.y = -0.5;
        }

        bubble1position.x = Math.sin(timestamp / 300) * 0.05 + 0.4;
        bubble2position.x = Math.sin(timestamp / 350) * 0.06 + 0.5;
        bubble3position.x = Math.sin(timestamp / 400) * 0.07 + 0.6;

        bubble1position.y += 0.003;
        bubble2position.y += 0.002;
        bubble3position.y += 0.0025;
      };

      transformations.push(transformationCallback);
    }

    scene.addTransformationsToLoop(transformations);
  },
};
