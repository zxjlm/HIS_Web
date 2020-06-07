<!--
 * @Author: your name
 * @Date: 2020-06-06 12:51:02
 * @LastEditTime: 2020-06-06 13:03:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/dict/blood_type/index.vue
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="id"
        width="180"
      />
      <el-table-column
        prop="code"
        label="code"
        width="180"
      />
      <el-table-column
        prop="name"
        label="name"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="id" prop="id">
          <el-input v-model="temp.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,dialogStatus==='create'?createData():updateData()">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/myrequest'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      temp: {}
    }
  },
  created() {
    // 自动加载indexs方法
    this.handler()
  },
  methods: {
    handler() {
      request({
        method: 'get',
        url: '/api/v1.0/blood_dict_query'
      })
        .then((response) => {
          this.tableData = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleEdit(index, row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(index, row) {
    //   console.log(index)
      request({
        method: 'post',
        url: '/api/v1.0/blood_dict_del',
        data: { 'id': index + 1 }
      })
        .then((response) => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.tableData.splice(index, 1)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    resetTemp() {
      this.temp = {
        id: '',
        code: '',
        name: ''
      }
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const index = this.tableData.findIndex(v => v.id === this.temp.id)
          this.tableData.splice(index, 1, this.temp)
          this.dialogFormVisible = false
          request({
            method: 'post',
            url: '/api/v1.0/blood_dict_edit',
            data: { 'id': this.temp.id, 'code': this.temp.code, 'name': this.temp.name }
          })
            .then((response) => {
              this.$notify({
                title: 'Success',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      })
    }, handleCreate() {
      this.resetTemp()
      this.temp.id = this.tableData.length + 1
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.tableData.unshift(this.temp)
          this.dialogFormVisible = false
          request({
            method: 'post',
            url: '/api/v1.0/sex_dict_edit',
            data: { 'id': this.temp.id, 'code': this.temp.code, 'name': this.temp.name }
          })
            .then((response) => {
              this.$notify({
                title: 'Success',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>
