import {GUI} from 'dat.gui';

export class TransformationGuiHelper extends GUI {
  addNewFolder(name, object, {position = {}, rotation = {}, scale = {}}) {
    let folderName = name;
    let index = 1;

    while (this.__folders[folderName]) {
      index++;
      folderName = `${name} - ${index}`;
    }

    const newFolder = this.addFolder(folderName);

    const objectTransform = newFolder.addFolder(`position`);

    if (typeof position.x === `number`) {
      objectTransform.add(position, `x`, -3000, 3000, 10).onChange((data) => {
        object.position.set(data, position.y || 0, position.z || 0);
      });
    }

    if (typeof position.y === `number`) {
      objectTransform.add(position, `y`, -3000, 3000, 10).onChange((data) => {
        object.position.set(position.x || 0, data, position.z || 0);
      });
    }

    if (typeof position.z === `number`) {
      objectTransform.add(position, `z`, -3000, 3000, 10).onChange((data) => {
        object.position.set(position.x || 0, position.y || 0, data);
      });
    }
    objectTransform.open();

    const objectRotation = newFolder.addFolder(`rotation`);

    if (typeof rotation.x === `number`) {
      objectRotation
        .add(rotation, `x`, -Math.PI * 2, Math.PI * 2, 0.1)
        .onChange((data) => {
          object.rotation.set(data, rotation.y || 0, rotation.z || 0);
        });
    }

    if (typeof rotation.y === `number`) {
      objectRotation
        .add(rotation, `y`, -Math.PI * 2, Math.PI * 2, 0.1)
        .onChange((data) => {
          object.rotation.set(rotation.x || 0, data, rotation.z || 0);
        });
    }

    if (typeof rotation.z === `number`) {
      objectRotation
        .add(rotation, `z`, -Math.PI * 2, Math.PI * 2, 0.1)
        .onChange((data) => {
          object.rotation.set(rotation.x || 0, rotation.y || 0, data);
        });
    }

    objectRotation.open();

    const objectScale = newFolder.addFolder(`scale`);

    if (typeof scale === `number`) {
      objectScale.add({scale}, `scale`, 0, 5, 0.1).onChange((data) => {
        object.scale.set(data, data, data);
      });
    } else {
      if (typeof scale.x === `number`) {
        objectScale.add(scale, `x`, 0, 5, 0.1).onChange((data) => {
          object.scale.set(data, getScale(scale.y), getScale(scale.z));
        });
      }

      if (typeof scale.y === `number`) {
        objectScale.add(scale, `y`, 0, 5, 0.1).onChange((data) => {
          object.scale.set(getScale(scale.x), data, getScale(scale.z));
        });
      }

      if (typeof scale.z === `number`) {
        objectScale.add(scale, `z`, 0, 5, 0.1).onChange((data) => {
          object.scale.set(getScale(scale.x), getScale(scale.y), data);
        });
      }
    }

    objectScale.open();
  }
}

export function getScale(scale) {
  return typeof scale === `number` ? scale : 1;
}
