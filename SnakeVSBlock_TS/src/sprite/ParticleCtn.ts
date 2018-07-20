/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class ParticleCtn extends Laya.Sprite {
        public Color: string;
        private time: number;
        public Particles: Array<sprite.Particle>
        public PosX: number;
        public PosY: number;
        private layoutRadius: number;//每个粒子距离中心点的像素距离
        private radianUnit: number;
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
            this.pos(this.PosX, this.PosY);
        }

        public update(): void {
            this.graphics.clear();
            if (this.visible) {
                for(let i = 0; i < 8; i++){
                    let p = new sprite.Particle();
                    p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius, Math.sin(this.radianUnit * i) * this.layoutRadius);
                    p.setColor(this.Color);
                    p.update();
                    this.Particles.push(p);
                    this.addChild(p);
                }
            }
            this.timer.frameLoop(4, this, this.animate);
        }

        init(): void {
            this.Particles = new Array<sprite.Particle>();
            this.PosX = 0;
            this.PosY = 0;
            this.Color = "white";
            this.time = 5;
            this.layoutRadius = 50;
            this.radianUnit = Math.PI / 4;
        }

        private animate(e: Event): void{
            this.rotation += 10;
            if(this.time == 0){
                this.timer.clearAll(this);
                for(let i = 0; i < 8; i++){
                    this.Particles[i].destory();
                    this.destory();
                }
                return;
            }
            else{
                this.time--;
            }
            for(let i = 0; i < 8; i++){
                this.layoutRadius += 2;
                this.Particles[i].setPos(Math.cos(this.radianUnit * i) * this.layoutRadius, Math.sin(this.radianUnit * i) * this.layoutRadius);
                this.Particles[i].update();
            }

        }

        destory(): void {
            super.removeSelf();
        }
    }
}