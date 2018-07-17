/**Created by the LayaAirIDE*/
module view {
	export class GameView extends ui.GameViewUI {
		private snake: sprite.Snake;
		constructor() {
			super();
		}
		public startGame(): void {
			this.snake = new sprite.Snake();
			this.snake.pos(GameMain.width / 2, GameMain.height * 0.8);
			Laya.stage.addChild(this.snake);
			Laya.stage.on('mousemove', this, this.onMouseMove);
		}
		onMouseMove(e: Laya.Event): void {
			this.snake.pos(Laya.stage.mouseX, Laya.stage.mouseY);
		}
	}
}