module sprite {
    export class Block extends Laya.Sprite {
        private Score: number;
        constructor() {
            super();
            this.init();
        }
        public setScore(score: number): void {
            this.Score = score;
        }

        init(): void {
            this.graphics.drawCircle(0, 0, 8, '#FFEE00');
        }
    }
}