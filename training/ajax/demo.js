const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><head></head></head><body></body></html>')).window;
global.document = document;
const window = document.defaultView;
const $ = require('jquery')(window);

// console.log(window);
// console.log($);
let wp = process.cwd();
let file_protocol = "file://" + wp;

function print(data) {
    console.log('name: ', data.name);
    console.log('gender: ', data.gender);
}

function demo1() {
//1
    $.getJSON(file_protocol + "/mock.json", null, function (data) {
        print(data);
    })
}

function demo2() {
//2
    $.ajax(file_protocol + "/mock.json", {
        dataType: 'json',
        method: 'GET',
    }).done(function (data) {
        print(data);
    })
}

//3
function demo3() {
    $.ajax("http://127.0.0.1:8080/test", {
        dataType: 'json',
        method: 'GET',
    }).done(function (data) {
        print(data);
    }).fail(function (e, status) {
        console.log("error: ", status);
    })
}

//3 jsonp
function demo4_1(){
    // $.getJSON( "http://127.0.0.1:8080?callback=fn", function (data) {
    //     print(data);
    // })

    var url = "http://127.0.0.1:8080?callback=fn";
    // 创建script标签，设置其属性
    var script = document.createElement('script');
    script.setAttribute('src', url);
    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log($('script').prop('src'));
}

function fn(data) {
    print(data);
}

//3 jsonp
function demo4() {
    $.ajax("http://127.0.0.1:8080/", {
        method: 'get',
        dataType: 'jsonp', // 期待返回数量类型为 jsonp json text
        jsonp: 'callback', //
        jsonpCallback: 'fn' // 回调函数名;
    }).done(
        function (data) {
            console.log('this is from jsonp.');
            console.log(data);
            //print(data);
        }
    ).fail(function (e) {
        console.log(e);
    });
}

demo4_1();
/*

let jqxhr = $.ajax('http://api.money.126.net/data/feed/0000001,1399001', {
    method: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
}).done((data) => {
    console.log('xxxx');
    let str = data['0000001'].name + ': ' +
        data['0000001'].price + '；' +
        data['1399001'].name + ': ' +
        data['1399001'].price;
    $('#current_price').slideUp('slow').text(str).slideDown('slow');
}).fail((xhr, status) => {
    alert('失败: ' + xhr.status + ', 原因: ' + status);
});

*/

