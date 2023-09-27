import {GUI} from "dat.gui";

export class TransformationGuiHelper extends GUI {
  addNewFolder(name, object, transformParams) {
    let folderName = name;
    let index = 1;

    while (this.__folders[folderName]) {
      index++;
      folderName = `${name} - ${index}`;
    }

    const newFolder = this.addFolder(folderName);

    const objectTransform = newFolder.addFolder(`transform`);

    if (typeof transformParams.transformX === `number`) {
      objectTransform
        .add(transformParams, `transformX`, -3000, 3000, 10)
        .onChange((data) => {
          object.position.set(
              data,
              transformParams.transformY || 0,
              transformParams.transformZ || 0
          );
        });
    }

    if (typeof transformParams.transformY === `number`) {
      objectTransform
        .add(transformParams, `transformY`, -3000, 3000, 10)
        .onChange((data) => {
          object.position.set(
              transformParams.transformX || 0,
              data,
              transformParams.transformZ || 0
          );
        });
    }

    if (typeof transformParams.transformZ === `number`) {
      objectTransform
        .add(transformParams, `transformZ`, -3000, 3000, 10)
        .onChange((data) => {
          object.position.set(
              transformParams.transformX || 0,
              transformParams.transformY || 0,
              data
          );
        });
    }
    objectTransform.open();

    const objectRotation = newFolder.addFolder(`rotation`);
    if (typeof transformParams.rotateX === `number`) {
      objectRotation
        .add(transformParams, `rotateX`, -Math.PI, Math.PI, 0.1)
        .onChange((data) => {
          object.rotation.set(
              data,
              transformParams.rotateY || 0,
              transformParams.rotateZ || 0
          );
        });
    }

    if (typeof transformParams.rotateY === `number`) {
      objectRotation
        .add(transformParams, `rotateY`, -Math.PI, Math.PI, 0.1)
        .onChange((data) => {
          object.rotation.set(
              transformParams.rotateX || 0,
              data,
              transformParams.rotateZ || 0
          );
        });
    }

    if (typeof transformParams.rotateZ === `number`) {
      objectRotation
        .add(transformParams, `rotateZ`, -Math.PI, Math.PI, 0.1)
        .onChange((data) => {
          object.rotation.set(
              transformParams.rotateX || 0,
              transformParams.rotateY || 0,
              data
          );
        });
    }
    objectRotation.open();

    if (typeof transformParams.scale === `number`) {
      const objectScale = newFolder.addFolder(`scale`);
      objectScale.add(transformParams, `scale`, 0, 5, 0.1).onChange((data) => {
        object.scale.set(data, data, data);
      });
      objectScale.open();
    }
  }
}
