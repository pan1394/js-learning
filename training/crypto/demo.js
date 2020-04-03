const crypto = require('crypto');

//md5 sha1 sha256 sha512 哈希算法
const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544

//只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'));