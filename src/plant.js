export default class extends createjs.Container {
  constructor() {
    super();
  }

  debugImage(color) {
    let plant = new createjs.Shape();
    plant.graphics.beginFill(color)
      .drawRect(0, 0, 25, 100);

    this.addChild(plant);
  }
}
