module sprite {
    export class Block extends Laya.Sprite {
        private score: number;
        private Visible: boolean;
        public PosX: number;
        public PosY: number;
        constructor() {
            super();
            this.init();
        }
        public isVisible(): boolean {
            return this.Visible;
        }

        public setVisible(): void {
            this.Visible = true;
        }
        public hidden(): void {
            this.Visible = false;
        }

        public setScore(score: number): void {
            this.score = score;
        }

        public show():void{
            this.graphics.clear();
            
        }

        init(): void {
            this.graphics.drawCircle(0, 0, 8, '#FFEE00');
        }
    }
}