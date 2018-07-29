const API_URL = 'https://chenyiji16.iterator-traits.com:12306'
//const API_URL = 'https://127.0.0.1:12306'
class API {
    constructor() {
        this.openid = undefined;
        this.leaderBoardData = [];
    }

    login() {
        wx.getUserInfo({
            success: (userInfo) => {

                // 登录，获取code
                wx.login({
                    success: (res) => {
                        let code = res.code;

                        // 提交登录用的code,后台返回用户唯一openid
                        wx.request({
                            url: API_URL + '/api/v1/login',
                            data: {
                                code: code
                            },

                            success: (_res) => {
                                this.openid = _res.data.openid;
                               
                                // 向后台提交用户公开信息
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
    /* TODO : TEST ALL THESE FUNCTIONS */

    // 获取排行榜信息
    getLeaderBoard() {
        return new Promise((resolve, reject) => {
            wx.request({
                url: API_URL + '/api/v1/leaderboard',
                success: (result) => {
                    resolve(result);
                },
                fail: () => {
                    reject();
                }
            })
        })

    }
    // 上传分数
    uploadScore(score) {
        wx.request({
            url: API_URL + '/api/v1/score',
            method: 'POST',
            data: {
                score: score,
                openid: this.openid
            }
        })
    }
    // 根据openid获取用户昵称以及头像，【注意：该调用封装成了异步调用】
    getUserData(openid) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: API_URL + '/api/v1/user',
                method: 'GET',
                data: {
                    openid: openid
                },
                success: (result) => {
                    resolve(result)
                },
                fail: () => {
                    reject()
                }
            })
        })

    }

}
window.api = new API()