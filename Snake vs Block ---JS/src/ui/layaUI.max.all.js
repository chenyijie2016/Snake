var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{}};
		return GameUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.ani1=null;
		    this.startBtn=null;
		    this.menuBtn=null;
		    this.snakeBtn=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{},"child":[{"type":"Button","props":{"y":551,"x":98,"var":"startBtn","stateNum":2,"skin":"ui/btn_start.png"}},{"type":"Box","props":{"y":456,"x":90,"var":"menuBtn"},"child":[{"type":"Circle","props":{"y":33.5,"x":33.5,"radius":35,"lineWidth":3,"lineColor":"white","fillColor":"black"}},{"type":"Text","props":{"y":23.5,"x":12.5,"text":"Menu","fontSize":22,"font":"SimSun","color":"yellow","bold":false}}]},{"type":"Box","props":{"y":456,"x":212,"var":"snakeBtn"},"child":[{"type":"Circle","props":{"y":33.5,"x":33.5,"radius":35,"lineWidth":3,"lineColor":"white","fillColor":"black"}},{"type":"Text","props":{"y":23.5,"x":8.5,"text":"Snake","fontSize":21,"font":"SimSun","color":"yellow","bold":false}}]}],"animations":[{"nodes":[{"target":8,"keyframes":{"y":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":0},{"value":-3,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":1},{"value":2,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":2},{"value":7,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":3},{"value":14,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":4},{"value":20,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":5},{"value":48,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":6},{"value":72,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":7},{"value":91,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":8},{"value":114,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":9},{"value":123,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":10}],"color":[{"value":"#c5c5c5","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":0},{"value":"#eee000","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":1},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":2},{"value":"#ff0000","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":3},{"value":"#ffff00","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":4},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":5},{"value":"#ff0000","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":6},{"value":"#ffff00","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":7},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":8},{"value":"#ff0000","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":9},{"value":"#ffff00","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":10},{"value":"red","tweenMethod":"linearNone","tween":false,"target":8,"key":"color","index":11}]}},{"target":10,"keyframes":{"y":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":0},{"value":5,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":1},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":2},{"value":-5,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":3},{"value":-2,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":4},{"value":15,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":5},{"value":34,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":6},{"value":64,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":7},{"value":82,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":8},{"value":103,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":9},{"value":122,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":10},{"value":119,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":11},{"value":123,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":12}],"color":[{"value":"#c5c5c5","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":0},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":1},{"value":"#ff0000","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":2},{"value":"#ffff00","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":3},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":4},{"value":"#ff0000","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":5},{"value":"#ffff00","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":6},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":7},{"value":"#ff0000","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":8},{"value":"#ffff00","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":9},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":10},{"value":"#ffffff","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":11},{"value":"red","tweenMethod":"linearNone","tween":false,"target":10,"key":"color","index":12}]}}],"name":"ani1","id":1,"frameRate":18,"action":1},{"nodes":[],"name":"ani2","id":2,"frameRate":24,"action":0}]};
		return GameStartUI;
	})(View);
var MenuUI=(function(_super){
		function MenuUI(){
			

			MenuUI.__super.call(this);
		}

		CLASS$(MenuUI,'ui.MenuUI',_super);
		var __proto__=MenuUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MenuUI.uiView);

		}

		MenuUI.uiView={"type":"View","props":{},"child":[{"type":"Circle","props":{"y":316,"x":187,"radius":50,"lineWidth":1,"fillColor":"#ff0000"}}]};
		return MenuUI;
	})(View);
var SnakePatternUI=(function(_super){
		function SnakePatternUI(){
			

			SnakePatternUI.__super.call(this);
		}

		CLASS$(SnakePatternUI,'ui.SnakePatternUI',_super);
		var __proto__=SnakePatternUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SnakePatternUI.uiView);

		}

		SnakePatternUI.uiView={"type":"View","props":{},"child":[{"type":"Rect","props":{"y":341,"x":120,"width":100,"lineWidth":1,"height":100,"fillColor":"#ff0000"}}]};
		return SnakePatternUI;
	})(View);