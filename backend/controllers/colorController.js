const colorService = require('../services/colorService')
const JsonResT = require('../dto/JsonResT')
const JsonRes = require('../dto/JsonRes')


const getColorList = async(req, res) => {
  try {
    const obj = await colorService.getColorList()
    res.json( JsonResT(obj) );
  } catch(err) {
    res.json( JsonRes(err) )
  }
}


module.exports = {
  getColorList,
}