//const API_URL = 'https://chenyiji16.iterator-traits.com:12306'
const API_URL = 'https://127.0.0.1:12306'
class Test {
    constructor() {

    }
    test() {
        wx.getUserInfo({
            success: function(userInfo) {
                console.log(userInfo.userInfo)
                wx.login({
                    success: function(res) {
                        let code = res.code;
                        console.log(res);
                        wx.request({
                            url: API_URL + '/api/v1/login',
                            data: {
                                code: code
                            },
                            success: function(_res) {
                                console.log(_res.data);
                                wx.request({
                                    url: API_URL + '/api/v1/user',
                                    method: 'POST',
                                    data: {
                                        openid: _res.data.openid,
                                        userInfo: userInfo.userInfo
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    }
}
window.test = new Test()