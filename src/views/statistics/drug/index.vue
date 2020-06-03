<!--
 * @Author: your name
 * @Date: 2020-06-01 15:26:23
 * @LastEditTime: 2020-06-01 17:02:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/drug/index.vue
-->
<template>
  <div class="app-container">
    <div class="tab-container">
      <el-tabs activate-name="first" stretch="true" @tab-click="handleClick">
        <el-tab-pane label="数据表单" name="first">
          <drug-table />
        </el-tab-pane>
        <el-tab-pane label="图表" name="bar_chart" lazy>
          <bar-chart height="100%" width="100%" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DrugTable from './compoment/table'
import BarChart from './compoment/bar'
export default {
  components: { DrugTable, BarChart }
}
</script>
