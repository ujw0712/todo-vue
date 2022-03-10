const model = require('../models')
const ErrorCode = require('../dto/errorCode')

const getList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      model.user.hasMany(model.chat, {foreignKey: 'creator_id'})
      model.chat.belongsTo(model.user, {foreignKey: 'creator_id'})

      resolve({ list: await model.chat.findAll({
          include: [
            {
              model: model.user,
              required: true
            },
          ]
        })
      });
    } catch(err) {
      console.error(">> chatService > getList > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const create = (body, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!body.message) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const chat = {
        message: body.message,
        creator_id: userId,
      }
      const result = await model.chat.create(chat)
      result.save()
      resolve(result);
    } catch(err) {
      console.error(">> chatService > create > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

module.exports = {
  getList,
  create,
}