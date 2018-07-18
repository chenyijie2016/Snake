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
    var Block = /** @class */ (function (_super) {
        __extends(Block, _super);
        function Block() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Block.prototype.isVisible = function () {
            return this.Visible;
        };
        Block.prototype.setVisible = function () {
            this.Visible = true;
        };
        Block.prototype.hidden = function () {
            this.Visible = false;
        };
        Block.prototype.setScore = function (score) {
            this.score = score;
        };
        Block.prototype.show = function () {
            this.graphics.clear();
        };
        Block.prototype.init = function () {
            this.graphics.drawCircle(0, 0, 8, '#FFEE00');
        };
        return Block;
    }(Laya.Sprite));
    sprite.Block = Block;
})(sprite || (sprite = {}));
//# sourceMappingURL=Block.js.map