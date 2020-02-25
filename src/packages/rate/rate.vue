<template>
  <div style="text-align:left">
    <a-form-item label="技术平台服务费：">
      <a-radio-group v-model="stepType">
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
    <!-- <pre>{{stepType}}</pre>
    <pre>{{initData}}</pre> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
    form: {
      type: Object,
      default() {},
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
  data() {
    return {
      stepType: 'PERSON_STEP_ONLY',
      noStepList: [], // 固定比例收费
      personStepOnlyList: [], // 不分月流水阶梯
      bothStepList: [], // 分月流水阶梯
    }
  },
  created() {
    this.noStepList.push(initData[0])
    this.personStepOnlyList = initData.map((value) => {
      const list = value
      return list
    })
    this.bothStepList = initData.map((value) => {
      const list = value
      return list
    })
  },
  mounted() {
  },
  methods: {
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
    changeStepType(e) {
      // NO_STEP 固定比例收费（实发金额）
      // PERSON_STEP_ONLY 不分月流水阶梯
      // BOTH_STEP 分月流水阶梯
      this.form.resetFields()
      const { value } = e.target
      this.stepType = value
    },
  },
}
</script>
