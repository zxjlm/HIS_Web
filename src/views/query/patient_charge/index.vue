<!--
 * @Author: your name
 * @Date: 2020-05-16 16:07:20
 * @LastEditTime: 2020-05-17 09:25:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/charge/paper/index.vue
-->
<template>
  <div class="app-container">
    <el-divider content-position="left">输入就诊卡号</el-divider>
    <div class="components-container">
      <el-input v-model="card_no" />
      <el-button type="primary" style="margin-top:10px" @click="read_info">确认</el-button>
    </div>
    <el-divider content-position="left">收费记录</el-divider>
    <div class="components-container" :hidden="content_hidden">
      <el-table :data="row" fit highlight-current-row :summary-method="getSummaries" show-summary>
        <el-table-column prop="code" label="编号" width="130px" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.code }}</template> -->
        </el-table-column>
        <el-table-column prop="type" label="类型" width="60px" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.type }}</template> -->
        </el-table-column>
        <el-table-column prop="date" label="收费日期" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="price" label="金额" width="110px" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.price }}</template> -->
        </el-table-column>
        <el-table-column label="状态" width="110px" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="230"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >Export</el-button>

      <el-dialog :visible.sync="dialogFormVisible">
        <el-form
          ref="dataForm"
          :model="temp"
          label-position="left"
          label-width="90px"
          style="width: 400px; margin-left:50px;"
        >
          <!-- <el-form-item label="编号" prop="name">
          <el-input v-model="temp.id" :disabled="true" />
          </el-form-item>-->
          <el-form-item label="类型" prop="kehsi">
            <el-input v-model="temp.type" :disabled="true" />
          </el-form-item>
          <el-form-item label="价格" prop="register_way">
            <el-input v-model="temp.price" :disabled="true" />
          </el-form-item>
          <el-form-item label="日期" prop="register_way">
            <el-input v-model="temp.date" :disabled="true" />
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
export default {
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        completed: 'success',
        running: 'info',
        refund: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      card_no: '12315',
      dialogFormVisible: false,
      content_hidden: true,
      downloadLoading: false,
      statusOptions: ['completed', 'running', 'refund'],
      temp: {
        date: '',
        price: ''
      },
      row: [{
        code: '1231231',
        type: '药品',
        date: '2020年05月16日16:14:50',
        status: 'running',
        price: 221.00
      }, {
        code: '1231232',
        type: '检查',
        date: '2020年05月16日16:14:50',
        status: 'completed',
        price: 312.00
      }, {
        code: '1231233',
        type: '药品',
        date: '2020年05月16日16:14:50',
        status: 'running',
        price: 331.00
      }, {
        code: '1231234',
        type: '药品',
        date: '2020年05月16日16:14:50',
        status: 'completed',
        price: 231.00
      }, {
        code: '1231235',
        type: '检查',
        date: '2020年05月16日16:14:50',
        status: 'refund',
        price: 312.00
      }, {
        code: '1231236',
        type: '药品',
        date: '2020年05月16日16:14:50',
        status: 'running',
        price: 220.00
      }, {
        code: '1231237',
        type: '检查',
        date: '2020年05月16日16:14:50',
        status: 'completed',
        price: 65.00
      }, {
        code: '1231238',
        type: '检查',
        date: '2020年05月16日16:14:50',
        status: 'refund',
        price: 554.00
      }]
    }
  },
  methods: {
    handleUpdate(row1) {
      console.log(row1)
      this.temp = Object.assign({}, row1) // copy obj
      this.dialogStatus = 'update'
      if (row1.status === 'completed') {
        this.$notify({
          title: 'Error',
          message: '已完成,不可退款',
          type: 'error',
          duration: 2000
        })
      } else {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
    },
    read_info() {
      this.content_hidden = false
      this.$notify({
        title: 'Success',
        message: '读取成功',
        type: 'success',
        duration: 2000
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.row[0].status = 'refund'
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: '退款完成',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      let val = 0
      data.forEach((dt, index) => {
        if (dt.status === 'completed') {
          val += Number(dt.price)
        }
      })
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        if (index === 3) {
          sums[index] = val + '元'
          return
        }
        // const values = data.map(item => Number(item[column.property]))
        // console.log(values)
        // if (!values.every(value => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr)
        //     if (!isNaN(value)) {
        //       return prev + curr
        //     } else {
        //       return prev
        //     }
        //   }, 0)
        //   sums[index] += ' 元'
        // } else {
        //   //   sums[index] = 'N/A'
        //   sums[index] = ''
        // }
      })

      return sums
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['编号', '日期', '类型', '金额', '状态']
        const filterVal = ['code', 'date', 'type', 'price', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.row.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
