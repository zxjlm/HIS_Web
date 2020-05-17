<!--
 * @Author: your name
 * @Date: 2020-05-17 09:37:57
 * @LastEditTime: 2020-05-17 10:23:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/components/Charts/deptEcharts.vue
-->
<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'pie-chart'
    },
    id: {
      type: String,
      default: 'pie-chart'
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
      //   const xData = (function () {
      //     const data = []
      //     for (let i = 1; i < 13; i++) {
      //       data.push(i + 'month')
      //     }
      //     return data
      //   }())
      this.chart.setOption({
        title: {
          text: '纵向对比'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 50,
          left: 10,
          data: ['消化内科', '呼吸内科', '心血管内科', '免疫科', '普通外科', '服务', '神经外科', '内科', '外科', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '服务' },
              { value: 679, name: '内科' },
              { value: 1548, name: '外科', selected: true }
            ]
          },
          {
            name: '收入(万元)',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 335, name: '消化内科' },
              { value: 310, name: '呼吸内科' },
              { value: 234, name: '心血管内科' },
              { value: 135, name: '免疫科' },
              { value: 1048, name: '普通外科' },
              { value: 251, name: '神经外科' },
              { value: 147, name: '心胸外科' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      })
    }
  }
}
</script>
