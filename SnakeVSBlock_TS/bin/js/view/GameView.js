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
            _this.gameScrollSpeed = 4;
            _this.directCollision = false;
            _this.score = 0;
            /* for debug */
            _this.debugInfo = new Laya.Text();
            _this.debugInfo.width = 300;
            _this.debugInfo.font = "Hei";
            _this.debugInfo.fontSize = 20;
            _this.debugInfo.color = "white";
            _this.addChild(_this.debugInfo);
            _this.scoreDisplay = new Laya.Text();
            _this.scoreDisplay.width = 100;
            _this.scoreDisplay.pos(Const.SCREEN_WIDTH - 25, 0);
            _this.scoreDisplay.font = 'Arial';
            _this.scoreDisplay.fontSize = 40;
            _this.scoreDisplay.color = "white";
            _this.scoreDisplay.text = _this.score.toString();
            _this.snake = new sprite.Snake();
            _this.blocks = new Array();
            _this.latestBlocks = new Array();
            _this.snakeAdds = new Array();
            _this.latestSnakeAdds = new Array();
            _this.walls = new Array();
            _this.shields = new Array();
            return _this;
        }
        GameView.prototype.setDebugInfo = function (msg) {
            this.debugInfo.text = msg;
        };
        GameView.prototype.startGame = function () {
            this.addChild(this.scoreDisplay);
            this.score = 0;
            this.nextTimeNewAdds = undefined;
            this.nextTimeNewBlocks = undefined;
            GameMain.status = GameStatus.Underway;
            this.snake.bodyPosX[0] = Const.SCREEN_WIDTH / 2;
            this.snake.length = 1;
            this.snake.bodyPosY[0] = Const.SCREEN_HEIGHT / 2;
            Laya.stage.addChild(this.snake);
            Laya.timer.frameLoop(1, this, this.mainLoop, null, false); // Every Frame
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            // Laya.timer.frameLoop(100, this, this.updateBlocksStatus);//每300帧添加进行游戏状态更新，添加Block
            Laya.timer.frameOnce(100, this, this.updateBlocks_WALLStatus); //第一个100帧添加进行游戏状态更新，添加Block、Wall
            Laya.timer.frameOnce(80, this, this.updateSnakeAddsStatus); //第一个80帧帧添加进行游戏状态更新，添加SnakeAdd
            Laya.timer.frameLoop(300, this.snake, this.snake.updateHeadHistory);
            //Laya.timer.frameLoop(2, this.snake, this.snake.showBody);
        };
        GameView.prototype.onMouseDown = function () {
            this.mouseDown = true;
            this.lastMouseX = Laya.stage.mouseX;
        };
        GameView.prototype.onMouseUp = function () {
            this.mouseDown = false;
            this.debugInfo.text = 'mouseup';
        };
        GameView.prototype.updateScore = function () {
            this.scoreDisplay.text = this.score.toString();
            if (this.score > 0) {
                var offset = Math.floor(Math.log(this.score) / Math.log(10));
                this.scoreDisplay.pos(Const.SCREEN_WIDTH - 25 * (offset + 1), 0);
            }
            else {
                this.scoreDisplay.pos(Const.SCREEN_WIDTH - 25, 0);
            }
        };
        // The Main Loop for the game 
        GameView.prototype.mainLoop = function () {
            this.updateScore();
            this.detectMouseMove();
            this.snake.updateBody();
            this.snake.showBody();
            this.updateBlocks();
            this.updateSnakeAdds();
            this.updateShields();
            this.updateWalls();
            this.updateCollisionDetection();
            // 更新方块集合Blocks
            if (this.nextTimeNewBlocks === undefined) {
            }
            else {
                if (this.nextTimeNewBlocks == 0) {
                    this.updateBlocks_WALLStatus();
                }
                else {
                    if (!this.isDirectCollision())
                        this.nextTimeNewBlocks--;
                }
            }
            // 更新Grow集合SnakeAdds 
            if (this.nextTimeNewAdds === undefined) {
            }
            else {
                if (this.nextTimeNewAdds == 0) {
                    this.updateSnakeAddsStatus();
                }
                else {
                    if (!this.isDirectCollision())
                        this.nextTimeNewAdds--;
                }
            }
        };
        // 检测触点移动情况
        GameView.prototype.detectMouseMove = function () {
            var _this = this;
            var currentMouseX = Laya.stage.mouseX;
            if (this.mouseDown) {
                var level_1 = 1;
                if (Math.abs(currentMouseX - this.lastMouseX) > 20) {
                    level_1 = 40;
                }
                else {
                    level_1 = Math.abs(currentMouseX - this.lastMouseX) * 2;
                }
                var direction_1;
                if (currentMouseX < this.lastMouseX)
                    direction_1 = 'left';
                else if (currentMouseX > this.lastMouseX)
                    direction_1 = 'right';
                this.blocks.forEach(function (block) {
                    if (block.PosY > _this.snake.bodyPosY[0] - Const.BLOCK_WIDTH / 2 - Const.SNAKE_BODY_RADIUS
                        && block.PosY < _this.snake.bodyPosY[0] + Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS) {
                        switch (direction_1) {
                            case 'left': {
                                if (block.PosX < _this.snake.bodyPosX[0] // 方块在蛇头左侧
                                    && Math.abs(block.PosX - _this.snake.bodyPosX[0]) < level_1 + Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS // 超出范围
                                ) {
                                    level_1 = Math.min(level_1, Math.abs(block.PosX - _this.snake.bodyPosX[0]) - (Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS));
                                }
                                break;
                            }
                            case 'right': {
                                if (block.PosX > _this.snake.bodyPosX[0] // 方块在蛇头左侧
                                    && Math.abs(block.PosX - _this.snake.bodyPosX[0]) < level_1 + Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS // 超出范围
                                ) {
                                    level_1 = Math.min(level_1, Math.abs(block.PosX - _this.snake.bodyPosX[0]) - (Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS));
                                }
                                break;
                            }
                        }
                    }
                });
                this.walls.forEach(function (wall) {
                    if (wall.centerPoSY() + wall.len / 2 > _this.snake.bodyPosY[0]
                        && wall.centerPoSY() - wall.len / 2 < _this.snake.bodyPosY[0]) {
                        switch (direction_1) {
                            case 'left': {
                                if (wall.centerPosX() < _this.snake.bodyPosX[0]
                                    && Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) < Const.WALL_WIDTH / 2 + Const.SNAKE_BODY_RADIUS + level_1) {
                                    level_1 = Math.min(level_1, Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) - Const.WALL_WIDTH / 2 - Const.SNAKE_BODY_RADIUS);
                                }
                            }
                            case 'right': {
                                if (wall.centerPosX() > _this.snake.bodyPosX[0]
                                    && Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) < Const.WALL_WIDTH / 2 + Const.SNAKE_BODY_RADIUS + level_1) {
                                    level_1 = Math.min(level_1, Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) - Const.WALL_WIDTH / 2 - Const.SNAKE_BODY_RADIUS);
                                }
                            }
                        }
                    }
                });
                switch (direction_1) {
                    case 'left':
                        this.snake.moveLeft(level_1);
                        break;
                    case 'right':
                        this.snake.moveRight(level_1);
                        break;
                }
            }
            this.lastMouseX = currentMouseX;
        };
        // 是否是正在正面碰撞
        GameView.prototype.isDirectCollision = function () {
            return this.directCollision;
        };
        // 更新方块集合Blocks、隔板集合Walls
        GameView.prototype.updateBlocks_WALLStatus = function () {
            //添加隔板
            var wallNumber = Common.getRandomArrayElements(Const.WALL_NUMBERS, 1);
            if (wallNumber[0] > 0) {
                var orders = Common.getRandomArrayElements([1, 2, 3, 4], wallNumber[0]);
                for (var i = 0; i < wallNumber[0]; i++) {
                    var w = new sprite.Wall();
                    w.setPos(orders[i] * 82.8 + 37.2, -Const.BLOCK_WIDTH * 3 - 1.5);
                    this.walls.push(w);
                    this.addChildren(w);
                }
            }
            var blockNumber = Common.getRandomArrayElements(Const.BLOCK_NUMBERS, 1);
            if (blockNumber[0] > 0) {
                var orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], blockNumber[0]);
                this.latestBlocks.splice(0, this.latestBlocks.length); //清空
                for (var i = 0; i < blockNumber[0]; i++) {
                    var b = new sprite.Block();
                    b.setPos(orders[i] * 82.8 + 41, -Const.BLOCK_WIDTH * 4);
                    //检测当前位置是否存在SnakeAdd
                    var Flag = false;
                    for (var j = 0; j < this.latestSnakeAdds.length; j++) {
                        var add = this.latestSnakeAdds[j];
                        var x1 = b.PosX;
                        var y1 = b.PosY;
                        var x2 = add.PosX;
                        var y2 = add.PosY;
                        var calx = x1 - x2;
                        var caly = y1 - y2;
                        var dis = Math.pow(calx * calx + caly * caly, 0.5);
                        if (dis <= (Const.BLOCK_MIN_CIRCLE_R + Const.SNAKE_BODY_RADIUS * 2)) {
                            b.destory();
                            Flag = true;
                            break;
                        }
                    }
                    if (Flag) {
                        continue;
                    }
                    //当前位置不存在SnakeAdd，则...
                    this.blocks.push(b);
                    this.latestBlocks.push(b);
                    this.addChildren(b);
                }
            }
            this.nextTimeNewBlocks = Common.getRandomArrayElements(Const.BLOCK_WALL_NEWTIMES, 1)[0];
        };
        // 更新Grow集合SnakeAdds、Shields
        GameView.prototype.updateSnakeAddsStatus = function () {
            var snakeAddNumber = Common.getRandomArrayElements(Const.SNAKE_ADD_NUMBERS, 1);
            var shield_order;
            if (snakeAddNumber[0] == 4) {
                shield_order = Common.getRandomNumber(0, snakeAddNumber[0] - 1);
            }
            if (snakeAddNumber[0] > 0) {
                var orders = Common.getRandomArrayElements([0, 1, 2, 3, 4], snakeAddNumber[0]);
                this.latestSnakeAdds.splice(0, this.latestSnakeAdds.length); //清空
                for (var i = 0; i < snakeAddNumber[0]; i++) {
                    var add = void 0;
                    if (snakeAddNumber[0] == 4 && i == shield_order) {
                        add = new sprite.Shield();
                    }
                    else {
                        add = new sprite.SnakeAdd();
                    }
                    add.setPos(orders[i] * 82.8 + 41, -Const.BLOCK_WIDTH * 4);
                    //检测当前位置是否存在Block
                    var Flag = false;
                    for (var j = 0; j < this.latestBlocks.length; j++) {
                        var block = this.latestBlocks[j];
                        var x1 = block.PosX;
                        var y1 = block.PosY;
                        var x2 = add.PosX;
                        var y2 = add.PosY;
                        var calx = x1 - x2;
                        var caly = y1 - y2;
                        var dis = Math.pow(calx * calx + caly * caly, 0.5);
                        if (dis <= (Const.BLOCK_MIN_CIRCLE_R + Const.SNAKE_BODY_RADIUS * 2)) {
                            add.destory();
                            Flag = true;
                            break;
                        }
                    }
                    if (Flag) {
                        continue;
                    }
                    //当前位置不存在Block，则...
                    if (snakeAddNumber[0] == 4 && i == shield_order) {
                        this.shields.push(add);
                    }
                    else {
                        this.snakeAdds.push(add);
                    }
                    this.latestSnakeAdds.push(add);
                    this.addChildren(add);
                }
            }
            this.nextTimeNewAdds = Common.getRandomArrayElements(Const.SNAKE_ADD_NEWTIMES, 1)[0];
        };
        // 更新碰撞检测信息
        GameView.prototype.updateCollisionDetection = function () {
            var _this = this;
            this.snakeAdds.forEach(function (snakeAdd) {
                if (Math.pow((snakeAdd.PosX - _this.snake.bodyPosX[0]), 2) + Math.pow((snakeAdd.PosY - _this.snake.bodyPosY[0]), 2)
                    < Math.pow(Const.SNAKE_BODY_RADIUS, 2) * 4) {
                    _this.snake.extendBody(snakeAdd.getValue());
                    snakeAdd.destory();
                    _this.snakeAdds.splice(_this.snakeAdds.indexOf(snakeAdd), 1);
                    Laya.SoundManager.playSound(Const.EAT_SNAKE_ADD_SOUND);
                }
            });
            this.shields.forEach(function (shield) {
                if (Math.pow((shield.PosX - _this.snake.bodyPosX[0]), 2) + Math.pow((shield.PosY - _this.snake.bodyPosY[0]), 2)
                    < Math.pow(Const.SNAKE_BODY_RADIUS, 2) * 4) {
                    Laya.SoundManager.playSound(Const.EAT_SHIELD_SOUND); //音效	
                    //TODO: change the body color of this.snake OR someother specile effect
                    _this.snake.setBodyColor('red');
                    shield.destory();
                    _this.shields.splice(_this.shields.indexOf(shield), 1);
                }
            });
            this.directCollision = false;
            this.blocks.forEach(function (block) {
                if (block.PosX - Const.BLOCK_WIDTH / 2 <= _this.snake.bodyPosX[0] + Const.SNAKE_BODY_RADIUS / 2
                    && block.PosX + Const.BLOCK_WIDTH / 2 >= _this.snake.bodyPosX[0] - Const.SNAKE_BODY_RADIUS / 2
                    && Math.abs(block.PosY - _this.snake.bodyPosY[0]) < (Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS + 1)
                    && block.PosY < _this.snake.bodyPosY[0]) {
                    if (_this.snake.bodyColor == 'red') {
                        _this.snake.setBodyColor('#FFFF00');
                        block.setValue(0);
                    }
                    _this.directCollision = true;
                    if (!block.decreaseValue()) {
                        var p = new sprite.ParticleCtn();
                        p.setPos(block.PosX, block.PosY);
                        p.update();
                        _this.addChild(p);
                        Laya.SoundManager.playSound(Const.BLOCK_BREAK); //音效
                        block.destory();
                        _this.blocks.splice(_this.blocks.indexOf(block), 1);
                    }
                    if (_this.snake.length <= 0) {
                        _this.onGameOver();
                    }
                }
            });
            this.walls.forEach(function (wall) {
                if (wall.centerPosX() - Const.SNAKE_BODY_RADIUS <= _this.snake.bodyPosX[0]
                    && wall.centerPosX() + Const.SNAKE_BODY_RADIUS >= _this.snake.bodyPosX[0]
                    && Math.abs(wall.centerPoSY() + wall.len / 2 - _this.snake.bodyPosY[0] + Const.SNAKE_BODY_RADIUS) < 3) {
                    _this.directCollision = true;
                }
            });
        };
        // 更新方块状态
        GameView.prototype.updateBlocks = function () {
            var _this = this;
            this.blocks.forEach(function (block) {
                if (!_this.isDirectCollision()) {
                    block.PosY += _this.gameScrollSpeed;
                }
                block.update();
                if ((block.PosY - (Const.BLOCK_WIDTH)) > Const.SCREEN_HEIGHT) {
                    block.destory();
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
                if ((snakeAdd.PosY - Const.SNAKE_BODY_RADIUS * 2) > Const.SCREEN_HEIGHT) {
                    snakeAdd.destory();
                    _this.snakeAdds.splice(_this.snakeAdds.indexOf(snakeAdd), 1);
                }
            });
        };
        // 更新Shield状态
        GameView.prototype.updateShields = function () {
            var _this = this;
            this.shields.forEach(function (shield) {
                if (!_this.isDirectCollision()) {
                    shield.PosY += _this.gameScrollSpeed;
                    shield.update();
                }
                if ((shield.PosY - Const.SNAKE_BODY_RADIUS * 2) > Const.SCREEN_HEIGHT) {
                    shield.destory();
                    _this.shields.splice(_this.shields.indexOf(shield), 1);
                }
            });
        };
        // 更新隔板状态
        GameView.prototype.updateWalls = function () {
            var _this = this;
            this.walls.forEach(function (wall) {
                if (!_this.isDirectCollision()) {
                    wall.PosY += _this.gameScrollSpeed;
                    wall.update();
                }
                if ((wall.PosY - (wall.len >> 1)) > Const.SCREEN_HEIGHT) {
                    wall.destory();
                    _this.walls.splice(_this.walls.indexOf(wall), 1);
                }
            });
        };
        GameView.prototype.onGameOver = function () {
            this.removeChildren();
            Laya.timer.clearAll(this);
            this.blocks.splice(0, this.blocks.length);
            this.walls.splice(0, this.walls.length);
            this.snakeAdds.splice(0, this.snakeAdds.length);
            this.latestBlocks.splice(0, this.latestBlocks.length);
            this.latestSnakeAdds.splice(0, this.latestSnakeAdds.length);
            GameMain.status = GameStatus.Over;
            this.removeSelf();
            if (!GameMain.gameOver) {
                GameMain.gameOver = new view.GameOver();
            }
            Laya.stage.removeChildren();
            Laya.stage.addChild(GameMain.gameOver);
            GameMain.gameOver.drawUI();
        };
        return GameView;
    }(ui.GameViewUI));
    view.GameView = GameView;
})(view || (view = {}));
//# sourceMappingURL=GameView.js.map