---
title: Button
---

# 按钮
<script>
export default {
  data() {
    return {
      button: '默认'
    }
  }
}
</script>

<template>
  <hm-button>{{button}}</hm-button>
  <hm-button type="primary">主色</hm-button>
  <hm-button type="dashed">成功</hm-button>
  <hm-button type="danger">提示</hm-button>
</template>


### 使用
```html
<hm-button>默认</hm-button>
<hm-button type="primary">主色</hm-button>
<hm-button type="success">成功</hm-button>
<hm-button type="info">提示</hm-button>
```