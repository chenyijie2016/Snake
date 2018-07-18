module sprite {
    export class Snake extends Laya.Sprite {
        public length: number;
        public bodyPosX: Array<number>;
        public bodyPosY: Array<number>;

        constructor() {
            super();
            this.bodyPosX = new Array<number>();
            this.bodyPosY = new Array<number>();
            this.init();
        }

        private init(): void {
            this.length = 1;
            this.bodyPosX.push(Const.SCREEN_WIDTH / 2);
            this.bodyPosY.push(Const.SCREEN_HEIGHT / 2);
        }

        public updateBody(): void {
            for (let i = 1; i < this.length; i++) {
                let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
                if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
                    this.bodyPosX[i] += XDifference / 2;
                }
                else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
                    this.bodyPosX[i] -= XDifference / 2;
                }
                let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
                if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / 4 > 0) {
                    YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / 4);
                }
                this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
            }
            this.showBody();
        }

        public extendBody(parts: number): void {
            let lastPosX = this.bodyPosX[this.length - 1];

            this.length += parts;
            for (let i = 0; i < parts; i++) {
                this.bodyPosX.push(lastPosX);
                this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + Const.SNAKE_BODY_DEFALUT_SPACING);
            }
        }

        private showBody(): void {
            this.graphics.clear();
            for (let i = 0; i < this.length; i++) {
                // Using Skin !!!
                // this is just a demo
                this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], Const.SNAKE_BODY_RADIUS, '#FFFF00');

                // TODO: Using other image
            }
        }

        public moveLeft(level: number): void {
            // switch (level) {
            //     case 0: this.bodyPosX[0] -= 8; break;
            //     case 1: this.bodyPosX[0] -= 18; break;
            //     case 2: this.bodyPosX[0] -= 24; break;
            //     case 3: this.bodyPosX[0] -= 32; break;
            //     case 4: this.bodyPosX[0] -= 40; break;
            // }
            this.bodyPosX[0] -= level;
            if (this.bodyPosX[0] < 0) {
                this.bodyPosX[0] = Const.SNAKE_BODY_RADIUS;
            }
        }

        public moveRight(level: number): void {
            // switch (level) {
            //     case 0: this.bodyPosX[0] += 8; break;
            //     case 1: this.bodyPosX[0] += 18; break;
            //     case 2: this.bodyPosX[0] += 24; break;
            //     case 3: this.bodyPosX[0] += 32; break;
            //     case 4: this.bodyPosX[0] += 40; break;
            // }
            this.bodyPosX[0] += level;
            if (this.bodyPosX[0] > Const.SCREEN_WIDTH) {
                this.bodyPosX[0] = Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS;
            }
        }
    }
}