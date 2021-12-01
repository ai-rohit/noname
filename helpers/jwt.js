const jwt = require("jsonwebtoken");

module.exports = {
    signJwt: (payload)=> jwt.sign(payload, process.env.JWT_KEY)
}