import { scene } from './initAnimationScreen';
import { ObjectsScene } from './objects-scene'

export const sceneController = {
    clearScene() {
        scene.clearScene();
    },

    addScreenMesh() {
        scene.addSceneObject(new ObjectsScene());
    },
};