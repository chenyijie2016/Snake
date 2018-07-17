/**Created by the LayaAirIDE*/
module view {
	export class GameView extends ui.GameViewUI {
		private snake: sprite.Snake;
		private blocks: Array<sprite.Block>;
		private lastMouseX: number;
		private mouseDown: boolean;
		private debugInfo: Laya.Text;
		constructor() {
			super();
			this.debugInfo = new Laya.Text();
			this.debugInfo.width = 300;
			this.debugInfo.font = "SimSun";
			this.debugInfo.fontSize = 20;
			this.debugInfo.color = "white";
			this.addChild(this.debugInfo);
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
			this.debugInfo.text = 'mouseup'
		}
		private onLoop(): void {

			let currentMouseX = Laya.stage.mouseX;
			//this.debugInfo.text = Math.abs(currentMouseX - this.lastMouseX).toString();
			if (this.mouseDown) {
				let level = 0;
				if (Math.abs(currentMouseX - this.lastMouseX) > 20)
					level = 4;
				else if (Math.abs(currentMouseX - this.lastMouseX) >= 15)
					level = 3;
				else if (Math.abs(currentMouseX - this.lastMouseX) >= 10)
					level = 2;
				else if (Math.abs(currentMouseX - this.lastMouseX) >= 5)
					level = 1;
				if (currentMouseX < this.lastMouseX) {
					this.snake.moveLeft(level);
				} else if (currentMouseX > this.lastMouseX) {
					this.snake.moveRight(level);
				}
			}
			this.snake.updateBody();
			this.lastMouseX = currentMouseX;
		}

	}
}