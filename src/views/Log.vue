<template>
  <b-container class="mt-5">
    <div class="posts m10">
      <b-container class="bv-example-row">
        <b-row class="mt-5">
          <b-col>
            <b-card title="Logs">
              <b-table striped hover :items="logs" :fields="fields"></b-table>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>
import rmq from '../message_brokers/mqtt'
import LogsService from '../services/LogsServices'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'
export default {
  data () {
    return {
      logs: [],
      fields: [
        {
          key: 'output_guid'
        },
        {
          key: 'output_value'
        },
        {
          key: 'time_device'
        }
      ]
    }
  },
  beforeCreate: function () {
    rmq.on('connect', function () {
      rmq.subscribe('Aktuator')
    })
  },
  filters: {
    getDate: function (date) {
      date = date.toString().length === 10 ? parseInt(date) * 1000 : date
      const formattedDate = format(date, 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    filldata: function () {
      const ini = this
      rmq.on('message', function (topic, message) {
        const decoded = new TextDecoder('utf-8').decode(message)
        const data = decoded.toString().split('#')
        const time = new Date()
        ini.logs.push({ output_guid: data[0], output_value: data[1], time_device: time })
      })
    },
    getLogs: async function () {
      try {
        const response = await LogsService.getLogs()
        this.logs = response.data.data
      } catch (error) {
        this.logs = []
      }
    }
  },
  mounted () {
    this.filldata()
  }
}
</script>
