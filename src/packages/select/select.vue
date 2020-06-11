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
    :value="selectValue"
    :labelInValue="labelInValue"
    :filterOption="false"
    :defaultActiveFirstOption="false"
    :notFoundContent="searching ? undefined : null"
    style="width: 250px;"
  >
    <template v-for="(item, index) in searchList">
      <a-select-option :key="index" :value="item[props.value]">{{item[props.label]}}</a-select-option>
    </template>
  </a-select>
</template>

<script>
import _ from 'lodash'

let timeout = null
let currentValue = null

export default {
  name: 'hm-select',
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: '',
    },
    // large small default
    size: {
      type: String,
      default: 'default',
    },
    allowClear: {
      type: Boolean,
      default: false,
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
      default: false,
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键字',
    },
    labelInValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searching: false,
      selectValue: undefined, // 选中值
      list: [], // 原始数据列表
      searchList: [], // 搜索后的列表
    }
  },
  watch: {
    data: {
      handler(val) {
        this.list = val
        this.searchList = []
      },
      deep: true,
    },
    value(val) {
      this.selectValue = val || undefined
      // this.init(val)
    },
  },
  created() {
    this.list = this.data
    this.selectValue = this.value || undefined
    this.init(this.value)
  },
  methods: {
    // 初始赋值
    init(value) {
      if (_.isArray(value)) {
        this.searchList = this.list.filter(item => value.indexOf(item[this.props.value]) > -1)
      } else {
        this.searchList = this.list.filter(item => item[this.props.value] === value)
      }
    },
    change(value) {
      this.searching = false
      this.$emit('change', value)
      this.$emit('input', value)
    },
    search(value) {
      const val = value.trim()
      if (!val) return
      // 根据关键字查询数据
      this.searching = true
      this.filterData(val, (data) => {
        this.searchList = data
        this.searching = false
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
          const data = this.list.filter(val => val[this.props.label].indexOf(value) > -1)
          callback(data)
        }
      }, 300)
    },
  },
}
</script>
