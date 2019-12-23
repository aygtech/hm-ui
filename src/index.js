import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Button from './packages/button'
import Table from './packages/table'

const components = {
  'hm-button': Button,
  'hm-table': Table,
}

function install(Vue) {
  Vue.use(Antd)
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

export default install
