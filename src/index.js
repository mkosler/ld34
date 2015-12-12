import Plant from './plant';

window.init = () => {
  let stage = new createjs.Stage('game');

  let plant = new Plant();

  stage.addChild(plant);

  createjs.Ticker.addEventListener('tick', (evt) => {
    stage.update(evt);
  });
};
