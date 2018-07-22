/*
轴心点：    
    (this.PosX,  this.PosY)
*/
/*
示例：
    let p = new sprite.Shield();
    p.setPos(100, 100);
    p.update();
    this.addChild(p);
*/
module sprite {
    export class Shield extends Laya.Sprite {
        public PosX: number;
        public PosY: number;
        constructor() {
            super();
            this.init();
        }

        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
        }

        public update(): void {
            //this.graphics.clear();

            if (this.visible) {
                // Using Skin !!!
                // this is just a demo
                this.loadImage("ui/shield.png");
                this.scale(0.1, 0.1);
                this.pos(this.PosX, this.PosY);

                // TODO: Using other image
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