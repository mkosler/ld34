export default class extends createjs.Container {
  constructor(x, y, color, text) {
    super();

    this.x = x;
    this.y = y;

    this.fruitBitmap = new createjs.Bitmap('tomato.png');
    this.fruitBitmap.x = this.fruitBitmap.y = 0;
    this.addChild(this.fruitBitmap);

    this.fruitSplatBitmap = new createjs.Bitmap('splat.png');
    this.fruitSplatBitmap.x = -50;
    this.fruitSplatBitmap.y = 200;
    this.fruitSplatBitmap.visible = false;
    this.addChild(this.fruitSplatBitmap);

    this.arcTimerShape = this.createArcTimer();
    this.arcTimerShape.x = 100;
    this.arcTimerShape.y = 10;
    this.addChild(this.arcTimerShape);

    this.word = this.createWord(text);
    this.word.x = 27;
    this.word.y = 45;
    this.addChild(this.word);

    this.countdown = this.originalTime = 5000;

    createjs.Tween.get(this, {
      onChange: this.updateArcTimer.bind(this)
    }).to({countdown: 0}, this.originalTime)
      .call(this.splat.bind(this));

    this.on('removed', this.onRemoved.bind(this));
  }

  createArcTimer() {
    let arc = new createjs.Shape();

    arc.graphics.setStrokeStyle(3)
      .beginStroke('#000000')
      .arc(0, 0, 5, 0, Math.PI * 2);

    return arc;
  }

  updateArcTimer(evt) {
    let percent = this.getPercentLeft();

    this.arcTimerShape.graphics.clear();

    this.arcTimerShape.graphics.setStrokeStyle(3)
      .beginStroke('#000000')
      .arc(0, 0, 5, 0, Math.PI * 2 * percent);
  }

  createWord(word) {
    let text = new createjs.Text();
    text.text = word;
    text.color = '#000000';
    text.font = 'bold 36px Arial';

    return text;
  }

  onRemoved(evt) {
    this.removeAllEventListeners();
    createjs.Tween.removeTweens(this);
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getPercentLeft() {
    return this.countdown / this.originalTime;
  }

  splat() {
    this.fruitSplatBitmap.visible = true;
    this.word.visible = false;
    this.fruitBitmap.visible = false;

    this.splatted = true;

    createjs.Sound.play('splat');

    let splatEvent = new createjs.Event('splat', true);
    this.dispatchEvent(splatEvent);
  }
}
