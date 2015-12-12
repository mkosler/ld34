export default class extends createjs.Container {
  constructor(x, y, color) {
    super();

    this.x = x;
    this.y = y;

    this.fruit = this.createFruitShape(color);
    this.addChild(this.fruit);

    this.word = this.createWord();
    this.addChild(this.word);

    this.countdown = this.originalTime = 5000;

    this.on('tick', this.tickHandler.bind(this));
  }

  createFruitShape(color) {
    let shape = new createjs.Shape();

    shape.graphics.beginFill(color)
      .drawCircle(0, 0, this.getRandom(20, 75));

    return shape;
  }

  createWord() {
    let text = new createjs.Text();
    text.text = 'Foo';
    text.color = '#000000';
    text.font = 'bold 36px Arial';

    return text;
  }

  tickHandler(evt) {
    this.countdown -= evt.delta; // evt.delta

    if (this.countdown < 0) {
      evt.remove();
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
