module sprite {
    export class Snake extends Laya.Sprite {
        public length: number;
        constructor() {
            super();
            this.init();
        }
        init(): void {
            this.graphics.drawCircle(0, 0, 5, '#FFEE00');
        }
    }
}