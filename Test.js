"use strict";

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var React = null;
var Easel = window.createjs;
var bindValue = function bindValue(value) {
    return typeof value === "function" ? value : function () {
        return value;
    };
};

var DisplayObject = (function () {
    function DisplayObject() {
        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, DisplayObject);

        this.children = [];
        this.left = bindValue(props.left);
        this.top = bindValue(props.top);
        console.debug(props);
    }

    _createClass(DisplayObject, [{
        key: "addChildren",
        value: function addChildren(children) {
            var _this = this;

            children.forEach(function (child) {
                return _this.addChild(child);
            });
        }
    }, {
        key: "addChild",
        value: function addChild(child) {
            child.parent = this;
            this.children.push(child.build());
        }
    }, {
        key: "build",
        value: function build() {
            return this;
        }
    }, {
        key: "repaint",
        value: function repaint() {
            this.children.forEach(function (child) {
                return child.repaint();
            });
            this.el.x = this.left() || 0;
            this.el.y = this.top() || 0;
        }
    }, {
        key: "attach",
        value: function attach() {
            this.el = this.createBody();
            if (!(this instanceof Stage)) {
                this.parent.el.addChild(this.el);
            }
            this.children.forEach(function (child) {
                return child.attach();
            });
        }
    }, {
        key: "createBody",
        value: function createBody() {
            return new Easel.Container();
        }
    }]);

    return DisplayObject;
})();

var Text = (function (_DisplayObject) {
    _inherits(Text, _DisplayObject);

    function Text(props) {
        _classCallCheck(this, Text);

        _get(Object.getPrototypeOf(Text.prototype), "constructor", this).call(this, props);
        this.Text = bindValue(props.Text);
    }

    _createClass(Text, [{
        key: "createBody",
        value: function createBody() {
            return new Easel.Text("", "20px Arial", "#ff7700");
        }
    }, {
        key: "repaint",
        value: function repaint() {
            this.el.text = this.Text();
        }
    }]);

    return Text;
})(DisplayObject);

var JustACircle = (function (_DisplayObject2) {
    _inherits(JustACircle, _DisplayObject2);

    function JustACircle() {
        _classCallCheck(this, JustACircle);

        _get(Object.getPrototypeOf(JustACircle.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(JustACircle, [{
        key: "createBody",
        value: function createBody() {
            return new Easel.Shape(new Easel.Graphics().beginFill("#999999").drawCircle(-40, 30, 30));
        }
    }]);

    return JustACircle;
})(DisplayObject);

var Stage = (function (_DisplayObject3) {
    _inherits(Stage, _DisplayObject3);

    function Stage(props) {
        _classCallCheck(this, Stage);

        _get(Object.getPrototypeOf(Stage.prototype), "constructor", this).call(this, props);
        this.fps = props.fps || 60;
    }

    _createClass(Stage, [{
        key: "createElement",
        value: function createElement(elementClass, props) {
            var instance = elementClass instanceof DisplayObject ? elementClass : new elementClass(props || {});

            for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                children[_key - 2] = arguments[_key];
            }

            instance.addChildren(children);
            return instance;
        }
    }, {
        key: "createBody",
        value: function createBody() {
            return new Easel.Stage(this.parent.el);
        }
    }, {
        key: "attachTo",
        value: function attachTo(canvas) {
            this.parent = {
                el: canvas
            };
            _get(Object.getPrototypeOf(Stage.prototype), "attach", this).call(this);
        }
    }, {
        key: "repaint",
        value: function repaint() {
            _get(Object.getPrototypeOf(Stage.prototype), "repaint", this).call(this);
            this.el.update();
        }
    }, {
        key: "run",
        value: function run() {
            var _this2 = this;

            setInterval(function () {
                return _this2.repaint();
            }, 1000 / this.fps);
        }
    }]);

    return Stage;
})(DisplayObject);

var BetSpotAbstract = (function (_DisplayObject4) {
    _inherits(BetSpotAbstract, _DisplayObject4);

    function BetSpotAbstract(props) {
        _classCallCheck(this, BetSpotAbstract);

        _get(Object.getPrototypeOf(BetSpotAbstract.prototype), "constructor", this).call(this, props);
        this.Title = props.Title || "";
    }

    _createClass(BetSpotAbstract, [{
        key: "build",
        value: function build(options) {
            var _this3 = this;

            return React.createElement(
                this,
                null,
                React.createElement(Text, { Text: function () {
                        return _this3.Title + Math.random();
                    } }),
                React.createElement(JustACircle, null)
            );
        }
    }]);

    return BetSpotAbstract;
})(DisplayObject);

var LeftBetSpot = (function (_BetSpotAbstract) {
    _inherits(LeftBetSpot, _BetSpotAbstract);

    function LeftBetSpot() {
        _classCallCheck(this, LeftBetSpot);

        _get(Object.getPrototypeOf(LeftBetSpot.prototype), "constructor", this).apply(this, arguments);
    }

    return LeftBetSpot;
})(BetSpotAbstract);

var RightBetSpot = (function (_BetSpotAbstract2) {
    _inherits(RightBetSpot, _BetSpotAbstract2);

    function RightBetSpot() {
        _classCallCheck(this, RightBetSpot);

        _get(Object.getPrototypeOf(RightBetSpot.prototype), "constructor", this).apply(this, arguments);
    }

    return RightBetSpot;
})(BetSpotAbstract);

var BetSpots = (function (_Stage) {
    _inherits(BetSpots, _Stage);

    function BetSpots(props) {
        _classCallCheck(this, BetSpots);

        _get(Object.getPrototypeOf(BetSpots.prototype), "constructor", this).call(this, props);
        this.state = {
            width: props.width
        };
    }

    _createClass(BetSpots, [{
        key: "build",
        value: function build() {
            var _this4 = this;

            var angle = 0;

            return React.createElement(
                this,
                null,
                React.createElement(LeftBetSpot, {
                    Title: "Left betspot",
                    left: function () {
                        return 125 + 100 * Math.cos(angle += .05);
                    },
                    top: function () {
                        return 125 + 100 * Math.sin(angle);
                    } }),
                React.createElement(RightBetSpot, {
                    Title: "Right betspot",
                    left: function () {
                        return _this4.state.width / 2;
                    } })
            );
        }
    }]);

    return BetSpots;
})(Stage);

setTimeout(function () {
    var canvas = document.createElement("canvas");
    canvas.width = canvas.style.width = window.innerWidth;
    canvas.height = canvas.style.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.left = 0;
    canvas.style.right = 0;
    document.body.appendChild(canvas);

    React = new BetSpots({
        fps: 60,
        width: canvas.width
    });
    React.build();
    React.attachTo(canvas);
    React.run();
});

//# sourceMappingURL=Test.js.map