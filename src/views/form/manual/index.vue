<!--
 * @Author: your name
 * @Date: 2020-05-14 14:59:41
 * @LastEditTime: 2020-05-16 15:15:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/form/index.vue
 -->
<template>
  <div class="app-container">
    <el-divider content-position="left">用户信息读取</el-divider>
    <div class="components-container">
      <el-input disabled :placeholder="card_no" />
      <el-button type="primary" style="margin-top:10px" @click="dialogTableVisible = true">读取</el-button>
      <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogTableVisible"
        title="读取成功"
        center
        @dragDialog="handleDrag"
      >
        <el-form :inline="true" class="demo-form-inline" :model="form_dig">
          <el-form-item label="姓名: ">{{ form_dig.patient_name }}</el-form-item>
          <el-form-item label="年龄: ">{{ form_dig.patient_age }}</el-form-item>
          <el-form-item label="现居住: ">{{ form_dig.patient_addr }}</el-form-item>
          <el-form-item label="联系方式: ">{{ form_dig.patient_phone }}</el-form-item>
          <el-form-item label="职业: ">{{ form_dig.patient_job }}</el-form-item>
          <el-form-item label="民族: ">{{ form_dig.patient_nation }}</el-form-item>
          <el-form-item label="婚姻状况: ">{{ form_dig.patient_marry }}</el-form-item>
          <el-form-item label="联系人姓名: ">{{ form_dig.patient_contact_name }}</el-form-item>
          <el-form-item label="联系人电话: ">{{ form_dig.patient_contact_phone }}</el-form-item>
          <el-form-item label="联系人关系: ">{{ form_dig.patient_contact_relation }}</el-form-item>
          <el-form-item label="联系人地址: ">{{ form_dig.patient_contact_addr }}</el-form-item>
          <el-form-item class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible = false,is_content_hidden=false">确认</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-divider content-position="left">挂号登记</el-divider>
    <div id="content" class="filter-container" :hidden="is_content_hidden">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名:">{{ form_dig.patient_name }}</el-form-item>
        <el-form-item label="医保类型">
          <el-radio-group v-model="form.yibao">
            <el-radio label="城镇医保" />
            <el-radio label="农村医保" />
            <el-radio label="自费" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="费别">
          <el-radio-group v-model="form.feibie">
            <el-radio label="优惠" />
            <el-radio label="外宾" />
            <el-radio label="普通" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择医生">
          <el-cascader
            :v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item v-model="form.price" label="价格计算">{{ form.price }}</el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group v-model="form.zhifu">
            <el-radio label="支付宝" />
            <el-radio label="微信" />
            <el-radio label="现金" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'DragDialogDemo',
  directives: { elDragDialog },
  data() {
    return {
      is_content_hidden: true,
      dialogTableVisible: false,
      card_no: 12315,
      form_dig: {
        patient_name: '张三',
        patient_age: '23',
        patient_addr: '南京市栖霞区',
        patient_phone: '189xxxxxxxx',
        patient_job: '工人',
        patient_nation: '汉',
        patient_marry: '未婚',
        patient_contact_name: '张三',
        patient_contact_phone: '189xxxxxxxx',
        patient_contact_relation: '本人',
        patient_contact_addr: '*'
      },
      form: {
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        yibao: '自费',
        feibie: '普通',
        price: ''
      },
      value: [],
      options: [{
        value: 'zhinan',
        label: '心血管科',
        children: [{
          value: 'zhuajia',
          label: '专家',
          children: [{
            value: 'yizhi',
            label: '李四'
          }, {
            value: 'fankui',
            label: '王二'
          }, {
            value: 'xiaolv',
            label: '赵大'
          }]
        }, {
          value: 'putong',
          label: '普通',
          children: [{
            value: 'cexiangdaohang',
            label: '张无忌'
          }, {
            value: 'dingbudaohang',
            label: '殷天正'
          }]
        }, {
          value: 'jizhen',
          label: '急诊',
          children: [{
            value: 'cexiangdaohang',
            label: '周芷若'
          }, {
            value: 'dingbudaohang',
            label: '赵敏'
          }]
        }]
      }, {
        value: 'zujian',
        label: '神经内科',
        children: [{
          value: 'zhuanjia',
          label: '专家',
          children: [{
            value: 'layout',
            label: '萧峰'
          }, {
            value: 'color',
            label: '段誉'
          }, {
            value: 'typography',
            label: '虚竹'
          }]
        }, {
          value: 'putong',
          label: '普通',
          children: [{
            value: 'radio',
            label: '王语嫣'
          }, {
            value: 'checkbox',
            label: '木婉清'
          }, {
            value: 'input',
            label: '钟灵儿'
          }]
        }, {
          value: 'jizhen',
          label: '急诊',
          children: [{
            value: 'cexiangdaohang',
            label: '段正淳'
          }, {
            value: 'dingbudaohang',
            label: '段延庆'
          }]
        }]
      }, {
        value: 'guke',
        label: '骨科',
        children: [{
          value: 'zhuanjia',
          label: '专家',
          children: [{
            value: 'layout',
            label: '郭靖'
          }, {
            value: 'color',
            label: '黄蓉'
          }]
        }, {
          value: 'putong',
          label: '普通',
          children: [{
            value: 'radio',
            label: '杨过'
          }, {
            value: 'checkbox',
            label: '小龙女'
          }, {
            value: 'input',
            label: '黄药师'
          }]
        }, {
          value: 'jizhen',
          label: '急诊',
          children: [{
            value: 'cexiangdaohang',
            label: '裘千尺'
          }, {
            value: 'dingbudaohang',
            label: '裘千仞'
          }]
        }]
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      this.$refs.select.blur()
    },
    handleChange(value) {
      if (value[1] === 'zhuanjia') {
        this.form.price = '50 RMB'
      } else if (value[1] === 'putong') {
        this.form.price = '20 RMB'
      } else {
        this.form.price = '25 RMB'
      }
    }
  }
}

</script>
