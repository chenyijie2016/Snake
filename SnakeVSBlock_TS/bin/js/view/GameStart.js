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
    var GameStart = /** @class */ (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            var _this = _super.call(this) || this;
            _this.gameStartButton.on(Laya.Event.CLICK, _this, _this.onGameStart);
            _this.leaderBoardButton.on(Laya.Event.CLICK, _this, _this.onShowLeaderBoard);
            _this.colorModeButton.on(Laya.Event.CLICK, _this, _this.onGameMode);
            //绘制游戏名称
            _this.createTitle();
            return _this;
        }
        GameStart.prototype.onGameMode = function () {
            if (GameMain.mode === GameMode.Normal) {
                GameMain.mode = GameMode.Color;
                this.colorModeButton.selected = true;
            }
            else if (GameMain.mode === GameMode.Color) {
                GameMain.mode = GameMode.Normal;
                this.colorModeButton.selected = false;
            }
        };
        GameStart.prototype.onShowLeaderBoard = function () {
            if (!GameMain.leaderBoard) {
                GameMain.leaderBoard = new view.LeaderBoard();
            }
            _super.prototype.removeSelf.call(this);
            Laya.stage.addChild(GameMain.leaderBoard);
            GameMain.leaderBoard.setLeaderBoard(null);
        };
        GameStart.prototype.onGameStart = function () {
            Laya.SoundManager.playSound(Const.BUTTON_SOUND);
            this.removeSelf();
            if (GameMain.mode === GameMode.Normal) {
                if (!GameMain.gameView) {
                    GameMain.gameView = new view.GameView();
                }
                GameMain.gameView.startGame();
                Laya.stage.addChild(GameMain.gameView);
            }
            else if (GameMain.mode === GameMode.Color) {
                if (!GameMain.gameColorMode) {
                    GameMain.gameColorMode = new view.GameColorMode();
                }
                GameMain.gameColorMode.startGame();
                Laya.stage.addChild(GameMain.gameColorMode);
                Laya.SoundManager.playSound(Const.GAME_START_SOUND);
            }
        };
        GameStart.prototype.createTitle = function () {
            var Text = Laya.Text;
            var txt1 = new Text();
            txt1.text = "Snake";
            txt1.width = 300;
            txt1.font = "SimSun";
            txt1.fontSize = 50;
            txt1.color = "white";
            txt1.x = Laya.stage.width - txt1.textWidth >> 1;
            txt1.y = Laya.stage.height * 0.08;
            this.addChild(txt1);
            var txt2 = "VS";
            var w = 300;
            var offsetX = Laya.stage.width >> 1;
            var letter;
            for (var i = 0, len = txt2.length; i < len; ++i) {
                letter = this.createLetter(txt2.charAt(i));
                letter.x = (i == 0 ? (Laya.stage.width >> 1) - 27 : (Laya.stage.width >> 1) + 5);
                letter.y = 0;
                //字符缓动动画
                Laya.Tween.to(letter, {
                    y: Laya.stage.height * 0.16, update: new Laya.Handler(this, updateColor, [letter])
                }, 1500, Laya.Ease.bounceIn, Laya.Handler.create(this, changeColor, [letter]), i * 200);
            }
            function updateColor(txt) {
                var c = Math.floor(Math.random() * 3);
                switch (c) {
                    case 0:
                        txt.color = "#eee000";
                        break;
                    case 1:
                        txt.color = "#ffffff";
                        break;
                    case 2:
                        txt.color = "#ff0000";
                        break;
                    default:
                        txt.color = "#eee000";
                        break;
                }
            }
            function changeColor(txt) {
                //将文本字体改变成红色
                txt.color = "red";
            }
            var txt3 = new Text();
            txt3.text = "Block";
            txt3.width = 300;
            txt3.fontSize = 50;
            txt3.font = "SimSun";
            txt3.color = "white";
            txt3.x = Laya.stage.width - txt3.textWidth >> 1;
            txt3.y = Laya.stage.height * 0.24;
            this.addChild(txt3);
        };
        GameStart.prototype.createLetter = function (char) {
            var letter = new Laya.Text();
            letter.text = char;
            letter.color = "white";
            letter.fontSize = 50;
            letter.font = "SimSun";
            letter.bold = true;
            this.addChild(letter);
            return letter;
        };
        return GameStart;
    }(ui.GameStartUI));
    view.GameStart = GameStart;
})(view || (view = {}));
//# sourceMappingURL=GameStart.js.map