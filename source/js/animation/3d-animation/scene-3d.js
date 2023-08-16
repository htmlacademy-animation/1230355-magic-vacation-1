import * as THREE from 'three';

export class Scene3d {
  constructor() {
    this.meshObjects = new Set();
    this.transformationsLoop = [];

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initTextureLoader();

    window.addEventListener(`resize`, this.onWindowResize.bind(this));
    this.animate = this.animate.bind(this);
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    this.camera.position.z = 5;
  }

  initRenderer() {
    const canvasAnimationScreen = document.getElementById(
        `animation-screen-3d`
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasAnimationScreen,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x5f458c, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  initTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate(timestamp) {
    requestAnimationFrame(this.animate);

    this.transformationsLoop.forEach((callback) => {
      callback(timestamp);
    });

    this.render();
  }

  clearScene() {
    this.clearTransformationsLoop();

    this.meshObjects.forEach((mesh) => {
      this.scene.remove(mesh);

      this.meshObjects.delete(mesh);
    });
  }

  addTransformationsToLoop(transformations) {
    this.transformationsLoop.push(...transformations);
  }

  clearTransformationsLoop() {
    this.transformationsLoop = [];
  }

  addSceneObject(meshObject) {
    this.meshObjects.add(meshObject);
    this.scene.add(meshObject);
  }

  setSceneObjects(...meshObjects) {
    this.clearScene();

    this.meshObjects.add(...meshObjects);
    this.scene.add(...meshObjects);
  }
}
