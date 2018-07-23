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
    var GameOver = /** @class */ (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this.gameScoreText = new Laya.Text();
            _this.hintText = new Laya.Text();
            _this.hintText2 = new Laya.Text();
            return _this;
        }
        GameOver.prototype.drawUI = function () {
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.onRestartGame);
            if (Const.GAME_MODE === "normalMode") {
                this.gameScoreText.text = GameMain.gameView.score.toString();
                GameMain.gameView.snake.removeSelf();
                GameMain.gameView.removeSelf();
            }
            else if (Const.GAME_MODE === "colorMode") {
                this.gameScoreText.text = GameMain.gameColorMode.score.toString();
                GameMain.gameColorMode.snake.removeSelf();
                GameMain.gameColorMode.removeSelf();
            }
            this.gameScoreText.font = 'Arial';
            this.gameScoreText.color = 'white';
            this.gameScoreText.fontSize = 40;
            this.gameScoreText.pos(Const.SCREEN_WIDTH / 2 - 15, Const.SCREEN_HEIGHT / 2);
            this.addChild(this.gameScoreText);
            this.hintText.text = 'Game Over';
            this.hintText.font = 'Arial';
            this.hintText.color = 'white';
            this.hintText.fontSize = 35;
            this.hintText.pos(Const.SCREEN_WIDTH / 2 - 80, 100);
            this.addChild(this.hintText);
            this.hintText2.text = 'Press anywhere to contine!';
            this.hintText2.font = 'Consolas';
            this.hintText2.color = 'white';
            this.hintText2.fontSize = 20;
            this.hintText2.pos(Const.SCREEN_WIDTH / 2 - 130, 180);
            this.addChild(this.hintText2);
            Laya.SoundManager.playSound(Const.GAME_OVER_SOUND);
        };
        GameOver.prototype.onRestartGame = function () {
            console.log('restart game');
            this.removeSelf();
            Laya.stage.addChild(GameMain.gameStart);
            Laya.stage.graphics.clear();
        };
        return GameOver;
    }(ui.GameOverUI));
    view.GameOver = GameOver;
})(view || (view = {}));
//# sourceMappingURL=GameOver.js.map