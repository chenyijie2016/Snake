module sprite {
    export class Snake extends Laya.Sprite {
        public length: number;
        public bodyPosX: Array<number>;
        public bodyPosY: Array<number>;
        public headPosXHistory: Array<number>;
        private PosYOffest: number;
        constructor() {
            super();
            this.graphics.clipRect(0, 0, Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT);
            this.bodyPosX = new Array<number>();
            this.bodyPosY = new Array<number>();
            this.headPosXHistory = new Array<number>();
            for (let i = 0; i < 300; i++) {
                this.headPosXHistory.push(207);
            }
            this.init();
        }

        private init(): void {
            this.length = 1;
            this.bodyPosX.push(Const.SCREEN_WIDTH / 2);
            this.bodyPosY.push(Const.SCREEN_HEIGHT / 2);
        }


        // public updateHead(): void {
        //     for (let i = 1; i < this.length; i++) {
        //         let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
        //         if (XDifference > 20) {
        //             this.bodyPosY[i] = this.bodyPosY[i - 1] + Const.SNAKE_BODY_MINIUM_SPACING;
        //             if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
        //                 this.bodyPosX[i] += (XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - Const.SNAKE_BODY_MINIUM_SPACING ** 2))
        //             }
        //             else {
        //                 this.bodyPosX[i] -= XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - Const.SNAKE_BODY_MINIUM_SPACING ** 2)
        //             }
        //         }
        //         else {
        //             let YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2);
        //             this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
        //             if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
        //                 this.bodyPosX[i] += (XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - YDifference ** 2))
        //             }
        //             else {
        //                 this.bodyPosX[i] -= XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - YDifference ** 2)
        //             }
        //         }
        //     }
        // }
        public updateHeadHistory(): void {
            this.headPosXHistory = this.headPosXHistory.slice(0, 300);
        }
        public updateBody(): void {
            console.log('update body')
            this.headPosXHistory.unshift(this.bodyPosX[0]);
            let rate = Const.SNAKE_BODY_RADIUS * 2 / GameMain.gameView.gameScrollSpeed;
            //GameMain.gameView.setDebugInfo(rate.toString());
            //console.log(this.headPosXHistory);
            let floor = Math.floor;
            let abs = Math.abs;
            let Len = 0;
            let i = 0;
            let j = 0;
            let DiffY = GameMain.gameView.gameScrollSpeed;

            while (i < this.length && j < 240) {
                j++;
                Len += Math.sqrt(abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]) ** 2 + DiffY ** 2);
                while (Len > Const.SNAKE_BODY_DEFALUT_SPACING) {
                    i++;
                    Len -= Const.SNAKE_BODY_DEFALUT_SPACING;
                    if (abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]) > Const.SNAKE_BODY_DEFALUT_SPACING) {
                        if (this.headPosXHistory[j] < this.headPosXHistory[j - 1]) {
                            this.bodyPosX[i] = this.headPosXHistory[j - 1] - 20;
                            this.bodyPosY[i] = this.bodyPosY[i - 1] + 3;
                        }
                        else {
                            this.bodyPosX[i] = this.headPosXHistory[j - 1] + 20;
                            this.bodyPosY[i] = this.bodyPosY[i - 1] + 3;
                        }
                    } else {
                        this.bodyPosX[i] = this.headPosXHistory[j];
                        this.bodyPosY[i] = this.bodyPosY[i - 1] + Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - abs(this.bodyPosX[i] - this.bodyPosX[i - 1]) ** 2)
                    }
                }
            }

            this.showBody();


            // for (let i = 1; i < this.length; i++) {
            //     let XDifference = Math.abs(this.bodyPosX[i] - this.headPosXHistory[floor(i * rate)]);
            //     if (XDifference > Const.SNAKE_BODY_RADIUS * 2) {
            //         //this.concatBody();
            //         // return;
            //     }
            //     if (this.bodyPosX[i] < this.headPosXHistory[floor(i * rate)]) {
            //         this.bodyPosX[i] += XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     else if (this.bodyPosX[i] > this.headPosXHistory[floor(i * rate)]) {
            //         this.bodyPosX[i] -= XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
            //     if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2 > 0) {
            //         YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2);
            //     }
            //     this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;

            //     this.showBody();
            // }



        }

        // private concatBody(): void {
        //     for (let i = 1; i < this.length; i++) {
        //         let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);

        //         if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
        //             this.bodyPosX[i] += XDifference / Const.SNAKE_FLEXIBILITY;
        //         }
        //         else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
        //             this.bodyPosX[i] -= XDifference / Const.SNAKE_FLEXIBILITY;
        //         }
        //         let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
        //         if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2 > 0) {
        //             YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2);
        //         }
        //         this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
        //         //this.showBody();
        //     }
        // }

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
            console.log('show body', this.bodyPosX);
            this.graphics.fillText(this.length.toString(), this.bodyPosX[0], this.bodyPosY[0] - 35, '20px Arial', '#FFFFFF', 'center');

            for (let i = 0; i < this.length; i++) {
                // Using Skin !!!
                // this is just a demo
                this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], Const.SNAKE_BODY_RADIUS, '#FFFF00');

                // TODO: Using other image
            }
        }

        public moveLeft(level: number): void {

            this.bodyPosX[0] -= level;
            if (this.bodyPosX[0] < 0) {
                this.bodyPosX[0] = Const.SNAKE_BODY_RADIUS;
            }
        }

        public moveRight(level: number): void {
            this.bodyPosX[0] += level;
            if (this.bodyPosX[0] > Const.SCREEN_WIDTH) {
                this.bodyPosX[0] = Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS;
            }
        }
    }
}