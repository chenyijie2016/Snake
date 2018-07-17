
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameStartUI extends View {
		public gameStartButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"height":736},"child":[{"type":"Button","props":{"y":643,"x":187,"width":165,"var":"gameStartButton","stateNum":2,"skin":"ui/btn_start.png","pivotY":48,"pivotX":63,"height":80}}]};
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
