/*
* name Const Values;
*/
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Start"] = 0] = "Start";
    GameStatus[GameStatus["Underway"] = 1] = "Underway";
    GameStatus[GameStatus["Over"] = 2] = "Over";
})(GameStatus || (GameStatus = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["Normal"] = 0] = "Normal";
    GameMode[GameMode["Color"] = 1] = "Color";
})(GameMode || (GameMode = {})); //游戏模式
var Const = /** @class */ (function () {
    function Const() {
    }
    Const.SCREEN_WIDTH = 414; // 屏幕宽度
    Const.SCREEN_HEIGHT = 736; // 屏幕高度
    Const.SNAKE_FLEXIBILITY = 2; // 蛇的柔韧性，越小越不柔韧
    Const.SNAKE_BODY_RADIUS = 11.75; // 蛇身半径
    Const.SNAKE_BODY_DEFALUT_SPACING = 23; // 蛇身体部分之间的默认距离
    Const.SNAKE_BODY_MINIUM_SPACING = 4; // 蛇身体部分之间的最小Y轴距离
    Const.SNAKE_MAX_PARTS = 25;
    Const.BLOCK_WIDTH = 80; // 方块宽度
    Const.BLOCK_MIN_CIRCLE_R = 60; //方块最小包围圆半径
    Const.BLOCK_RADIUS = 10; // 方块圆角半径
    Const.WALL_WIDTH = 5; //隔板宽度
    Const.WALL_RADIUS = 2; //隔板圆角半径
    Const.PARTICLE_RADIUS = 3; //粒子半径
    Const.GAME_SCROLL_SPEED = 4; //
    Const.BLOCK_DECREASE_SPEED = 3; // 每几帧减少一点
    //snake状态集
    Const.SNAKE_STATE_NORMAL = "normal";
    Const.SNAKE_STATE_SHIELD = "shield";
    Const.SNAKE_STATE_SUPER = "super";
    Const.SNAKE_SUPER_TIME = 600;
    //block状态集
    Const.BLOCK_STATE_NORMAL = "normal";
    Const.BLOCK_STATE_SPECIAL = "special";
    //音效
    Const.BGM_SOUND = "sound/BGM.mp3"; //背景音乐
    Const.EAT_SNAKE_ADD_SOUND = "sound/snakeAdd.mp3"; //吃到snakeAdd音效
    Const.EAT_SHIELD_SOUND = "sound/eatShield.mp3"; //吃到Shield音效
    Const.GAME_START_SOUND = "sound/gameStart.mp3"; //游戏开始音效
    Const.GAME_OVER_SOUND = "sound/gameOver.mp3"; //游戏结束音效
    Const.BUTTON_SOUND = "sound/buttonSound.wav"; //按钮音效
    Const.BLOCK_BREAK = "sound/buttonSound.wav"; //方块解体音效
    //特殊BLOCK的随机Value
    Const.BLOCK_SPECIAL_VALUE = [20, 25, 30];
    //每次添加BLOCK的随机数量【1-5】
    Const.BLOCK_NUMBERS = [1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5];
    //每次添加WALL的随机数量【1-3】
    Const.WALL_NUMBERS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3];
    //Wall的随机长度
    Const.WALL_LENGTH = [100, 180];
    //添加BLOCK的随机帧数
    Const.BLOCK_WALL_NEWTIMES = [160, 160, 240, 240, 240, 240, 240, 240, 240, 240, 240, 320, 320, 320, 320, 320, 400];
    //每次添加SNAKEADD的随机数量【1-3】 ---为4时有一个随机为SHIELD
    Const.SNAKE_ADD_NUMBERS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4];
    //添加SNAKEADD的随机帧数
    Const.SNAKE_ADD_NEWTIMES = [160, 160, 160, 240, 240, 240, 240, 240, 240, 240, 240, 320, 320, 320, 400];
    //粒子颜色
    Const.PARTICLE_COLORS = [[255, 0, 0], [255, 128, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [128, 0, 255]];
    //方块颜色
    Const.BLOCK_COLORS = [[59, 255, 253], [61, 255, 254], [57, 255, 229], [58, 255, 218], [59, 255, 204], [55, 255, 189], [59, 255, 178], [59, 255, 178], [59, 255, 155], [57, 255, 139], [57, 255, 139], [56, 255, 115], [56, 255, 105], [57, 255, 90], [58, 255, 78], [57, 255, 61], [65, 255, 48], [73, 255, 47], [82, 255, 47], [90, 255, 47], [99, 255, 48], [113, 255, 49], [126, 255, 47], [135, 255, 48], [151, 255, 51], [156, 255, 52], [172, 255, 47], [186, 255, 47], [198, 255, 47], [208, 255, 48], [222, 255, 49], [222, 255, 49], [245, 255, 50], [252, 255, 47], [251, 250, 46], [249, 234, 47], [249, 219, 47], [248, 204, 47], [249, 188, 48], [247, 172, 47], [246, 159, 46], [246, 144, 46], [246, 126, 48], [244, 112, 47], [243, 96, 46], [244, 84, 46], [239, 67, 43], [238, 51, 44], [239, 35, 46], [237, 21, 45]];
    //彩色模式block和snake颜色
    Const.COLORS_COLORMODE = [[255, 0, 0], [255, 255, 0], [0, 255, 255], [255, 0, 255]];
    Const.API_URL = 'https://chenyiji16.iterator-traits.com:12306';
    return Const;
}());
//# sourceMappingURL=Const.js.map