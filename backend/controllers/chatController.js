const chatService = require('../services/chatService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')

const getList = async(req, res) => {
  try {
    const obj = await chatService.getList()
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const create = async(req, res) => {
  try {
    const obj = await chatService.create(req.body, req.auth.user_id)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}
module.exports = {
  getList,
  create,
}