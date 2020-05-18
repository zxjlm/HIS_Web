<!--
 * @Author: your name
 * @Date: 2020-05-17 09:27:23
 * @LastEditTime: 2020-05-18 14:43:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/dept/index.vue
-->
<template>
  <div class="app-container">
    <div class="tab-container">
      <el-tabs v-model="activeName" stretch="true" @tab-click="handleClick">
        <el-tab-pane label="数据表单" name="first">
          <my-table />
        </el-tab-pane>
        <el-tab-pane label="纵向对比(饼图)" name="second" lazy>
          <div class="chart-container">
            <pie-chart height="100%" width="100%" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="横向对比(折线图)" name="fourth" lazy>
          <div class="chart-container">
            <line-chart height="100%" width="100%" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import pieChart from '@/components/Charts/deptEcharts'
import lineChart from '@/components/Charts/deptLine'
import myTable from './conpoment/table'
export default {
  name: 'DeptChart',
  components: { pieChart, lineChart, myTable },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
