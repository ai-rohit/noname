module.exports.greet = function(name){
    return 'Welcome '+name;
}

module.exports.getCurrencies = function(){
    return ["USD", "CAD", "Rs"];
}

module.exports.getProduct = function(product){
    return {productId : product, price:20};
}

module.exports.registerUser = function(username){
    if(!username) throw new Error("Username is requried");

    return {id: new Date().getTime(), username: username};
}

module.exports.fizzbuzz = function(input){
    if(typeof input !== "number"){
        throw new Error("Input should be a number.");
    }
    if((input%3==0)&&(input%5==0)){
        return "FizzBuzz";
    }
    if(input%3==0){
        return "Fizz";
    }
    if(input%5==0){
        return "Buzz";
    }
    return input;
}