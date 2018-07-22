/*
* name;
*/
var API_URL = 'chenyiji16.iterator-traits.com:12306';
var Weixin = /** @class */ (function () {
    function Weixin() {
    }
    Weixin.prototype.get = function (url, data, success, fail) {
        return wx.request({ url: API_URL + url, data: data, method: 'GET', success: success, fail: fail });
    };
    return Weixin;
}());
//# sourceMappingURL=Weixin.js.map