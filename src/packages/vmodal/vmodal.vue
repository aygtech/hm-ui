<template>
  <div class="nf-modal-mask" v-if="visible">
    <div class="nf-modal" :style="{ width, top }">
      <div class="nf-modal-body">
        <button class="ant-modal-close" @click="visible = false">
          <span class="ant-modal-close-x">
            <a-icon type="close" />
          </span>
        </button>
        <img :src="imageList.length ? imageList[current - 1] : ''" style="width: 100%;" />
      </div>
    </div>
    <div class="left" v-if="current !== 1" @click="current -= 1"></div>
    <div class="right" v-if="current !== imageList.length" @click="current += 1"></div>
    <div class="total">{{current}} / {{imageList.length || 1}}</div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: '800px',
    },
    top: {
      type: String,
    },
  },
  data() {
    return {
      visible: false,
      current: 1,
    }
  },
  methods: {
    open(current) {
      this.current = current || 1
      this.visible = true
    },
  },
}
</script>
