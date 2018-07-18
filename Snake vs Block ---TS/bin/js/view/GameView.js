/**Created by the LayaAirIDE*/
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
var view;
(function (view) {
    var GameView = /** @class */ (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            var _this = _super.call(this) || this;
            /* for debug */
            _this.debugInfo = new Laya.Text();
            _this.debugInfo.width = 300;
            _this.debugInfo.font = "SimSun";
            _this.debugInfo.fontSize = 20;
            _this.debugInfo.color = "white";
            _this.addChild(_this.debugInfo);
            _this.blocks = new Array();
            return _this;
        }
        GameView.prototype.startGame = function () {
            this.gameScrollSpeed = 3;
            this.snake = new sprite.Snake();
            Laya.stage.addChild(this.snake);
            this.lastMouseX = Laya.stage.mouseX;
            this.snake.pos(0, 0);
            Laya.timer.frameLoop(1, this, this.mainLoop); // Every Frame
            this.snake.extendBody(25);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.timer.frameLoop(300, this, this.updateGameStatus); //每300帧添加进行游戏状态更新，添加方块
        };
        GameView.prototype.onMouseDown = function () {
            this.mouseDown = true;
        };
        GameView.prototype.onMouseUp = function () {
            this.mouseDown = false;
            this.debugInfo.text = 'mouseup';
        };
        // The Main Loop for the game 
        GameView.prototype.mainLoop = function () {
            this.detectMouseMove();
            this.snake.updateBody();
            this.updateBlocks();
        };
        // 检测触点移动情况
        GameView.prototype.detectMouseMove = function () {
            var currentMouseX = Laya.stage.mouseX;
            //this.debugInfo.text = Math.abs(currentMouseX - this.lastMouseX).toString();
            if (this.mouseDown) {
                var level = 1;
                if (Math.abs(currentMouseX - this.lastMouseX) > 20) {
                    level = 40;
                }
                else {
                    level = Math.abs(currentMouseX - this.lastMouseX) * 2;
                }
                if (currentMouseX < this.lastMouseX) {
                    this.snake.moveLeft(level);
                }
                else if (currentMouseX > this.lastMouseX) {
                    this.snake.moveRight(level);
                }
            }
            this.lastMouseX = currentMouseX;
        };
        // 是否是正在正面碰撞
        GameView.prototype.isDirectCollision = function () {
            return false;
        };
        // 更新游戏状态
        GameView.prototype.updateGameStatus = function () {
            var blockNumber = Common.getRandomNumber(0, 5);
            if (blockNumber > 0) {
                var orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], blockNumber);
                for (var i = 0; i < blockNumber; i++) {
                    var b = new sprite.Block();
                    b.setPos(orders[i] * 82.8 + 45, 0);
                    this.blocks.push(b);
                    this.addChildren(b);
                }
            }
        };
        // 更新碰撞检测信息
        GameView.prototype.updateCollisionDetection = function () {
        };
        // 更新方块状态
        GameView.prototype.updateBlocks = function () {
            var _this = this;
            this.blocks.forEach(function (block) {
                if (!_this.isDirectCollision()) {
                    block.PosY += _this.gameScrollSpeed;
                    block.update();
                }
                if (block.PosY > Const.SCREEN_HEIGHT) {
                    block.destory();
                    console.log('destory block');
                    _this.blocks.splice(_this.blocks.indexOf(block), 1);
                }
            });
        };
        return GameView;
    }(ui.GameViewUI));
    view.GameView = GameView;
})(view || (view = {}));
//# sourceMappingURL=GameView.js.map