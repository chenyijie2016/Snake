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
            _this.graphics.clipRect(0, 0, Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT);
            _this.bodyPosX = new Array();
            _this.bodyPosY = new Array();
            _this.headPosXHistory = new Array();
            _this.eachBodyColor = new Array();
            for (var i = 0; i < 300; i++) {
                _this.headPosXHistory.push(207);
            }
            _this.init();
            return _this;
        }
        Snake.prototype.init = function () {
            // 默认长度为1，放在屏幕正中间
            this.state = Const.SNAKE_STATE_NORMAL;
            this.length = 1;
            this.bodyPosX.push(Const.SCREEN_WIDTH / 2);
            this.bodyPosY.push(Const.SCREEN_HEIGHT / 2);
            this.superTime = Const.SNAKE_SUPER_TIME;
        };
        Snake.prototype.setBodyColor = function (color) {
            this.bodyColor = color;
        };
        Snake.prototype.setState = function (state) {
            this.state = state;
        };
        Snake.prototype.updateHeadHistory = function () {
            // 每300帧刷新一下headPosXHistory数组
            this.headPosXHistory = this.headPosXHistory.slice(0, 300);
        };
        Snake.prototype.updateBody = function () {
            this.headPosXHistory.unshift(this.bodyPosX[0]);
            var rate = Const.SNAKE_BODY_RADIUS * 2 / Const.GAME_SCROLL_SPEED;
            var Len = 0;
            var i = 0;
            var j = 0;
            var DiffY = Const.GAME_SCROLL_SPEED;
            // 根据历史坐标求移动长度，每达到一段蛇身长度就将该段蛇身的位置进行更新
            while (i < this.length && i < Const.SNAKE_MAX_PARTS && j < 240) {
                j++;
                Len += Math.sqrt(Math.pow(Math.abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]), 2) + Math.pow(DiffY, 2));
                while (Len > Const.SNAKE_BODY_DEFALUT_SPACING) {
                    i++;
                    Len -= Const.SNAKE_BODY_DEFALUT_SPACING;
                    if (Math.abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]) > Const.SNAKE_BODY_DEFALUT_SPACING) {
                        if (this.headPosXHistory[j] < this.headPosXHistory[j - 1]) {
                            this.bodyPosX[i] = this.headPosXHistory[j - 1] - 20;
                            this.bodyPosY[i] = this.bodyPosY[i - 1] + 3;
                        }
                        else {
                            this.bodyPosX[i] = this.headPosXHistory[j - 1] + 20;
                            this.bodyPosY[i] = this.bodyPosY[i - 1] + 3;
                        }
                    }
                    else {
                        this.bodyPosX[i] = this.headPosXHistory[j];
                        this.bodyPosY[i] = this.bodyPosY[i - 1] + Math.sqrt(Math.pow(Const.SNAKE_BODY_DEFALUT_SPACING, 2) - Math.pow(Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]), 2));
                    }
                }
            }
            //this.showBody();
            // for (let i = 1; i < this.length && i <= 15; i++) {
            //     let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
            //     if (XDifference > Const.SNAKE_BODY_RADIUS * 2) {
            //         //this.concatBody();
            //         // return;
            //     }
            //     if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
            //         this.bodyPosX[i] += XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
            //         this.bodyPosX[i] -= XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
            //     if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2 > 0) {
            //         YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2);
            //     }
            //     this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
            //     //this.showBody();
            // }
        };
        // 延长蛇身
        Snake.prototype.extendBody = function (parts) {
            if (Const.GAME_MODE === "normalMode") {
                var lastPosX = this.bodyPosX[this.length - 1];
                this.length += parts;
                for (var i = 0; i < parts; i++) {
                    this.bodyPosX.push(lastPosX);
                    this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + Const.SNAKE_BODY_DEFALUT_SPACING);
                }
            }
            else if (Const.GAME_MODE === "colorMode") {
                var lastPosX = this.bodyPosX[this.length - 1];
                this.length += 1;
                this.bodyPosX.push(lastPosX);
                this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + Const.SNAKE_BODY_DEFALUT_SPACING);
            }
        };
        //显示蛇身
        Snake.prototype.showBody = function () {
            this.graphics.clear();
            //console.log('show body', this.bodyPosX);
            this.graphics.fillText(this.length.toString(), this.bodyPosX[0], this.bodyPosY[0] - 35, '20px Arial', '#FFFFFF', 'center');
            switch (this.state) {
                case Const.SNAKE_STATE_SHIELD: {
                    this.bodyColor = "red";
                    break;
                }
                case Const.SNAKE_STATE_SUPER: {
                    this.bodyColor = Common.getRandomArrayElements(["red", "yellow"], 1)[0];
                    break;
                }
                case Const.SNAKE_STATE_NORMAL: {
                    this.bodyColor = "#FFFF00";
                    break;
                }
                default: {
                    this.bodyColor = "#FFFF00";
                    break;
                }
            }
            for (var i = 0; i < this.length && i < Const.SNAKE_MAX_PARTS; i++) {
                // Using Skin !!!
                // this is just a demo
                this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], Const.SNAKE_BODY_RADIUS, this.bodyColor);
                // TODO: Using other image
            }
        };
        // 向左移动
        Snake.prototype.moveLeft = function (level) {
            if (this.bodyPosX[0] - level < Const.SNAKE_BODY_RADIUS) {
                this.bodyPosX[0] = Const.SNAKE_BODY_RADIUS;
            }
            else
                this.bodyPosX[0] -= level;
        };
        // 向右移动
        Snake.prototype.moveRight = function (level) {
            if (this.bodyPosX[0] + level > Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS) {
                this.bodyPosX[0] = Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS;
            }
            else
                this.bodyPosX[0] += level;
        };
        return Snake;
    }(Laya.Sprite));
    sprite.Snake = Snake;
})(sprite || (sprite = {}));
//# sourceMappingURL=Snake.js.map