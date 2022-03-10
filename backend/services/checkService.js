const model = require('../models')
const ErrorCode = require('../dto/errorCode')

const getByCardId = async(cardId) => {
  if (!cardId) return []

  model.user.hasMany(model.checkList, {foreignKey: 'creator_id'})
  model.checkList.belongsTo(model.user, {foreignKey: 'creator_id'})

  return await model.checkList.findAll({
    where: { card_id: cardId }
  })
}

const create = (body, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!(body.cardId && body.title)) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const check = {
        card_id: body.cardId,
        title: body.title,
        creator_id: userId
      }

      const result = await model.checkList.create(check)
      result.save()
      resolve(result);
    } catch(err) {
      console.error(">> checkService > create > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const update = (body) => {
  return new Promise(async (resolve, reject) => {
    if(!body.checkId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const check = await model.checkList.findByPk(body.checkId);
      if (!check) reject(ErrorCode.NO_DATA)

      check.title = body.title
      check.modified_at = new Date()

      await check.save()
      resolve({ check: check })
    } catch(err) {
      console.error(">> checkService > update > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const remove = (checkId) => {
  return new Promise(async (resolve, reject) => {
    if (!checkId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      await model.checkList.destroy({ where: { check_list_id: checkId } })
      resolve(ErrorCode.SUCCESS)
    } catch(err) {
      console.error(">> checkService > remove > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

module.exports = {
    getByCardId,
    create,
    update,
    remove,
}