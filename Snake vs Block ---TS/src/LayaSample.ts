import WebGL = Laya.WebGL;
import Browser = Laya.Browser;
import Stage = Laya.Stage;
// 程序入口
class GameMain {
    public static gameStart: view.GameStart;
    public static gameView: view.GameView;
    constructor() {
        Laya.init(414, 736, WebGL);
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        //设置stage颜色
        Laya.stage.bgColor = "black";
        var resArray:Array<any>=[
            {url:"res/atlas/ui.atlas",type:Laya.Loader.ATLAS},
            // {url:"ui/back.png",type:Laya.Loader.IMAGE},
            // {url:"ui/help.png",type:Laya.Loader.IMAGE}
        ];
        Laya.loader.load(resArray,Laya.Handler.create(this,this.onload));
    }
    onload(): void {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
    }

}
new GameMain();
