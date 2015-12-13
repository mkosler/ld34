export default class extends createjs.Container {
  constructor(x, y, color, text, distanceToGround) {
    super();

    this.x = x;
    this.y = y;

    this.fruitBitmap = new createjs.Bitmap('tomato.svg');
    this.fruitBitmap.x = this.fruitBitmap.y = 0;
    this.addChild(this.fruitBitmap);

    this.fruitSplatBitmap = new createjs.Bitmap('splat.svg');
    this.fruitSplatBitmap.x = 0;
    this.fruitSplatBitmap.y = distanceToGround - 228;
    this.fruitSplatBitmap.visible = false;
    this.addChild(this.fruitSplatBitmap);

    this.arcTimerShape = this.createArcTimer();
    this.arcTimerShape.x = 250;
    this.arcTimerShape.y = 10;
    this.addChild(this.arcTimerShape);

    this.word = this.createWord(text);
    this.word.x = 133;
    this.word.y = 100;
    this.addChild(this.word);

    this.countdown = this.originalTime = this.getRandom(2000, 6000);

    createjs.Tween.get(this, {
      onChange: this.updateArcTimer.bind(this)
    }).to({countdown: 0}, this.originalTime)
      .call(this.splat.bind(this));

    this.on('removed', this.onRemoved.bind(this));
  }

  createArcTimer() {
    let arc = new createjs.Shape();

    arc.graphics.setStrokeStyle(3)
      .beginStroke('#ff7c1f')
      .arc(0, 0, 30, 0, Math.PI * 2);

    return arc;
  }

  updateArcTimer(evt) {
    let percent = this.getPercentLeft();

    this.arcTimerShape.graphics.clear();

    this.arcTimerShape.graphics.setStrokeStyle(15)
      .beginStroke('#ff7c1f')
      .arc(0, 0, 30, 0, Math.PI * 2 * percent);
  }

  createWord(word) {
    let text = new createjs.Text();
    text.text = word;
    text.color = '#000000';
    text.font = 'bold 55px rustic';
    text.textAlign = 'center';

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

    createjs.Sound.play('splatSnd');

    let splatEvent = new createjs.Event('splat', true);
    this.dispatchEvent(splatEvent);
  }
}
