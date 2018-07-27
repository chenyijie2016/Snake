module sprite {
    export class Snake extends Laya.Sprite {
        public state: string;
        public length: number; // 长度
        public bodyPosX: Array<number>; // 每段身体的中心坐标
        public bodyPosY: Array<number>;
        public bodyColor: string;
        public headPosXHistory: Array<number>; // 记录每帧蛇头的历史轨迹(记录X坐标)
        public superTime: number
        //TODO 显然还需要给每段蛇的颜色建一个数组
        public eachBodyColor: Array<string>; // 每段身体的颜色


        constructor() {
            super();
            this.graphics.clipRect(0, 0, Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT);
            this.bodyPosX = new Array<number>();
            this.bodyPosY = new Array<number>();
            this.headPosXHistory = new Array<number>();
            this.eachBodyColor = new Array<string>();
            for (let i = 0; i < 300; i++) {
                this.headPosXHistory.push(Const.SCREEN_WIDTH / 2);
            }

            this.init();
        }

        private init(): void {
            // 默认长度为1，放在屏幕正中间
            this.state = Const.SNAKE_STATE_NORMAL;
            this.length = 1;
            this.bodyPosX.push(Const.SCREEN_WIDTH / 2);
            this.bodyPosY.push(Const.SCREEN_HEIGHT / 2);
            this.superTime = Const.SNAKE_SUPER_TIME;
        }

        public setBodyColor(color: string): void {
            this.bodyColor = color;
        }

        public setState(state: string): void {
            this.state = state;
        }

        public updateHeadHistory(): void {
            // 每300帧刷新一下headPosXHistory数组
            this.headPosXHistory = this.headPosXHistory.slice(0, 300);
        }
        public updateBody(): void {

            this.headPosXHistory.unshift(this.bodyPosX[0]);
            let rate = Const.SNAKE_BODY_RADIUS * 2 / Const.GAME_SCROLL_SPEED;
            let Len = 0;
            let i = 0;
            let j = 0;
            let DiffY = Const.GAME_SCROLL_SPEED;
            // 根据历史坐标求移动长度，每达到一段蛇身长度就将该段蛇身的位置进行更新
            while (i < this.length && i < Const.SNAKE_MAX_PARTS && j < 240) {
                j++;
                Len += Math.sqrt(Math.abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]) ** 2 + DiffY ** 2);
                while (Len > Const.SNAKE_BODY_DEFALUT_SPACING) {
                    i++;
                    Len -= Const.SNAKE_BODY_DEFALUT_SPACING;
                    if (Math.abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]) > Const.SNAKE_BODY_DEFALUT_SPACING) {
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
                        this.bodyPosY[i] = this.bodyPosY[i - 1] + Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]) ** 2)
                    }
                }
            }

            //this.showBody();


            // for (let i = 1; i < this.length && i <= 15; i++) {
            //     let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
            //     if (XDifference > Const.SNAKE_BODY_RADIUS * 2) {
            //         //this.concatBody();
            //         // return;
            //     }
            //     if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
            //         this.bodyPosX[i] += XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
            //         this.bodyPosX[i] -= XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
            //     if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2 > 0) {
            //         YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2);
            //     }
            //     this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;

            //     //this.showBody();
            // }

        }
        // 延长蛇身
        public extendBody(parts: number): void {

            switch (GameMain.mode) {
                case GameMode.Normal: {
                    let lastPosX = this.bodyPosX[this.length - 1];
                    this.length += parts;
                    for (let i = 0; i < parts; i++) {
                        this.bodyPosX.push(lastPosX);
                        this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + Const.SNAKE_BODY_DEFALUT_SPACING);
                    }
                    break;
                }
                case GameMode.Color: {
                    let lastPosX = this.bodyPosX[this.length - 1];
                    this.length += 1;
                    this.bodyPosX.push(lastPosX);
                    this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + Const.SNAKE_BODY_DEFALUT_SPACING);
                    this.eachBodyColor.push(Common.rgbToHex(Const.COLORS_COLORMODE[parts-1]));
                    break;
                }
            }
        }



        //显示蛇身
        public showBody(): void {
            this.graphics.clear();
            this.graphics.fillText(this.length.toString(), this.bodyPosX[0], this.bodyPosY[0] - 35, '20px Arial', '#FFFFFF', 'center');
            if(GameMain.mode === GameMode.Normal){
                switch (this.state) {
                    case Const.SNAKE_STATE_SHIELD: {
                        this.bodyColor = "red";
                        break;
                    }
                    case Const.SNAKE_STATE_SUPER: {
                        this.bodyColor = Common.getRandomArrayElements(["red", "yellow"], 1)[0];
                        break;
                    }
                    case Const.SNAKE_STATE_NORMAL: {
                        this.bodyColor = "#FFFF00";
                        break;
                    }
                    default: {
                        this.bodyColor = "#FFFF00";
                        break;
                    }
                }
                for (let i = 0; i < this.length && i < Const.SNAKE_MAX_PARTS; i++) {
                    // Using Skin !!!
                    // this is just a demo
                    this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], Const.SNAKE_BODY_RADIUS, this.bodyColor);

                    // TODO: Using other image
                }
            }
            else if(GameMain.mode === GameMode.Color){
                for (let i = 0; i < this.length && i < Const.SNAKE_MAX_PARTS; i++) {
                    // Using Skin !!!
                    // this is just a demo
                    this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], Const.SNAKE_BODY_RADIUS, this.eachBodyColor[this.length-i-1]);

                    // TODO: Using other image
                }
            }
        }

        public shortenBody() {
            switch (GameMain.mode) {
                case GameMode.Normal:
                    {
                        this.length--;
                        break;
                    }
                case GameMode.Color:
                    {
                        this.length--;
                        //TODO : 蛇头数组的第一个移除！

                        break;
                    }
            }
        }

        // 向左移动
        public moveLeft(level: number): void {
            if (this.bodyPosX[0] - level < Const.SNAKE_BODY_RADIUS) {
                this.bodyPosX[0] = Const.SNAKE_BODY_RADIUS;
            }
            else
                this.bodyPosX[0] -= level;
        }

        // 向右移动
        public moveRight(level: number): void {
            if (this.bodyPosX[0] + level > Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS) {
                this.bodyPosX[0] = Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS;
            }
            else
                this.bodyPosX[0] += level;
        }
    }
}