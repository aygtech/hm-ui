<template>
  <div class="hm-rate-custom-style">
    <a-form-item :label="label" required>
      <a-radio-group :value="stepType" @input="changeStepType">
        <a-radio value="NO_STEP">固定比例收费（实发金额）</a-radio>
        <a-radio value="PERSON_STEP_ONLY">不分月流水阶梯</a-radio>
        <a-radio value="BOTH_STEP">分月流水阶梯</a-radio>
      </a-radio-group>
    </a-form-item>
    <!-- 固定比例收费 -->
    <NoStep ref="noStep" v-if="stepType === 'NO_STEP'"
      :rateData="noStepList"
      :formItemLayout="formItemLayout"></NoStep>
    <!-- 不分月流水阶梯 -->
    <PersonStep ref="personStepOnly" v-if="stepType === 'PERSON_STEP_ONLY'"
      :rateData="personStepOnlyList"
      :formItemLayout="formItemLayout"></PersonStep>
    <!-- 分月流水阶梯 -->
    <BothStep ref="bothStep" v-if="stepType === 'BOTH_STEP'"
      :rateData="bothStepList"
      :formItemLayout="formItemLayout"></BothStep>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import PersonStep from './personStep.vue'
import BothStep from './bothStep.vue'
import NoStep from './noStep.vue'

const initData = [{
  key: 'level-0',
  leftVal: '0',
  rightVal: '',
  totalStepValWithRateDTOList: [
    {
      key: 'level-0-0',
      leftVal: '0',
      rightVal: '',
      rate: '',
    },
  ],
}, {
  key: 'level-1',
  leftVal: '0',
  rightVal: '',
  totalStepValWithRateDTOList: [
    {
      key: 'level-1-0',
      leftVal: '0',
      rightVal: '',
      rate: '',
    },
  ],
}]

export default {
  name: 'home',
  components: {
    PersonStep,
    BothStep,
    NoStep,
  },
  props: {
    rateList: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '技术平台服务费：',
    },
    formItemLayout: {
      type: Object,
      default() {
        return {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        }
      },
    },
  },
  watch: {
    value(val) {
      this.stepType = val
    },
    rateList: {
      handler(val) {
        this.init(val)
      },
      deep: true,
    },
  },
  data() {
    return {
      stepType: '',
      noStepList: [], // 固定比例收费
      personStepOnlyList: [], // 不分月流水阶梯
      bothStepList: [], // 分月流水阶梯
    }
  },
  created() {
    this.stepType = this.value
    this.init(this.rateList)
  },
  mounted() {
  },
  methods: {
    init(list) {
      if (list.length) {
        // 编辑
        this.noStepList = [_.cloneDeep(list[0])]
        this.personStepOnlyList = _.cloneDeep(list)
        this.bothStepList = _.cloneDeep(list)
      } else {
        // 新增
        this.noStepList = [_.cloneDeep(initData[0])]
        this.personStepOnlyList = _.cloneDeep(initData)
        this.bothStepList = _.cloneDeep(initData)
      }
    },
    getData() {
      switch (this.stepType) {
        case 'NO_STEP':
          return this.$refs.noStep.getData()
        case 'PERSON_STEP_ONLY':
          return this.$refs.personStepOnly.getData()
        case 'BOTH_STEP':
          return this.$refs.bothStep.getData()
        default:
          return []
      }
    },
    changeStepType(value) {
      // NO_STEP 固定比例收费（实发金额）
      // PERSON_STEP_ONLY 不分月流水阶梯
      // BOTH_STEP 分月流水阶梯
      this.stepType = value
      this.$emit('input', value)
    },
  },
}
</script>
