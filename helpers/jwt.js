const jwt = require("jsonwebtoken");

module.exports = {
    signJwt: (payload)=> jwt.sign(payload, process.env.JWT_KEY),
    verifyJWT: (token)=> jwt.verify(token, process.env.JWT_KEY)
}