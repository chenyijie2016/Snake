var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(414, 736, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        //Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        // Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.bgColor = "#000000";
        // Laya.Handler.create(this, this.onLoaded);
        this.onload();
    }
    GameMain.prototype.onload = function () {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map