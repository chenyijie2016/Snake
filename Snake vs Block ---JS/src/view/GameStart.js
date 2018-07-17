/**Created by the LayaAirIDE*/
var GameStart=(function(_super){
	function GameStart(){
		GameStart.__super.call(this);
		this.startBtn.on(Laya.Event.CLICK,this,this.onStartGame);
		this.menuBtn.on(Laya.Event.CLICK,this,this.onSelectMenu);
		this.snakeBtn.on(Laya.Event.CLICK,this,this.onSelectSnake);

		//绘制游戏名称
		createTitle(this);
	}

	function createTitle(_super)
	{
		let Text = Laya.Text;
		let txt1 = new Text();
		txt1.text = "Snake";
		txt1.width = 300;
		txt1.font = "SimSun";
		txt1.fontSize = 50;
		txt1.color = "white";
		txt1.x = Laya.stage.width - txt1.textWidth >> 1;
		txt1.y = Laya.stage.height*0.08;
		_super.addChild(txt1);

        let txt2 = "VS";
        let w = 300;
        let offsetX = Laya.stage.width >> 1;
        let letter;
        for(let i = 0, len = txt2.length; i < len; ++i)
        {
            letter = createLetter(txt2.charAt(i));
            letter.x = (i==0 ? (Laya.stage.width >> 1) - 25 : (Laya.stage.width >> 1) );
            letter.y = 0;
            //字符缓动动画
            Laya.Tween.to(letter, {y:Laya.stage.height*0.16, update:new Laya.Handler(this,updateColor,
                [letter])}, 1500, Laya.Ease.bounceIn,Laya.Handler.create
            (this,changeColor,[letter]), i*200);
        }

        function createLetter(char)
        {
            let letter = new Laya.Text();
            letter.text = char;
            letter.color = "white";
            letter.fontSize = 50;
			letter.font = "SimSun";
            letter.bold = true;
            _super.addChild(letter);
            return letter;
        }

        function updateColor(txt){
            let c = Math.floor(Math.random()*3);
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
         
        function changeColor(txt){
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
		txt3.y = Laya.stage.height*0.24;
		_super.addChild(txt3);        
	}

	Laya.class(GameStart,'view.GameStart',_super);
	var _proto = GameStart.prototype;
	//点击开始游戏
	_proto.onStartGame = function(){
		this.removeSelf();
		if(!LayaSample.game){
			LayaSample.game = new Game();
		}
		LayaSample.game.gameStart();
		Laya.stage.addChild(LayaSample.game);
	}
	//点击进行游戏模式选择
	_proto.onSelectMenu = function(){
		this.removeSelf();
		if(!LayaSample.menu){
			LayaSample.menu = new Menu();
		}
		Laya.stage.addChild(LayaSample.menu);
	}
	//点击进行Snake样式选择
	_proto.onSelectSnake = function(){
		this.removeSelf();
		if(!LayaSample.snakePattern){
			LayaSample.snakePattern = new SnakePattern();
		}
		Laya.stage.addChild(LayaSample.snakePattern);
	}

	return GameStart;
})(GameStartUI);


