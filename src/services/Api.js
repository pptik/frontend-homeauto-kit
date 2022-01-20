import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.0.2:5019/'
})

export default () => {
  return instance
}
