Number.prototype.numberFormat = function() {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Number.prototype.numberFormatToKorean = function() {
  const inputNumber  = this < 0 ? false : this;
  const splitUnit    = 10000;

  if (inputNumber < splitUnit) {
    return inputNumber.numberFormat()
  }
  else {
    return Math.floor(inputNumber / splitUnit).numberFormat() + '만';
  }
}

String.prototype.stripTag = function() {
  var text = this.replace(/<br>/ig, "\n")
  text = text.replace(/<br\/>/ig, "\n")
  text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")

  return text
}

String.prototype.getQueryString = function(key) {
  var _parammap = {}

  this.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
    function decode(s) {
      return decodeURIComponent(s.split("+").join(" "))
    }

    _parammap[decode(arguments[1])] = decode(arguments[2])
  });

  return _parammap[key]
}

String.prototype.patternCheck = function(flag) {
  var pattern = ''

  switch (flag) {
    //영문만 유효성 검사
    case 'eng':
      pattern = /^[a-z|A-Z]+$/
      break
    //영문,숫자 유효성 검사
    case 'engnum':
      pattern = /^[(a-z|A-Z)0-9]+$/
      break
    //아이디 영문,숫자,underbar(_) 사용 유효성 검사
    case 'id':
      // pattern = /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/
      pattern = /^([a-z|A-Z|0-9|])*$/ // 영문, 숫자만
      break
    //정수 유효성 검사
    case 'num':
      pattern = /^[0-9]+$/
      break
    //영문,숫자 혼합사용 유효성 검사
    case 'wordnum':
      pattern = /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/
      break
    //이메일 유효성 검사
    case 'email':
      pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      break
    //비밀번호 유효성 검사: 영문,숫자,특수문자 조합의 8 ~ 20자.
    case 'password':
      pattern = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/
      break
    //닉네임 유효성 검사: 2~15자 이내의 한글,영문,숫자만.
    case 'nickName':
      pattern = /^([ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]){2,15}$/
      break
    //이름 유효성 검사: 2~15자 이내의 한글,영문,숫자만.
    case 'name':
      pattern = /^([ㄱ-ㅎ|가-힣|]){2,15}$/
      break
    // 휴대폰 번호
    case 'phone':
      pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/
      break
    //사업자등록번호 유효성 검사
    case 'bizNum':
      pattern = /^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})$/
      break
    //URL 유효성 검사
    case 'url':
      pattern = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi
      break
  }

  return pattern.test(this.toString())
}

String.prototype.nl2br = function() {
  if (this.trim().length > 0 || this.trim()) {
    /*return this.trim().replace(/\n/g, "<br>")*/
    return this.trim().replace(/(?:\r\n|\r|\n)/g,'</br>')
  } else {
    return ""
  }
}

String.prototype.isEmpty = function(str) {
  if (this.length === 0 || this === null || this === undefined) {
    if (str != '' && str !== undefined) {
      return str
    } else {
      return ''
    }
  } else {
    return this
  }
}

String.prototype.thumbnail = function() {
  var path = this.split('/')
  return path[0] + '/thumb/' + path[1]
}

String.prototype.getAge = function() {
  let sp = this.split('-')
  let date = new Date(sp[0], sp[1], sp[2], 0, 0, 0)
  let now = new Date()
  let age = now.getFullYear() - date.getFullYear()

  if (date.getMonth() < now.getMonth()) {
    age--
  } else if (date.getDate() < now.getDate()) {
    age--
  }

  return age
}

//=========================================================================
//  함수 명 : phoneNumber
//  함수 설명 : 핸드폰 번호 대쉬 삽입 처리
//=========================================================================
String.prototype.phoneNumber = function() {
  let str = ''
  const len = this.length

  if (len == 9) {
    str = this.substr(0, 2) + '-' + this.substr(2, 3) + '-' + this.substr(5, 4)
  } else if (len == 10) {
    str = this.substr(0, 3) + '-' + this.substr(3, 3) + '-' + this.substr(6, 4)
  } else if (len == 11) {
    str = this.substr(0, 3) + '-' + this.substr(3, 4) + '-' + this.substr(7, 4)
  }

  return str
}

//=========================================================================
//  함수 명 : mask
//  함수 설명 : 각종 마스킹 처리
//=========================================================================
String.prototype.mask = function(type='')  {
  let str = '', email = '', addr = ''

  // 설정 값을 받아 그에 맞게 마스킹 처리 한다.
  if (type != '') {
    if (this != '') {
      if (type == 'id') {
        str = this.substr(0, 5) + '*'.repeat(strlen(this) - 5)
      } else if (type == 'email') {
        email = this.split('@')

        if (email[0].length > 5) {
          str = email[0].substr(0, 5) + '*'.repeat(strlen(email[0]) - 5) + '@' + email[1]
        } else if (email[0].length < 3) {
          str = email[0] + '@' + email[1]
        } else {
          str = email[0].substr(0, 3) + '*'.repeat(strlen(email[0]) - 3) + '@' + email[1]
        }
      } else if (type == 'phone') {
        str = this.substr(0, 4) + '-****-' + this.substr(-4)
      } else if (type == 'addr') {
        addr = this.split(' ')

        if (typeof addr == 'array') {
          for (let i = 0; i < addr.length; i++) {
            if (i > 1) {
              str += '*'.repeat(addr[i].length) + ' '
            } else {
              str += addr[i] + ' '
            }
          }
        }
      }
    }
  } else {
    // 사용자 명 마스킹
    str = this.substr(0, 1) + '*' + this.substr(2)
  }

  return str
}

Array.prototype.inArray = function(find) {
  return this.indexOf(find) > -1 ? true : false
}

Array.prototype.indexRemove = function(find) {
  return this.splice(this.indexOf(find), 1)
}

export default {
  install(app, options) {
    const util = {}

    util.parseJwt = (token) => {
      if (!token) return false
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }

    util.getJwtInfo = (jwt) => {
      if (jwt) {
        let idx = jwt.indexOf('.ggolab')
        if (idx > -1) {
          idx = idx + 1
        }
        else {
          return false
        }

        let token = jwt.substring(0, idx) + jwt.substring(jwt.indexOf('.ggolab')+7)
        return util.parseJwt(token)
      }
    }

    util.isIE = () => {
      const agent = navigator.userAgent.toLowerCase();
      if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        return true
      }
      else {
        return false
      }
    }

    util.MBtoB = (mb) => {
      if (!mb) return 10485760 // 10MB
      return mb * 1024 * 1024
    }

    util.getExts = (name, toUpper) => {
      let ext = 'etc';
      if (name && name.lastIndexOf('.') > -1) {
        ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
        if (ext && toUpper) {
          return ext.toUpperCase();
        }
      }
      return ext;
    }

    util.isImages = (ext) => {
      let imgMap = {
        'png': true,
        'jpg': true,
        'jpeg': true,
        'gif': true,
        // 'webp': true,
      };
      if (!ext) {
        return false;
      }
      return imgMap[ext.toLowerCase()];
    }

    util.isEmoji = (str) => {
        const ranges = [
            '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
        ];
        if (str.match(ranges.join('|'))) return true
        return false
    }

    app.provide('util', util)
  }
}
