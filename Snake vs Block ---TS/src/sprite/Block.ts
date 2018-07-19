/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class Block extends Laya.Sprite {
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
            //TODO :draw Block
            if (this.visible) {
                let path: any[] = [
                    ["moveTo", Const.BLOCK_RADIUS, 0],
                    ["arcTo", Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", Const.BLOCK_WIDTH, Const.BLOCK_WIDTH, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS],
                    ["arcTo", 0, Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", 0, 0, Const.BLOCK_RADIUS, 0, Const.BLOCK_RADIUS],
                ];

                this.graphics.drawPath(this.PosX - Const.BLOCK_WIDTH / 2, this.PosY - Const.BLOCK_WIDTH / 2, path, { fillStyle: this.getBlockColor() });
                this.graphics.fillText(this.value.toString(), this.PosX - 5, this.PosY - 5, '30px Arial', '#000000', 'center');
            }

        }
        public getBlockColor(): string {
            let blockValue = this.value;
            if (blockValue > 50) {
                blockValue = 50;
            }
            let rgbToHex = function (rgb) {

                let color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
                let hex = "#";

                for (let i = 0; i < 3; i++) {
                    hex += ("0" + Number(color[i]).toString(16)).slice(-2);
                }
                return hex;
            };
            let rgb = Const.BLOCK_COLORS[blockValue - 1];
            return rgbToHex(rgb);
        }

        init(): void {
            this.setValue(Common.getRandomNumber(1, 50) + 1);
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}