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
                    // TODO :refactor
                    if (GameMain.mode === GameMode.Normal) {
                        GameMain.gameView.score++;
                        GameMain.gameView.snake.length--;
                    }
                    else if (GameMain.mode === GameMode.Color) {
                        GameMain.gameColorMode.score++;
                        GameMain.gameColorMode.snake.length--;
                    }
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
                if (this.state === Const.BLOCK_STATE_NORMAL && GameMain.mode === GameMode.Normal) {
                    this.graphics.fillText(this.value.toString(), this.PosX - 3 * (Xoffset - 1), this.PosY - 15, '30px Arial', '#000000', 'center');
                }
                else if (this.state === Const.BLOCK_STATE_SPECIAL && GameMain.mode === GameMode.Normal) {
                    this.graphics.fillText(this.value.toString(), this.PosX - 3 * (Xoffset - 1), this.PosY - 35, '30px Arial', '#000000', 'center');
                    var starPath = [0, 0, 5, 10, 16, 10, 6, 16, 11, 27, 0, 21, -11, 27, -6, 16, -16, 10, -5, 10];
                    this.graphics.drawPoly(this.PosX - 3 * (Xoffset - 1), this.PosY, starPath, "black");
                }
            }
        };
        Block.prototype.getBlockColor = function () {
            if (GameMain.mode === GameMode.Normal) {
                var blockValue = this.value;
                if (blockValue > 50) {
                    blockValue = 51;
                }
                var rgb = Const.BLOCK_COLORS[blockValue - 1];
                return Common.rgbToHex(rgb);
            }
            else if (GameMain.mode === GameMode.Color) {
                var blockValue = this.value;
                var rgb = Const.COLORS_COLORMODE[blockValue - 1];
                return Common.rgbToHex(rgb);
            }
        };
        Block.prototype.setState = function (state) {
            this.state = state;
            if (this.state === Const.BLOCK_STATE_SPECIAL) {
                this.value = Common.getRandomArrayElements(Const.BLOCK_SPECIAL_VALUE, 1)[0];
            }
        };
        Block.prototype.init = function () {
            this.state = Const.BLOCK_STATE_NORMAL;
            if (GameMain.mode === GameMode.Normal) {
                this.setValue(Common.getRandomNumber(1, 50));
            }
            else if (GameMain.mode === GameMode.Color) {
                this.setValue(Common.getRandomNumber(1, 4));
            }
            //this.setState(Const.BLOCK_STATE_SPECIAL);
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