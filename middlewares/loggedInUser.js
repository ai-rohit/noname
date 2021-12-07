const {CustomError, jwt} = require("../helpers");
const {User} = require("../models");
async function loggedInUser(req,res,next){
    let token;
    console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new CustomError("401 Not logged in", 401))
    }
    const decoded = jwt.verifyJWT(token,process.env.JWT_KEY);
    console.log(decoded);
    const freshUser = await User.findById(decoded.userId);
    if(!freshUser){
        return next(new CustomError("The user no longer exist",401))
    }
    if(freshUser.changedPassword(decoded.iat)){
       
        return next(new CustomError('User recently changed the password, Please login to continue',401))
    }
    req.user = freshUser;
    return next();
}
module.exports = loggedInUser;