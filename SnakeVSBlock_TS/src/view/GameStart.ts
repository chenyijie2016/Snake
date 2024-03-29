/**Created by the LayaAirIDE*/
module view {
	export class GameStart extends ui.GameStartUI {
		constructor() {
			super();
			this.gameStartButton.on(Laya.Event.CLICK, this, this.onGameStart);
			this.leaderBoardButton.on(Laya.Event.CLICK, this, this.onShowLeaderBoard)
			this.colorModeButton.on(Laya.Event.CLICK, this, this.onGameMode);
			//绘制游戏名称
			this.createTitle();
		}

		public onGameMode(): void {

			if(GameMain.mode === GameMode.Normal){
				GameMain.mode = GameMode.Color;
				this.colorModeButton.selected = true;
			}
			else if(GameMain.mode === GameMode.Color){
				GameMain.mode = GameMode.Normal;
				this.colorModeButton.selected = false;
			}
		}

		public onShowLeaderBoard(): void {
			if(!GameMain.leaderBoard)
			{
				GameMain.leaderBoard = new view.LeaderBoard();
			}
			super.removeSelf()
			Laya.stage.addChild(GameMain.leaderBoard)
			GameMain.leaderBoard.setLeaderBoard(null);
		}

		public onGameStart(): void {
			Laya.SoundManager.playSound(Const.BUTTON_SOUND);
			this.removeSelf();

			if(GameMain.mode === GameMode.Normal){
				if (!GameMain.gameView) {
					GameMain.gameView = new GameView();
				}
				GameMain.gameView.startGame();
				Laya.stage.addChild(GameMain.gameView);
			}
			else if(GameMain.mode === GameMode.Color){
				if (!GameMain.gameColorMode) {
					GameMain.gameColorMode = new GameColorMode();
				}
				GameMain.gameColorMode.startGame();
				Laya.stage.addChild(GameMain.gameColorMode);
				Laya.SoundManager.playSound(Const.GAME_START_SOUND);
			}					
		}

		public createTitle(): void {
			let Text = Laya.Text;
			let txt1 = new Text();
			txt1.text = "Snake";
			txt1.width = 300;
			txt1.font = "SimSun";
			txt1.fontSize = 50;
			txt1.color = "white";
			txt1.x = Laya.stage.width - txt1.textWidth >> 1;
			txt1.y = Laya.stage.height * 0.08;
			this.addChild(txt1);

			let txt2 = "VS";
			let w = 300;
			let offsetX = Laya.stage.width >> 1;
			let letter;
			for (let i = 0, len = txt2.length; i < len; ++i) {
				letter = this.createLetter(txt2.charAt(i));
				letter.x = (i == 0 ? (Laya.stage.width >> 1) - 27 : (Laya.stage.width >> 1) + 5);
				letter.y = 0;
				//字符缓动动画
				Laya.Tween.to(letter, {
					y: Laya.stage.height * 0.16, update: new Laya.Handler(this, updateColor,
						[letter])
				}, 1500, Laya.Ease.bounceIn, Laya.Handler.create
						(this, changeColor, [letter]), i * 200);
			}

			function updateColor(txt) {
				let c = Math.floor(Math.random() * 3);
				switch (c) {
					case 0:
						txt.color = "#eee000";
						break;
					case 1:
						txt.color = "#ffffff";
						break;
					case 2:
						txt.color = "#ff0000";
						break;
					default:
						txt.color = "#eee000";
						break;
				}
			}

			function changeColor(txt) {
				//将文本字体改变成红色
				txt.color = "red";
			}

			let txt3 = new Text();
			txt3.text = "Block";
			txt3.width = 300;
			txt3.fontSize = 50;
			txt3.font = "SimSun";
			txt3.color = "white";
			txt3.x = Laya.stage.width - txt3.textWidth >> 1;
			txt3.y = Laya.stage.height * 0.24;
			this.addChild(txt3);
		}
		private createLetter(char) {
			let letter = new Laya.Text();
			letter.text = char;
			letter.color = "white";
			letter.fontSize = 50;
			letter.font = "SimSun";
			letter.bold = true;
			this.addChild(letter);
			return letter;
		}
	}
}
