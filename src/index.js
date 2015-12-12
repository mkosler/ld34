import Plant from './plant';

window.init = () => {
  let stage = new createjs.Stage('game');

  let plant = new Plant();

  plant.debugImage('#ff0000');

  stage.addChild(plant);

  stage.update();
};
