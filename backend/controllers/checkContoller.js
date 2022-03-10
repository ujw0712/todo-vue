const checkService = require('../services/checkService')
const JsonResT = require('../dto/jsonResT')
const JsonRes = require('../dto/jsonRes')

const getByCardId = async(req, res) => {
  try {
    const obj = await checkService.getByCardId()
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const create = async(req, res) => {
  try {
    const obj = await checkService.create(req.body, req.auth.user_id)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const update = async(req, res) => {
  try {
    const obj = await checkService.update(req.body)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const remove = async(req, res) => {
  try {
    const obj = await checkService.remove(req.params.checkId)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

module.exports = {
  getByCardId,
  create,
  update,
  remove,
}