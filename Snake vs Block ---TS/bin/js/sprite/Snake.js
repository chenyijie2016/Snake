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
                if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
                    this.bodyPosX[i] += Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]) / 2;
                }
                else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
                    this.bodyPosX[i] -= Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]) / 2;
                }
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
        Snake.prototype.moveLeft = function () {
            this.bodyPosX[0] -= 12;
            if (this.bodyPosX[0] < 0) {
                this.bodyPosX[0] = 6;
            }
        };
        Snake.prototype.moveRight = function () {
            this.bodyPosX[0] += 12;
            if (this.bodyPosX[0] > GameMain.width) {
                this.bodyPosX[0] = GameMain.width - 6;
            }
        };
        return Snake;
    }(Laya.Sprite));
    sprite.Snake = Snake;
})(sprite || (sprite = {}));
//# sourceMappingURL=Snake.js.map