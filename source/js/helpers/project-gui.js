import {GUI} from "dat.gui";
import * as THREE from "three";
import {MaterialCreator} from "../animation/3d-animation/material/material-creator";
import {MATERIAL_TYPE} from "./constants";

export class ProjectGui extends GUI {
  constructor(scene) {
    super();

    this.scene = scene;
    this.init();
  }

  init() {
    const softMaterial = this.addFolder(MATERIAL_TYPE.SoftMaterial);
    softMaterial
      .add(MaterialCreator.Config.SoftMaterial, `roughness`, 0, 1, 0.01)
      .onChange((data) => {
        this.updateChildrenMeshMaterial(
            data,
            MATERIAL_TYPE.SoftMaterial,
            `roughness`
        );
      });
    softMaterial
      .add(MaterialCreator.Config.SoftMaterial, `metalness`, 0, 1, 0.01)
      .onChange((data) => {
        this.updateChildrenMeshMaterial(
            data,
            MATERIAL_TYPE.SoftMaterial,
            `metalness`
        );
      });
    softMaterial.open();

    const basicMaterial = this.addFolder(MATERIAL_TYPE.BasicMaterial);
    basicMaterial
      .add(MaterialCreator.Config.BasicMaterial, `roughness`, 0, 1, 0.01)
      .onChange((data) => {
        this.updateChildrenMeshMaterial(
            data,
            MATERIAL_TYPE.BasicMaterial,
            `roughness`
        );
      });
    basicMaterial
      .add(MaterialCreator.Config.BasicMaterial, `metalness`, 0, 1, 0.01)
      .onChange((data) => {
        this.updateChildrenMeshMaterial(
            data,
            MATERIAL_TYPE.BasicMaterial,
            `metalness`
        );
      });
    basicMaterial.open();

    const strongMaterial = this.addFolder(MATERIAL_TYPE.StrongMaterial);
    strongMaterial
      .add(MaterialCreator.Config.StrongMaterial, `shininess`, 0, 100, 1)
      .onChange((data) => {
        this.updateChildrenMeshMaterial(
            data,
            MATERIAL_TYPE.StrongMaterial,
            `shininess`
        );
      });
    strongMaterial
      .addColor(MaterialCreator.Config.StrongMaterial, `specular`)
      .onChange((value) => {
        const data = Number(`0x` + value.toString(16));

        MaterialCreator.Config.StrongMaterial.specular = data;

        this.updateChildrenMeshMaterial(
            data,
            MATERIAL_TYPE.StrongMaterial,
            `specular`
        );
      });
    strongMaterial.open();

    this.scene.addSceneObject(this);
  }

  updateChildrenMeshMaterial(data, materialName, propName) {
    this.scene.scene.traverse((child) => {
      if (child.type === `Mesh` && child.material.name === materialName) {
        if (propName === `specular`) {
          child.material[propName] = new THREE.Color(data);
        } else {
          child.material[propName] = data;
        }
      }
    });
  }
}
