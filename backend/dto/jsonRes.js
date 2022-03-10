const ErrorCode = require('./errorCode');

module.exports = (...args) => {

  const setErrorCode = (result, code) => {
    return {
      result: result,
      code: code
    }
  }

  if (args.length === 0) {
    const code = ErrorCode.SUCCESS
    return setErrorCode(code.result, code.code)
  }

  if (args.length === 1) {
    return setErrorCode(args[0].result, args[0].code)
  }

  if (args.length === 2) {
    return setErrorCode(args[0], args[1])
  }

}