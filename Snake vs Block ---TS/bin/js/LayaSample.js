var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var Stage = Laya.Stage;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(414, 736, WebGL);
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        //设置stage颜色
        Laya.stage.bgColor = "black";
        var resArray = [
            { url: "res/atlas/ui.atlas", type: Laya.Loader.ATLAS },
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));
    }
    GameMain.prototype.onload = function () {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map