<!--
 * @Author: your name
 * @Date: 2020-06-01 15:26:46
 * @LastEditTime: 2020-06-01 18:31:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/fee/index.vue
-->
<template>
  <div class="app-container">
    <div class="tab-container">
      <el-tabs activate-name="first" stretch="true" @tab-click="handleClick">
        <el-tab-pane label="收支明细" name="first">
          <fee-table />
        </el-tab-pane>
        <el-tab-pane label="收费员收费统计" name="collector">
          <collter-table />
        </el-tab-pane>
        <el-tab-pane label="科室收费统计" name="dept">
          <dept-table />
        </el-tab-pane>
        <el-tab-pane label="医生业绩" name="docter">
          <docter-table />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import FeeTable from './compoment/table'
import DocterTable from './compoment/docter'
import CollterTable from './compoment/collter_table'
import DeptTable from './compoment/dept'
export default {
  components: { FeeTable, DocterTable, CollterTable, DeptTable }
}
</script>
