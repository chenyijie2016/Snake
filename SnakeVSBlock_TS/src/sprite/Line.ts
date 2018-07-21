module sprite {
    export class Line extends Laya.Sprite {
        public Width: number;
        public Color: string;
        public X1: number;
        public Y1: number;
        public X2: number;
        public Y2: number;
        constructor() {
            super();
            this.init();
        }

        public setColor(color: string): void {
            this.Color = color;
        }

        public setWidth(width: number): void {
            this.Width = width;
        }

        public setPos(x1: number, y1: number, x2: number, y2: number): void {
            this.X1 = x1;
            this.Y1 = y1;
            this.X2 = x2;
            this.Y2 = y2;
        }

        public update(): void {
            this.graphics.clear();

            if (this.visible) {
                this.graphics.drawLine(this.X1, this.Y1, this.X2, this.Y2, this.Color, this.Width);
            }
        }

        init(): void {
            this.Width = 2;
            this.Color = Common.rgbToHex([0, 128, 255]);
            this.X1 = 0;
            this.Y1 = 0;
            this.X2 = 0;
            this.Y2 = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}