<!--
 * @Author: your name
 * @Date: 2020-05-15 10:12:43
 * @LastEditTime: 2020-05-16 15:25:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/query/docter_assign/index.vue
 -->

<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      :inline="true"
      label-position="left"
      class="demo-form-inline"
    >
      <el-form-item label="查询日期">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="查询科室">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">查询结果</el-divider>
    <div :hidden="is_hidden">
      <el-table ref="tb" :data="tableData" :row-class-name="tableRowClassName" show-summary>
        <el-table-column prop="sor" label="班次" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="type" label="号别" width="60" />
        <el-table-column prop="numbers_used" label="已完成号数" width="90" />
        <el-table-column prop="numbers_rec" label="剩余号数" width="90" />
        <el-table-column prop="status" label="状态" width="60" />
      </el-table>
    </div>
  </div>
</template>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<script>
export default {
  data() {
    return {
      is_hidden: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      options: [{
        value: '心内科',
        label: '心内科'
      }, {
        value: '骨科',
        label: '骨科'
      }, {
        value: '神经内科',
        label: '神经内科'
      }, {
        value: '胸外科',
        label: '胸外科'
      }],
      value: '',
      value1: '',
      value2: '',
      tableData: [{
        // date: this.value2,
        sor: '上午',
        name: '李逍遥',
        type: '专家',
        // dept: this.value,
        numbers_used: 32,
        numbers_rec: 18,
        status: '正常'
      }, {
        // date: this.value2,
        sor: '上午',
        name: '王小虎',
        type: '普通',
        // dept: this.value,
        numbers_used: 0,
        numbers_rec: 50,
        status: '缺勤'
      }, {
        // date: this.value2,
        sor: '上午',
        name: '景天',
        type: '专家',
        // dept: this.value,
        numbers_used: 32,
        numbers_rec: 18,
        status: '正常'
      }, {
        // date: this.value2,
        sor: '下午',
        name: '云天河',
        type: '普通',
        // dept: this.value,
        numbers_used: 40,
        numbers_rec: 0,
        status: '未开始'
      }, {
        // date: this.value2,
        sor: '下午',
        name: '柳梦璃',
        // dept: this.value,
        type: '专家',
        numbers_used: 40,
        numbers_rec: 0,
        status: '未开始'
      }, {
        // date: this.value2,
        sor: '下午',
        name: '韩菱纱',
        type: '普通',
        // dept: this.value,
        numbers_used: 40,
        numbers_rec: 0,
        status: '未开始'
      }]
    }
  },
  methods: {
    onSubmit() {
      this.$alert('查询完成')
      this.is_hidden = false
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
