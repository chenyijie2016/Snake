var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var Stage = Laya.Stage;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.SoundManager.autoReleaseSound = false;
        GameMain.status = GameStatus.Start;
        Laya.MiniAdpter.init();
        Laya.init(Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT);
        //Laya.Stat.show(0, 600);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#000000";
        var resArray = [
            { url: "ui/btn_start.png", type: Laya.Loader.IMAGE },
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
        Laya.SoundManager.playMusic(Const.BGM_SOUND);
    };
    GameMain.mode = GameMode.Normal;
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map