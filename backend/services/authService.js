const jwt = require('jsonwebtoken')
// const { v4 } = require('uuid') // console.log(" v4() : ", v4())
const sequelize = require('sequelize')
const model = require('../models')
const ErrorCode = require('../dto/errorCode')

const getToken = (claim) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      claim,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '24h',
        issuer: 'todo.com',
        subject: 'authorization'
      },
      (err, token) => {
        if (err) {
          reject(ErrorCode.UNAUTHORIZED);
        }
        resolve(token);
      }
    )
  });
}

const signin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let user = null

    try {
      user = await model.user.findOne({ where: { email: email } })

      if (!user) {
        reject(ErrorCode.NO_USER_ACCOUNT)
      } else {
        const result = await user.verify(password)

        if (result) {
          const claim = {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
          };
          console.log("> claim : ", claim)

          const token = await getToken(claim)
          console.log("> token : ", token)
          user.login_at = sequelize.fn('NOW')
          await user.save();

          console.log("> user : ", user)
          resolve({ token: token })
        } else {
          reject(ErrorCode.UNAUTHORIZED)
        }
      }
    } catch (err) {
      console.error(">> authService > signin > err.message : ", err.message)
      reject(ErrorCode.INTERNAL_EXCEPTION)
    }
  });
}


module.exports = {
  signin,
}