<!--
 * @Author: your name
 * @Date: 2020-06-01 17:16:56
 * @LastEditTime: 2020-06-01 18:21:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/fee/compoment/table.vue
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.author"
        placeholder="就诊卡号"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        placeholder="科室类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >按条件搜索</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出为excel</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.patient }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接诊医生" align="center">
        <template slot-scope="{row}">
          <span>{{ row.doctor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.type|typeFilter">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="收费员" align="center">
        <template slot-scope="{row}">
          <span>{{ row.staff }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pay_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fee_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际收费" align="center" width="95">
        <template slot-scope="{row}">
          <span
            v-if="row.pageviews"
            class="link-type"
            @click="handleFetchPv(row.pageviews)"
          >{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { fetchList } from '@/api/fee'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '胸外科', display_name: '胸外科' },
  { key: '骨科', display_name: '骨科' },
  { key: '神经内科', display_name: '神经内科' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已完成': 'success',
        '进行中': 'info',
        '已退款': 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      statusOptions: ['已完成', '进行中', '已退款'],
      showReviewer: false,
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
    },
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
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '医生', '诊别', '挂号方式', '医生姓名', '金额', '状态']
        const filterVal = ['timestamp', 'author', 'type', 'register_way', 'doctor', 'pageviews', 'status']
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
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
