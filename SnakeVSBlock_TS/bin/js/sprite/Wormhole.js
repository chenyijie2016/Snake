/*
轴心点：
    (this.PosX,  this.PosY)
*/
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
使用示例：
    let w = new sprite.Wormhole();
    w.setPos(150, 150);
    w.update();
    this.addChild(w);
*/
var sprite;
(function (sprite) {
    var Wormhole = /** @class */ (function (_super) {
        __extends(Wormhole, _super);
        function Wormhole() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Wormhole.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
            this.pos(this.PosX, this.PosY);
        };
        Wormhole.prototype.update = function () {
            this.graphics.clear();
            if (this.visible) {
                for (var i = 0; i < 8; i++) {
                    var p = new sprite.Line();
                    p.setPos(Math.cos(this.radianUnit * i) * this.layoutRadius_s, Math.sin(this.radianUnit * i) * this.layoutRadius_s, Math.cos(this.radianUnit * i) * this.layoutRadius_e, Math.sin(this.radianUnit * i) * this.layoutRadius_e);
                    p.update();
                    this.Lines.push(p);
                    this.addChild(p);
                }
            }
            this.timer.frameLoop(4, this, this.animate);
        };
        Wormhole.prototype.init = function () {
            this.Lines = new Array();
            this.PosX = 0;
            this.PosY = 0;
            this.layoutRadius_s = 5;
            this.layoutRadius_e = 12;
            this.radianUnit = Math.PI / 4;
        };
        Wormhole.prototype.animate = function (e) {
            this.rotation += 5;
        };
        Wormhole.prototype.destory = function () {
            for (var i = 0; i < 8; i++) {
                this.Lines[i].destory();
            }
            this.timer.clearAll(this);
            _super.prototype.removeSelf.call(this);
        };
        return Wormhole;
    }(Laya.Sprite));
    sprite.Wormhole = Wormhole;
})(sprite || (sprite = {}));
//# sourceMappingURL=Wormhole.js.map