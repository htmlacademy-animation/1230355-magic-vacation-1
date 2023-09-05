import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const objectsConfig = {
  airplane: {
    type: `obj`,
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
  },
  suitcase: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  watermelon: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  }
};

const loadObj = (path, onComplete) => {
  const loaderObj = new OBJLoader();
  loaderObj.load(path, onComplete);
};

const loadGltf = (path, onComplete) => {
  const loaderGltf = new GLTFLoader();
  loaderGltf.load(path, onComplete);
};

const onComplete = (obj3d, material, callback) => {
  if (material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }

  if (typeof callback === `function`) {
    callback.call(null, obj3d);
  }
};

export const loadModel = (key, material, callback) => {
  const params = objectsConfig[key];

  if (!params) {
    return;
  }

  const onGltfComplete = (gltf) => {
    if (!gltf.scene) {
      return;
    }

    onComplete(gltf.scene, material, callback);
  };

  switch (params.type) {
    case `gltf`:
      loadGltf(params.path, onGltfComplete);

      break;
    default:
      loadObj(params.path, (model) => onComplete(model, material, callback));

      break;
  }
};
