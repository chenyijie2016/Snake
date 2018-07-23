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
const dbName = 'userdata';

let collection = null;
MongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    collection = client.db(dbName).collection('data');
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

app.post('/api/v1/user', function (req, res) {
    let openid = req.body.openid;
    console.log(req.body)
    logger.info('openid', openid)
    collection.findOne({
        openid: openid
    }, (err, result) => {
        if (err) {
            logger.warn('Connect to DB failed')
            return;
        }
        if (!result) {
            collection.insertOne(req.body);
            res.json({
                msg: 'ok'
            })
        }
    })


})



logger.info('Create Https Server');
https.createServer(options, app).listen(12306, '0.0.0.0');