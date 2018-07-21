/**Created by the LayaAirIDE*/
module view {
	export class GameOver extends ui.GameOverUI {
		public hintText: Laya.Text;
		public hintText2: Laya.Text;
		public gameScoreText: Laya.Text;
		constructor() {
			super();
			this.gameScoreText = new Laya.Text();
			this.hintText = new Laya.Text();
			this.hintText2 = new Laya.Text();
		}
		public drawUI(): void {
			Laya.stage.once(Laya.Event.MOUSE_DOWN, this, this.onRestartGame);
			this.gameScoreText.text = GameMain.gameView.score.toString();
			this.gameScoreText.font = 'Arial';
			this.gameScoreText.color = 'white'
			this.gameScoreText.fontSize = 40;
			this.gameScoreText.pos(Const.SCREEN_WIDTH / 2 - 15, Const.SCREEN_HEIGHT / 2);
			this.addChild(this.gameScoreText)

			this.hintText.text = 'Game Over'
			this.hintText.font = 'Arial'
			this.hintText.color = 'white'
			this.hintText.fontSize = 35;
			this.hintText.pos(Const.SCREEN_WIDTH / 2 - 80, 100);
			this.addChild(this.hintText);


			this.hintText2.text = 'Press anywhere to contine!'
			this.hintText2.font = 'Consolas'
			this.hintText2.color = 'white'
			this.hintText2.fontSize = 20;
			this.hintText2.pos(Const.SCREEN_WIDTH / 2 - 130, 180);
			this.addChild(this.hintText2);
		}
		private onRestartGame(): void {
			console.log('restart game');
			this.removeSelf();
			Laya.stage.addChild(GameMain.gameStart);
			Laya.stage.graphics.clear();
		}
	}
}