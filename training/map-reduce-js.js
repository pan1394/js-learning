//practice1
//如果我们继续改进这个例子，想办法把一个字符串13579先变成Array——[1, 3, 5, 7, 9]，再利用reduce()就可以写出一个把字符串转换为Number的函数。
//练习：不要使用JavaScript内置的parseInt()函数，利用map和reduce操作实现一个string2int()函数：
function string2int(str){
    return str.split('').map(x => x/1).reduce( (a,b) => a*10 + b);
}

//practice2
// 请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']。
function normalize(arr) {
    return arr.map(function (x) {
        return x[0].toUpperCase() + x.substr(1).toLowerCase();
        // let tmpArr = x.toLowerCase().split('');
        // let aChar = tmpArr.shift().toUpperCase();
        // tmpArr.unshift(aChar);
        // return tmpArr.join('');
    });
}