import WebGL = Laya.WebGL;
import Browser = Laya.Browser;
import Stage = Laya.Stage;
// 程序入口
class GameMain {
    public static gameStart: view.GameStart;
    public static gameView: view.GameView;
    // public static width: number = 414;
    // public static height: number = 736;
    constructor() {
        Laya.init(Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT, WebGL);
        //Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#000000";
        var resArray: Array<any> = [
           // { url: "res/atlas/ui.json", type: Laya.Loader.ATLAS },
            { url: "ui/btn_start.png", type: Laya.Loader.IMAGE }
        ];

        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));
    }
    onLoaded(): void {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
    }

}
new GameMain();
