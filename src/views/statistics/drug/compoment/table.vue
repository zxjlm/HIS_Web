<!--
 * @Author: your name
 * @Date: 2020-06-01 15:38:30
 * @LastEditTime: 2020-06-01 17:45:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/statistics/drug/compoment/table.vue
-->
<template>
  <div class="app-container">
    <el-table :data="row" fit highlight-current-row>
      <el-table-column prop="id" label="编号" align="center">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column label="药名" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="单价(元)" align="center">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="单位" align="center">
        <template slot-scope="scope">{{ scope.row.unit }}</template>
      </el-table-column>
      <el-table-column label="生产厂家" align="center">
        <template slot-scope="scope">{{ scope.row.manufacture }}</template>
      </el-table-column>
      <el-table-column label="规格" align="center">
        <template slot-scope="scope">{{ scope.row.format }}</template>
      </el-table-column>
      <el-table-column
        label="售出量"
        align="center"
        :filters="[{ text: '>=100', value: '100' }, { text: '>=1000', value: '1000' }, { text: '>=10000', value: '10000' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">{{ scope.row.sold_number }}</template>
      </el-table-column>
      <el-table-column
        label="合计收益"
        align="center"
        sortable
      >
        <template slot-scope="scope">{{ scope.row.sold_number*scope.row.price| numFilter }}</template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    numFilter(value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
      // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  data() {
    return {
      tableKey: 0,
      row: require('../../../../../data/drug.json'),
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
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.sold_number >= value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] >= value
    }
  }
}
</script>
