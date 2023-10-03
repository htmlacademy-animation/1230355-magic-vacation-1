import {getScale} from '../../helpers/transformation-gui-helper';
export class PageSceneCreator {
  constructor(
      materialCreator,
      extrudeSvgCreator,
      objectCreator,
      latheGeometryCreator,
      transformationGuiHelper
  ) {
    this.extrudeSvgCreator = extrudeSvgCreator;
    this.materialCreator = materialCreator;
    this.objectCreator = objectCreator;
    this.latheGeometryCreator = latheGeometryCreator;
    this.transformationGuiHelper = transformationGuiHelper;
  }

  createObjectMesh(config, onComplete) {
    this.objectCreator.create(config.name, (obj) => {
      if (config.material) {
        this.applyMaterialToObject(obj, config.material);
      }

      if (config.transform) {
        if (config.enableGui) {
          this.transformationGuiHelper.addNewFolder(
              config.name,
              obj,
              config.transform
          );
        }
        this.setTransformParams(obj, config.transform);
      }
      onComplete(obj);
    });
  }

  createExtrudedSvgMesh(config, onComplete) {
    this.extrudeSvgCreator.create(config.name, config.extrude, (obj) => {
      if (config.transform) {
        if (config.enableGui) {
          this.transformationGuiHelper.addNewFolder(
              config.name,
              obj,
              config.transform
          );
        }
        this.setTransformParams(obj, config.transform);
      }

      onComplete(obj);
    });
  }

  setTransformParams(obj, {position = {}, rotation = {}, scale = {}}) {
    obj.position.set(position.x || 0, position.y || 0, position.z || 0);
    obj.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0);

    if (typeof scale === `number`) {
      obj.scale.set(scale, scale, scale);
    } else {
      obj.scale.set(getScale(scale.x), getScale(scale.y), getScale(scale.z));
    }
  }

  applyMaterialToObject(obj3d, material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }
}
