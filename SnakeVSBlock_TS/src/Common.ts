class Common {
    /*
    * 获取随机整数(Min,Max)
    */
    public static getRandomNumber(Min: number, Max: number): number {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    /*
    * 随机获取数组中不重复元素
    */
    public static getRandomArrayElements(arr: Array<any>, count: number): Array<any> {
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
    public static rgbToHex = function (rgb) {
        if (!rgb) {
            console.log('#Error!')
            return '#FFFFFF';
        }
        let color = rgb.toString().match(/\d+/g);
        let hex = "#";

        for (let i = 0; i < 3; i++) {
            hex += ("0" + Number(color[i]).toString(16)).slice(-2);
        }
        return hex;
    };
    // public static async sleep(ms) {
    //     return new Promise(async (resolve) => {
    //         await setTimeout(resolve, ms);
    //     })
    // }
}