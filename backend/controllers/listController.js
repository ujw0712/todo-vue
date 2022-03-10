const listService = require('../services/listService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')

const getListWithCard = async(req, res) => {
  try {
    const obj = await listService.getListWithCard()
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const create = async(req, res) => {
  try {
    const obj = await listService.create(req.body)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const update = async(req, res) => {
  try {
    const obj = await listService.update(req.body)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const remove = async(req, res) => {
  try {
    const obj = await listService.remove(req.params.listId)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

const move = async(req, res) => {
  try {
    const obj = await listService.move(req.params.listId, req.body)
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}

module.exports = {
  getListWithCard,
  create,
  update,
  remove,
  move,
}