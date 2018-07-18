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
var sprite;
(function (sprite) {
    var SnakeAdd = /** @class */ (function (_super) {
        __extends(SnakeAdd, _super);
        function SnakeAdd() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        SnakeAdd.prototype.isVisible = function () {
            return this.visible;
        };
        SnakeAdd.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
        };
        SnakeAdd.prototype.setVisible = function () {
            this.visible = true;
        };
        SnakeAdd.prototype.hidden = function () {
            this.visible = false;
        };
        SnakeAdd.prototype.setValue = function (value) {
            this.value = value;
        };
        SnakeAdd.prototype.update = function () {
            this.graphics.clear();
            if (this.visible) {
                // Using Skin !!!
                // this is just a demo
                this.graphics.drawCircle(this.PosX, this.PosY, Const.SNAKE_BODY_RADIUS, '#FFFF00');
                this.graphics.fillText(this.value.toString(), this.PosX, this.PosY - 35, '20px Arial', '#FFFFFF', 'center');
                // TODO: Using other image
            }
        };
        SnakeAdd.prototype.init = function () {
            this.setValue(Common.getRandomNumber(1, 5) + 1);
            this.PosX = 0;
            this.PosY = 0;
        };
        SnakeAdd.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return SnakeAdd;
    }(Laya.Sprite));
    sprite.SnakeAdd = SnakeAdd;
})(sprite || (sprite = {}));
//# sourceMappingURL=SnakeAdd.js.map