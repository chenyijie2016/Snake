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
    var Line = /** @class */ (function (_super) {
        __extends(Line, _super);
        function Line() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Line.prototype.setColor = function (color) {
            this.Color = color;
        };
        Line.prototype.setWidth = function (width) {
            this.Width = width;
        };
        Line.prototype.setPos = function (x1, y1, x2, y2) {
            this.X1 = x1;
            this.Y1 = y1;
            this.X2 = x2;
            this.Y2 = y2;
        };
        Line.prototype.update = function () {
            this.graphics.clear();
            if (this.visible) {
                this.graphics.drawLine(this.X1, this.Y1, this.X2, this.Y2, this.Color, this.Width);
            }
        };
        Line.prototype.init = function () {
            this.Width = 2;
            this.Color = Common.rgbToHex([0, 128, 255]);
            this.X1 = 0;
            this.Y1 = 0;
            this.X2 = 0;
            this.Y2 = 0;
        };
        Line.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return Line;
    }(Laya.Sprite));
    sprite.Line = Line;
})(sprite || (sprite = {}));
//# sourceMappingURL=Line.js.map