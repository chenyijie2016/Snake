
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameOverUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":414,"height":736}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameOverUI.uiView);

        }

    }
}

module ui {
    export class GameStartUI extends View {
		public gameStartButton:Laya.Button;
		public leaderBoardButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"height":736},"child":[{"type":"Button","props":{"y":643,"x":187,"width":165,"var":"gameStartButton","stateNum":2,"skin":"ui/btn_start.png","pivotY":48,"pivotX":63,"height":80}},{"type":"Button","props":{"y":544,"x":125,"width":164,"var":"leaderBoardButton","labelStroke":32,"labelSize":30,"labelFont":"Arial","labelColors":"#FFF,#F00,#F00,#F00","labelBold":true,"label":"排行榜","height":42,"gray":false}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameStartUI.uiView);

        }

    }
}

module ui {
    export class GameViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":414,"height":736}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}

module ui {
    export class LeaderBoardUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":414,"height":736}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LeaderBoardUI.uiView);

        }

    }
}
