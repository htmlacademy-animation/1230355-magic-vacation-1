import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export class Scene3d {
  constructor(config = {}) {
    this.config = config;
    this.meshObjects = new Set();
    this.transformationsLoop = [];
    this.canvasElement = document.getElementById(config.elementId);
    this.initRenderer();
    this.initScene();
    this.initCamera(config.cameraConfig);
    this.initLight();
    this.initTextureLoader();
    window.addEventListener(`resize`, this.onWindowResize.bind(this));
    this.animate = this.animate.bind(this);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.render();
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
        cameraConfig.near || 10,
        cameraConfig.far || 1000
    );
    this.camera.position.z = cameraConfig.positionZ || 5;
  }

  initRenderer() {
    const devicePixelRatio = window.devicePixelRatio;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement,
      alpha: true,
      antialias: devicePixelRatio <= 1,
      powerPreference: `high-performance`,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    if (window.innerWidth > 768) {
      this.renderer.shadowMap.enabled = true;
    }
  }

  initLight() {
    this.lightGroup = new THREE.Group();

    const color = new THREE.Color(`rgb(255,255,255)`);
    const intensity = 1.84;

    const mainLight = new THREE.DirectionalLight(color, intensity);
    const directionalLightTargetObject = new THREE.Object3D();

    directionalLightTargetObject.position.set(
        0,
        -1000 * Math.tan((15 * Math.PI) / 180),
        -1000
    );

    this.scene.add(directionalLightTargetObject);
    mainLight.target = directionalLightTargetObject;

    const frontLight = this.createPointLight(
        [-785, -350, -710],
        new THREE.Color(`rgb(246,242,255)`),
        1.6,
        3000,
        0.2
    );

    const topLight = this.createPointLight(
        [730, 800, -985],
        new THREE.Color(`rgb(245,254,255)`),
        0.95,
        3000,
        0.1
    );

    this.lightGroup.position.z = this.camera.position.z;
    this.lightGroup.add(mainLight, frontLight, topLight);
    this.scene.add(this.lightGroup);
  }

  createPointLight(position, color, intensity, distance, decay) {
    const light = new THREE.PointLight(
        new THREE.Color(color),
        intensity,
        distance,
        decay
    );

    light.castShadow = true;
    light.shadow.mapSize.width = 1512;
    light.shadow.mapSize.height = 1512;
    light.shadow.camera.near = 0.5;
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
    this.transformationsLoop.forEach((callback) => callback(timestamp));
    this.controls.update();
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
    this.render();
  }
  setSceneObjects(...meshObjects) {
    this.clearScene();
    this.meshObjects.add(...meshObjects);
    this.scene.add(...meshObjects);
  }
}
