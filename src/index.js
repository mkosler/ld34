import Plant from './plant';

window.init = () => {
  let stage = new createjs.Stage('game');

  let plants = [new Plant()];

  stage.addChild(...plants);

  let wordInput = document.getElementById('wordInput');
  wordInput.addEventListener('change', (evt) => {
    for (let plant of plants) {
      plant.checkWord(evt.target.value);
    }
  });

  stage.on('clearInput', () => {
    wordInput.value = '';
  });

  createjs.Ticker.addEventListener('tick', (evt) => {
    stage.update(evt);
  });
};
