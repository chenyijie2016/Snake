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
    var Particle = /** @class */ (function (_super) {
        __extends(Particle, _super);
        function Particle() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Particle.prototype.setColor = function (color) {
            this.Color = color;
        };
        Particle.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
        };
        Particle.prototype.update = function () {
            this.graphics.clear();
            if (this.visible) {
                this.graphics.drawCircle(this.PosX, this.PosY, Const.PARTICLE_RADIUS, this.Color);
            }
        };
        Particle.prototype.init = function () {
            this.PosX = 0;
            this.PosY = 0;
        };
        Particle.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return Particle;
    }(Laya.Sprite));
    sprite.Particle = Particle;
})(sprite || (sprite = {}));
//# sourceMappingURL=Particle.js.map