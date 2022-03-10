const boardService = require('../services/boardService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')

const getList = async(req, res) => {
  try {
    const obj = await boardService.getList()
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const create = async(req, res) => {
  try {
    const obj = await boardService.create(req.body, req.auth.user_id)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const update = async(req, res) => {
  try {
    const obj = await boardService.update(req.body)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const remove = async(req, res) => {
  try {
    const obj = await boardService.remove(req.params.id)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

module.exports = {
  getList,
  create,
  update,
  remove,
}