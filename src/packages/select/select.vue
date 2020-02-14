<template>
  <a-select
    showSearch
    placeholder="请输入搜索关键字"
    :showArrow="false"
    :filterOption="false"
    :defaultActiveFirstOption="false"
    style="width: 300px;"
  >
    <a-select-option value="1">remi</a-select-option>
    <a-select-option value="2">lzhang</a-select-option>
  </a-select>
</template>

<script>
export default {
  created() {
    console.log('Button.props')
  },
}
</script>
