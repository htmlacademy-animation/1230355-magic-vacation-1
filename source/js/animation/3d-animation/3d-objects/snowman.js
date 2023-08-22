import * as THREE from 'three';

export class Snowman extends THREE.Group {
    constructor() {
        super();
        this.constructChildren();
    }

    constructChildren() {
        this.addTopSphere();
        this.addBottomSphere();
        this.addCone();
    }

    addTopSphere() {
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.05,
            emissive: 0x243452,
            roughness: 0.7
        });
        const geometry = new THREE.SphereGeometry(44, 30, 30);
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }

    addBottomSphere() {
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.05,
            emissive: 0x243452,
            roughness: 0.7
        });
        const geometry = new THREE.SphereGeometry(78, 30, 30);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -108, 0);
        this.add(mesh);
    }

    addCone() {
        const material = new THREE.MeshStandardMaterial({
            color: 0xfe4601,
            metalness: 0.05,
            emissive: 0x000000,
            roughness: 0.7
        });
        const geometry = new THREE.ConeGeometry(18, 75, 30);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-90.0), `XYZ`));
        mesh.position.set(45, 0, 0);
        this.add(mesh);
    }
}