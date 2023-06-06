<script>
import Highcharts from "highcharts";
import dataModule from "highcharts/modules/data";
import drilldown from "highcharts/modules/drilldown";
import {chartOptions} from "@/helpers/chartOptions";
import {DatalistManager} from "@/helpers/datalist";

drilldown(Highcharts);
dataModule(Highcharts);

export default {
  props: {
    data: {
      type: Object,
      default: () => ({initial: {}, drilldown: {}})
    }
  },
  data() {
    return {
      options: chartOptions
    }
  },
  watch: {
    data: {
      handler(data) {
        const datalistManager = new DatalistManager()
        const initialDatalist = datalistManager.mapDatalist(data.initial)
        const drillDownDatalist = datalistManager.mapDrillDownDatalist(data.drilldown)
        
        this.options = {
          ...chartOptions,
          series: [{
            ...chartOptions.series.at(0),
            data: initialDatalist,
          }],
          datalist: initialDatalist,
          drillDownDatalist: drillDownDatalist
        }
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    updateGraph(drilldown) {
      if (!drilldown) return

      this.options = {
        ...chartOptions,
        series: [
          {
            ...this.options.series.at(0),
            data: this.options.drillDownDatalist[drilldown]
          }
        ]
      }
    }
  }
}
</script>

<template>
  <div class="chartElem">
    <div class="container">
      <highcharts :options="options"></highcharts>
    </div>
    <div class="buttons">
      <button
          v-for="item in options.series[0].data"
          class="button"
          @click="updateGraph(item.drilldown)"
      >
        <span :style="{color: item.color}">&bull;</span> {{ item.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chartElem {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.container {
}

.buttons {
  display: flex;
  max-width: 400px;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.button {
  width: fit-content;
  white-space: nowrap;
  background: #525252;
  outline: none;
  border: none;
  padding: 4px;
  color: #fefefe;
  border-radius: 2px;
}

.button:hover {
  cursor: pointer;
}

.button:focus {
  background: #ccb4b4;
  color: #000a4d;
}

.button span {
}

</style>
