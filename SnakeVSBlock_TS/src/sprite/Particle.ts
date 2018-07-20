/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class Particle extends Laya.Sprite {
        public Color: string;
        public PosX: number;
        public PosY: number;
        constructor() {
            super();
            this.init();
        }

        public setColor(color: string): void {
            this.Color = color;
        }

        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
        }

        public update(): void {
            this.graphics.clear();

            if (this.visible) {
                this.graphics.drawCircle(this.PosX, this.PosY, Const.PARTICLE_RADIUS, this.Color);
            }
        }

        init(): void {
            this.PosX = 0;
            this.PosY = 0;
        }

        destory(): void {
            super.removeSelf();
        }
    }
}