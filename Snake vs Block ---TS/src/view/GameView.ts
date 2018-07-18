/**Created by the LayaAirIDE*/

module view {
	export class GameView extends ui.GameViewUI {
		private snake: sprite.Snake;
		private blocks: Array<sprite.Block>;
		private snakeAdds: Array<sprite.SnakeAdd>; 
		private lastMouseX: number;
		private mouseDown: boolean;
		private debugInfo: Laya.Text;
		private gameScrollSpeed: number;
		constructor() {
			super();
			/* for debug */
			this.debugInfo = new Laya.Text();
			this.debugInfo.width = 300;
			this.debugInfo.font = "SimSun";
			this.debugInfo.fontSize = 20;
			this.debugInfo.color = "white";
			this.addChild(this.debugInfo);

			this.blocks = new Array<sprite.Block>();
			this.snakeAdds = new Array<sprite.SnakeAdd>();

		}

		public startGame(): void {
			this.gameScrollSpeed = 3;
			this.snake = new sprite.Snake();
			Laya.stage.addChild(this.snake);
			this.lastMouseX = Laya.stage.mouseX;
			this.snake.pos(0, 0);
			Laya.timer.frameLoop(1, this, this.mainLoop);// Every Frame
			this.snake.extendBody(25);
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			// Laya.timer.frameLoop(100, this, this.updateBlocksStatus);//每300帧添加进行游戏状态更新，添加Block
			Laya.timer.frameOnce(100, this, this.updateBlocksStatus);//每个随机帧数添加进行游戏状态更新，添加Block
			Laya.timer.frameOnce(80, this, this.updateSnakeAddsStatus);//每个随机帧添加进行游戏状态更新，添加SnakeAdd

		}

		private onMouseDown(): void {
			this.mouseDown = true;
		}

		private onMouseUp(): void {
			this.mouseDown = false;
			this.debugInfo.text = 'mouseup'
		}

		// The Main Loop for the game 
		private mainLoop(): void {
			this.detectMouseMove();
			this.snake.updateBody();
			this.updateBlocks();
			this.updateSnakeAdds();
		}

		// 检测触点移动情况
		private detectMouseMove(): void {
			let currentMouseX = Laya.stage.mouseX;
			//this.debugInfo.text = Math.abs(currentMouseX - this.lastMouseX).toString();
			if (this.mouseDown) {

				let level = 1;
				if (Math.abs(currentMouseX - this.lastMouseX) > 20) {
					level = 40;
				}
				else {
					level = Math.abs(currentMouseX - this.lastMouseX) * 2;
				}
				if (currentMouseX < this.lastMouseX) {
					this.snake.moveLeft(level);
				} else if (currentMouseX > this.lastMouseX) {
					this.snake.moveRight(level);
				}
			}
			this.lastMouseX = currentMouseX;
		}

		// 是否是正在正面碰撞
		private isDirectCollision(): boolean {
			return false;
		}

		// 更新方块集合Blocks
		private updateBlocksStatus(): void {
			let blockNumber = Common.getRandomArrayElements(Const.BLOCK_NUMBERS, 1);
			if (blockNumber[0] > 0) {
				let orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], blockNumber[0]);
				for (let i = 0; i < blockNumber[0]; i++) {
					let b = new sprite.Block();
					b.setPos(orders[i] * 82.8 + 41, 0);
					this.blocks.push(b);
					this.addChildren(b);
				}
			}
			let nextTimeNewBlocks = Common.getRandomArrayElements(Const.BLOCK_NEWTIMES, 1);
			Laya.timer.frameOnce(nextTimeNewBlocks[0], this, this.updateBlocksStatus);//每个随机帧数添加进行游戏状态更新，添加Block
		}

		// 更新Grow集合SnakeAdds
		private updateSnakeAddsStatus(): void {
			let snakeAddNumber = Common.getRandomArrayElements(Const.SNAKE_ADD_NUMBERS, 1);
			if (snakeAddNumber[0] > 0) {
				let orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], snakeAddNumber[0]);
				for (let i = 0; i < snakeAddNumber[0]; i++) {
					let add = new sprite.SnakeAdd();
					add.setPos(orders[i] * 82.8 + 41, 0);
					this.snakeAdds.push(add);
					this.addChildren(add);
				}
			}
			let nextTimeNewAdds = Common.getRandomArrayElements(Const.SNAKE_ADD_NEWTIMES, 1);
			Laya.timer.frameOnce(50, this, this.updateSnakeAddsStatus);//每个随机帧添加进行游戏状态更新，添加SnakeAdd	
		}

		// 更新碰撞检测信息
		private updateCollisionDetection(): void {

		}

		// 更新方块状态
		private updateBlocks(): void {
			this.blocks.forEach((block) => {
				if (!this.isDirectCollision()) {
					block.PosY += this.gameScrollSpeed;
					block.update();
				}

				if (block.PosY > Const.SCREEN_HEIGHT) {
					block.destory();
					console.log('destory block');
					this.blocks.splice(this.blocks.indexOf(block), 1);
				}
			})
		}

		// 更新SnakeAdd状态
		private updateSnakeAdds(): void {
			this.snakeAdds.forEach((snakeAdd) => {
				if (!this.isDirectCollision()) {
					snakeAdd.PosY += this.gameScrollSpeed;
					snakeAdd.update();
				}

				if (snakeAdd.PosY > Const.SCREEN_HEIGHT) {
					snakeAdd.destory();
					console.log('destory snakeAdd');
					this.snakeAdds.splice(this.snakeAdds.indexOf(snakeAdd), 1);
				}
			})
		}
	}
}