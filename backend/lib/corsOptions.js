const whitelist = [
  'http://localhost:5050',
  'http://localhost:5053',
]

module.exports = corsOptions = {
  origin: function(origin, callback) {
    const isWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}