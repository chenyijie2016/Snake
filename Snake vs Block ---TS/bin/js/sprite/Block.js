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
    var Block = /** @class */ (function (_super) {
        __extends(Block, _super);
        function Block() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Block.prototype.isVisible = function () {
            return this.visible;
        };
        Block.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
        };
        Block.prototype.setVisible = function () {
            this.visible = true;
        };
        Block.prototype.hidden = function () {
            this.visible = false;
        };
        Block.prototype.setValue = function (value) {
            this.value = value;
        };
        Block.prototype.update = function () {
            this.graphics.clear();
            //TODO :draw Block
            if (this.visible) {
                var path = [
                    ["moveTo", Const.BLOCK_RADIUS, 0],
                    ["arcTo", Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", Const.BLOCK_WIDTH, Const.BLOCK_WIDTH, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS],
                    ["arcTo", 0, Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", 0, 0, Const.BLOCK_RADIUS, 0, Const.BLOCK_RADIUS],
                ];
                this.graphics.drawPath(this.PosX - Const.BLOCK_WIDTH / 2, this.PosY - Const.BLOCK_WIDTH / 2, path, { fillStyle: this.getBlockColor() });
                this.graphics.fillText(this.value.toString(), this.PosX - 5, this.PosY - 5, '30px Arial', '#000000', 'center');
            }
        };
        Block.prototype.getBlockColor = function () {
            var blockValue = this.value;
            if (blockValue > 50) {
                blockValue = 50;
            }
            var rgbToHex = function (rgb) {
                var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
                var hex = "#";
                for (var i = 0; i < 3; i++) {
                    hex += ("0" + Number(color[i]).toString(16)).slice(-2);
                }
                return hex;
            };
            var rgb = Const.BLOCK_COLORS[blockValue - 1];
            return rgbToHex(rgb);
        };
        Block.prototype.init = function () {
            this.setValue(Common.getRandomNumber(1, 50) + 1);
            this.PosX = 0;
            this.PosY = 0;
        };
        Block.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return Block;
    }(Laya.Sprite));
    sprite.Block = Block;
})(sprite || (sprite = {}));
//# sourceMappingURL=Block.js.map