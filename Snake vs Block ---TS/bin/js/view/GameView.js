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
            return _super.call(this) || this;
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
        };
        GameView.prototype.onLoop = function () {
            var currentMouseX = Laya.stage.mouseX;
            //console.log(currentMouseX, this.lastMouseX);
            if (this.mouseDown) {
                if (currentMouseX < this.lastMouseX) {
                    this.snake.moveLeft();
                }
                else if (currentMouseX > this.lastMouseX) {
                    this.snake.moveRight();
                }
            }
            this.snake.updateBody();
            this.lastMouseX = currentMouseX;
        };
        GameView.prototype.onMouseMove = function (e) {
            //this.snake.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            var currentMouseX = Laya.stage.mouseX;
            if (currentMouseX < this.lastMouseX) {
                this.snake.moveLeft();
            }
            else if (currentMouseX > this.lastMouseX) {
                this.snake.moveRight();
            }
        };
        return GameView;
    }(ui.GameViewUI));
    view.GameView = GameView;
})(view || (view = {}));
//# sourceMappingURL=GameView.js.map