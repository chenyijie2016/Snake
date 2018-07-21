/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class Block extends Laya.Sprite {
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
                    GameMain.gameView.score++;
                    GameMain.gameView.snake.length--;
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

                this.graphics.fillText(this.value.toString(), this.PosX - 3 * (Xoffset-1), this.PosY - 15, '30px Arial', '#000000', 'center');
            }

        }
        public getBlockColor(): string {
            let blockValue = this.value;
            if (blockValue > 50) {
                blockValue = 51;
            }

            let rgb = Const.BLOCK_COLORS[blockValue - 1];
            return Common.rgbToHex(rgb);
        }

        init(): void {
            this.setValue(Common.getRandomNumber(1, 50));
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}