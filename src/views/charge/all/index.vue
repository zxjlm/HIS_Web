<!--
 * @Author: your name
 * @Date: 2020-06-01 10:38:45
 * @LastEditTime: 2020-06-01 10:58:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/charge/all/index.vue
-->
<template>
  <div class="app-container">
    <el-divider content-position="left">读取就诊卡号</el-divider>
    <div class="components-container">
      <el-input v-model="card_no" disabled />
      <el-button type="primary" style="margin-top:10px" @click="dialogTableVisible = true">确认读取</el-button>
      <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogTableVisible"
        title="查询完成"
        center
        @dragDialog="handleDrag"
      >
        <el-form :inline="true" class="demo-form-inline" :model="form_dig">
          <el-divider content-position="left">用户信息</el-divider>
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
    <el-divider content-position="left">确认缴费</el-divider>
    <div id="content" class="filter-container" :hidden="is_content_hidden" style="margin-left:30px">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>患者信息</span>
        </div>
        <el-form :inline="true" class="demo-form-inline" label-width="100px" size="medium" style="width:70%" :model="form_dig">
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
        </el-form>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>处方信息</span>
        </div>
        <el-form ref="form" :inline="true" :model="form" label-width="120px">
          <el-form-item label="处方单号: ">{{ form_dig.number }}</el-form-item>
          <el-form-item label="诊断结果: ">{{ form_dig.result }}</el-form-item>
          <el-form-item label="负责医生: ">{{ form_dig.doctor }}</el-form-item>
          <el-form-item label="处方生成日期: ">{{ form_dig.date }}</el-form-item>
          <el-form-item label="处方状态: ">
            <el-tag type="success">{{ form_dig.status }}</el-tag>
          </el-form-item>
          <el-form-item label="处方药物: ">{{ form_dig.drugs }}</el-form-item>
          <el-table :data="drugs" style="width: 100%">
            <el-table-column prop="code" label="编号" width="180" />
            <el-table-column prop="name" label="药名" width="180" />
            <el-table-column prop="format" label="格式" />
            <el-table-column prop="price" label="单价" />
            <el-table-column prop="unit" label="单位" />
          </el-table>
        </el-form>
      </el-card>
      <el-form ref="form" :model="form" style="margin-top:40px;margin-left:50px">
        <el-form-item label="医保类型">
          <el-radio-group v-model="form.yibao">
            <el-radio label="城镇医保" value="0.8" @change="price_cul(0.8)" />
            <el-radio label="农村医保" value="0.9" @change="price_cul(0.9)" />
            <el-radio label="自费" value="1" @change="price_cul(1.0)" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="费别">
          <el-radio-group v-model="form.feibie">
            <el-radio label="优惠" />
            <el-radio label="外宾" />
            <el-radio label="普通" />
          </el-radio-group>
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
          <el-button type="primary" @click="obSubmit">确认缴费</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">其它选项</el-divider>
      <div class="components-container" :hidden="other_hidden">
        <el-button type="primary" style="margin-top:10px">打印单据</el-button>
        <el-button type="primary" style="margin-top:10px">打印报销凭证</el-button>
      </div>
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
      other_hidden: true,
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
        patient_contact_addr: '*',
        number: '1002312031231',
        result: '上呼吸道感染',
        doctor: '李四',
        date: '2020年05月16日10:54:54',
        status: '进行中'
      },
      card_no: '12315',
      form: {
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        yibao: '自费',
        feibie: '普通',
        price: 89.72,
        price_raw: 89.72
      },
      drugs: [{ 'code': '86979474000208', 'name': '注射用甲氨喋呤', 'format': '1g×1支', 'price': '15.73', 'unit': '支' },
        { 'code': '86979474000209', 'name': '氟康唑氯化钠注射液', 'format': '200mg×100ml/瓶', 'price': '7.01', 'unit': '瓶' },
        { 'code': '86979474000208', 'name': '50%葡萄糖注射液', 'format': '10:20ml×1支', 'price': '25.16', 'unit': '支' },
        { 'code': '86979474000209', 'name': '盐酸特比萘芬阴道泡腾片', 'format': '50mg×7片/盒', 'price': '40.62', 'unit': '盒' }
      ]
    }
  },
  methods: {
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      this.$refs.select.blur()
    },
    price_cul(val) {
      this.form.price = this.form.price_raw * val
    },
    obSubmit() {
      this.$notify({
        title: 'Success',
        message: '支付完成',
        type: 'success',
        duration: 2000
      })
      this.other_hidden = false
    }
  }
}

</script>
