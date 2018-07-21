/*
轴心点：    
    (this.PosX,  this.PosY)
*/

/*
使用示例：
    let w = new sprite.Wormhole();
    w.setPos(150, 150);
    w.update();
    this.addChild(w);
*/
module sprite {
    export class Wormhole extends Laya.Sprite {
        public Lines: Array<sprite.Line>
        public PosX: number;
        public PosY: number;
        private layoutRadius_s: number;//每个Line起点距离中心点的像素距离
        private layoutRadius_e: number;//每个Line终点距离中心点的像素距离
        private radianUnit: number;
        constructor() {
            super();
            this.init();
        }

        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
            this.pos(this.PosX, this.PosY);
        }

        public update(): void {
            this.graphics.clear();
            if (this.visible) {
                for(let i = 0; i < 8; i++){
                    let p = new sprite.Line();
                    p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius_s, Math.sin(this.radianUnit * i) * this.layoutRadius_s, Math.cos(this.radianUnit * i) * this.layoutRadius_e, Math.sin(this.radianUnit * i) * this.layoutRadius_e);
                    p.update();
                    this.Lines.push(p);
                    this.addChild(p);
                }
            }
            this.timer.frameLoop(4, this, this.animate);
        }

        init(): void {
            this.Lines = new Array<sprite.Line>();
            this.PosX = 0;
            this.PosY = 0;
            this.layoutRadius_s = 5;
            this.layoutRadius_e = 12;
            this.radianUnit = Math.PI / 4;
        }

        private animate(e: Event): void{
            this.rotation += 5;
        }

        destory(): void {
            for(let i = 0; i < 8; i++){
                this.Lines[i].destory();
            }
            this.timer.clearAll(this);
            super.removeSelf();
        }
    }
}