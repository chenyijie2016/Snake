import WebGL = Laya.WebGL;
import Browser = Laya.Browser;
import Stage = Laya.Stage;
// 程序入口

enum GameStatus { Start, Underway, Over }

class GameMain {
    public static gameStart: view.GameStart;
    public static gameView: view.GameView;
    public static gameOver: view.GameOver;

    public static status: GameStatus;
    constructor() {
        GameMain.status = GameStatus.Start;
        Laya.MiniAdpter.init();
        Laya.init(Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT, WebGL);
        Laya.Stat.show(0, 0);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#000000";
        let resArray: Array<any> = [
            { url: "ui/btn_start.png", type: Laya.Loader.IMAGE }
        ];

        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));
    }
    onLoaded(): void {
        GameMain.gameStart = new view.GameStart();
        Laya.stage.addChild(GameMain.gameStart);
        Laya.SoundManager.playMusic(Const.BGM_SOUND);
    }

}
new GameMain();
