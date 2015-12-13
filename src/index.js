import Plant from './plant';

window.init = () => {
  $.getJSON('wordlist.json', (wordlist) => {
    let stage = new createjs.Stage('game');

    let hatchHeight = 835;

    let hatch = new createjs.Bitmap('hatch.svg');
    stage.addChild(hatch);

    let plants = [
      new Plant(125, 225, hatchHeight - 75, wordlist),
      new Plant(850, 75, hatchHeight + 120, wordlist),
      new Plant(450, 223, hatchHeight - 50, wordlist),
      new Plant(1325, 400, hatchHeight - 300, wordlist)
    ];

    stage.addChild(...plants);

    let wordInput = document.getElementById('wordInput');
    wordInput.focus(); // starts user at word input on page load
    wordInput.addEventListener('change', (evt) => {
      for (let plant of plants) {
        plant.checkWord(evt.target.value);
      }

      evt.target.value = '';
    });

    stage.on('clearInput', () => {
      wordInput.value = '';
    });

    stage.on('success', () => {
      let score = parseInt($('#score').html());
      $('#score').html(score + 1);
    });

    let gameTimer = {time: 60000}; // one minute

    createjs.Tween.get(gameTimer, {
      onChange: () => {
        let pad = (n) => n < 10 ? '0' + n : n;
        let timerDate = new Date(gameTimer.time);
        $('#timer').html(`${pad(timerDate.getMinutes())}:${pad(timerDate.getSeconds())}`);
      }
    }).to({time: 0}, gameTimer.time)
      .call(() => {
        createjs.Tween.removeAllTweens();
      });

    createjs.Sound.registerSound('splat.mp3', 'splat');
    createjs.Sound.registerSound('correct.mp3', 'correct');

    createjs.Ticker.addEventListener('tick', (evt) => {
      stage.update(evt);
    });
  });
};
