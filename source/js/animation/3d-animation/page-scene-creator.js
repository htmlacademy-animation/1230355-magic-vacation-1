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

  setTransformParams(obj, params) {
    const scale = typeof params.scale === `number` ? params.scale : 1;
    obj.position.set(params.transformX || 0, params.transformY || 0, params.transformZ || 0);
    obj.rotation.set(params.rotateX || 0, params.rotateY || 0, params.rotateZ || 0);
    if (typeof params.scale === `number`) {
      obj.scale.set(scale, scale, scale);
    } else {
      obj.scale.set(params.scaleX || 1, params.scaleY || 1, params.scaleZ || 1);
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
