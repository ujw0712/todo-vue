const cardService = require('../services/cardService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')

const create = async(req, res) => {
  try {
    const obj = await cardService.create(req.body, req.auth.user_id)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const getDetail = async(req, res) => {
  try{
    const obj = await cardService.getDetail(req.params.cardId)
    res.json( JsonResT(obj) )
  }catch(err) {
    res.json( JsonRes (err))
  }
}

const update = async(req, res) => {
  try {
    const obj = await cardService.update(req.body)
    res.json( JsonResT(obj) );

  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const remove = async(req, res) => {
  try {
    const obj = await cardService.remove(req.params.cardId)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )

  }
}

module.exports = {
  create,
  getDetail,
  update,
  remove,
}