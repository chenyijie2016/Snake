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
        
        public getValue(): number {
            return this.value;
        }

        public setValue(value: number): void {
            this.value = value;
        }

        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
        }

        public update(): void {
            this.graphics.clear();

            if (this.visible) {
                // Using Skin !!!
                // this is just a demo
                if(Const.GAME_MODE === "normalMode"){
                    this.graphics.drawCircle(this.PosX, this.PosY, Const.SNAKE_BODY_RADIUS, this.getSnakeAddColor());
                    this.graphics.fillText(this.value.toString(), this.PosX, this.PosY - 35, '20px Arial', '#FFFFFF', 'center');
                }
                else if(Const.GAME_MODE === "colorMode"){
                    this.graphics.drawCircle(this.PosX, this.PosY, Const.SNAKE_BODY_RADIUS, this.getSnakeAddColor());
                }

                

                // TODO: Using other image
            }
        }

        public getSnakeAddColor(): string {
            if(Const.GAME_MODE === "normalMode"){
                return '#FFFF00';
            }
            else if(Const.GAME_MODE === "colorMode"){
                let blockValue = this.value;
                let rgb = Const.COLORS_COLORMODE[blockValue - 1];
                return Common.rgbToHex(rgb);
            }
        }

        init(): void {
            if(Const.GAME_MODE === "normalMode"){
                this.setValue(Common.getRandomNumber(1, 5));
            }
            else if(Const.GAME_MODE === "colorMode"){
                this.setValue(Common.getRandomNumber(1, 4));
            }
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}