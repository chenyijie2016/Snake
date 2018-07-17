var common = /** @class */ (function () {
    function common() {
    }
    common.GetRandomNum = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    return common;
}());
//# sourceMappingURL=Common.js.map