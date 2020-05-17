<!--
 * @Author: your name
 * @Date: 2020-05-16 16:07:20
 * @LastEditTime: 2020-05-17 09:23:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/charge/paper/index.vue
-->
<template>
  <div class="app-container">
    <el-divider content-position="left">读取就诊卡号</el-divider>
    <div class="components-container">
      <el-input v-model="card_no" disabled />
      <el-button type="primary" style="margin-top:10px" @click="read_info">确认读取</el-button>
    </div>
    <el-divider content-position="left">收费记录</el-divider>
    <div class="components-container" :hidden="content_hidden">
      <el-table :data="row" fit highlight-current-row>
        <el-table-column prop="id" label="编号" width="130px" align="center">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="60px" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="收费日期" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="金额" width="110px" align="center">
          <template slot-scope="scope">{{ scope.row.price }}</template>
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false,updateData()">打印</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      card_no: '12315',
      dialogFormVisible: false,
      content_hidden: true,
      temp: {
        date: '',
        price: ''
      },
      row: [{
        code: '1231231',
        type: '药品',
        date: '2020年05月16日16:14:50',
        price: '220.00'
      }, {
        code: '1231232',
        type: '检查',
        date: '2020年05月16日16:14:50',
        price: '312.00'
      }, {
        code: '1231233',
        type: '药品',
        date: '2020年05月16日16:14:50',
        price: '331.00'
      }, {
        code: '1231234',
        type: '药品',
        date: '2020年05月16日16:14:50',
        price: '231.00'
      }, {
        code: '1231235',
        type: '检查',
        date: '2020年05月16日16:14:50',
        price: '312.00'
      }, {
        code: '1231236',
        type: '药品',
        date: '2020年05月16日16:14:50',
        price: '220.00'
      }, {
        code: '1231237',
        type: '检查',
        date: '2020年05月16日16:14:50',
        price: '65.00'
      }, {
        code: '1231238',
        type: '检查',
        date: '2020年05月16日16:14:50',
        price: '554.00'
      }]
    }
  },
  methods: {
    handleUpdate(row1) {
      console.log(row1)
      this.temp = Object.assign({}, row1) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
      this.$notify({
        title: 'Success',
        message: '开始打印',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
