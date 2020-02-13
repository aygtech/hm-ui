# hm-ui
合摩标准化运营后台的辅助插件，包含了复用度非常高的组件、过滤器、工具函数。（都是全局注册，注意控制数量）

## structure
* src/packages 组件
* src/styles 样式（组件等）
* src/filters 过滤器
* src/utils 工具函数

## build
* npm run dist

## quickstart
```js
import '@aygtech/hm-ui/lib/styles/hm-ui.css'
import HmUI from '@aygtech/hm-ui'

Vue.use(HmUI)
```
