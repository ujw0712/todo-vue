const model = require('../models')
const ErrorCode = require('../dto/errorCode')
const checkService = require('../services/checkService')
const commentService = require('../services/commentService')
const { publish } = require("../utils/mqtt");

const getByListId = async(listId) => {
  if (!listId) return []

  model.user.hasMany(model.card, {foreignKey: 'creator_id'})
  model.card.belongsTo(model.user, {foreignKey: 'creator_id'})

  return await model.card.findAll({
    where: { list_id: listId },
    include: [
      {
        model: model.user,
        required: true
      },
    ]
  })
}

const create = (body, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!(body.listId && body.title)) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const sort = await model.card.max('sort', {where : {'list_id': body.listId }})
      const card = {
        list_id: body.listId,
        title: body.title,
        content: (body.content != '') ? body.content : undefined,
        start_date: (body.start_date != '') ? body.start_date : undefined,
        end_date: (body.end_date != '') ? body.end_data : undefined,
        sort: sort ? sort+1 : 1,
        creator_id: userId,
      }

      const result = await model.card.create(card)
      result.save()
      resolve(result);
    } catch(err) {
      console.error(">> cardService > create > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const getDetail = (cardId) => {
  return new Promise(async (resolve, reject) => {
    model.card.hasMany(model.cardComment, {foreignKey: 'card_id'})
    model.cardComment.belongsTo(model.card, {foreignKey: 'card_id'})

    model.card.hasMany(model.checkList, {foreignKey: 'card_id'})
    model.checkList.belongsTo(model.card, {foreignKey: 'card_id'})
    try{
      const card = await model.card.findAll({
        where: { card_id: cardId },
        include: [
          {
            model: model.checkList,
            required: false,
            where: { card_id: cardId }
          },
          {
            model: model.cardComment,
            required: false,
            where: { card_id: cardId }
          }
        ]
      })

      resolve({
        card: card
       })
    } catch(err) {
      console.error(">> cardService > cardDetail > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION)
    }
  })
}

const update = (body) => {
  return new Promise(async (resolve, reject) => {
    if(!body.cardId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const card = await model.card.findByPk(body.cardId);
      if (!card) reject(ErrorCode.NO_DATA)

      card.title = body.title
      card.content = (body.content != '') ? body.content : null
      card.start_date = (body.start_date != '') ? body.start_date : null
      card.end_date = (body.end_date != '') ? body.start_date : null
      card.modified_at = new Date()

      await card.save()

      resolve({ card: card })
    } catch(err) {
      console.error(">> cardService > update > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const remove = (cardId) => {
  return new Promise(async (resolve, reject) => {
    if (!cardId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      await model.checkList.destroy({ where: { card_id: cardId } })
      await model.cardComment.destroy({ where: { card_id: cardId } })
      await model.card.destroy({ where: { card_id: cardId } })

      publish(['card', 'CD', {
        card_id: cardId,
      }])

      resolve(ErrorCode.SUCCESS)
    } catch(err){
      console.error(">> cardService > remove > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

module.exports = {
  getByListId,
  create,
  getDetail,
  update,
  remove,
}