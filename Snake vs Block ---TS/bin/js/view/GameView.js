var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var GameView = /** @class */ (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            var _this = _super.call(this) || this;
            _this.debugInfo = new Laya.Text();
            _this.debugInfo.width = 300;
            _this.debugInfo.font = "SimSun";
            _this.debugInfo.fontSize = 20;
            _this.debugInfo.color = "white";
            _this.addChild(_this.debugInfo);
            return _this;
        }
        GameView.prototype.startGame = function () {
            this.snake = new sprite.Snake();
            this.snake.pos(GameMain.width / 2, GameMain.height * 0.8);
            Laya.stage.addChild(this.snake);
            //Laya.stage.on('mousemove', this, this.onMouseMove);
            this.lastMouseX = Laya.stage.mouseX;
            this.snake.pos(0, 0);
            Laya.timer.frameLoop(1, this, this.onLoop);
            this.snake.addBody(15);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        };
        GameView.prototype.onMouseDown = function () {
            this.mouseDown = true;
        };
        GameView.prototype.onMouseUp = function () {
            this.mouseDown = false;
            this.debugInfo.text = 'mouseup';
        };
        GameView.prototype.onLoop = function () {
            var currentMouseX = Laya.stage.mouseX;
            //this.debugInfo.text = Math.abs(currentMouseX - this.lastMouseX).toString();
            if (this.mouseDown) {
                var level = 0;
                if (Math.abs(currentMouseX - this.lastMouseX) > 20)
                    level = 4;
                else if (Math.abs(currentMouseX - this.lastMouseX) >= 15)
                    level = 3;
                else if (Math.abs(currentMouseX - this.lastMouseX) >= 10)
                    level = 2;
                else if (Math.abs(currentMouseX - this.lastMouseX) >= 5)
                    level = 1;
                if (currentMouseX < this.lastMouseX) {
                    this.snake.moveLeft(level);
                }
                else if (currentMouseX > this.lastMouseX) {
                    this.snake.moveRight(level);
                }
            }
            this.snake.updateBody();
            this.lastMouseX = currentMouseX;
        };
        return GameView;
    }(ui.GameViewUI));
    view.GameView = GameView;
})(view || (view = {}));
//# sourceMappingURL=GameView.js.map