import * as THREE from 'three';

export class Pyramid extends THREE.Group {
    constructor() {
        super();
        this.constructChildren();
    }

    constructChildren() {
        this.addPyramid();
    }

    addPyramid() {
        const material = new THREE.MeshStandardMaterial({
            color: 0x334ad7,
            metalness: 0.05,
            emissive: 0x0c169f,
            roughness: 0.7
        });
        const geometry = new THREE.ConeGeometry(Math.hypot(250, 250) / 2, 280, 4);
        const mesh = new THREE.Mesh(geometry, material);

        this.add(mesh);
    }
}