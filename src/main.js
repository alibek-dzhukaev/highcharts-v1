import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from "highcharts-vue";

import './assets/main.css'

Vue.use(HighchartsVue);

new Vue({
  render: (h) => h(App)
}).$mount('#app')
