import Plant from './plant';

window.init = () => {
  let stage = new createjs.Stage('game');

  let plants = [new Plant()];

  stage.addChild(...plants);

  let wordInput = document.getElementById('wordInput');
  wordInput.focus(); // starts user at word input on page load
  wordInput.addEventListener('change', (evt) => {
    for (let plant of plants) {
      plant.checkWord(evt.target.value);
    }
  });

  stage.on('clearInput', () => {
    wordInput.value = '';
  });

  createjs.Sound.registerSound('splat.mp3', 'splat');
  createjs.Sound.registerSound('correct.mp3', 'correct');

  createjs.Ticker.addEventListener('tick', (evt) => {
    stage.update(evt);
  });
};
