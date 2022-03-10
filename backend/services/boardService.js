const model = require('../models')
const ErrorCode = require('../dto/errorCode')

const getList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      model.user.hasMany(model.board, {foreignKey: 'creator_id'})
      model.board.belongsTo(model.user, {foreignKey: 'creator_id'})

      const list = await model.board.findAll({
        include: [
          {
            model: model.user,
            required: true
          },
        ]
      })

      resolve({ list: list })
    } catch(err) {
      console.error(">> boardService > getList > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const create = (body, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!body.title) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const result = await model.board.create({
        title: body.title,
        content: body.content,
        creator_id: userId,
      })
      result.save()
      resolve(result)
    } catch(err) {
      console.error(">> boardService > create > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}


const update = (body) => {
  return new Promise(async (resolve, reject) => {
    if (!body.id) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const board = await model.board.findByPk(body.id);
      if (!board) reject(ErrorCode.NO_DATA)

      board.title = body.title
      board.content = body.content
      board.modified_at = new Date()
      await board.save()

      resolve({ board: board })
    } catch(err) {
      console.error(">> boardService > update > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}


const remove = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) reject(ErrorCode.INVALID_PARAMETER)
    try {
      await model.board.destroy({ where: { id: id } })
      resolve(ErrorCode.SUCCESS)
    } catch(err) {
      console.error(">> boardService > remove > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

module.exports = {
  getList,
  create,
  update,
  remove,
}