const model = require('../models')
const ErrorCode = require('../dto/errorCode')

const getByCardId = async(cardId) => {
  if (!cardId) return []

  model.user.hasMany(model.cardComment, {foreignKey: 'creator_id'})
  model.cardComment.belongsTo(model.user, {foreignKey: 'creator_id'})

  return await model.cardComment.findAll({
    where: { card_id : cardId }
  })
}

const create = (body, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!(body.cardId && body.title)) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const comment = {
        card_id: body.cardId,
        comment: body.title,
        creator_id: userId,
      }

      const result = await model.cardComment.create(comment)
      result.save()
      resolve(result);
    } catch(err) {
      console.error(">> commentService > create > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

const update = (body) => {
  return new Promise(async (resolve, reject) => {
    if (!body.commentId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      const comment = await model.cardComment.findByPk(body.commentId)
      if (!comment) reject(ErrorCode.NO_DATA)

      comment.comment = body.title
      comment.modified_at = new Date()

      await comment.save()
      resolve({ comment: comment })
    } catch(err) {
      console.error(">> commentService > update > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION)
    }
  })
}

const remove = (commentId) => {
  return new Promise( async (resolve, reject) => {
    if (!commentId) reject(ErrorCode.INVALID_PARAMETER)
    try {
      await model.cardComment.destroy({ where: {comment_id: commentId} })
      resolve(ErrorCode.SUCCESS)
    } catch(err) {
      console.error(">> commentService > remove > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION)
    }
  })
}

module.exports = {
  getByCardId,
  create,
  update,
  remove,
}