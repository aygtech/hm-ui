<template>
  <a-row>
    <a-col v-bind="formItemLayout.labelCol"></a-col>
    <a-col v-bind="formItemLayout.wrapperCol" class="form-item-list">
      <a-table :dataSource="personStepOnlyList" bordered :pagination="false" rowKey="key">
        <a-table-column title="实发下限" dataIndex="leftVal" key="leftVal" :width="120">
          <template slot-scope="text">
            <span>{{text}}万</span>
          </template>
        </a-table-column>
        <a-table-column title="实发上限" dataIndex="rightVal" key="rightVal" :width="250">
          <template slot-scope="text, record, index">
            <a-form-item class="table-item">
              <a-input
                 v-if="personStepOnlyList.length > index + 1"
                v-decorator="[`personStepOnlyList[${index}].rightVal`, {
                validateTrigger: ['change', 'blur'],
                initialValue: personStepOnlyList[index].rightVal,
                rules: [
                  { required: true, message: '请输入实发上限' },
                  {
                    pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                    message: '请输入正数(小数小于2位)',
                  },
                  { validator: (rule, value, callback) => validatorUpper(rule, value, callback, index) },
                ],
              }]"
              @blur="val => changeLevelTwoRightVal(val, index)" addonAfter="万" style="width:150px" />
              <a-input v-else addonAfter="万" value="不限" disabled class="hm-rate-disabled-input" />
            </a-form-item>
          </template>
        </a-table-column>
        <a-table-column title="结算价" dataIndex="rate" key="rate" :width="250">
          <template slot-scope="text, record, index">
            <a-form-item class="table-item">
              <a-input v-decorator="[`personStepOnlyList[${index}].totalStepValWithRateDTOList[0].rate`, {
                validateTrigger: ['change', 'blur'],
                initialValue: personStepOnlyList[index].totalStepValWithRateDTOList[0].rate,
                rules: [
                  { required: true, message: '请输入结算价' },
                  {
                    pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                    message: '请输入正数(小数小于2位)',
                  },
                  { validator: (rule, value, callback) => validatorRate(rule, value, callback) },
                ],
              }]"
              @blur="val => changeLevelTwoRate(val, index)" addonAfter="%" style="width:150px" />
            </a-form-item>
          </template>
        </a-table-column>
        <a-table-column title="操作" dataIndex="opeart" key="opeart" :width="180">
          <template slot-scope="text, record, index">
            <a-button type="primary"
              v-if="index === personStepOnlyList.length - 1"
              @click="addFeeRateTotalDTO(index)">新增</a-button>
            &nbsp;
            <a-button
              v-if="index > 1 && index + 1 === personStepOnlyList.length"
              @click="delFeeRateTotalDTO(index)">删除</a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>

export default {
  props: {
    rateData: {
      type: Array,
      default() {
        return []
      },
    },
    formItemLayout: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  watch: {
    rateData: {
      handler(val) {
        this.personStepOnlyList = val
      },
      deep: true,
    },
  },
  data() {
    return {
      personStepOnlyList: [],
    }
  },
  created() {
    this.personStepOnlyList = this.rateData
  },
  methods: {
    getData() {
      return this.personStepOnlyList
    },
    // 验证实发上限
    validatorUpper(rule, value, callback, i) {
      const floorValue = this.personStepOnlyList[i].leftVal
      if (floorValue === null) {
        callback()
      } else if (parseFloat(floorValue, 10) >= parseFloat(value, 10)) {
        callback('实发上限必须大于实发下限')
      } else {
        callback()
      }
    },
    validatorRate(rule, value, callback) {
      if (parseFloat(value, 10) > 100) {
        callback('结算价不能大于100%')
      } else {
        callback()
      }
    },
    // 添加二级
    addFeeRateTotalDTO(i) {
      const { rightVal } = this.personStepOnlyList[i]
      this.personStepOnlyList.push({
        key: `${i + 1}`,
        leftVal: rightVal && rightVal !== 'undefined' ? rightVal : 0,
        rightVal: '',
        totalStepValWithRateDTOList: [
          {
            key: `${i + 1}`,
            leftVal: '0',
            rightVal: '',
            rate: '',
          },
        ],
      })
    },
    // 删除二级
    delFeeRateTotalDTO(i) {
      this.personStepOnlyList.splice(i, 1)
    },
    // 二级rightVal值监听
    changeLevelTwoRightVal(val, i) {
      const { value } = val.target
      // 赋值本条数据，因为不是双向绑定
      this.personStepOnlyList[i].rightVal = value
      // 如果本行下面还有其他行数据，则设置下一行的leftVal
      if (this.personStepOnlyList.length === (i + 1)) return
      this.personStepOnlyList[i + 1].leftVal = value
    },
    // 设置二级结算价格
    changeLevelTwoRate(val, i) {
      const { value } = val.target
      // 赋值本条数据，因为不是双向绑定
      this.personStepOnlyList[i].totalStepValWithRateDTOList[0].rate = value
    },
  },
}
</script>
