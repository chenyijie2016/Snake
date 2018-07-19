module sprite {
    export class Wall extends Laya.Sprite {
        private len: number;
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

        public setLength(value: number): void {
            this.len = value;
        }

        public update(): void {
            this.graphics.clear();
            //TODO :draw Wall
            if (this.visible) {
                let path: any[] = [
                    ["moveTo", Const.WALL_RADIUS, 0],
                    ["arcTo", Const.WALL_WIDTH, 0, Const.WALL_WIDTH, Const.WALL_RADIUS, Const.WALL_RADIUS],
                    ["arcTo", Const.WALL_WIDTH, this.len, Const.WALL_WIDTH - Const.WALL_RADIUS, this.len, Const.WALL_RADIUS],
                    ["arcTo", 0, this.len, 0, this.len - Const.WALL_RADIUS, Const.WALL_RADIUS],
                    ["arcTo", 0, 0, Const.WALL_RADIUS, 0, Const.WALL_RADIUS],
                ];

                this.graphics.drawPath(this.PosX - Const.WALL_WIDTH / 2, this.PosY - this.len / 2, path, { fillStyle: "white" });
            }

        }

        init(): void {
            this.setLength(Common.getRandomArrayElements([80, 80, 80, 160, 160], 1)[0]);
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}