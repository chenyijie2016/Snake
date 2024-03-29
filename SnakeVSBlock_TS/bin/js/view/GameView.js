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
            _this.gameScrollSpeed = Const.GAME_SCROLL_SPEED;
            _this.directCollision = false;
            _this.score = 0;
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
        GameView.prototype.updateGameStatus = function () {
            this.gameScrollSpeed = Const.GAME_SCROLL_SPEED + Math.floor(this.snake.length / 10) * 0.1;
        };
        // The Main Loop for the game 
        GameView.prototype.mainLoop = function () {
            this.updateGameStatus();
            this.updateCollisionDetection();
            this.updateScore();
            this.detectMouseMove();
            this.snake.updateBody();
            this.snake.showBody();
            this.updateBlocks();
            this.updateSnakeAdds();
            this.updateShields();
            this.updateWalls();
            //更新snake_superTime
            if (this.snake.state === Const.SNAKE_STATE_SUPER) {
                if (this.snake.superTime === 0) {
                    this.snake.setState(Const.SNAKE_STATE_NORMAL);
                    this.snake.superTime = Const.SNAKE_SUPER_TIME;
                }
                else {
                    this.snake.superTime--;
                }
            }
            // 更新方块集合Blocks
            if (this.nextTimeNewBlocks === undefined) {
            }
            else {
                if (this.nextTimeNewBlocks <= 0) {
                    this.updateBlocks_WALLStatus();
                }
                else {
                    if (!this.isDirectCollision())
                        this.nextTimeNewBlocks -= this.gameScrollSpeed;
                    ;
                }
            }
            // 更新Grow集合SnakeAdds 
            if (this.nextTimeNewAdds === undefined) {
            }
            else {
                if (this.nextTimeNewAdds <= 0) {
                    this.updateSnakeAddsStatus();
                }
                else {
                    if (!this.isDirectCollision())
                        this.nextTimeNewAdds -= this.gameScrollSpeed;
                }
            }
        };
        // 检测触点移动情况，据此控制蛇的移动
        GameView.prototype.detectMouseMove = function () {
            var _this = this;
            var currentMouseX = Laya.stage.mouseX; //当前触点位置
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
                // 方块左右两侧不可穿越
                this.blocks.forEach(function (block) {
                    if (block.PosY >= _this.snake.bodyPosY[0] - Const.BLOCK_WIDTH / 2
                        && block.PosY <= _this.snake.bodyPosY[0] + Const.BLOCK_WIDTH / 2) {
                        switch (direction_1) {
                            case 'left': {
                                if (block.PosX < _this.snake.bodyPosX[0] // 方块在蛇头左侧
                                    && _this.snake.bodyPosX[0] - level_1 < block.PosX + Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS) {
                                    level_1 = Math.min(level_1, Math.abs(block.PosX - _this.snake.bodyPosX[0]) - (Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS));
                                }
                                break;
                            }
                            case 'right': {
                                if (block.PosX > _this.snake.bodyPosX[0] // 方块在蛇头右侧
                                    && _this.snake.bodyPosX[0] + level_1 > block.PosX - Const.BLOCK_WIDTH / 2 - Const.SNAKE_BODY_RADIUS) {
                                    level_1 = Math.min(level_1, Math.abs(block.PosX - _this.snake.bodyPosX[0]) - (Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS));
                                }
                                break;
                            }
                        }
                    }
                });
                // 墙体不可穿越
                this.walls.forEach(function (wall) {
                    // 蛇头位置在墙体范围内
                    if (wall.centerPoSY() + wall.len / 2 + Const.SNAKE_BODY_RADIUS > _this.snake.bodyPosY[0]
                        && wall.centerPoSY() - wall.len / 2 - Const.SNAKE_BODY_RADIUS < _this.snake.bodyPosY[0]) {
                        switch (direction_1) {
                            case 'left': {
                                if (Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) <= Const.WALL_WIDTH / 2 + Const.SNAKE_BODY_RADIUS
                                    && wall.centerPosX() < _this.snake.bodyPosX[0]) {
                                    level_1 = 0;
                                }
                                if (wall.centerPosX() < _this.snake.bodyPosX[0] //墙体在蛇头左侧
                                    && _this.snake.bodyPosX[0] - level_1 < wall.centerPosX() + Const.WALL_WIDTH / 2 + Const.SNAKE_BODY_RADIUS) {
                                    level_1 = Math.min(level_1, Math.abs(Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) - Const.WALL_WIDTH / 2 - Const.SNAKE_BODY_RADIUS));
                                }
                                break;
                            }
                            case 'right': {
                                if (Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) <= Const.WALL_WIDTH / 2 + Const.SNAKE_BODY_RADIUS
                                    && wall.centerPosX() > _this.snake.bodyPosX[0]) {
                                    level_1 = 0;
                                }
                                if (wall.centerPosX() > _this.snake.bodyPosX[0] //墙体在蛇头右侧
                                    && _this.snake.bodyPosX[0] + level_1 > wall.centerPosX() - Const.WALL_WIDTH / 2 - Const.SNAKE_BODY_RADIUS) {
                                    level_1 = Math.min(level_1, Math.abs(Math.abs(wall.centerPosX() - _this.snake.bodyPosX[0]) - Const.WALL_WIDTH / 2 - Const.SNAKE_BODY_RADIUS));
                                }
                                break;
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
                    w.setPos(orders[i] * 82.8 + 37.2, -Const.BLOCK_WIDTH * 3 - 7.5);
                    this.walls.push(w);
                    this.addChildren(w);
                }
            }
            var blockNumber = Common.getRandomArrayElements(Const.BLOCK_NUMBERS, 1);
            var starBlock_order = undefined;
            if (blockNumber[0] === 5 || blockNumber[0] === 4) {
                if (Common.getRandomNumber(0, 1) === 1) {
                    starBlock_order = Common.getRandomNumber(0, blockNumber[0] - 1);
                }
            }
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
                    if (starBlock_order === i) {
                        b.setState(Const.BLOCK_STATE_SPECIAL);
                        this.blocks.push(b);
                        this.latestBlocks.push(b);
                        this.addChildren(b);
                    }
                    else {
                        this.blocks.push(b);
                        this.latestBlocks.push(b);
                        this.addChildren(b);
                    }
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
            // 先检测是否碰到了snakeAdd
            this.snakeAdds.forEach(function (snakeAdd) {
                if (Math.pow((snakeAdd.PosX - _this.snake.bodyPosX[0]), 2) + Math.pow((snakeAdd.PosY - _this.snake.bodyPosY[0]), 2)
                    < Math.pow(Const.SNAKE_BODY_RADIUS, 2) * 4) {
                    _this.snake.extendBody(snakeAdd.getValue());
                    snakeAdd.destory();
                    _this.snakeAdds.splice(_this.snakeAdds.indexOf(snakeAdd), 1);
                    Laya.SoundManager.playSound(Const.EAT_SNAKE_ADD_SOUND);
                }
            });
            // 是否碰到了 shield 道具
            this.shields.forEach(function (shield) {
                if (Math.pow((shield.PosX - _this.snake.bodyPosX[0]), 2) + Math.pow((shield.PosY - _this.snake.bodyPosY[0]), 2)
                    < Math.pow(Const.SNAKE_BODY_RADIUS, 2) * 4) {
                    Laya.SoundManager.playSound(Const.EAT_SHIELD_SOUND); //音效	
                    //TODO: change the body color of this.snake OR someother specile effect
                    if (_this.snake.state === Const.SNAKE_STATE_NORMAL) {
                        _this.snake.setState(Const.SNAKE_STATE_SHIELD);
                    }
                    shield.destory();
                    _this.shields.splice(_this.shields.indexOf(shield), 1);
                }
            });
            this.directCollision = false;
            // 对方块正面的碰撞
            this.blocks.forEach(function (block) {
                if (block.PosX - Const.BLOCK_WIDTH / 2 <= _this.snake.bodyPosX[0] + Const.SNAKE_BODY_RADIUS / 2
                    && block.PosX + Const.BLOCK_WIDTH / 2 >= _this.snake.bodyPosX[0] - Const.SNAKE_BODY_RADIUS / 2 // X资本 在方块范围内
                    && (_this.snake.bodyPosY[0] - block.PosY) < (Const.BLOCK_WIDTH / 2 + Const.SNAKE_BODY_RADIUS + 4)
                    && block.PosY < _this.snake.bodyPosY[0]) {
                    _this.directCollision = true;
                    if (_this.snake.state === Const.SNAKE_STATE_SHIELD) {
                        _this.snake.setState(Const.SNAKE_STATE_NORMAL);
                        _this.score += block.getValue();
                        block.setValue(0);
                    }
                    else if (_this.snake.state === Const.SNAKE_STATE_SUPER) {
                        _this.score += block.getValue();
                        block.setValue(0);
                    }
                    if (!block.decreaseValue() || block.getValue() === 0) {
                        var p = new sprite.ParticleCtn();
                        p.setPos(block.PosX, block.PosY);
                        p.update();
                        _this.addChild(p);
                        if (block.state === Const.BLOCK_STATE_NORMAL) {
                            Laya.SoundManager.playSound(Const.BLOCK_BREAK); //音效
                        }
                        else if (block.state === Const.BLOCK_STATE_SPECIAL) {
                            //TODU: change the state of snake to Super mode
                            _this.snake.superTime = Const.SNAKE_SUPER_TIME;
                            _this.snake.setState(Const.SNAKE_STATE_SUPER);
                            Laya.SoundManager.playSound(Const.EAT_SHIELD_SOUND); //音效
                        }
                        block.destory();
                        _this.blocks.splice(_this.blocks.indexOf(block), 1);
                    }
                    if (_this.snake.length <= 0) {
                        _this.onGameOver();
                    }
                }
            });
            // 对墙体的正面碰撞，可以导致蛇停下
            this.walls.forEach(function (wall) {
                if (wall.centerPosX() - Const.SNAKE_BODY_RADIUS <= _this.snake.bodyPosX[0]
                    && wall.centerPosX() + Const.SNAKE_BODY_RADIUS >= _this.snake.bodyPosX[0]
                    && Math.abs(wall.centerPoSY() + wall.len / 2 - (_this.snake.bodyPosY[0] - Const.SNAKE_BODY_RADIUS)) < 5) {
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
        // 游戏结束时的处理
        GameView.prototype.onGameOver = function () {
            // 清除所有sprite以及计时器
            this.removeChildren();
            Laya.timer.clearAll(this);
            // 请除储存的队列
            this.blocks.splice(0, this.blocks.length);
            this.walls.splice(0, this.walls.length);
            this.snakeAdds.splice(0, this.snakeAdds.length);
            this.latestBlocks.splice(0, this.latestBlocks.length);
            this.latestSnakeAdds.splice(0, this.latestSnakeAdds.length);
            this.shields.splice(0, this.shields.length);
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