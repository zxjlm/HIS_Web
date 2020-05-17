<!--
 * @Author: your name
 * @Date: 2020-05-17 09:27:23
 * @LastEditTime: 2020-05-17 10:31:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/dept/index.vue
-->
<template>
  <div class="app-container">
    <el-transfer v-model="value" :data="data" />
    <el-divider />
    <div class="chart-container">
      <pie-chart height="100%" width="100%" />
    </div>
    <el-divider />
    <div class="chart-container">
      <line-chart height="100%" width="100%" />
    </div>
  </div>
</template>

<script>
import pieChart from '@/components/Charts/deptEcharts'
import lineChart from '@/components/Charts/deptLine'
export default {
  name: 'DeptChart',
  components: { pieChart, lineChart },
  data() {
    return {
      data: [
        { label: '消化内科', key: 0 },
        { label: '呼吸内科', key: 1 },
        { label: '免疫科', key: 2 },
        { label: '心血管内科', key: 3 },
        { label: '普通外科', key: 4 },
        { label: '器官移植', key: 5 },
        { label: '烧伤外科', key: 6 },
        { label: '骨外科', key: 7 }
      ],
      value: [0, 1, 2, 3, 4]
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
