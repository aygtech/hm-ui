<template>
  <a-row>
    <a-col v-bind="formItemLayout.labelCol"></a-col>
    <a-col v-bind="formItemLayout.wrapperCol">
      <template v-for="(item, i) in bothStepList">
        <div class="form-item-list" :key="i">
          <a-form-item>
            <div class="fee-item">
              <span>实发金额区间：</span>
              <span class="fee-label"><span class="bold">{{item.leftVal}}</span> 万</span>
              <span class="fee-label">至</span>
              <template>
                <a-input v-if="bothStepList.length > i + 1" v-decorator="[`bothStepList[${i}].rightVal`, {
                    validateTrigger: ['change', 'blur'],
                    initialValue: bothStepList[i].rightVal,
                    rules: [
                      { required: true, message: '请输入实发金额区间' },
                      {
                        pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                        message: '请输入正数(小数小于2位)',
                      },
                      { validator: (rule, value, callback) => validatorInterval(rule, value, callback, i) },
                    ],
                  }]" @blur="val => changeLevelOneRightVal(val, i)" addonAfter="万" style="width:150px" class="fee-label" />
                <a-input v-else addonAfter="万" value="不限" disabled class="hm-rate-disabled-input" />
              </template>
              <a-button type="primary" class="level-one-button" v-if="i === bothStepList.length - 1" @click="addLevel1(i)">追加实发区间</a-button>
              <a-button class="level-one-button"
                v-if="i > 1 && i + 1 === bothStepList.length" @click="delLevel1(i)">删除</a-button>
            </div>
          </a-form-item>
          <a-table :dataSource="item.totalStepValWithRateDTOList" bordered :pagination="false" rowKey="key">
            <a-table-column title="月流水下限" dataIndex="leftVal" key="leftVal">
              <template slot-scope="text">
                <span>{{text}}万</span>
              </template>
            </a-table-column>
            <a-table-column title="月流水上限" dataIndex="rightVal" key="rightVal">
              <template slot-scope="text, record, index">
                <!-- 最后一条数据上线disabled -->
                <a-form-item class="table-item" v-if="bothStepList[i].totalStepValWithRateDTOList.length > index + 1">
                  <a-input v-decorator="[`bothStepList[${i}].totalStepValWithRateDTOList[${index}].rightVal`, {
                    validateTrigger: ['change', 'blur'],
                    initialValue: bothStepList[i].totalStepValWithRateDTOList[index].rightVal,
                    rules: [
                      { required: true, message: '请输入实发上限' },
                      {
                        pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                        message: '请输入正数(小数小于2位)',
                      },
                      { validator: (rule, value, callback) => validatorUpper(rule, value, callback, i, index) },
                    ],
                  }]"
                  @blur="val => changeLevelTwoRightVal(val, i, index)" addonAfter="万" style="width:150px" />
                </a-form-item>
                <a-input v-else addonAfter="万" value="不限" disabled class="hm-rate-disabled-input" />
              </template>
            </a-table-column>
            <a-table-column title="结算比例" dataIndex="rate" key="rate" :width="250">
              <template slot-scope="text, record, index">
                <a-form-item class="table-item">
                  <a-input v-decorator="[`bothStepList[${i}].totalStepValWithRateDTOList[${index}].rate`, {
                    validateTrigger: ['change', 'blur'],
                    initialValue: bothStepList[i].totalStepValWithRateDTOList[index].rate,
                    rules: [
                      { required: true, message: '请输入结算比例' },
                      {
                        pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                        message: '请输入正数(小数小于2位)',
                      },
                      { validator: (rule, value, callback) => validatorRate(rule, value, callback) },
                    ],
                  }]"
                  @blur="val => changeLevelTwoRate(val, i, index)" addonAfter="%" style="width:150px" />
                </a-form-item>
              </template>
            </a-table-column>
            <a-table-column title="操作" dataIndex="opeart" key="opeart" :width="180">
              <template slot-scope="text, record, index">
                <a-button type="primary"
                  v-if="index === item.totalStepValWithRateDTOList.length - 1"
                  @click="addLevel2(i, index)">新增</a-button>
                &nbsp;&nbsp;
                <a-button
                  v-if="index !== 0 && index + 1 === item.totalStepValWithRateDTOList.length"
                  @click="delLevel2(i, index)">删除</a-button>
              </template>
            </a-table-column>
          </a-table>
        </div>
      </template>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
  },
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
        this.bothStepList = val
      },
      deep: true,
    },
  },
  data() {
    return {
      bothStepList: [],
    }
  },
  created() {
    this.bothStepList = this.rateData
  },
  methods: {
    getData() {
      return this.bothStepList
    },
    // 月流水上限下限制
    validatorUpper(rule, value, callback, i, index) {
      const floorValue = this.bothStepList[i].totalStepValWithRateDTOList[index].leftVal
      if (floorValue === null) {
        callback()
      } else if (parseFloat(floorValue, 10) >= parseFloat(value, 10)) {
        callback('月流水上限必须大于月流水下限')
      } else {
        callback()
      }
    },
    // 验证实发金额区间
    validatorInterval(rule, value, callback, i) {
      const floorValue = this.bothStepList[i].leftVal
      if (floorValue === null) {
        callback()
      } else if (parseFloat(floorValue, 10) >= parseFloat(value, 10)) {
        callback('实发金额区间上限必须大于下限')
      } else {
        callback()
      }
    },
    // 结算比例验证
    validatorRate(rule, value, callback) {
      if (parseFloat(value, 10) > 100) {
        callback('结算比例不能大于100%')
      } else {
        callback()
      }
    },
    // 一级rightVal值监听
    changeLevelOneRightVal(val, index) {
      const { value } = val.target
      // 赋值本条数据，因为不是双向绑定
      this.bothStepList[index].rightVal = value
      if (this.bothStepList.length === (index + 1)) return
      this.bothStepList[index + 1].leftVal = value
    },
    // 设置二级结算比例
    changeLevelTwoRate(val, i, index) {
      const { value } = val.target
      // 赋值本条数据，因为不是双向绑定
      this.bothStepList[i].totalStepValWithRateDTOList[index].rate = value
    },
    // 添加一级list
    addLevel1(index) {
      // 是否存在上限
      const { rightVal } = this.bothStepList[index]
      this.bothStepList.push({
        key: `level-${index + 1}`,
        leftVal: rightVal && rightVal !== 'undefined' ? rightVal : 0,
        rightVal: '',
        totalStepValWithRateDTOList: [
          {
            key: `level-${index + 1}-0`,
            leftVal: 0,
            rightVal: '',
            rate: '',
          },
        ],
      })
    },
    // 删除一级list
    delLevel1(index) {
      this.bothStepList.splice(index, 1)
    },
    // 二级rightVal值监听
    changeLevelTwoRightVal(val, i, index) {
      const { value } = val.target
      // 赋值本条数据，因为不是双向绑定
      this.bothStepList[i].totalStepValWithRateDTOList[index].rightVal = value
      // 如果本行下面还有其他行数据，则设置下一行的leftVal
      if (this.bothStepList[i].totalStepValWithRateDTOList.length === (index + 1)) return
      this.bothStepList[i].totalStepValWithRateDTOList[index + 1].leftVal = value
    },
    // 添加二级list
    addLevel2(i, index) {
      const { rightVal } = this.bothStepList[i].totalStepValWithRateDTOList[index]
      this.bothStepList[i].totalStepValWithRateDTOList.push({
        key: `level-${i}-${index + 1}`,
        leftVal: rightVal && rightVal !== 'undefined' ? rightVal : 0,
        rightVal: '',
        rate: '',
      })
    },
    // 删除二级list
    delLevel2(i, index) {
      this.bothStepList[i].totalStepValWithRateDTOList.splice(index, 1)
    },
  },
}
</script>
