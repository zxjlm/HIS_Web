<!--
 * @Author: your name
 * @Date: 2020-06-01 09:44:31
 * @LastEditTime: 2020-06-01 09:59:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/dashboard/admin/components/RegisterNumberTable.vue
-->
<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="挂号日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="挂号医生" align="center">
        <template slot-scope="{row}">
          <span>{{ row.doctor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就诊状态" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        sex: undefined,
        author: undefined,
        sort: '+id',
        type: undefined,
        status: undefined,
        doctor: undefined
      },
      showReviewer: false,
      temp: {
        id: undefined,
        sex: '',
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        use_money: ''
      },
      tmp: {
        address: '栖霞区',
        phone: '189xxxx'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
