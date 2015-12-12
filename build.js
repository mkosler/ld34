(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = (function (_createjs$Container) {
  _inherits(_class, _createjs$Container);

  function _class(x, y, color, text) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

    _this.x = x;
    _this.y = y;

    _this.fruitBitmap = new createjs.Bitmap('tomato.png');
    _this.fruitBitmap.x = _this.fruitBitmap.y = 0;
    _this.addChild(_this.fruitBitmap);

    _this.fruitSplatBitmap = new createjs.Bitmap('splat.png');
    _this.fruitSplatBitmap.x = -50;
    _this.fruitSplatBitmap.y = 200;
    _this.fruitSplatBitmap.visible = false;
    _this.addChild(_this.fruitSplatBitmap);

    _this.arcTimerShape = _this.createArcTimer();
    _this.arcTimerShape.x = 100;
    _this.arcTimerShape.y = 10;
    _this.addChild(_this.arcTimerShape);

    _this.word = _this.createWord(text);
    _this.word.x = 27;
    _this.word.y = 45;
    _this.addChild(_this.word);

    _this.countdown = _this.originalTime = 5000;

    createjs.Tween.get(_this, {
      onChange: _this.updateArcTimer.bind(_this)
    }).to({ countdown: 0 }, _this.originalTime).call(_this.splat.bind(_this));

    _this.on('removed', _this.onRemoved.bind(_this));
    return _this;
  }

  _createClass(_class, [{
    key: 'createArcTimer',
    value: function createArcTimer() {
      var arc = new createjs.Shape();

      arc.graphics.setStrokeStyle(3).beginStroke('#000000').arc(0, 0, 5, 0, Math.PI * 2);

      return arc;
    }
  }, {
    key: 'updateArcTimer',
    value: function updateArcTimer(evt) {
      var percent = this.getPercentLeft();

      this.arcTimerShape.graphics.clear();

      this.arcTimerShape.graphics.setStrokeStyle(3).beginStroke('#000000').arc(0, 0, 5, 0, Math.PI * 2 * percent);
    }
  }, {
    key: 'createWord',
    value: function createWord(word) {
      var text = new createjs.Text();
      text.text = word;
      text.color = '#000000';
      text.font = 'bold 36px Arial';

      return text;
    }
  }, {
    key: 'onRemoved',
    value: function onRemoved(evt) {
      this.removeAllEventListeners();
      createjs.Tween.removeTweens(this);
    }
  }, {
    key: 'getRandom',
    value: function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }, {
    key: 'getPercentLeft',
    value: function getPercentLeft() {
      return this.countdown / this.originalTime;
    }
  }, {
    key: 'splat',
    value: function splat() {
      this.fruitSplatBitmap.visible = true;
      this.word.visible = false;
      this.fruitBitmap.visible = false;

      this.splatted = true;

      createjs.Sound.play('splat');

      var splatEvent = new createjs.Event('splat', true);
      this.dispatchEvent(splatEvent);
    }
  }]);

  return _class;
})(createjs.Container);

exports.default = _class;

},{}],2:[function(require,module,exports){
'use strict';

var _plant = require('./plant');

var _plant2 = _interopRequireDefault(_plant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.init = function () {
  var stage = new createjs.Stage('game');

  var plants = [new _plant2.default()];

  stage.addChild.apply(stage, plants);

  var wordInput = document.getElementById('wordInput');
  wordInput.focus(); // starts user at word input on page load
  wordInput.addEventListener('change', function (evt) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plants[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var plant = _step.value;

        plant.checkWord(evt.target.value);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  stage.on('clearInput', function () {
    wordInput.value = '';
  });

  createjs.Sound.registerSound('splat.mp3', 'splat');
  createjs.Sound.registerSound('correct.mp3', 'correct');

  createjs.Ticker.addEventListener('tick', function (evt) {
    stage.update(evt);
  });
};

},{"./plant":3}],3:[function(require,module,exports){
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fruit = require('./fruit');

var _fruit2 = _interopRequireDefault(_fruit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = (function (_createjs$Container) {
  _inherits(_class, _createjs$Container);

  function _class() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

    _this.x = x;
    _this.y = y;

    _this.plantBitmap = new createjs.Bitmap('vine.png');
    _this.addChild(_this.plantBitmap);

    _this.fruits = [];

    _this.fruits.push(new _fruit2.default(130, 180, '#00ff00', 'Foo'));

    _this.addChild.apply(_this, _toConsumableArray(_this.fruits));

    _this.on('splat', _this.onSplat.bind(_this));

    _this.scaleX = _this.scaleY = .75;
    return _this;
  }

  _createClass(_class, [{
    key: 'checkWord',
    value: function checkWord(word) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.fruits.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var index = _step$value[0];
          var fruit = _step$value[1];

          if (fruit.word.text.toLowerCase() === word.toLowerCase() && !fruit.splatted) {
            createjs.Sound.play('correct');

            this.removeChild(fruit);
            this.fruits.splice(index, 1);

            this.dispatchEvent('clearInput', true);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'removeFruit',
    value: function removeFruit(fruit, index) {
      this.removeChild(fruit);
      this.fruits.splice(index, 1);
    }
  }, {
    key: 'onSplat',
    value: function onSplat(evt) {
      var _this2 = this;

      var fruit = evt.target;

      createjs.Tween.get(this).wait(2000).call((function () {
        _this2.removeFruit(fruit, _this2.fruits.indexOf(fruit));
      }).bind(this));
    }
  }]);

  return _class;
})(createjs.Container);

exports.default = _class;

},{"./fruit":1}]},{},[2])


//# sourceMappingURL=build.js.map
