function a(){
    console.log('hello world');
}

let str = "aBCd";
console.log(str.toLowerCase());
console.log(str.toLocaleLowerCase());
var a = "jack";
let b = "perter";
// console.log(window)
console.log("a:" + a + ", b:" + b);
let invokeCnt = 0;
let oldParseInt = parseInt;
parseInt = function(){
    invokeCnt += 1;
    return oldParseInt(arguments);
}

console.log(parseInt("1.0"));
console.log(parseInt("2.11"));
console.log("you have call parseInt " + invokeCnt+ " time(s).")

function string2int(s) {
    let arr = s.split('');
    let arr2 = arr.map(function (x) {
        return x/1;
    })
    let res  = arr2.reduce(function (x, y) {
        return x * 10 + y;
    })
    return res;
}

function normalize(arr) {
    let res = arr.map(function(x){
        x =  x.toLowerCase();
        let init = x.substr(0, 1);
        let cap =  init.toUpperCase();
        return x.replace(init, cap);
    });
    return res;
}

console.log(typeof string2int("12345"));
console.log(normalize(["hello", "jack", "Masdf"]));