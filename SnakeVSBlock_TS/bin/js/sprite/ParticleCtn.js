var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
轴心点：
    (this.PosX,  this.PosY)
*/
var sprite;
(function (sprite) {
    var ParticleCtn = /** @class */ (function (_super) {
        __extends(ParticleCtn, _super);
        function ParticleCtn() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        ParticleCtn.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
            this.pos(this.PosX, this.PosY);
        };
        ParticleCtn.prototype.setColor = function (color) {
            this.Color = color;
        };
        ParticleCtn.prototype.update = function () {
            this.graphics.clear();
            if (this.visible) {
                switch (GameMain.mode) {
                    case GameMode.Normal: {
                        for (var i = 0; i < 16; i++) {
                            var p = new sprite.Particle();
                            p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5), Math.sin(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5));
                            var color = Common.getRandomArrayElements(Const.PARTICLE_COLORS, 1)[0];
                            p.setColor(Common.rgbToHex(color));
                            p.update();
                            this.Particles.push(p);
                            this.addChild(p);
                        }
                        break;
                    }
                    case GameMode.Color: {
                        for (var i = 0; i < 16; i++) {
                            var p = new sprite.Particle();
                            p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5), Math.sin(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5));
                            p.setColor(this.Color);
                            p.update();
                            this.Particles.push(p);
                            this.addChild(p);
                        }
                        break;
                    }
                }
            }
            this.timer.frameLoop(4, this, this.animate);
        };
        ParticleCtn.prototype.init = function () {
            this.Particles = new Array();
            this.PosX = 0;
            this.PosY = 0;
            this.time = 5;
            this.layoutRadius = 50;
            this.radianUnit = Math.PI / 8;
        };
        ParticleCtn.prototype.animate = function (e) {
            this.rotation += 10;
            if (this.time == 0) {
                this.timer.clearAll(this);
                for (var i = 0; i < 16; i++) {
                    this.Particles[i].destory();
                    this.destory();
                }
                return;
            }
            else {
                this.time--;
            }
            for (var i = 0; i < 16; i++) {
                this.layoutRadius += 2;
                this.Particles[i].setPos(Math.cos(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5), Math.sin(this.radianUnit * i) * this.layoutRadius * (i % 2 == 0 ? 1 : 0.5));
                this.Particles[i].update();
            }
        };
        ParticleCtn.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return ParticleCtn;
    }(Laya.Sprite));
    sprite.ParticleCtn = ParticleCtn;
})(sprite || (sprite = {}));
//# sourceMappingURL=ParticleCtn.js.map