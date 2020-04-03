'use strict';
let http = require('http');
let path = require('path');
let fs = require('fs');
let url = require('url');


// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

/**
 * jsonp 试验， 返回一个 fn({aa:bb}) 字符串， 以避免跨越问题。
 * @type {Server}
 */
// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {

    // 获得URL的path，类似 '/css/bootstrap.css':
    let reqUrl = url.parse(request.url);
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var pathname = reqUrl.pathname;
    let callbackfun =  url.parse(request.url, true).query['callback'];
    if(callbackfun){
        console.log('200 ' + request.url);
        // 发送200响应:
        // response.writeHead(200);
        //'Access-Control-Allow-Origin':'*'
        response.writeHead(200, 'OK1234', {'Content-Type': 'application/json; charset=utf-8'});
        let mock = { name: 'qq', gender : 'm' }

        let res = callbackfun.concat('(', JSON.stringify(mock), ')');
        console.log(res);
        response.end(res);
    }
});

// 让服务器监听8080端口:
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');