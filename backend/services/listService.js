const model = require('../models')
const ErrorCode = require('../dto/errorCode')
const cardService = require('../services/cardService')
const sequelize = require("sequelize");
const Op = sequelize.Op

const { publish } = require('../utils/mqtt')

const getListWithCard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const list = await model.list.findAll({
        order: [
          ['sort', 'ASC'],
        ],
      })

      resolve({
        list: await Promise.all(
          list.map(async(l) => ({...JSON.parse(JSON.stringify(l)), card: await cardService.getByListId(l.list_id)}))
        )
      });
    } catch(err) {
      console.error(">> listService > getListWithCard > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const create = (body) => {
  return new Promise(async (resolve, reject) => {
    if (!body.title) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const sort = await model.list.max('sort')
      const list = {
        title: body.title,
        sort: sort ? sort+1 : 1,
        color: '#FFD8D8',
      }

      const result = await model.list.create(list)
      result.save()

      publish(['list', 'AL', {
        list_id: result.list_id,
        title: result.title,
        color: result.color,
      }])

      resolve(result)
    } catch(err) {
      console.error(">> listService > create > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const update = (body) => {
  return new Promise(async (resolve, reject) => {
    if (!body.listId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const list = await model.list.findByPk(body.listId);
      if (!list) reject(ErrorCode.NO_DATA)

      if (body.title) list.title = body.title
      if (body.color) list.color = body.color

      await list.save()

      publish(['list', 'UL', {
        list_id: list.list_id,
        title: list.title,
        color: list.color,
      }])

      resolve({ list: list })
    } catch(err) {
      console.error(">> listService > update > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const remove = (listId) => {
  return new Promise(async (resolve, reject) => {
    if (!listId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      publish(['list', 'DL', {
        list_id: listId
      }])

      await model.card.destroy({ where: { list_id: listId } })
      await model.list.destroy({ where: { list_id: listId } })

      resolve(ErrorCode.SUCCESS)
    } catch(err) {
      console.error(">> listService > remove > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const move = (listId, body) => {
  return new Promise(async (resolve, reject) => {
    if (!listId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const list = await model.list.findByPk(listId);
      if (!list) reject(ErrorCode.NO_DATA)

      const result = await list.update(
        { sort: body.toSort },
        { where : { list_id: listId } }
      )

      if (body.fromSort > body.toSort) {
        const sortUpdate = await model.list.update(
          { 'sort' : sequelize.literal('sort + 1')},
          { where:
            {
              sort: { [Op.between]: [body.toSort, body.fromSort] } ,
              list_id: {[Op.ne]: listId}
            }
          }
        )
      } else {
        const sortUpdate = await model.list.update(
          { 'sort' : sequelize.literal('sort - 1')},
          { where:
            {
              sort: { [Op.between]: [body.fromSort, body.toSort] } ,
              list_id: {[Op.ne]: listId}
            }
          },
        )
      }

      resolve({ list: list })
    } catch(err) {
      console.error(">> listService > update > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

module.exports = {
  getListWithCard,
  create,
  update,
  remove,
  move,
}