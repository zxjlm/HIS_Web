<!--
 * @Author: your name
 * @Date: 2020-05-18 14:30:49
 * @LastEditTime: 2020-05-18 14:53:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/dept/conpoment/table.vue
-->
<template>
  <el-container>
    <el-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" filterable>
        <el-form-item label>
          <el-transfer v-model="value" :data="data" :titles="['可选择科室', '已选择科室']" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:50px;margin-top:120px">查询</el-button>
        </el-form-item>
      </el-form>

      <el-divider />

      <el-table :data="tabledata" fit highlight-current-row show-summary sum-text="合计">
        <el-table-column prop="id" label="编号" width="130px" align="center" />
        <el-table-column prop="dept" label="科室名称" width="110px" align="center" />
        <el-table-column prop="earning" label="月收益" width="110px" align="center" />
        <el-table-column prop="patientNum" label="月接诊人次" width="110px" align="center" />
        <el-table-column prop="peoNum" label="科室人数" width="110px" align="center" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script>

export default {
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
      value: [0, 1, 2, 3, 4],
      tabledata: [{
        'id': '2',
        'dept': '消化内科',
        'earning': 13212,
        'peoNum': 20,
        'patientNum': 2312
      }, {
        'dept': '呼吸内科',
        'id': '3',
        'earning': 42313,
        'peoNum': 24,
        'patientNum': 412
      }, {
        'dept': '心血管内科',
        'id': '4',
        'earning': 31231,
        'peoNum': 28,
        'patientNum': 1513
      }, {
        'dept': '免疫科',
        'id': '5',
        'earning': 12111,
        'peoNum': 10,
        'patientNum': 231
      }, {
        'dept': '普通外科',
        'id': '6',
        'earning': 3123121,
        'peoNum': 40,
        'patientNum': 6564
      }]
    }
  }
  //   methods: {

  //   }
}
</script>
