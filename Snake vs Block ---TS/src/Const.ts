/*
* name Const Values;
*/
class Const {
    public static SCREEN_WIDTH: number = 414; // 屏幕宽度
    public static SCREEN_HEIGHT: number = 736; // 屏幕高度
    public static SNAKE_FLEXIBILITY: number = 1.2; // 蛇的柔韧性，越小越不柔韧
    public static SNAKE_BODY_RADIUS: number = 11.75; // 蛇身半径
    public static SNAKE_BODY_DEFALUT_SPACING: number = 23; // 蛇身体部分之间的默认距离
    public static SNAKE_BODY_MINIUM_SPACING: number = 4; // 蛇身体部分之间的最小Y轴距离
    public static BLOCK_WIDTH: number = 80; // 方块宽度
    public static BLOCK_MIN_CIRCLE_R: number = 57; //方块最小包围圆半径
    public static BLOCK_RADIUS: number = 10; // 方块圆角半径
    public static WALL_WIDTH: number = 5; //隔板宽度
    public static WALL_RADIUS: number = 2;//隔板圆角半径



    //每次添加BLOCK的随机数量【1-5】
    public static BLOCK_NUMBERS = [1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5];
    //每次添加WALL的随机数量【1-3】
    public static WALL_NUMBERS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3];
    //添加BLOCK的随机帧数
    public static BLOCK_WALL_NEWTIMES = [60, 80, 80, 80, 90, 90, 90, 90, 90, 100, 100, 150];

    //每次添加SNAKEADD的随机数量【1-3】
    public static SNAKE_ADD_NUMBERS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3];
    //添加SNAKEADD的随机帧数
    public static SNAKE_ADD_NEWTIMES = [50, 70, 70, 70, 90, 90, 90, 90, 90, 95, 130];

    

    public static BLOCK_COLORS = [[59, 255, 253], [61, 255, 254], [57, 255, 229], [58, 255, 218], [59, 255, 204], [55, 255, 189], [59, 255, 178], [59, 255, 178], [59, 255, 155], [57, 255, 139], [57, 255, 139], [56, 255, 115], [56, 255, 105], [57, 255, 90], [58, 255, 78], [57, 255, 61], [65, 255, 48], [73, 255, 47], [82, 255, 47], [90, 255, 47], [99, 255, 48], [113, 255, 49], [126, 255, 47], [135, 255, 48], [151, 255, 51], [156, 255, 52], [172, 255, 47], [186, 255, 47], [198, 255, 47], [208, 255, 48], [222, 255, 49], [222, 255, 49], [245, 255, 50], [252, 255, 47], [251, 250, 46], [249, 234, 47], [249, 219, 47], [248, 204, 47], [249, 188, 48], [247, 172, 47], [246, 159, 46], [246, 144, 46], [246, 126, 48], [244, 112, 47], [243, 96, 46], [244, 84, 46], [239, 67, 43], [238, 51, 44], [239, 35, 46], [237, 21, 45]];
}