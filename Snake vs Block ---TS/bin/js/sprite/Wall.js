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
    (this.PosX - Const.BLOCK_WIDTH / 2 + Const.WALL_WIDTH / 2,  this.PosY - Const.BLOCK_WIDTH / 2 + this.len / 2)
*/
var sprite;
(function (sprite) {
    var Wall = /** @class */ (function (_super) {
        __extends(Wall, _super);
        function Wall() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Wall.prototype.centerPosX = function () { return this.PosX - Const.BLOCK_WIDTH / 2 + Const.WALL_WIDTH / 2; };
        Wall.prototype.centerPoSY = function () { return this.PosY - Const.BLOCK_WIDTH / 2 + this.len / 2; };
        Wall.prototype.isVisible = function () {
            return this.visible;
        };
        Wall.prototype.setPos = function (x, y) {
            this.PosX = x;
            this.PosY = y;
        };
        Wall.prototype.setVisible = function () {
            this.visible = true;
        };
        Wall.prototype.hidden = function () {
            this.visible = false;
        };
        Wall.prototype.setLength = function (value) {
            this.len = value;
        };
        Wall.prototype.update = function () {
            this.graphics.clear();
            //TODO :draw Wall
            if (this.visible) {
                var path = [
                    ["moveTo", Const.WALL_RADIUS, 0],
                    ["arcTo", Const.WALL_WIDTH, 0, Const.WALL_WIDTH, Const.WALL_RADIUS, Const.WALL_RADIUS],
                    ["arcTo", Const.WALL_WIDTH, this.len, Const.WALL_WIDTH - Const.WALL_RADIUS, this.len, Const.WALL_RADIUS],
                    ["arcTo", 0, this.len, 0, this.len - Const.WALL_RADIUS, Const.WALL_RADIUS],
                    ["arcTo", 0, 0, Const.WALL_RADIUS, 0, Const.WALL_RADIUS],
                ];
                this.graphics.drawPath(this.PosX - Const.BLOCK_WIDTH / 2, this.PosY - Const.BLOCK_WIDTH / 2, path, { fillStyle: "white" });
            }
        };
        Wall.prototype.init = function () {
            this.setLength(Common.getRandomArrayElements([101, 101, 101, 180, 180], 1)[0]);
            this.PosX = 0;
            this.PosY = 0;
        };
        Wall.prototype.destory = function () {
            _super.prototype.removeSelf.call(this);
        };
        return Wall;
    }(Laya.Sprite));
    sprite.Wall = Wall;
})(sprite || (sprite = {}));
//# sourceMappingURL=Wall.js.map