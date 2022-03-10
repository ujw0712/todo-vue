const app = require('./app')
const { sequelize } = require('./models/index.js')

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0)   return port;
  return false;
}

const port = normalizePort(process.env.PORT || '5051')

// app.listen(port, () => {
//   console.log(`todo backend listening at http://localhost:${port}`)
//
//   sequelize.authenticate()
//     .then(() => { console.log('Connection has been established successfully.') })
//     .catch((err) => { console.error('Unable to connect to the database:', err) })
// });

// socket
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:5050"],
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})

io.on('connection', (socket) => {
  console.log('---- Connect socket ----')
  socket.on('chat', (data) => {
    console.log('---- socket chat ----')
    io.emit('chat', data)
    // 접속된 모든 클라이언트에게 메시지를 전송한다.
    // io.emit('event_name', msg);
    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다.
    // socket.emit('event_name', msg);
    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다.
    // socket.broadcast.emit('event_name', msg);
    // 특정 클라이언트에게만 메시지를 전송한다. id는 socket 객체의 id 속성값이다.
    // io.to(id).emit('event_name', data);
  });

  // socket.on('forceDisconnect', function() {
  //   socket.disconnect();
  // })
  //
  // socket.on('disconnect', function() {
  //   console.log('user disconnected: ' + socket.name);
  // });
})

server.listen(port, () => {
  console.log(`todo backend listening at http://localhost:${port}`)

  sequelize.authenticate()
    .then(() => { console.log('Connection has been established successfully.') })
    .catch((err) => { console.error('Unable to connect to the database:', err) })
})