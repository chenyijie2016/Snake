var Common = /** @class */ (function () {
    function Common() {
    }
    /*
    * 获取随机整数(Min,Max)
    */
    Common.getRandomNumber = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    /*
    * 随机获取数组中不重复元素
    */
    Common.getRandomArrayElements = function (arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };
    Common.rgbToHex = function (rgb) {
        if (!rgb) {
            console.log('#Error!');
            return '#FFFFFF';
        }
        var color = rgb.toString().match(/\d+/g);
        var hex = "#";
        for (var i = 0; i < 3; i++) {
            hex += ("0" + Number(color[i]).toString(16)).slice(-2);
        }
        return hex;
    };
    return Common;
}());
//# sourceMappingURL=Common.js.map