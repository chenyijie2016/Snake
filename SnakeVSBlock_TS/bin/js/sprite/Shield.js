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
/*
示例：
    let p = new sprite.Shield();
    p.setPos(100, 100);
    p.update();
    this.addChild(p);
*/
var sprite;
(function (sprite) {
    var Shield = /** @class */ (function (_super) {
        __extends(Shield, _super);
        function Shield() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Shield.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
        };
        Shield.prototype.update = function () {
            //this.graphics.clear();
            if (this.visible) {
                // Using Skin !!!
                // this is just a demo
                this.loadImage("ui/shield.png");
                this.scale(0.1, 0.1);
                this.pos(this.PosX, this.PosY);
                // TODO: Using other image
            }
        };
        Shield.prototype.init = function () {
            this.PosX = 0;
            this.PosY = 0;
        };
        Shield.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return Shield;
    }(Laya.Sprite));
    sprite.Shield = Shield;
})(sprite || (sprite = {}));
//# sourceMappingURL=Shield.js.map