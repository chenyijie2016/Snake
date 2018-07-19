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
            _this.debugInfo.font = "Hei";
            _this.debugInfo.fontSize = 20;
            _this.debugInfo.color = "white";
            _this.addChild(_this.debugInfo);
            _this.blocks = new Array();
            _this.snakeAdds = new Array();
            return _this;
        }
        GameView.prototype.setDebugInfo = function (msg) {
            this.debugInfo.text = msg;
        };
        GameView.prototype.startGame = function () {
            this.gameScrollSpeed = 3;
            this.snake = new sprite.Snake();
            Laya.stage.addChild(this.snake);
            this.lastMouseX = Laya.stage.mouseX;
            this.snake.pos(0, 0);
            Laya.timer.frameLoop(1, this, this.mainLoop, null, false); // Every Frame
            this.snake.extendBody(15);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            // Laya.timer.frameLoop(100, this, this.updateBlocksStatus);//每300帧添加进行游戏状态更新，添加Block
            Laya.timer.frameOnce(100, this, this.updateBlocksStatus); //每个随机帧数添加进行游戏状态更新，添加Block
            Laya.timer.frameOnce(80, this, this.updateSnakeAddsStatus); //每个随机帧添加进行游戏状态更新，添加SnakeAdd
            Laya.timer.frameLoop(300, this.snake, this.snake.updateHeadHistory);
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
            console.log('--Main Loop begin---');
            this.detectMouseMove();
            this.snake.updateBody();
            this.updateBlocks();
            this.updateSnakeAdds();
            console.log('--Main Loop end---');
        };
        // 检测触点移动情况
        GameView.prototype.detectMouseMove = function () {
            var currentMouseX = Laya.stage.mouseX;
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
        // 更新方块集合Blocks
        GameView.prototype.updateBlocksStatus = function () {
            var blockNumber = Common.getRandomArrayElements(Const.BLOCK_NUMBERS, 1);
            if (blockNumber[0] > 0) {
                var orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], blockNumber[0]);
                for (var i = 0; i < blockNumber[0]; i++) {
                    var b = new sprite.Block();
                    b.setPos(orders[i] * 82.8 + 41, 0);
                    this.blocks.push(b);
                    this.addChildren(b);
                }
            }
            var nextTimeNewBlocks = Common.getRandomArrayElements(Const.BLOCK_NEWTIMES, 1);
            Laya.timer.frameOnce(nextTimeNewBlocks[0], this, this.updateBlocksStatus); //每个随机帧数添加进行游戏状态更新，添加Block
        };
        // 更新Grow集合SnakeAdds
        GameView.prototype.updateSnakeAddsStatus = function () {
            var snakeAddNumber = Common.getRandomArrayElements(Const.SNAKE_ADD_NUMBERS, 1);
            if (snakeAddNumber[0] > 0) {
                var orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], snakeAddNumber[0]);
                for (var i = 0; i < snakeAddNumber[0]; i++) {
                    var add = new sprite.SnakeAdd();
                    add.setPos(orders[i] * 82.8 + 41, 0);
                    this.snakeAdds.push(add);
                    this.addChildren(add);
                }
            }
            var nextTimeNewAdds = Common.getRandomArrayElements(Const.SNAKE_ADD_NEWTIMES, 1);
            Laya.timer.frameOnce(50, this, this.updateSnakeAddsStatus); //每个随机帧添加进行游戏状态更新，添加SnakeAdd	
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
        // 更新SnakeAdd状态
        GameView.prototype.updateSnakeAdds = function () {
            var _this = this;
            this.snakeAdds.forEach(function (snakeAdd) {
                if (!_this.isDirectCollision()) {
                    snakeAdd.PosY += _this.gameScrollSpeed;
                    snakeAdd.update();
                }
                if (snakeAdd.PosY > Const.SCREEN_HEIGHT) {
                    snakeAdd.destory();
                    console.log('destory snakeAdd');
                    _this.snakeAdds.splice(_this.snakeAdds.indexOf(snakeAdd), 1);
                }
            });
        };
        return GameView;
    }(ui.GameViewUI));
    view.GameView = GameView;
})(view || (view = {}));
//# sourceMappingURL=GameView.js.map