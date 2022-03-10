const authService = require('../services/authService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')

const signin = (req, res) => {
  authService.signin(req.body.email, req.body.password).then(obj => {
    res.json( JsonResT(obj) )
  }).catch(err => {
    console.log(">> authController > signin > err.message : ", err.message)
    res.json( JsonRes(err) )
  });
}

module.exports = {
  signin,
}