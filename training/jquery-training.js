const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
const window = document.defaultView;
const $ = require('jquery')(window);
const jqueryTraining = {};

jqueryTraining.log = function (msg){
    console.log(msg);
}

/**
 * Jquery 选择器练习
 * @type {*|jQuery|HTMLElement}
 */

let dom = $('<div id="test-jquery">\n' +
    '    <p id="para-1" class="color-red">JavaScript</p>\n' +
    '    <p id="para-2" class="color-green">Haskell</p>\n' +
    '    <p class="color-red color-green">Erlang</p>\n' +
    '    <p name="name" class="color-black">Python</p>\n' +
    '    <form class="test-form" target="_blank" action="#0" onsubmit="return false;">\n' +
    '        <legend>注册新用户</legend>\n' +
    '        <fieldset>\n' +
    '            <p><label>名字: <input name="name"></label></p>\n' +
    '            <p><label>邮件: <input name="email"></label></p>\n' +
    '            <p><label>口令: <input name="password" type="password"></label></p>\n' +
    '            <p><button type="submit">注册</button></p>\n' +
    '        </fieldset>\n' +
    '    </form>\n' +
    '</div>');
$('body').append(dom);
'use strict';

let selected;
//仅选择JavaScript
selected = $('#test-jquery [class=color-red]');
//仅选择Erlang
selected = $('#test-jquery .color-red.color-green');
//选择JavaScript和Erlang
selected = $('[class^=color-red]');
// 选择所有编程语言
selected = $('[class^=color-]');
// 选择名字input
selected = $('#test-jquery :input:first');
// 选择邮件和名字input
selected = $('.test-form [name=name], .test-form [name=email]')

// 高亮结果:
if (!(selected instanceof $)) {
    return console.log('不是有效的jQuery对象!');
}
$('#test-jquery').find('*').css('background-color', '');
selected.css('background-color', '#ffd351');

/*
针对表单元素，jQuery还有一组特殊的选择器：
:input：可以选择<input>，<textarea>，<select>和<button>；
:file：可以选择<input type="file">，和input[type=file]一样；
:checkbox：可以选择复选框，和input[type=checkbox]一样；
:radio：可以选择单选框，和input[type=radio]一样；
:focus：可以选择当前输入焦点的元素，例如把光标放到一个<input>上，用$('input:focus')就可以选出；
:checked：选择当前勾上的单选框和复选框，用这个选择器可以立刻获得用户选择的项目，如$('input[type=radio]:checked')；
:enabled：可以选择可以正常输入的<input>、<select> 等，也就是没有灰掉的输入；
:disabled：和:enabled正好相反，选择那些不能输入的。
 */

dom = $('<div class="test-selector">\n' +
    '    <ul class="test-lang">\n' +
    '        <li class="lang-javascript">JavaScript</li>\n' +
    '        <li class="lang-python">Python</li>\n' +
    '        <li class="lang-lua">Lua</li>\n' +
    '    </ul>\n' +
    '    <ol class="test-lang">\n' +
    '        <li class="lang-swift">Swift</li>\n' +
    '        <li class="lang-java">Java</li>\n' +
    '        <li class="lang-c">C</li>\n' +
    '    </ol>\n' +
    '</div>');

// 分别选择所有语言，所有动态语言，所有静态语言，JavaScript，Lua，C等:
//1
selected = $('div.test-selector li');
//2
selected = $('div.test-selector ol li');
//3
selected = $('div.test-selector ul li');
//4
selected = $('ul.test-lang li:first');
//5
selected = $('ul.test-lang li:last');
//6
selected = $('ol.test-lang li:nth-child(3)');

/*
查找和过滤

<ul class="lang">
    <li class="js dy">JavaScript</li>
    <li class="dy">Python</li>
    <li id="swift">Swift</li>
    <li class="dy">Scheme</li>
    <li name="haskell">Haskell</li>
</ul>

 */
var ul = $('ul.lang'); // 获得<ul>
var dy = ul.find('.dy'); // 获得JavaScript, Python, Scheme
var swf = ul.find('#swift'); // 获得Swift
var hsk = ul.find('[name=haskell]'); // 获得Haskell

var swf = $('#swift'); // 获得Swift
var parent = swf.parent(); // 获得Swift的上层节点<ul>
var a = swf.parent('.red'); // 获得Swift的上层节点<ul>，同时传入过滤条件。如果ul不符合条件，返回空jQuery对象

var swift = $('#swift');

swift.next(); // Scheme
swift.next('[name=haskell]'); // 空的jQuery对象，因为Swift的下一个元素Scheme不符合条件[name=haskell]

swift.prev(); // Python
swift.prev('.dy'); // Python，因为Python同时符合过滤器条件.dy

var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
var a = langs.filter('.dy'); // 拿到JavaScript, Python, Scheme

//或者传入一个函数，要特别注意函数内部的this被绑定为DOM对象，不是jQuery对象：
var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
langs.filter(function () {
    return this.innerHTML.indexOf('S') === 0; // 返回S开头的节点
}); // 拿到Swift, Scheme

var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
var js = langs.first(); // JavaScript，相当于$('ul.lang li:first-child')
var haskell = langs.last(); // Haskell, 相当于$('ul.lang li:last-child')
var sub = langs.slice(2, 4); // Swift, Scheme, 参数和数组的slice()方法一致

