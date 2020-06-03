<!--
 * @Author: your name
 * @Date: 2020-06-01 11:07:18
 * @LastEditTime: 2020-06-01 14:54:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/fee/inspection/index.vue
-->
<template>
  <div class="app-container">
    <el-table :data="row" fit highlight-current-row>
      <el-table-column prop="id" label="编号" align="center">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column label="项目名" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="单价(元)" align="center">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="单位" align="center">
        <template slot-scope="scope">{{ scope.row.format }}</template>
      </el-table-column>
      <el-table-column label="所属科室" align="center">
        <template slot-scope="scope">{{ scope.row.septid }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
        <el-form-item label="药名" prop="kehsi">
          <el-input v-model="temp.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="单价(元)" prop="register_way">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="register_way">
          <el-input v-model="temp.manufacture" :disabled="true" />
        </el-form-item>
        <el-form-item label="单位" prop="register_way">
          <el-input v-model="temp.unit" :disabled="true" />
        </el-form-item>
        <el-form-item label="规格" prop="register_way">
          <el-input v-model="temp.format" :disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,updateData()">确认修改</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      row: require('../../../../data/jianchaxiangmu.json'),
      // row: [],
      list: null,
      total: 900,
      listLoading: false,
      listQuery: {
        page: 45,
        limit: 20,
        id: undefined,
        name: undefined,
        price: undefined
        // sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        charge: 1,
        type: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },

  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        charge: 1,
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
        }
      })
    },
    handleUpdate(row1) {
      console.log(row1)
      this.temp = Object.assign({}, row1) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const index = this.row.findIndex(v => v.id === this.temp.id)
          this.row.splice(index, 1, this.temp)
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.handleCurrentChange(this.currentPage1)
    },
    handleCurrentChange(currentPage) {
      this.currentPage1 = currentPage
      this.currentChangePage(this.rawList, currentPage)
    },
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      const to = currentPage * this.pageSize
      this.pageList = []
      for (; from < to; from++) {
        if (list[from]) {
          this.pageList.push(list[from])
        }
      }
    }
  }
}
</script>
