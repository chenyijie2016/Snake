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
			this.returnButton.label = '返回'
			this.returnButton.labelFont = 'Arial'
			this.returnButton.labelColors = '#FFFFFF,#FF0000,#FF0000,#FF0000'
			this.returnButton.labelSize = 30;
		}

		public setLeaderBoard(data: any): void {
			// data = [
			// 	{ nickname: 'tee', score: 45 },
			// 	{ nickname: 'ree', score: 11 },
			// 	{ nickname: 'ree', score: 10 },
			// 	{ nickname: 'ree', score: 11 },
			// 	{ nickname: 'ree', score: 11 },
			// 	{ nickname: 'ree', score: 8 },
			// 	{ nickname: 'ree', score: 7 },
			// 	{ nickname: 'ree', score: 6 },
			// ];
			this.removeChildren()
			this.addChild(this.returnButton);
			let text1: Laya.Text = new Laya.Text(), text2: Laya.Text = new Laya.Text();
			text1.text = '用户';
			text2.text = '分数';
			text1.font = text2.font = 'Hei';
			text1.color = text2.color = 'white';
			text1.fontSize = text2.fontSize = 25;
			text1.pos(100, 100);
			text2.pos(300, 100);
			this.addChild(text1);
			this.addChild(text2);
			console.log(data);
			if (data)
				for (let i = 0; i < data.length && i < 10; i++) {
					let nicknameText: Laya.Text = new Laya.Text();
					let scoreText: Laya.Text = new Laya.Text();
					nicknameText.text = data[i].nickname;
					scoreText.text = data[i].score.toString();
					nicknameText.font = scoreText.font = 'Hei';
					nicknameText.fontSize = scoreText.fontSize = 20;
					nicknameText.color = scoreText.color = 'white';
					nicknameText.pos(100, 150 + 40 * i);
					scoreText.pos(300, 150 + 40 * i);
					this.addChild(scoreText);
					this.addChild(nicknameText);
				}
		}

		private onButtonClicked(): void {
			super.removeSelf();
			Laya.stage.addChild(GameMain.gameStart);
			Laya.stage.graphics.clear();
		}


	}
}