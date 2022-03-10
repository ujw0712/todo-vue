const commentService = require('../services/commentService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')

const getByCardtId = async(req, res) => {
  try {
    const obj = await commentService.getByCardtId()
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const create = async(req, res) => {
  try {
    const obj = await commentService.create(req.body, req.auth.user_id)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const update = async(req, res) => {
  try {
    const obj = await commentService.update(req.body)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const remove = async(req, res) => {
  try {
    const obj = await commentService.remove(req.params.commentId)
    res.json( JsonResT(obj) )
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

module.exports = {
  getByCardtId,
  create,
  update,
  remove
}