Date.prototype.$getYYYYMMDD = function(str='') {
  let date = this
  const year = date.$getYear()
  const month = date.$getMonth(true)
  const dates = date.$getDate(true)
  return `${year}${str}${month}${str}${dates}`
}

Date.prototype.$getYYYYMMDDNumber = function() {
  let date = this
  const year = date.$getYear()
  const month = date.$getMonth(true)
  const dates = date.$getDate(true)
  return Number(`${year}${month}${dates}`)
}

Date.prototype.$getYYYYMMNumber = function() {
  let date = this
  const year = date.$getYear()
  const month = date.$getMonth(true)
  return Number(`${year}${month}`)
}

Date.prototype.$getDateFormat = function(days = 0, str='') {
  let date = this
  if (days !== 0) {
    const time = date.getTime()
    date = new Date(time + (86400 * days * 1000))
  }
  return date.$getYYYYMMDD(str)
}
Date.prototype.$getDateCalculate = function(days = 0) {
  let date = this
  if (days !== 0) {
    const time = date.getTime()
    date = new Date(time + (86400 * days * 1000))
  }
  return date
}

Date.prototype.$getYear = function(is2Digits) {
  let date = this
  if (is2Digits) return date.getFullYear().toString().substring(2)
  return date.getFullYear()
}

Date.prototype.$getMonth = function(is2Digits) {
  let date = this
  if (is2Digits) return ("0" + (date.getMonth()+1)).slice(-2)
  return date.getMonth() + 1;
}

Date.prototype.$getDate = function(is2Digits) {
  let date = this
  if (is2Digits) return ("0" + date.getDate()).slice(-2)
  return date.getDate();
}

Date.prototype.$getLocaleDateString = function() {
  return this.toLocaleDateString(navigator.language, {  year: 'numeric', month: 'long', day: 'numeric' });
}

Date.prototype.$getLocaleTimeString = function() {
  return this.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}


export default {
  install(app, options) {
    const util = {}

    util.initDate = function(date) {
      const isDate = (date) => {
        if (typeof date === 'object' && date instanceof Date) return true
        return false
      }
      if (!date) return null
      if (typeof date === 'string') date = date.replace(/\-/gi, "/").replace(/T/g, ' ').replace(/Z/g, '')
      if (isDate(date)) return date
      else              return new Date(date)
    }

    app.provide('dateUtil', util)
  }
}
