<!--
 * @Author: your name
 * @Date: 2020-05-15 08:56:45
 * @LastEditTime: 2020-05-18 13:39:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/form/refund/index.vue
 -->
<template>
  <div class="app-container">
    <el-divider content-position="left">用户读取</el-divider>
    <div class="components-container">
      <el-input v-model="query_no" disabled />
      <el-button
        type="primary"
        style="margin-top:10px"
        @click="dialogTableVisible = true,loading=true"
      >读取</el-button>
    </div>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogTableVisible"
      title="读取完成"
      center
      @dragDialog="handleDrag"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>-->
        <el-form-item label="挂号单号" prop="name">
          {{ query_no }}
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="挂号日期" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="temp.author" :disabled="true" />
        </el-form-item>
        <el-form-item label="科室" prop="title">
          <el-input v-model="temp.type" :disabled="true" />
        </el-form-item>
        <el-form-item label="挂号方式" prop="register_way">
          <el-input v-model="temp.register_way" :disabled="true" />
        </el-form-item>
        <el-form-item label="医生姓名" prop="doctor">
          <el-input v-model="temp.doctor" :disabled="true" />
        </el-form-item>
        <el-form-item label="实际收费" prop="charge">
          <el-input v-model="temp.pageviews" :disabled="true" />
        </el-form-item>
        <!-- <el-form-item label="评级">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
        />-->
        <!-- </el-form-item> -->
        <el-form-item label="状态" prop="charge">
          <el-tag :type="temp.status | statusFilter">{{ temp.status }}</el-tag>
        </el-form-item>
        <!-- <el-form-item label="备注">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button v-if="temp.status === 'running'" type="primary" @click="updateData()">退款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-u

export default {
  name: 'DragDialogDemo',
  directives: { elDragDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '完成': 'success',
        '进行中': 'info',
        '已退款': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      is_content_hidden: false,
      dialogTableVisible: false,
      query_no: '12315',
      temp: {
        // regis_no: '12',
        timestamp: 1589505754,
        author: '张三',
        type: '胸外科',
        register_way: '窗口挂号',
        doctor: '李四',
        pageviews: '20',
        status: '进行中'
      }
    }
  },
  methods: {
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      this.$refs.select.blur()
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.status = '已退款'
          //   const tempData = Object.assign({}, this.temp)
          //   tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          this.dialogTableVisible = false
          this.$notify({
            title: 'Success',
            message: '退款完成',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}

</script>
