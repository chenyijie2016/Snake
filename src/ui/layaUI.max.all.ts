
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameStartUI extends View {
		public gameStartButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"height":736},"child":[{"type":"Text","props":{"y":218,"x":172,"width":51,"text":"VS","height":40,"fontSize":35,"font":"Arial","color":"#FFFFFF"}},{"type":"Text","props":{"y":168,"x":30,"width":138,"text":"Snake","height":47,"fontSize":40,"font":"Helvetica","color":"#b2de3f","bold":true}},{"type":"Text","props":{"y":242,"x":251,"width":136,"text":"Block","height":46,"fontSize":40,"font":"Helvetica","color":"#dbe240","bold":true}},{"type":"Button","props":{"y":564,"x":196,"width":152,"var":"gameStartButton","stateNum":2,"skin":"ui/btn_start.png","pivotY":26,"pivotX":75,"label":"label","height":57}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

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
