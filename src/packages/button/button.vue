<template>
  <div>
    <a-button :type="type">Primary</a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
// import { oneOf } from '../../utils/assist'

export default {
  name: 'Button',
  props: Button.props,
  created() {
    console.log(Button.props)
  },
}
</script>
