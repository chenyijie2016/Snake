var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var Stage = Laya.Stage;
// 程序入口
var GameMain = /** @class */ (function () {
    // public static width: number = 414;
    // public static height: number = 736;
    function GameMain() {
        Laya.init(Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT, WebGL);
        //Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#000000";
        var resArray = [
            // { url: "res/atlas/ui.json", type: Laya.Loader.ATLAS },
            { url: "ui/btn_start.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map