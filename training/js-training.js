/*
Array
 */


function assert(actual, expected, msg) {
    let desc = 'actual : ' + actual + ", expected: " + expected;
    if (actual === expected) {
        console.log('they\'re equal. -> ' + desc);
    } else {
        if (msg) {
            console.log(msg);
        } else {
            console.log("wrong at " + desc);
        }
    }
}


let arr = ['A', 'C', 'B', 'jack', 'lily', 'sam'];
arr.push('lilei', 'hanmeimei');
console.log(arr);
console.log(arr.slice(1, 3));           //切片
let arr0 = arr.map( a =>  a.toUpperCase().slice(0,1) );
console.log(arr0.sort());

// assert(arr.slice(1,3), ['B', 'C']);
let arr2 = arr.slice();                 //拷贝
arr2.push('stack', 'push')              //尾部添加 [... 'stack', 'push']
assert(arr2.pop(), 'push');    //栈板弹出
assert(arr2.pop(), 'stack');

arr2.unshift('aaa', 'bbb');      //头部添加 ['aaa', 'bbb', ...]
assert(arr2.shift(), 'aaa');
assert(arr2.shift(), 'bbb');

let arr3 = arr.slice().reverse();              //翻转
console.log(arr3);

let arr4 = arr.slice().sort();                 //默认排序
console.log(arr4);
//自定义排序， 比较函数作为参数传递
let arr5 = arr.slice().sort(  (a,b) => a.slice(0,1).toLowerCase() > b.slice(0,1).toLowerCase() ? -1 : 1 );
console.log(arr5);

let arr6 = [100, 10, 299, 1, 33];
console.log(arr6);
console.log(arr6.slice().sort());              //默认排序， 使用字符ascii比较
console.log(arr6.slice().sort((a, b) => b-a ));    //数学排序
console.log(arr6);

/*
splice
splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：
*/
var arrx = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arrx.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arrx; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arrx.splice(2, 2); // ['Google', 'Facebook']
arrx; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arrx.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arrx; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']

//concat
let arr7 = [1,2,5];
let arr8 = arr7.concat(100, 101, [32,33], 102);               //源数组不变， 返回拼接对象。
console.log(arr7);
console.log(arr8);

Array.prototype.clone = function () {
   return this.slice();
}

let cloned = arr7.clone();
console.log(arr7);
console.log(cloned);


//对于数组，除了map()、reduce、filter()、sort()这些方法可以传入一个函数外，Array对象还提供了很多非常实用的高阶函数。
//方法可以判断数组的所有元素是否满足测试条件。
//arr.every()

//查找符合条件的第一个元素，如果找到了，返回这个元素，否则，返回undefined：
//arr.find()

//也是查找符合条件的第一个元素，不同之处在于findIndex()会返回这个元素的索引，如果没有找到，返回-1：
// arr.findIndex()

//arr.forEach()