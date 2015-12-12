import Fruit from './fruit';

export default class extends createjs.Container {
  constructor() {
    super();

    this.x = 50;
    this.y = 100;

    this.name = 'Plant';

    this.plantShape = new createjs.Shape();

    this.plantShape.graphics.beginFill('#ff0000')
      .drawRect(0, 0, 25, 100);

    this.addChild(this.plantShape);

    this.fruits = [];

    this.fruits.push(new Fruit(200, 200, '#00ff00'));
    this.fruits.push(new Fruit(400, 200, '#0000ff'));

    this.addChild(...this.fruits);
  }

  checkWord(word) {
    for (let [index, fruit] of this.fruits.entries()) {
      if (fruit.word.text.toLowerCase() === word.toLowerCase()) {
        this.removeChild(fruit);
        this.fruits.splice(index, 1);

        this.dispatchEvent('clearInput', true);
      }
    }
  }
}
