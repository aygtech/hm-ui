---
title: Table
---

# 表格
<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.login.uuid"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="name" slot-scope="name">
      {{name.first}} {{name.last}}
    </template>
  </a-table>
</template>
<script>
export default {
  data() {
    return {
      button: '默认'
    }
  }
}
</script>

### 使用
```html
<hm-button>默认</hm-button>
<hm-button type="primary">主色</hm-button>
<hm-button type="success">成功</hm-button>
<hm-button type="info">提示</hm-button>
```