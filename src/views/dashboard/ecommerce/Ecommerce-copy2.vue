<template>
  <section id="dashboard-ecommerce">
    <div class="devBlock">
      <button @click="sendAuth">sendAuth</button>
      <button @click="testDispatch">test</button>
      <button @click="sendQuery">send Query</button>
      <textarea name="query" id="" cols="30" rows="100" v-model="query">
    </textarea>
      <div>{{ query }}</div>
    </div>

    <b-row class="match-height">
      <b-col
          xl="8"
          md="6"
      >
        <ecommerce-statistics :data="$store.state.users.data.statisticsItems"/>
      </b-col>
      <b-col
      >
        <ecommerce-profit-chart :data="$store.state.users.data.statisticsProfit"/>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'

import EcommerceStatistics from './EcommerceStatistics.vue'
import EcommerceProfitChart from './EcommerceProfitChart.vue'

export default {
  components: {
    BRow,
    BCol,
    EcommerceStatistics,
    EcommerceProfitChart
  },
  data() {
    return {
      query: '{\n' +
          '        "event": "query",\n' +
          '        "label": "getUserLabel",\n' +
          '        "query": {\n' +
          '          "method": "get",\n' +
          '          "model": "User",\n' +
          '          "filter": { "id": 10000 },\n' +
          '          "fields": "profile"\n' +
          '        }\n' +
          '      } '
    }
  },

  methods: {
    sendQuery() {
      this.$ws.send(this.query)
    },
    testDispatch() {
      this.$store.dispatch('appData/testAction')
    },
    sendAuth() {
      this.$store.dispatch('appData/sendAuth')
    },
  },
  created() {

  },
  mounted() {
    this.$store.dispatch('users/getAllUsers')
    this.$store.dispatch('users/getMathesCount')
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

.devBlock {
  display: flex;
  flex-flow: column;
}
</style>
