import * as THREE from 'three';
import { scene } from './initAnimationScreen';

export const sphere = {
  clearScene() {
    scene.clearScene();
  },

  addScreenMesh() {
    const geometry = new THREE.SphereGeometry(200, 32, 32);

    const material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.5,
    });

    scene.addSceneObject(new THREE.Mesh(geometry, material));
  },
};
