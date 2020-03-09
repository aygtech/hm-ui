<template>
  <a-modal
    v-model="visible"
    :okText="false"
    :closable="false"
    :maskClosable="false"
    :footer="null"
  >
    <p>正在导出文件…(0/1)</p>
    <p>
      <a-progress
        :percent="progress"
        :status="state || 'active'"
        size="small" />
    </p>
    <p style="color: red;">{{ msg }}</p>
    <p style="margin-top: 44px;text-align: right;">
      <a-button @click="$emit('cancelHandle')">取消</a-button>
    </p>
  </a-modal>
</template>
<script>
export default {
  props: ['progress', 'msg', 'showModal', 'downloadState'],
  computed: {
    visible: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    },
    state() {
      const state = {
        30: 'success',
        40: 'exception'
      }
      return state[this.downloadState]
    }
  }
}
</script>
