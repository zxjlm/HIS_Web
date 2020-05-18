<!--
 * @Author: your name
 * @Date: 2020-05-15 15:51:56
 * @LastEditTime: 2020-05-18 14:29:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/register_number/index.vue
-->
<template>
  <div class="app-container">
    <div class="tab-container">
      <el-tabs v-model="activeName" stretch="true" @tab-click="handleClick">
        <el-tab-pane label="数据表单" name="first">
          <registerNumber />
        </el-tab-pane>
        <el-tab-pane label="图表统计(折线图)" name="second" lazy>
          <div class="chart-container">
            <chart height="100%" width="100%" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import registerNumber from '../../query/register_number/index'

export default {
  name: 'MixChart',
  components: { Chart, registerNumber },
  data() {
    return {
      activeName: 'second'
    }
  },
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

.tab-container {
  margin: 30px;
}
</style>
