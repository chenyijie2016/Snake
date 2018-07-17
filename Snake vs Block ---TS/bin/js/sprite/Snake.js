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
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Snake.prototype.init = function () {
            this.length = 1;
            this.bodyPosX = new Array();
            this.bodyPosY = new Array();
            this.bodyPosX.push(GameMain.width / 2);
            this.bodyPosY.push(GameMain.height / 2);
        };
        Snake.prototype.updateBody = function () {
            for (var i = 1; i < this.length; i++) {
                var XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
                if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
                    this.bodyPosX[i] += XDifference / 2;
                }
                else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
                    this.bodyPosX[i] -= XDifference / 2;
                }
                var YDifference = 5;
                if (8 * 8 - Math.pow(XDifference, 2) / 4 > 0) {
                    YDifference = Math.sqrt(18 * 18 - Math.pow(XDifference, 2) / 4);
                }
                this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
            }
            this.showBody();
        };
        Snake.prototype.addBody = function (parts) {
            var lastPosX = this.bodyPosX[this.length - 1];
            this.length += parts;
            for (var i = 0; i < parts; i++) {
                this.bodyPosX.push(lastPosX);
                this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + 15);
            }
        };
        Snake.prototype.showBody = function () {
            this.graphics.clear();
            for (var i = 0; i < this.length; i++) {
                this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], 12, '#FFFF00');
            }
        };
        Snake.prototype.moveLeft = function (level) {
            switch (level) {
                case 0:
                    this.bodyPosX[0] -= 8;
                    break;
                case 1:
                    this.bodyPosX[0] -= 18;
                    break;
                case 2:
                    this.bodyPosX[0] -= 24;
                    break;
                case 3:
                    this.bodyPosX[0] -= 32;
                    break;
                case 4:
                    this.bodyPosX[0] -= 40;
                    break;
            }
            if (this.bodyPosX[0] < 0) {
                this.bodyPosX[0] = 6;
            }
        };
        Snake.prototype.moveRight = function (level) {
            switch (level) {
                case 0:
                    this.bodyPosX[0] += 8;
                    break;
                case 1:
                    this.bodyPosX[0] += 18;
                    break;
                case 2:
                    this.bodyPosX[0] += 24;
                    break;
                case 3:
                    this.bodyPosX[0] += 32;
                    break;
                case 4:
                    this.bodyPosX[0] += 40;
                    break;
            }
            if (this.bodyPosX[0] > GameMain.width) {
                this.bodyPosX[0] = GameMain.width - 6;
            }
        };
        return Snake;
    }(Laya.Sprite));
    sprite.Snake = Snake;
})(sprite || (sprite = {}));
//# sourceMappingURL=Snake.js.map