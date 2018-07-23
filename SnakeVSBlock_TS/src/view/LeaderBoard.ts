/**Created by the LayaAirIDE*/
module view {
	export class LeaderBoard extends ui.LeaderBoardUI {
		private returnButton: Laya.Button = new Laya.Button();
		constructor() {
			super();
			this.returnButton.on(Laya.Event.CLICK, this, this.onButtonClicked);
			this.addChild(this.returnButton);
			this.returnButton.pos(Const.SCREEN_WIDTH / 2 - 40, Const.SCREEN_HEIGHT * 0.8)
			this.returnButton.width = 80
			this.returnButton.height = 40;
			this.returnButton.label = 'return'
			this.returnButton.labelFont = 'Arial'
			this.returnButton.labelColors = '#FFFFFF,#FF0000,#FF0000,#FF0000'
			this.returnButton.labelSize = 30;
		}

		public setLeaderBoard(data: any): void {
			this.removeChildren()
			this.addChild(this.returnButton);
			// for (let i = 0; i < data.length; i++) {

			// }
		}

		private onButtonClicked(): void {
			super.removeSelf();
			Laya.stage.addChild(GameMain.gameStart);
			Laya.stage.graphics.clear();
		}


	}
}