/* 引入express框架 */
const express = require('express');
const app = express();
/* 引入cors */
const cors = require('cors');
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');

var fs = require('fs')
var url = require('url');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});
app.get('/', (req, res) => {
    res.send('<p style="color:red">服务已启动</p>');
})

var count = 0;

app.get('/pure/counter', (req, res) => {

    var path = './token/count.txt'

    fs.readFile(path, function (error, data) {
        if (error) {
            fs.writeFile(path, count.toString(), function (error) {
                //
            })
        }
        else {
            count = data.toString();
        }

        if (req.url != '/favicon.ico') {
            count++;

            fs.writeFile(path, count.toString(), function (error) {
                //
            })
        }

        res.json({
            code: 200,
            message: 'success',
            data: {
                count: count
            }
        });
    })
})

app.post('/proper/counter', (req, res) => {

    var name = req.body.name ? req.body.name : "";

    if (name.length < 10) {
        res.json({
            code: 200,
            message: 'should be valided name',
            data: req.body
        });
        return
    }

    var path = './token/' + name;

    fs.readFile(path, function (error, data) {
        if (error) {
            fs.writeFile(path, "0", function (error) {
                //
            })
            count = 0;
        }
        else {
            count = data.toString();
        }

        if (req.url != '/favicon.ico') {
            count++;

            fs.writeFile(path, count.toString(), function (error) {
                //
            })
        }

        res.json({
            code: 200,
            message: 'success',
            data: {
                count: count
            }
        });
    })
})

/* 监听端口 */
app.listen(3000, () => {
    console.log('listen:3000');
})