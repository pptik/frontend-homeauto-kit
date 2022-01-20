import mqtt from 'mqtt'

const rmq = mqtt.connect('ws://192.168.0.2:15675/ws', {
  username: '/smarthome:smarthome',
  password: 'smarthome12345!',
  clientId: 'Sensor-' + Math.random().toString(16).substr(2, 8) + '-punclut-',
  protocolId: 'MQTT',
  keepalive: 1
})

export default rmq
