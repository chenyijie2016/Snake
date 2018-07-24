/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class Block extends Laya.Sprite {
        public state: string;
        private value: number;
        public PosX: number;
        public PosY: number;
        private decreaseCount: number = 0;
        constructor() {
            super();
            this.init();
        }

        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
        }
        public getValue(): number {
            return this.value;
        }
        public setValue(value: number): void {
            this.value = value;
        }

        public decreaseValue(): boolean {
            this.decreaseCount++;
            if (this.decreaseCount === Const.BLOCK_DECREASE_SPEED) {
                this.decreaseCount = 0;
                if (this.value > 0) {
                    this.value--;
                    if(Const.GAME_MODE === "normalMode"){
                        GameMain.gameView.score++;
                        GameMain.gameView.snake.length--;
                    }
                    else if(Const.GAME_MODE === "colorMode"){
                        GameMain.gameColorMode.score++;
                        GameMain.gameColorMode.snake.length--;
                    }
                    
                }
                if (this.value === 0)
                    return false;
            }
            return true;
        }


        public update(): void {
            this.graphics.clear();
            if (this.visible) {
                let path: any[] = [
                    ["moveTo", Const.BLOCK_RADIUS, 0],
                    ["arcTo", Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", Const.BLOCK_WIDTH, Const.BLOCK_WIDTH, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS],
                    ["arcTo", 0, Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", 0, 0, Const.BLOCK_RADIUS, 0, Const.BLOCK_RADIUS],
                ];

                this.graphics.drawPath(this.PosX - Const.BLOCK_WIDTH / 2, this.PosY - Const.BLOCK_WIDTH / 2, path, { fillStyle: this.getBlockColor() });
                let Xoffset = 1;
                if (this.value > 0)
                    Xoffset = Math.floor(Math.log(this.value) / Math.log(10)) + 1;

                if(this.state === Const.BLOCK_STATE_NORMAL && Const.GAME_MODE === "normalMode"){
                    this.graphics.fillText(this.value.toString(), this.PosX - 3 * (Xoffset-1), this.PosY - 15, '30px Arial', '#000000', 'center');
                }
                else if(this.state === Const.BLOCK_STATE_SPECIAL && Const.GAME_MODE === "normalMode"){
                    this.graphics.fillText(this.value.toString(), this.PosX - 3 * (Xoffset-1), this.PosY - 35, '30px Arial', '#000000', 'center');
                    let starPath: any = [0, 0, 5, 10, 16, 10, 6, 16, 11, 27, 0, 21, -11, 27, -6, 16, -16, 10, -5, 10];
                    this.graphics.drawPoly(this.PosX - 3 * (Xoffset-1), this.PosY, starPath, "black");
                }
                
            }

        }
        public getBlockColor(): string {
            if(Const.GAME_MODE === "normalMode"){
                let blockValue = this.value;
                if (blockValue > 50) {
                    blockValue = 51;
                }

                let rgb = Const.BLOCK_COLORS[blockValue - 1];
                return Common.rgbToHex(rgb);
            }
            else if(Const.GAME_MODE === "colorMode"){
                let blockValue = this.value;
                let rgb = Const.COLORS_COLORMODE[blockValue - 1];
                return Common.rgbToHex(rgb);
            }
        }

        public setState(state: string) {
            this.state = state;
            if(this.state === Const.BLOCK_STATE_SPECIAL){
                this.value = Common.getRandomArrayElements(Const.BLOCK_SPECIAL_VALUE,1)[0];
            }
        }

        init(): void {
            this.state = Const.BLOCK_STATE_NORMAL;
            if(Const.GAME_MODE === "normalMode"){
                this.setValue(Common.getRandomNumber(1, 50));
            }
            else if(Const.GAME_MODE === "colorMode"){
                this.setValue(Common.getRandomNumber(1, 4));
            }
            //this.setState(Const.BLOCK_STATE_SPECIAL);
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}