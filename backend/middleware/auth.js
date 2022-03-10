const jwt = require('jsonwebtoken')
const JsonRes = require("../dto/JsonRes")
const ErrorCode = require('../dto/errorCode')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1]

    if (!token) {
      return res.status(403).json(JsonRes(ErrorCode.TOKEN_REQUIRED))
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("> authMiddleware > jwt.verify - err.message : ", err.message)
        res.status(401).json(JsonRes(ErrorCode.UNAUTHORIZED))
      } else {
        if (decoded) {
          req.auth = decoded;

          next();
        } else {
          res.status(401).json(JsonRes(ErrorCode.EXPIRED_TOKEN))
        }
      }
    });
  } catch (err) {
    console.log("> authMiddleware - err.message : ", err.message)
    return res.status(403).json(JsonRes(ErrorCode.TOKEN_REQUIRED))
  }
}

module.exports = authMiddleware