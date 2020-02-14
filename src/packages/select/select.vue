<template>
  <a-select
    showSearch
    placeholder="请输入搜索关键字"
    @change="change"
    @search="search"
    :showArrow="false"
    :filterOption="false"
    :defaultActiveFirstOption="false"
    style="width: 300px;"
  >
    <template v-for="(item, index) in searchList">
      <a-select-option :key="index" :value="item[props.value]">{{item[props.label]}}</a-select-option>
    </template>
  </a-select>
</template>

<script>
let timeout = null
let currentValue = null

export default {
  name: 'hm-select',
  props: {
    // 定义字段
    props: {
      type: Object,
      default() {
        return {
          value: 'id',
          label: 'name',
        }
      },
    },
    // 原始数据列表
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      list: [],
      searchList: [],
    }
  },
  created() {
  },
  methods: {
    change(value) {
      this.$emit('change', value)
    },
    search(value) {
      if (!value) return
      // 根据关键字查询数据
      this.filterData(value, (data) => {
        this.searchList = data
      })
    },
    filterData(value, callback) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      currentValue = value
      timeout = setTimeout(() => {
        if (currentValue === value) {
          const data = this.data.filter(val => val[this.props.label].indexOf(value) > -1)
          callback(data)
        }
      }, 300)
    },
  },
}
</script>