/*
Practice:
输入值后，用jQuery获取表单的JSON字符串，key和value分别对应每个输入的name和相应的value，例如：{"name":"Michael","email":...}

<form id="test-form" action="#0" onsubmit="return false;">
    <p><label>Name: <input name="name"></label></p>
    <p><label>Email: <input name="email"></label></p>
    <p><label>Password: <input name="password" type="password"></label></p>
    <p>Gender: <label><input name="gender" type="radio" value="m" checked> Male</label> <label><input name="gender" type="radio" value="f"> Female</label></p>
    <p><label>City: <select name="city">
    	<option value="BJ" selected>Beijing</option>
    	<option value="SH">Shanghai</option>
    	<option value="CD">Chengdu</option>
    	<option value="XM">Xiamen</option>
    </select></label></p>
    <p><button type="submit">Submit</button></p>
</form>

 */

function jsonForm(){
    let obj = {};
    $('#test-form input, #test-form select')
        .filter(function(){
            // 未checked 且是gender
            if(!this.checked && this.name=='gender') return false;
            return true;
        })
        .map(function () {
                obj[this.name] = this.value;
                return;
            }
        );
    return JSON.stringify(obj, null, " ");
}

/*

prop()方法和attr()类似，但是HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种，例如：

<input id="test-radio" type="radio" name="test" checked value="1">
等价于：

<input id="test-radio" type="radio" name="test" checked="checked" value="1">
attr()和prop()对于属性checked处理有所不同：

var radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true
prop()返回值更合理一些。不过，用is()方法判断更好：

var radio = $('#test-radio');
radio.is(':checked'); // true
类似的属性还有selected，处理时最好用is(':selected')。
 */

/*
练习
除了列出的3种语言外，请再添加Pascal、Lua和Ruby，然后按字母顺序排序节点：

<!-- HTML结构 -->
<div id="test-div">
    <ul>
        <li><span>JavaScript</span></li>
        <li><span>Python</span></li>
        <li><span>Swift</span></li>
    </ul>
</div>
 */

function sortAndAppend() {
    let arr = $('#test-div span').map(function () {
        return this.innerHTML;
    }).get();
    arr.push('Pascal', 'Lua', 'Ruby');
    arr.sort();

    $('#test-div').find('li').remove();
    arr.forEach(function (data) {
        $('#test-div ul').append($('<li><span>' + data+'</span></li>'))
    })
}

/*
对如下的Form表单：

<!-- HTML结构 -->
<form id="test-form" action="test">
    <legend>请选择想要学习的编程语言：</legend>
    <fieldset>
        <p><label class="selectAll"><input type="checkbox"> <span class="selectAll">全选</span><span class="deselectAll">全不选</span></label> <a href="#0" class="invertSelect">反选</a></p>
        <p><label><input type="checkbox" name="lang" value="javascript"> JavaScript</label></p>
        <p><label><input type="checkbox" name="lang" value="python"> Python</label></p>
        <p><label><input type="checkbox" name="lang" value="ruby"> Ruby</label></p>
        <p><label><input type="checkbox" name="lang" value="haskell"> Haskell</label></p>
        <p><label><input type="checkbox" name="lang" value="scheme"> Scheme</label></p>
		<p><button type="submit">Submit</button></p>
    </fieldset>
</form>
绑定合适的事件处理函数，实现以下逻辑：

当用户点击“反选”时，自动把所有语言状态反转（选中的变为未选，未选的变为选中）；





'use strict';

 */

var
    form = $('#test-form'),
    langs = form.find('[name=lang]'),
    selectAll = form.find('label.selectAll :checkbox'),
    selectAllLabel = form.find('label.selectAll span.selectAll'),
    deselectAllLabel = form.find('label.selectAll span.deselectAll'),
    invertSelect = form.find('a.invertSelect');

// 重置初始化状态:
form.find('*').show().off();
form.find(':checkbox').prop('checked', false).off();
deselectAllLabel.hide();
// 拦截form提交事件:
form.off().submit(function (e) {
    e.preventDefault();
    alert(form.serialize());
});

function toggleAll(){
    let checkboxes = form.find(":checkbox").not(':first');
    if($(this).prop('checked')){
        //当用户勾上“全选”时，自动选中所有语言，并把“全选”变成“全不选”；
        selectAllLabel.hide();
        deselectAllLabel.show();
        checkboxes.prop("checked", true);
    }else{
        // 当用户去掉“全不选”时，自动不选中所有语言；
        selectAllLabel.show();
        deselectAllLabel.hide();
        checkboxes.prop("checked", false);
    }
}

//当用户点击“反选”时，自动把所有语言状态反转（选中的变为未选，未选的变为选中）；
function reverseSelect(){
    let checkboxes = form.find(":checkbox").not(':first');
    let checked =    checkboxes.filter(function () {
            return $(this).prop('checked')
    })
    let unchecked =  checkboxes.not(':checked');
    checked.prop("checked", false);
    unchecked.prop("checked", true);
}

function allSelectCheck(){
    let checkboxes = form.find(":checkbox").not(':first');
    let all = form.find(":checkbox").first();
    //or like this
    //let all = form.find(':checkbox:first');
    let checked =    checkboxes.filter(function () {
        return $(this).prop('checked')
    });
    //当用户把所有语言都手动勾上时，“全选”被自动勾上，并变为“全不选”；
    if(checked.length == checkboxes.length){
        all.prop('checked', true);
        selectAllLabel.hide();
        deselectAllLabel.show();
    }else{
        //当用户手动去掉选中至少一种语言时，“全不选”自动被去掉选中，并变为“全选”。
        all.prop('checked', false);
        selectAllLabel.show();
        deselectAllLabel.hide();
    }
}
selectAll.on('click', toggleAll);
invertSelect.on('click', reverseSelect);
form.find(':checkbox').not(':first').on('click', allSelectCheck);