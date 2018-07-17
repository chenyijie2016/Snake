/**Created by the LayaAirIDE*/
module view {
	export class GameView extends ui.GameViewUI {
		private snake: sprite.Snake;
		private blocks: Array<sprite.Block>;
		private lastMouseX: number;
		private mouseDown: boolean;
		constructor() {
			super();
		}
		public startGame(): void {
			this.snake = new sprite.Snake();
			this.snake.pos(GameMain.width / 2, GameMain.height * 0.8);
			Laya.stage.addChild(this.snake);
			//Laya.stage.on('mousemove', this, this.onMouseMove);
			this.lastMouseX = Laya.stage.mouseX;
			this.snake.pos(0, 0);
			Laya.timer.frameLoop(1, this, this.onLoop);
			this.snake.addBody(15);
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
		}
		private onMouseDown(): void {
			this.mouseDown = true;
		}
		private onMouseUp(): void {
			this.mouseDown = false;
		}
		private onLoop(): void {

			let currentMouseX = Laya.stage.mouseX;
			//console.log(currentMouseX, this.lastMouseX);
			if (this.mouseDown) {
				if (currentMouseX < this.lastMouseX) {
					this.snake.moveLeft();
				} else if (currentMouseX > this.lastMouseX) {
					this.snake.moveRight();
				}
			}
			this.snake.updateBody();
			this.lastMouseX = currentMouseX;
		}

	}
}