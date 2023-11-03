import * as THREE from 'three';
import {RoadCustomMaterial} from './road-custom-material';
import {CarpetMaterial} from './carpet-custom-material';
import {MATERIAL_TYPE, DESKTOP_WIDTH_MIN} from '../../../helpers/constants';

export class MaterialCreator {
  constructor(textureLoader) {
    this.textureLoader = textureLoader;
  }

  create(materialType, config) {
    switch (materialType) {
      case MATERIAL_TYPE.SoftMaterial: {
        return this.createSoft({
          ...MaterialCreator.Config.SoftMaterial,
          ...config,
        });
      }
      case MATERIAL_TYPE.BasicMaterial: {
        return this.createBasic({
          ...MaterialCreator.Config.BasicMaterial,
          ...config,
        });
      }
      case MATERIAL_TYPE.StrongMaterial: {
        return this.createStrong({
          ...MaterialCreator.Config.StrongMaterial,
          ...config,
        });
      }
      case MATERIAL_TYPE.CustomRoadMaterial: {
        return this.createRoadMaterial({
          ...MaterialCreator.Config.SoftMaterial,
          ...config,
        });
      }
      case MATERIAL_TYPE.CustomCarpetMaterial: {
        return this.createCarpetMaterial({
          ...MaterialCreator.Config.SoftMaterial,
          ...config,
        });
      }
      default: {
        return this.createBasic({
          ...MaterialCreator.Config.StrongMaterial,
          ...config,
        });
      }
    }
  }

  createSoft(config) {
    if (window.innerWidth > DESKTOP_WIDTH_MIN) {
      return new THREE.MeshStandardMaterial(config);
    } else {
      return new THREE.MeshMatcapMaterial({
        matcap: this.textureLoader.load(`./img/module-7/matcaps/soft-mat.png`),
        color: config.color,
        name: config.name,
        side: config.side || THREE.FrontSide
      });
    }
  }

  createBasic(config) {
    if (window.innerWidth > DESKTOP_WIDTH_MIN) {
      return new THREE.MeshStandardMaterial(config);
    } else {
      return new THREE.MeshMatcapMaterial({
        matcap: this.textureLoader.load(`./img/module-7/matcaps/basic-mat.png`),
        color: config.color,
        name: config.name,
        transparent: true,
        side: config.side || THREE.FrontSide
      });
    }
  }

  createStrong(config) {
    if (window.innerWidth > DESKTOP_WIDTH_MIN) {
      return new THREE.MeshPhongMaterial(config);
    } else {
      return new THREE.MeshMatcapMaterial({
        matcap: this.textureLoader.load(`./img/module-7/matcaps/strong-mat-snowcolor.png`),
        color: config.color,
        name: config.name,
        side: config.side || THREE.FrontSide
      });
    }
  }

  createRoadMaterial(config) {
    return new RoadCustomMaterial(config);
  }

  createCarpetMaterial(config) {
    return new CarpetMaterial(config);
  }
}

MaterialCreator.Colors = {
  Blue: `rgb(51, 113, 235)`,
  BrightBlue: `rgb(47, 58, 201)`,
  LightBlue: `rgb(150, 176, 243)`,
  DarkBlue: `rgb(12, 49, 112)`,
  SkyLightBlue: `rgb(161, 200, 240)`,
  MountainBlue: `rgb(101, 152, 219)`,
  DominantRed: `rgb(255, 32, 66)`,
  LightDominantRed: `rgb(255, 105, 120)`,
  ShadowedDominantRed: `rgb(124, 26, 48)`,
  Purple: `rgb(163, 118, 235)`,
  BrightPurple: `rgb(118, 76, 225)`,
  LightPurple: `rgb(194, 153, 225)`,
  AdditionalPurple: `rgb(119, 85, 189)`,
  DarkPurple: `rgb(76, 49, 121)`,
  ShadowedPurple: `rgb(75, 50, 116)`,
  ShadowedBrightPurple: `rgb(56, 37, 108)`,
  ShadowedLightPurple: `rgb(77, 53, 106)`,
  ShadowedAdditionalPurple: `rgb(55, 38, 89)`,
  ShadowedDarkPurple: `rgb(49, 42, 71)`,
  Grey: `rgb(118, 125, 143)`,
  MetalGrey: `rgb(126, 141, 164)`,
  Orange: `rgb(230, 80, 0)`,
  Green: `rgb(0, 210, 134)`,
  White: `rgb(255, 255, 255)`,
  SnowColor: `rgb(182, 206, 240)`,
};

MaterialCreator.Config = {
  SoftMaterial: {
    roughness: 0.9,
    metalness: 0.0,
    name: MATERIAL_TYPE.SoftMaterial,
  },
  BasicMaterial: {
    roughness: 0.62,
    metalness: 0.53,
    name: MATERIAL_TYPE.BasicMaterial,
  },
  StrongMaterial: {
    shininess: 0,
    specular: 0xffffff,
    name: MATERIAL_TYPE.StrongMaterial,
  },
};
