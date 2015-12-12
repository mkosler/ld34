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

  function _class(x, y, color) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

    _this.x = x;
    _this.y = y;

    _this.fruit = _this.createFruitShape(color);
    _this.addChild(_this.fruit);

    _this.word = _this.createWord();
    _this.addChild(_this.word);

    _this.countdown = _this.originalTime = 5000;

    _this.on('tick', _this.tickHandler.bind(_this));
    return _this;
  }

  _createClass(_class, [{
    key: 'createFruitShape',
    value: function createFruitShape(color) {
      var shape = new createjs.Shape();

      shape.graphics.beginFill(color).drawCircle(0, 0, this.getRandom(20, 75));

      return shape;
    }
  }, {
    key: 'createWord',
    value: function createWord() {
      var text = new createjs.Text();
      text.text = 'Foo';
      text.color = '#000000';
      text.font = 'bold 36px Arial';

      return text;
    }
  }, {
    key: 'tickHandler',
    value: function tickHandler(evt) {
      this.countdown -= evt.delta; // evt.delta

      if (this.countdown < 0) {
        evt.remove();
      }
    }
  }, {
    key: 'getRandom',
    value: function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
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

  var plant = new _plant2.default();

  stage.addChild(plant);

  createjs.Ticker.addEventListener('tick', function (evt) {
    stage.update(evt);
  });
};

},{"./plant":3}],3:[function(require,module,exports){
'use strict';

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
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.x = 50;
        _this.y = 100;

        _this.name = 'Plant';

        _this.plantShape = new createjs.Shape();

        _this.plantShape.graphics.beginFill('#ff0000').drawRect(0, 0, 25, 100);

        _this.addChild(_this.plantShape);

        _this.fruits = [];

        _this.fruits.push(new _fruit2.default(200, 200, '#00ff00'));
        _this.fruits.push(new _fruit2.default(400, 200, '#0000ff'));

        _this.addChild.apply(_this, _toConsumableArray(_this.fruits));
        return _this;
    }

    return _class;
})(createjs.Container);

exports.default = _class;

},{"./fruit":1}]},{},[2])


//# sourceMappingURL=build.js.map
