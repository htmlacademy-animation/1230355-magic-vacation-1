import * as THREE from 'three';
import { Lantern } from './3d-objects/lantern';
import { Snowman } from './3d-objects/snowman';
import { Pyramid } from './3d-objects/pyramid';

export class ObjectsScene extends THREE.Group {
    constructor() {
        super();
        this.constructChildren();
    }

    constructChildren() {
        this.addPyramid();
        this.addLantern();
        this.addSnowman();
    }

    addPyramid() {
        const pyramid = new Pyramid();
        pyramid.position.set(0, 0, 0);
        this.add(pyramid);
    }

    addLantern() {
        const lantern = new Lantern();
        lantern.position.set(400, -100, 0);
        this.add(lantern);
    }

    addSnowman() {
        const snowman = new Snowman();
        snowman.position.set(-400, 0, 0);
        this.add(snowman);
    }
}