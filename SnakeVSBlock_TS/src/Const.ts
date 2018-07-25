/*
* name Const Values;
*/
enum GameStatus { Start, Underway, Over }
enum GameMode {Normal, Color} //游戏模式

class Const {
    public static SCREEN_WIDTH: number = 414; // 屏幕宽度
    public static SCREEN_HEIGHT: number = 736; // 屏幕高度
    public static SNAKE_FLEXIBILITY: number = 2; // 蛇的柔韧性，越小越不柔韧
    public static SNAKE_BODY_RADIUS: number = 11.75; // 蛇身半径
    public static SNAKE_BODY_DEFALUT_SPACING: number = 23; // 蛇身体部分之间的默认距离
    public static SNAKE_BODY_MINIUM_SPACING: number = 4; // 蛇身体部分之间的最小Y轴距离
    public static SNAKE_MAX_PARTS:number = 25;
    public static BLOCK_WIDTH: number = 80; // 方块宽度
    public static BLOCK_MIN_CIRCLE_R: number = 60; //方块最小包围圆半径
    public static BLOCK_RADIUS: number = 10; // 方块圆角半径
    public static WALL_WIDTH: number = 5; //隔板宽度
    public static WALL_RADIUS: number = 2; //隔板圆角半径
    public static PARTICLE_RADIUS: number = 3; //粒子半径
    public static GAME_SCROLL_SPEED: number = 4; //

    public static BLOCK_DECREASE_SPEED:number = 3; // 每几帧减少一点

    //snake状态集
    public static SNAKE_STATE_NORMAL: string = "normal";
    public static SNAKE_STATE_SHIELD: string = "shield";
    public static SNAKE_STATE_SUPER: string = "super";
    public static SNAKE_SUPER_TIME: number = 600;
    
    //block状态集
    public static BLOCK_STATE_NORMAL: string = "normal";
    public static BLOCK_STATE_SPECIAL: string = "special";

    //音效
    public static  BGM_SOUND: string = "sound/BGM.mp3"; //背景音乐
    public static  EAT_SNAKE_ADD_SOUND: string = "sound/snakeAdd.mp3"; //吃到snakeAdd音效
    public static  EAT_SHIELD_SOUND: string = "sound/eatShield.mp3"; //吃到Shield音效
    public static  GAME_START_SOUND: string = "sound/gameStart.mp3"; //游戏开始音效
    public static  GAME_OVER_SOUND: string = "sound/gameOver.mp3"; //游戏结束音效
    public static  BUTTON_SOUND: string = "sound/buttonSound.wav";//按钮音效
    public static  BLOCK_BREAK: string = "sound/buttonSound.wav";//方块解体音效


    //特殊BLOCK的随机Value
    public static BLOCK_SPECIAL_VALUE = [20, 25, 30];
    //每次添加BLOCK的随机数量【1-5】
    public static BLOCK_NUMBERS = [1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5];
    //每次添加WALL的随机数量【1-3】
    public static WALL_NUMBERS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3];
    //添加BLOCK的随机帧数
    public static BLOCK_WALL_NEWTIMES = [60, 60, 60, 85, 85, 85, 85, 85, 85, 85, 85, 120, 120, 150];

    //每次添加SNAKEADD的随机数量【1-3】 ---为4时有一个随机为SHIELD
    public static SNAKE_ADD_NUMBERS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4];
    //添加SNAKEADD的随机帧数
    public static SNAKE_ADD_NEWTIMES = [50, 70, 70, 70, 90, 90, 90, 90, 90, 95, 130];

    
    //粒子颜色
    public static PARTICLE_COLORS = [[255, 0, 0], [255, 128, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [128, 0, 255]];
    //方块颜色
    public static BLOCK_COLORS = [[59, 255, 253], [61, 255, 254], [57, 255, 229], [58, 255, 218], [59, 255, 204], [55, 255, 189], [59, 255, 178], [59, 255, 178], [59, 255, 155], [57, 255, 139], [57, 255, 139], [56, 255, 115], [56, 255, 105], [57, 255, 90], [58, 255, 78], [57, 255, 61], [65, 255, 48], [73, 255, 47], [82, 255, 47], [90, 255, 47], [99, 255, 48], [113, 255, 49], [126, 255, 47], [135, 255, 48], [151, 255, 51], [156, 255, 52], [172, 255, 47], [186, 255, 47], [198, 255, 47], [208, 255, 48], [222, 255, 49], [222, 255, 49], [245, 255, 50], [252, 255, 47], [251, 250, 46], [249, 234, 47], [249, 219, 47], [248, 204, 47], [249, 188, 48], [247, 172, 47], [246, 159, 46], [246, 144, 46], [246, 126, 48], [244, 112, 47], [243, 96, 46], [244, 84, 46], [239, 67, 43], [238, 51, 44], [239, 35, 46], [237, 21, 45]];

    //彩色模式block和snake颜色
    public static COLORS_COLORMODE = [[255, 0, 0], [255, 255, 0], [0, 255, 255], [255, 0, 255]];

    public static API_URL = 'https://chenyiji16.iterator-traits.com:12306'
}