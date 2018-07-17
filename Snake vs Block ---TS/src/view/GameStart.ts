/**Created by the LayaAirIDE*/
module view {
	export class GameStart extends ui.GameStartUI {
		constructor() {
			super();
			this.gameStartButton.on(Laya.Event.CLICK, this, this.onGameStart);
		}
		public onGameStart(): void {
			this.removeSelf();
			if (!GameMain.gameView) {
				GameMain.gameView = new GameView();
			}
			GameMain.gameView.startGame();
			Laya.stage.addChild(GameMain.gameView);

		}
	}
}
