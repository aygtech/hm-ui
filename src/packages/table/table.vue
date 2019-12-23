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
import { oneOf } from '../../utils/assist'


export default {
  name: 'Table',
  props: {
    type: {
      validator(value) {
        return oneOf(value, [
          'default',
          'primary',
          'dashed',
          'text',
          'info',
          'success',
          'warning',
          'error',
        ])
      },
      type: String,
      default: 'default',
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default: 'default',
    },
  },
}
</script>
