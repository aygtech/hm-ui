<template>
  <a-select
    showSearch
    :placeholder="placeholder"
    @change="change"
    @search="search"
    :size="size"
    :allowClear="allowClear"
    :mode="mode"
    :showArrow="showArrow"
    :filterOption="false"
    :defaultActiveFirstOption="false"
    style="width: 250px;"
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
    // large small default
    size: {
      type: String,
      default: 'default',
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    // 'default' | 'multiple'
    mode: {
      type: String,
      default: 'default',
    },
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
    // 箭头
    showArrow: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键字',
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
