import Fruit from './fruit';

export default class extends createjs.Container {
  constructor(x = 0, y = 0, distanceToGround, wordlist) {
    super();

    this.distanceToGround = distanceToGround;

    this.wordlist = wordlist;

    this.x = x;
    this.y = y;

    this.fruits = [];

    this.spawnFruit();

    this.on('splat', this.onSplat.bind(this));

    this.scaleX = this.scaleY = .75;
  }

  checkWord(word) {
    for (let [index, fruit] of this.fruits.entries()) {
      if (fruit.word.text.toLowerCase() === word.toLowerCase() &&
          !fruit.splatted) {
        createjs.Sound.play('correct');

        this.removeFruit(fruit, index);

        this.dispatchEvent('success', true);
        this.dispatchEvent('clearInput', true);
      }
    }
  }

  removeFruit(fruit, index) {
    this.removeChild(fruit);
    this.fruits.splice(index, 1);

    createjs.Tween.get(this)
      .wait(this.getRandom(1000, 5000))
      .call(this.spawnFruit.bind(this));
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  spawnFruit() {
    this.fruits.push(new Fruit(0, 0, '#00ff00', this.getNextWord(), this.distanceToGround));
    this.addChild(...this.fruits);
  }

  getNextWord() {
    return this.wordlist[this.getRandom(0, this.wordlist.length - 1)];
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
