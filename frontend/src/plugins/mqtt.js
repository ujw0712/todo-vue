import mqtt from "mqtt"
import { computed } from "vue"
import { useStore } from "vuex"

export const setMqtt = () => {
  const { getters, dispatch } = useStore()
  const getListList = computed(() => getters['kanban/getListList'])
  const setListList = (list) => dispatch('kanban/setListList', list)

  const client = mqtt.connect(`ws://${process.env.VUE_APP_MQTT_HOST}:${process.env.VUE_APP_MQTT_PORT}/mqtt`);

  client.on("connect",  () => {
    client.subscribe("kanban");
    console.log("====== Connected to MQTT Broker. ======");
  });

  client.on("message", (topic, payload) => {
    console.log(`====== subscribe : ${topic}, payload : ${payload.toString()} ======`);
    const payloadJson = JSON.parse(payload.toString())
    action(payloadJson[0], payloadJson[1], payloadJson[2])
    // client.end(); // Close the connection
  })

  const action = (type, code, obj) => {
    if (code === 'AL') {
      const listList = getListList.value
      listList.push(obj)
      setListList(listList).then()
    }
    if (code === 'UL') {
      const listList = getListList.value
      let list = []
      for (let item of listList) {
        if (item.list_id === obj.list_id) {
          item.color = obj.color
        }
        list.push(item)
      }
      setListList(list).then()
    }
    if (code === 'DL') {
      const listList = getListList.value
      const list = listList.filter(l => l.list_id != obj.list_id)
      setListList(list).then()
    }
  }
}