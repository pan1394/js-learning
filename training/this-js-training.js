/**
 * this 指向 obj.method() 中obj本身， 类似python self
 * @type {{name: string, birth: number, age: (function(): number), age2: (function(): *)}}
 */

function getAge2() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    },
    age2: function () {
        let that = this;
        function getAge() {
            var y = new Date().getFullYear();
            return y - that.birth;
        }
        return getAge();
    },
    age3: getAge2,
    // 箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。
    age4: function () {
        let fn = () => new Date().getFullYear() - this.birth;
        return fn();
    }
};

console.log('age():',  xiaoming.age());
console.log('age2():', xiaoming.age2());
console.log('age3():', xiaoming.age3());
console.log('age4():', xiaoming.age4());

// this执行一个空对象{}
console.log(this);
//函数fn中变量this 被指向window or undefined
var fn = xiaoming.age;
//此函数中this.birth 为undefined.
console.log(fn());

//类似java reflection机制
console.log(getAge2.apply(xiaoming, []));
console.log(getAge2.call(xiaoming))

//普通函数使用null绑定主调对象。
//测试后， 其实主调对象可以为任何对象， 包含this, null, undefined, string, number,
//类似java static method, 不依赖任何对象，独立存在于内存中。
console.log(Math.max.call(1, 1,3));
console.log(Math.min.apply('null', [1,3]));

//现在假定我们想统计一下代码一共调用了多少次parseInt()，可以把所有的调用都找出来，然后手动加上count += 1，
// 不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()：

'use strict';

var count = 0;
var oldParseInt = parseInt; // 保存原函数

parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};

//test parseInt调用情况
parseInt('1');
parseInt(2);
parseInt('2', 2);
console.log("How many times of parseInt function has been invoked? - Answer: " + count);