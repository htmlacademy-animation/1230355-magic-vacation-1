import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export class Scene3d {
  constructor(config = {}) {
    this.config = config;
    this.meshObjects = new Set();
    this.transformationsLoop = [];
    this.canvasElement = document.getElementById(config.elementId);
    this.initScene();
    this.initCamera(config.cameraConfig);
    this.initRenderer();
    this.initLight();
    this.initTextureLoader();
    window.addEventListener(`resize`, this.onWindowResize.bind(this));
    this.animate = this.animate.bind(this);
    this.render();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    if (config.enableAnimation) {
      this.animate();
    }
  }
  initScene() {
    this.scene = new THREE.Scene();
  }
  initCamera(cameraConfig = {}) {
    this.camera = new THREE.PerspectiveCamera(
        cameraConfig.fov || 75,
        cameraConfig.aspect || window.innerWidth / window.innerHeight,
        cameraConfig.near || 0.1,
        cameraConfig.far || 1000
    );
    this.camera.position.z = cameraConfig.positionZ || 5;
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // if (window.innerWidth > 768) {
    //   this.renderer.shadowMap.enabled = true;
    // }
    this.renderer.shadowMap.enabled = true;
  }

  initLight() {
    this.light = new THREE.Group();

    // Light 1
    const color = new THREE.Color(`rgb(255,255,255)`);
    const intensity = 1.84;

    const light1 = new THREE.DirectionalLight(color, intensity);
    const directionalLightTargetObject = new THREE.Object3D();

    directionalLightTargetObject.position.set(
        0,
        -this.camera.position.z * Math.tan((15 * Math.PI) / 180),
        0
    );

    this.scene.add(directionalLightTargetObject);
    light1.target = directionalLightTargetObject;

    // Light 2
    const light2 = this.createPointLight(
        [-785, -350, -710],
        new THREE.Color(`rgb(246,242,255)`),
        0.6,
        3000,
        2
    );

    // Light 3
    const light3 = this.createPointLight(
        [730, 800, -985],
        new THREE.Color(`rgb(245,254,255)`),
        0.95,
        3000,
        2
    );

    this.light.position.z = this.camera.position.z;
    this.light.add(light1, light2, light3);
    this.scene.add(this.light);
  }

  createPointLight(position, color, intensity, distance, decay) {
    const light = new THREE.PointLight(
        new THREE.Color(color),
        intensity,
        distance,
        decay
    );

    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 5.5;
    light.shadow.camera.far = distance;

    light.position.set(position[0], position[1], position[2]);

    this.scene.add(new THREE.PointLightHelper(light, 10));

    return light;
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
    this.controls.update();

    this.render();

    if (this.config.stats) {
      this.config.stats.forEach((stats) => {
        stats.update();
      });
    }
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
    this.render();
  }
  setSceneObjects(...meshObjects) {
    this.clearScene();
    this.meshObjects.add(...meshObjects);
    this.scene.add(...meshObjects);
  }
}
