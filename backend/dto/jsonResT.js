const JsonRes = require('./jsonRes')

module.exports = (obj) => {

  if (!obj) {
    return JsonRes()
  }

  if (obj) {
    return {
      ...JsonRes(),
      data: obj
    }
  }

}