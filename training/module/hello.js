function say(word){
    console.log('Hello, ', word, '!')
}

function fly(){
    console.log('This is a joke!');
}

module.exports.say = say;
module.exports.fly = fly;