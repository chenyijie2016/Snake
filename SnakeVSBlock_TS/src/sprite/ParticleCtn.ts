/*
轴心点：    
    (this.PosX,  this.PosY)
*/
module sprite {
    export class ParticleCtn extends Laya.Sprite {
        private time: number;
        public Particles: Array<sprite.Particle>
        public PosX: number;
        public PosY: number;
        private layoutRadius: number;//每个粒子距离中心点的像素距离
        private radianUnit: number;
        public Color: string;
        constructor() {
            super();
            this.init();
        }

        public setPos(x: number, y: number): void {
            this.PosX = x;
            this.PosY = y;
            this.pos(this.PosX, this.PosY);
        }

        public setColor(color: string): void {
            this.Color = color;
        }

        public update(): void {
            this.graphics.clear();
            if(Const.GAME_MODE === "normalMode"){
                if (this.visible) {
                    for(let i = 0; i < 16; i++){
                        let p = new sprite.Particle();
                        p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5), Math.sin(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5));
                        let color = Common.getRandomArrayElements(Const.PARTICLE_COLORS, 1)[0];
                        p.setColor(Common.rgbToHex(color));
                        p.update();
                        this.Particles.push(p);
                        this.addChild(p);
                    }
                }
            }
            else if(Const.GAME_MODE === "colorMode"){
                if (this.visible) {
                    for(let i = 0; i < 16; i++){
                        let p = new sprite.Particle();
                        p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5), Math.sin(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5));
                        p.setColor(this.Color);
                        p.update();
                        this.Particles.push(p);
                        this.addChild(p);
                    }
                }
            }
                
            this.timer.frameLoop(4, this, this.animate);
        }

        init(): void {
            this.Particles = new Array<sprite.Particle>();
            this.PosX = 0;
            this.PosY = 0;
            this.time = 5;
            this.layoutRadius = 50;
            this.radianUnit = Math.PI / 8;
        }

        private animate(e: Event): void{
            this.rotation += 10;
            if(this.time == 0){
                this.timer.clearAll(this);
                for(let i = 0; i < 16; i++){
                    this.Particles[i].destory();
                    this.destory();
                }
                return;
            }
            else{
                this.time--;
            }
            for(let i = 0; i < 16; i++){
                this.layoutRadius += 2;
                this.Particles[i].setPos(Math.cos(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5), Math.sin(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5));
                this.Particles[i].update();
            }

        }

        destory(): void {
            super.removeSelf();
        }
    }
}