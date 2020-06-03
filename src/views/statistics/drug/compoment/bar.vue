<!--
 * @Author: your name
 * @Date: 2020-06-01 15:38:44
 * @LastEditTime: 2020-06-01 17:14:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/drug/compoment/bar.vue
-->
<template>
  <div class="chart-container">
    <!-- <chart height="100%" width="100%" /> -->
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'line-chart'
    },
    id: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          text: '药品销量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
        },
        dataset: {
          source: [['name', 'price', 'number', 'sum'],
            ['注射用甲氨喋呤', 15.73, 100, 1573.0],
            ['氟康唑氯化钠注射液', 7.01, 213, 1493.1299999999999],
            ['50%葡萄糖注射液', 25.16, 21, 528.36],
            ['盐酸特比萘芬阴道泡腾片', 40.62, 212, 861.0199999999],
            ['红芪', 30.79, 1231, 790.49],
            ['盐酸氨酮戊酸散（外用）', 19.51, 123, 399.73],
            ['盐酸美金刚片', 22.05, 100, 2205.0],
            ['磷酸奥司他韦胶囊', 60.96, 43, 621.28],
            ['泽泻颗粒', 0.09, 121, 1000.889999999999999],
            ['山药颗粒', 6.79, 454, 782.66],
            ['熟大黄颗粒', 23.51, 76, 1786.7600000000002],
            ['黄连颗粒', 1.07, 787, 842.09],
            ['黄芩颗粒(酒)', 81.74, 989, 840.86],
            ['炒白芍颗粒', 31.86, 45, 1433.7],
            ['炒白术颗粒', 41.5, 2312, 948.0],
            ['白芷颗粒', 67.72, 231, 1563.32],
            ['薤白颗粒', 17.95, 2367, 487.65],
            ['川芎颗粒', 0.7, 6666, 466.2],
            ['维生素K1注射液', 10.39, 1231, 2790.09]]
        },
        grid: [
          { bottom: '55%' },
          { top: '55%' }
        ],
        xAxis: [
          { type: 'category', gridIndex: 0, 'axisLabel': { 'rotate': 90 }}],
        yAxis: [
          {
            name: 'price',
            type: 'value',
            position: 'left'
          },
          {
            name: 'sum',
            type: 'value',
            min: 500,
            max: 5000,
            position: 'right'
          }
        ],
        series: [
          { type: 'bar', xAxisIndex: 0, yAxisIndex: 0 },
          { type: 'bar', xAxisIndex: 0, yAxisIndex: 0 },
          { type: 'line', xAxisIndex: 0, yAxisIndex: 0 }
        ]
      })
    }
  }
}
</script>
