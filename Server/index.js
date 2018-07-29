const express = require('express');
const app = express();
const assert = require('assert');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const util = require('util')
const https = require('https');
const fs = require('fs');
const request = require('request')
const {
    createLogger,
    format,
    transports
} = require('winston');
const {
    combine,
    timestamp,
    label,
    printf
} = format;
const appid = 'wx7eea4a6a6465b075'
const appsecret = 'e21eb50ab91ce82b816d36c64d8feef9'
const code2accessToken_URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
const myFormat = printf(info => {
    return `${info.timestamp} [${info.level}] : ${info.message}`;
});
const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'combined.log'
        })
    ]
});

app.use(bodyParser.json());

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'SnakeVSBlock';

let userCollection = null;
MongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    userCollection = client.db(dbName).collection('user');
    scoreCollection = client.db(dbName).collection('score');
});


const options = {
    key: fs.readFileSync('./domain.key'),
    cert: fs.readFileSync('./chained.pem')
};

app.get('/', function (req, res) {
    res.json({
        msg: 'hello'
    })
})

// 微信前端的登录交互，获取openID
app.get('/api/v1/login', function (req, res) {
    let code = req.query.code;
    let url = util.format(code2accessToken_URL, appid, appsecret, code)
    logger.info('/api/v1/login', code);
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        }
    })
})



// 提交用户公开信息
app.post('/api/v1/user', function (req, res) {
    let openid = req.body.openid;
    console.log(req.body)
    userCollection.findOne({
        openid: openid
    }, (err, result) => {
        if (err) {
            logger.warn('Connect to DB failed')
            return;
        }
        if (!result) {
            userCollection.insertOne(req.body, (err, _result) => {
                if (err) {
                    logger.warn('Insert Failed')
                    res.json({
                        msg: 'insert failed'
                    })
                } else {
                    res.json({
                        msg: 'ok'
                    })
                }
            });
        }
        logger.info('/api/v1/user openid exits')
    })
})

// 获取用户公开信息
app.get('/api/v1/user', function (req, res) {
    let openid = req.query.openid;
    console.log('openid ', openid);
    userCollection.findOne({
        openid: openid
    }, function (err, result) {
        if (!err && result) {
            console.log(result);
            logger.info('GET /api/v1/user ' + result.userInfo.nickName)
            res.json({
                nickName: result.userInfo.nickName,
                avatarUrl: result.userInfo.avatarUrl
            }) //只返回昵称和头像url
        } else {
            logger.warn('GET /api/v1/user ' + openid)
            res.json({});
        }
    })
})


// 获取排行榜
app.get('/api/v1/leaderboard', function (req, res) {
    scoreCollection.find({
        visable: true
    }).sort({
        score: -1
    }).limit(10).toArray(function (err, result) {
        if (!err)
            res.json(result)
        else
            res.json([])
    })
})

// 提交分数
app.post('/api/v1/score', function (req, res) {
    // 提交分数的openid对应的用户应该已经存在于数据库中
    userCollection.findOne({
        openid: req.body.openid
    }, function (err, result) {
        if (!err && result) {
            scoreCollection.insertOne({
                openid: req.body.openid,
                score: parseInt(req.body.score),
                visable: true,
                time: new Date().getTime()
            }, function (err, _result) {
                if (err) {
                    logger.warn('Insert Score Failed');
                    console.log(req.body)
                    res.json({
                        msg: 'failed'
                    })
                } else {
                    logger.info('Insert Score');
                    res.json({
                        msg: 'ok'
                    })
                }
            })
        } else {
            logger.warn('openid Not exists');
            console.log(req.body)
            res.json({
                msg: 'failed'
            })
        }
    })
})



logger.info('Create Https Server');
https.createServer(options, app).listen(12306, '0.0.0.0');