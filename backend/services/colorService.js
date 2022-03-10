const model = require('../models')
const ErrorCode = require('../dto/errorCode')
const cardService = require('../services/cardService')

const getColorList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const list = await model.color.findAll({
        order: [
          ['sort', 'ASC'],
        ],
      })

      resolve({
        list: await Promise.all(
          list.map(async(l) => ({...JSON.parse(JSON.stringify(l))}))
        )
      });
    } catch(err) {
      console.error(">> listService > getColorList > err.message : ", err.message)
      reject(ErrorCode.DATABASE_EXCEPTION);
    }
  })
}

module.exports = {
    getColorList,
}