const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const JsonRes = require("./dto/JsonRes")
const ErrorCode = require('./dto/errorCode')
const { swaggerUi, specs } = require('./lib/swagger')

const app = express()


// env
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '.env.production') })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '.env.development') })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}


// middleware
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


// static
app.use(express.static(path.join(__dirname, 'public')))


// router
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/list', require('./routes/list'))
app.use('/card', require('./routes/card'))
app.use('/color', require('./routes/color'))
app.use('/board', require('./routes/board'))
app.use('/chat', require('./routes/chat'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(function(req, res) {
  res.status(404).json(JsonRes(ErrorCode.NOT_FOUND))
});


module.exports = app


