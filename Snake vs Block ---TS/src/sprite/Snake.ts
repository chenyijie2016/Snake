module sprite {
    export class Snake extends Laya.Sprite {
        public length: number;
        public bodyPosX: Array<number>;
        public bodyPosY: Array<number>;

        constructor() {
            super();
            this.init();
        }
        private init(): void {
            this.length = 1;
            this.bodyPosX = new Array<number>();
            this.bodyPosY = new Array<number>();
            this.bodyPosX.push(GameMain.width / 2);
            this.bodyPosY.push(GameMain.height / 2);
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
                let YDifference = 5;
                if (8 * 8 - XDifference ** 2 / 4 > 0) {
                    YDifference = Math.sqrt(18 * 18 - XDifference ** 2 / 4);
                }
                this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
            }
            this.showBody();
        }
        public addBody(parts: number): void {
            let lastPosX = this.bodyPosX[this.length - 1];

            this.length += parts;
            for (let i = 0; i < parts; i++) {
                this.bodyPosX.push(lastPosX);
                this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + 15);
            }
        }
        private showBody(): void {
            this.graphics.clear();
            for (let i = 0; i < this.length; i++) {
                this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], 12, '#FFFF00');
            }
        }
        public moveLeft(level: number): void {
            switch (level) {
                case 0: this.bodyPosX[0] -= 8; break;
                case 1: this.bodyPosX[0] -= 18; break;
                case 2: this.bodyPosX[0] -= 24; break;
                case 3: this.bodyPosX[0] -= 32; break;
                case 4: this.bodyPosX[0] -= 40; break;
            }

            if (this.bodyPosX[0] < 0) {
                this.bodyPosX[0] = 6;
            }

        }
        public moveRight(level: number): void {
            switch (level) {
                case 0: this.bodyPosX[0] += 8; break;
                case 1: this.bodyPosX[0] += 18; break;
                case 2: this.bodyPosX[0] += 24; break;
                case 3: this.bodyPosX[0] += 32; break;
                case 4: this.bodyPosX[0] += 40; break;
            }
            if (this.bodyPosX[0] > GameMain.width) {
                this.bodyPosX[0] = GameMain.width - 6;
            }
        }
    }
}