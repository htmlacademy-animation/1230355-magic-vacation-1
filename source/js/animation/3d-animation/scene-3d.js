import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {DESKTOP_WIDTH_MIN} from '../../helpers/constants';

export class Scene3d {
  constructor(config = {}) {
    this.config = config;
    this.meshObjects = new Set();
    this.resizeInProgress = false;
    this.transformationsLoop = [];
    this.canvasElement = document.getElementById(config.elementId);
    this.initRenderer();
    this.initScene();
    this.initCamera(config.cameraConfig);
    this.initLight();
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.render();

    this.resize();

    this.customRenderer = null;

    window.addEventListener(`resize`, () => {
      this.resizeInProgress = true;
    });
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
    this.devicePixelRation = Math.min(devicePixelRatio, 2);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement,
      alpha: true,
      antialias: this.devicePixelRation <= 1,
      powerPreference: `high-performance`,
      logarithmicDepthBuffer: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(this.devicePixelRation);
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    if (window.innerWidth > DESKTOP_WIDTH_MIN) {
      this.renderer.shadowMap.enabled = true;
    }
  }

  initLight() {
    this.lightGroup = new THREE.Group();
    this.directionalLight = new THREE.Group();
    this.pointerLight = new THREE.Group();

    const color = new THREE.Color(`rgb(255,255,255)`);
    const intensity = 1.84;

    const mainLight = new THREE.DirectionalLight(color, intensity);
    const directionalLightTargetObject = new THREE.Object3D();

    directionalLightTargetObject.position.set(
        0,
        -this.camera.position.z * Math.tan((15 * Math.PI) / 180),
        0
    );

    this.scene.add(directionalLightTargetObject);
    mainLight.target = directionalLightTargetObject;

    const frontLight = this.createPointLight(
        [-785, -350, -510],
        new THREE.Color(`rgb(246,242,255)`),
        1.6,
        5000,
        0.2
    );

    const topLight = this.createPointLight(
        [730, 800, -785],
        new THREE.Color(`rgb(245,254,255)`),
        0.95,
        5000,
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
    light.shadow.bias = -0.005;
    light.shadow.camera.near = 100;
    light.shadow.camera.far = distance;
    light.position.set(position[0], position[1], position[2]);
    return light;
  }

  render() {
    if (this.customRenderer) {
      this.customRenderer.render();
      return;
    }
    this.renderer.render(this.scene, this.camera);
  }

  setRenderer(renderer) {
    this.customRenderer = renderer;
  }

  resetRender() {
    this.customRenderer = null;
  }

  animate(timestamp) {
    this.cancelAnimationFrameId = requestAnimationFrame(this.animate);
    this.transformationsLoop.forEach((callback) => callback(timestamp));
    this.controls.update();
    if (this.resizeInProgress) {
      this.resize();
    }
    this.render();
  }

  startAnimation() {
    this.stopAnimation();
    this.animate();
  }

  stopAnimation() {
    if (this.cancelAnimationFrameId) {
      window.cancelAnimationFrame(this.cancelAnimationFrameId);
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

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height < 1 || width < 1) {
      return;
    }

    if (width > height) {
      this.camera.fov = 35;
    } else {
      this.camera.fov = (32 * height) / Math.min(width * 1.3, height);
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
