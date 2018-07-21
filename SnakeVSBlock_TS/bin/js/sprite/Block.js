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
            _this.decreaseCount = 0;
            _this.init();
            return _this;
        }
        Block.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
        };
        Block.prototype.getValue = function () {
            return this.value;
        };
        Block.prototype.setValue = function (value) {
            this.value = value;
        };
        Block.prototype.decreaseValue = function () {
            this.decreaseCount++;
            if (this.decreaseCount === Const.BLOCK_DECREASE_SPEED) {
                this.decreaseCount = 0;
                if (this.value > 0) {
                    this.value--;
                    GameMain.gameView.score++;
                    GameMain.gameView.snake.length--;
                }
                if (this.value === 0)
                    return false;
            }
            return true;
        };
        Block.prototype.update = function () {
            this.graphics.clear();
            if (this.visible) {
                var path = [
                    ["moveTo", Const.BLOCK_RADIUS, 0],
                    ["arcTo", Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", Const.BLOCK_WIDTH, Const.BLOCK_WIDTH, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_WIDTH, Const.BLOCK_RADIUS],
                    ["arcTo", 0, Const.BLOCK_WIDTH, 0, Const.BLOCK_WIDTH - Const.BLOCK_RADIUS, Const.BLOCK_RADIUS],
                    ["arcTo", 0, 0, Const.BLOCK_RADIUS, 0, Const.BLOCK_RADIUS],
                ];
                this.graphics.drawPath(this.PosX - Const.BLOCK_WIDTH / 2, this.PosY - Const.BLOCK_WIDTH / 2, path, { fillStyle: this.getBlockColor() });
                var Xoffset = 1;
                if (this.value > 0)
                    Xoffset = Math.floor(Math.log(this.value) / Math.log(10)) + 1;
                this.graphics.fillText(this.value.toString(), this.PosX - 3 * (Xoffset - 1), this.PosY - 15, '30px Arial', '#000000', 'center');
            }
        };
        Block.prototype.getBlockColor = function () {
            var blockValue = this.value;
            if (blockValue > 50) {
                blockValue = 51;
            }
            var rgb = Const.BLOCK_COLORS[blockValue - 1];
            return Common.rgbToHex(rgb);
        };
        Block.prototype.init = function () {
            this.setValue(Common.getRandomNumber(1, 50));
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