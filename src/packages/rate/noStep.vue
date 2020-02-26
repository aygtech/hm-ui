<template>
  <a-row>
    <a-col :span="4">
    </a-col>
    <a-col :span="20">
      <a-form-item v-bind="formItemLayout">
        <label>实发金额：</label>
        <a-input v-decorator="['serviceFeeRate', {
          initialValue: initData[0].totalStepValWithRateDTOList[0].rate,
          rules: rules.serviceFeeRate,
        }]"
        @blur="changeFixedRate" addonAfter="%" style="width:150px" />
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script>

export default {
  props: {
    rateData: {
      type: Array,
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
        this.initData = val
      },
      deep: true,
    },
  },
  data() {
    return {
      initData: [],
      rules: {
        serviceFeeRate: [
          { required: true, message: '请输入实发金额' },
          {
            pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
            message: '请输入正数(小数小于2位)',
          },
          { validator: this.validatorRate },
        ],
      },
    }
  },
  created() {
    this.initData = this.rateData
  },
  methods: {
    getData() {
      return this.initData
    },
    validatorRate(rule, value, callback) {
      if (parseFloat(value, 10) > 100) {
        callback('实发金额不能大于100%')
      } else {
        callback()
      }
    },
    // 设置实发金额
    changeFixedRate(e) {
      const { value } = e.target
      this.initData[0].totalStepValWithRateDTOList[0].rate = value
    },
  },
}
</script>
