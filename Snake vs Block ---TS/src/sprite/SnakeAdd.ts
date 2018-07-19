/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class SnakeAdd extends Laya.Sprite {
        private value: number;
        public PosX: number;
        public PosY: number;
        constructor() {
            super();
            this.init();
        }
        public isVisible(): boolean {
            return this.visible;
        }
        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
        }
        public setVisible(): void {
            this.visible = true;
        }
        public hidden(): void {
            this.visible = false;
        }

        public setValue(value: number): void {
            this.value = value;
        }

        public update(): void {
            this.graphics.clear();
            
            if (this.visible) {
                // Using Skin !!!
                // this is just a demo
                this.graphics.drawCircle(this.PosX, this.PosY, Const.SNAKE_BODY_RADIUS, '#FFFF00');
                this.graphics.fillText(this.value.toString(), this.PosX, this.PosY - 35, '20px Arial', '#FFFFFF', 'center');

                // TODO: Using other image
            }         
        }

        init(): void {
            this.setValue(Common.getRandomNumber(1, 5));
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}