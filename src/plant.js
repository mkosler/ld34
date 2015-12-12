import Fruit from './fruit';

export default class extends createjs.Container {
  constructor(x = 0, y = 0) {
    super();

    this.x = x;
    this.y = y;

    this.plantBitmap = new createjs.Bitmap('vine.png');
    this.addChild(this.plantBitmap);

    this.fruits = [];

    this.fruits.push(new Fruit(130, 180, '#00ff00', 'Foo'));

    this.addChild(...this.fruits);

    this.on('splat', this.onSplat.bind(this));

    this.scaleX = this.scaleY = .75;
  }

  checkWord(word) {
    for (let [index, fruit] of this.fruits.entries()) {
      if (fruit.word.text.toLowerCase() === word.toLowerCase() && !fruit.splatted) {
        createjs.Sound.play('correct');

        this.removeChild(fruit);
        this.fruits.splice(index, 1);

        this.dispatchEvent('clearInput', true);
      }
    }
  }

  removeFruit(fruit, index) {
    this.removeChild(fruit);
    this.fruits.splice(index, 1);
  }

  onSplat(evt) {
    let fruit = evt.target;

    createjs.Tween.get(this)
      .wait(2000)
      .call((() => {
        this.removeFruit(fruit, this.fruits.indexOf(fruit));
      }).bind(this));
  }
}
