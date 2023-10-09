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

  async createObjectMesh(config) {
    const obj = await this.objectCreator.create(config.name);

    if (config.material) {
      this.applyMaterialToObject(obj, config.material);
    }

    if (config.transform) {
      this.setTransformParams(obj, config.transform);
    }

    return obj;
  }

  async createExtrudedSvgMesh(config) {
    const obj = await this.extrudeSvgCreator.create(
        config.name,
        config.extrude
    );

    if (config.transform) {
      this.setTransformParams(obj, config.transform);
    }

    return obj;
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
