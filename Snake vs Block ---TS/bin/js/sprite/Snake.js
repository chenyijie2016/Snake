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
            _this.bodyPosX = new Array();
            _this.bodyPosY = new Array();
            _this.headPosXHistory = new Array();
            for (var i = 0; i < 300; i++) {
                _this.headPosXHistory.push(207);
            }
            _this.init();
            return _this;
        }
        Snake.prototype.init = function () {
            this.length = 1;
            this.bodyPosX.push(Const.SCREEN_WIDTH / 2);
            this.bodyPosY.push(Const.SCREEN_HEIGHT / 2);
        };
        // public updateHead(): void {
        //     for (let i = 1; i < this.length; i++) {
        //         let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
        //         if (XDifference > 20) {
        //             this.bodyPosY[i] = this.bodyPosY[i - 1] + Const.SNAKE_BODY_MINIUM_SPACING;
        //             if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
        //                 this.bodyPosX[i] += (XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - Const.SNAKE_BODY_MINIUM_SPACING ** 2))
        //             }
        //             else {
        //                 this.bodyPosX[i] -= XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - Const.SNAKE_BODY_MINIUM_SPACING ** 2)
        //             }
        //         }
        //         else {
        //             let YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2);
        //             this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
        //             if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
        //                 this.bodyPosX[i] += (XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - YDifference ** 2))
        //             }
        //             else {
        //                 this.bodyPosX[i] -= XDifference - Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - YDifference ** 2)
        //             }
        //         }
        //     }
        // }
        Snake.prototype.updateHeadHistory = function () {
            this.headPosXHistory = this.headPosXHistory.slice(0, 300);
        };
        Snake.prototype.updateBody = function () {
            console.log('update body');
            this.headPosXHistory.unshift(this.bodyPosX[0]);
            var rate = Const.SNAKE_BODY_RADIUS * 2 / GameMain.gameView.gameScrollSpeed;
            //GameMain.gameView.setDebugInfo(rate.toString());
            //console.log(this.headPosXHistory);
            var floor = Math.floor;
            var abs = Math.abs;
            var Len = 0;
            var i = 0;
            var j = 0;
            var DiffY = GameMain.gameView.gameScrollSpeed;
            while (i < this.length && j < 240) {
                j++;
                Len += Math.sqrt(Math.pow(abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]), 2) + Math.pow(DiffY, 2));
                while (Len > Const.SNAKE_BODY_DEFALUT_SPACING) {
                    i++;
                    Len -= Const.SNAKE_BODY_DEFALUT_SPACING;
                    if (abs(this.headPosXHistory[j] - this.headPosXHistory[j - 1]) > Const.SNAKE_BODY_DEFALUT_SPACING) {
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
                        this.bodyPosY[i] = this.bodyPosY[i - 1] + Math.sqrt(Math.pow(Const.SNAKE_BODY_DEFALUT_SPACING, 2) - Math.pow(abs(this.bodyPosX[i] - this.bodyPosX[i - 1]), 2));
                    }
                }
            }
            this.showBody();
            // for (let i = 1; i < this.length; i++) {
            //     let XDifference = Math.abs(this.bodyPosX[i] - this.headPosXHistory[floor(i * rate)]);
            //     if (XDifference > Const.SNAKE_BODY_RADIUS * 2) {
            //         //this.concatBody();
            //         // return;
            //     }
            //     if (this.bodyPosX[i] < this.headPosXHistory[floor(i * rate)]) {
            //         this.bodyPosX[i] += XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     else if (this.bodyPosX[i] > this.headPosXHistory[floor(i * rate)]) {
            //         this.bodyPosX[i] -= XDifference / Const.SNAKE_FLEXIBILITY;
            //     }
            //     let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
            //     if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2 > 0) {
            //         YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2);
            //     }
            //     this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
            //     this.showBody();
            // }
        };
        // private concatBody(): void {
        //     for (let i = 1; i < this.length; i++) {
        //         let XDifference = Math.abs(this.bodyPosX[i] - this.bodyPosX[i - 1]);
        //         if (this.bodyPosX[i] < this.bodyPosX[i - 1]) {
        //             this.bodyPosX[i] += XDifference / Const.SNAKE_FLEXIBILITY;
        //         }
        //         else if (this.bodyPosX[i] > this.bodyPosX[i - 1]) {
        //             this.bodyPosX[i] -= XDifference / Const.SNAKE_FLEXIBILITY;
        //         }
        //         let YDifference = Const.SNAKE_BODY_MINIUM_SPACING;
        //         if (Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2 > 0) {
        //             YDifference = Math.sqrt(Const.SNAKE_BODY_DEFALUT_SPACING ** 2 - XDifference ** 2 / Const.SNAKE_FLEXIBILITY ** 2);
        //         }
        //         this.bodyPosY[i] = this.bodyPosY[i - 1] + YDifference;
        //         //this.showBody();
        //     }
        // }
        Snake.prototype.extendBody = function (parts) {
            var lastPosX = this.bodyPosX[this.length - 1];
            this.length += parts;
            for (var i = 0; i < parts; i++) {
                this.bodyPosX.push(lastPosX);
                this.bodyPosY.push(this.bodyPosY[this.bodyPosY.length - 1] + Const.SNAKE_BODY_DEFALUT_SPACING);
            }
        };
        Snake.prototype.showBody = function () {
            this.graphics.clear();
            console.log('show body', this.bodyPosX);
            this.graphics.fillText(this.length.toString(), this.bodyPosX[0], this.bodyPosY[0] - 35, '20px Arial', '#FFFFFF', 'center');
            for (var i = 0; i < this.length; i++) {
                // Using Skin !!!
                // this is just a demo
                this.graphics.drawCircle(this.bodyPosX[i], this.bodyPosY[i], Const.SNAKE_BODY_RADIUS, '#FFFF00');
                // TODO: Using other image
            }
        };
        Snake.prototype.moveLeft = function (level) {
            this.bodyPosX[0] -= level;
            if (this.bodyPosX[0] < 0) {
                this.bodyPosX[0] = Const.SNAKE_BODY_RADIUS;
            }
        };
        Snake.prototype.moveRight = function (level) {
            this.bodyPosX[0] += level;
            if (this.bodyPosX[0] > Const.SCREEN_WIDTH) {
                this.bodyPosX[0] = Const.SCREEN_WIDTH - Const.SNAKE_BODY_RADIUS;
            }
        };
        return Snake;
    }(Laya.Sprite));
    sprite.Snake = Snake;
})(sprite || (sprite = {}));
//# sourceMappingURL=Snake.js.map