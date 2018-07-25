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
                switch (GameMain.mode) {
                    case GameMode.Normal: {
                        this.graphics.drawCircle(this.PosX, this.PosY, Const.SNAKE_BODY_RADIUS, this.getSnakeAddColor());
                        this.graphics.fillText(this.value.toString(), this.PosX, this.PosY - 35, '20px Arial', '#FFFFFF', 'center');
                        break;
                    }
                    case GameMode.Color: {
                        this.graphics.drawCircle(this.PosX, this.PosY, Const.SNAKE_BODY_RADIUS, this.getSnakeAddColor());
                        break;
                    }
                }
                // TODO: Using other image
            }
        }

        public getSnakeAddColor(): string {
            switch (GameMain.mode) {
                case GameMode.Normal: {
                    return '#FFFF00';
                }
                case GameMode.Color: {
                    let blockValue = this.value;
                    let rgb = Const.COLORS_COLORMODE[blockValue - 1];
                    return Common.rgbToHex(rgb);
                }
            }
        }

        init(): void {
            switch (GameMain.mode) {
                case GameMode.Normal: {
                    this.setValue(Common.getRandomNumber(1, 5));
                    break;
                }
                case GameMode.Color: {
                    this.setValue(Common.getRandomNumber(1, 4));
                    break;
                }
            }
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}