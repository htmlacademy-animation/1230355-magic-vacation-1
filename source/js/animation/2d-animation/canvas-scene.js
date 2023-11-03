export default class canvasScene {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.size = 1000;

    this.sceneObjects = options.sceneObjects;
    this.objectsScene = {};
    this.arrImgs = [];
    this.loadingCounter = 0;

    this.animations = [];
    this.animationsDrop = [];
    this.ObjectsInitEventListener = () => { };
  }

  initObjects() {
    let itemImage;

    this.sceneObjects.forEach((item) => {
      itemImage = new Image();
      itemImage.src = item.url;

      this.objectsScene[item.objectId] = {};
      this.objectsScene[item.objectId].x = item.x;
      this.objectsScene[item.objectId].y = item.y;
      this.objectsScene[item.objectId].size = item.size;
      this.objectsScene[item.objectId].opacity = item.opacity;
      this.objectsScene[item.objectId].transforms = item.transforms;
      this.objectsScene[item.objectId].img = itemImage;

      this.arrImgs.push(itemImage);
    });

    if (this.ObjectsInitEventListener && typeof this.ObjectsInitEventListener === `function`) {
      this.ObjectsInitEventListener();
    }
  }

  drawImage(object) {
    let transforms = object.transforms;

    if (object.opacity === 0 || 
      transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
      return;
    }

    let width = this.size * (object.size / 100);
    let height = (this.size * (object.size / 100) * object.img.height) / object.img.width;
    let x = this.size * (object.x / 100) - width / 2;
    let y = this.size * (object.y / 100) - height / 2;
    this.ctx.save();

    if (transforms) {
      if (transforms.translateX) {
        x += this.size * (transforms.translateX / 100);
      }

      if (transforms.translateY) {
        y += this.size * (transforms.translateY / 100);
      }

      if (transforms.rotate) {
        this.ctx.translate(x + width / 2, y + height / 2);
        this.ctx.rotate((transforms.rotate * Math.PI) / 180);
      }

      if (transforms.scaleX) {
        width *= transforms.scaleX;
        if (transforms.scaleX < 0) {
          this.ctx.scale(-1, 1);
          x = -x;
        }
      }

      if (transforms.scaleY) {
        height *= transforms.scaleY;
        if (transforms.scaleY < 0) {
          this.ctx.scale(1, -1);
          y = -y;
        }
      }

      if (transforms.rotate) {
        this.ctx.translate(-x - width / 2, -y - height / 2);
      }
    }

    if (object.opacity) {
      this.ctx.globalAlpha = object.opacity;
    }

    this.ctx.drawImage(object.img, x, y, width, height);
    object.widthImg = width;
    object.heightImg = height;
    this.ctx.restore();
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let name in this.objectsScene) {
      let objectScene = this.objectsScene[name];
      if (objectScene.before && typeof objectScene.before === `function`) {
        objectScene.before();
      }
      this.drawImage(objectScene);
    }
  }
}
