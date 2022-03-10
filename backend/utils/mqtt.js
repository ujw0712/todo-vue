const mqtt = require('mqtt')
const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`)
// const client = mqtt.connect(`${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`)

const publish = (payload) => {
  client.publish('kanban', JSON.stringify(payload))
}
// client.subscribe('test')
// client.on('message', (topic, message) => {
//   console.log(`토픽:${topic.toString()}, 메시지: ${message.toString()}`)
// })

module.exports = {
  publish,
}