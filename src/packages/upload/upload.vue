<template>
  <div class="clearfix">
    <a-upload
      :defaultFileList="fileList"
      :fileList="fileList"
      :class="{ 'nf-form-upload': Array.isArray(buttonText) }"
      listType="picture-card"
      :multiple="multiple"
      :customRequest="handleUpload"
      :remove="handleRemove"
      @preview="handlePreview"
    >
      <template v-if="Array.isArray(buttonText)">
        <template v-for="key in limit">
          <span
            class="nf-form-upload-item"
            :key="key"
            v-if="key > fileList.length && buttonText.length >= key"
          >
            <div>
              <a-icon type="plus" />
              <div class="ant-upload-text">{{buttonText[key] || buttonText[0]}}</div>
            </div>
          </span>
        </template>
      </template>
      <template v-else>
        <div v-if="fileList.length < limit">
          <a-icon type="plus" />
          <div class="ant-upload-text">{{buttonText}}</div>
        </div>
      </template>
    </a-upload>
    <hm-modal ref="modal" :imageList="fileList.map(val => val.url)"></hm-modal>
  </div>
</template>

<script>
import Ajax from '../../utils/request'
import HmModal from '../vmodal'
import defaultThumbUrl from '../../../assets/pdf2.png'

let intervalPercent = null // 上传进度
const notImgFile = /[^"]*(\.pdf)/

export default {
  components: { HmModal },
  props: {
    // 限制上传个数
    limit: {
      type: Number,
      default: 1,
    },
    // 上传类型
    type: {
      type: String,
      default: 'recharge_voucher_img',
    },
    // 按钮文案
    buttonText: {
      type: [Array, String],
    },
    // 图片数组
    imageList: {
      type: Array,
      default: () => [],
    },
    // 支持多选
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploadAction: '/api/sysmgr-web/file/upload',
      fileList: [], // 数据里包含response字段
    }
  },
  watch: {
    imageList: {
      handler(val) {
        if (val.length) this.fileList = this.filterList(val)
      },
      deep: true,
    },
  },
  created() {
    if (this.imageList.length) this.fileList = this.filterList(this.imageList)
  },
  methods: {
    handlePreview(file) {
      const { name, url } = file
      if (name.includes('pdf')) {
        window.open(url)
      } else {
        const index = this.fileList.indexOf(file)
        this.$refs.modal.open(index + 1)
      }
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.$emit('change', newFileList)
    },
    handleUpload(file) {
      const formData = new FormData()
      formData.append('targetType', this.type)
      formData.append('fileName', file.file.name)
      formData.append('file', file.file)

      const newFileList = this.fileList.slice()
      const uid = newFileList.length ? newFileList[newFileList.length - 1].uid + 1 : 0
      const newFile = {
        uid,
        name: file.file.name,
        status: 'uploading',
        percent: 1,
      }
      if (notImgFile.test(file.file.name)) {
        newFile.thumbUrl = defaultThumbUrl
      }
      newFileList.push(newFile)
      this.fileList = newFileList

      // 进度条
      intervalPercent = setInterval(() => {
        if (newFile.percent < 100) {
          newFile.percent += 1
        } else {
          clearInterval(intervalPercent)
        }
      }, 50)

      Ajax.request({
        url: this.uploadAction,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      }).then(({ data }) => {
        this.fileList = this.fileList.map((item) => {
          if (item.uid === uid) {
            item = {
              ...item,
              ...data,
              url: `/api/sysmgr-web/file/file-scan?downloadCode=${data.downloadCode}`,
              status: 'done',
            }
          }
          return item
        })
        this.$emit('change', this.fileList)
      }, () => {
        this.$message.error('upload failed.')
      })
    },
    filterList(list) {
      return list.map((item, index) => {
        const imgUrl = `/api/sysmgr-web/file/download?downloadCode=${item.downloadCode}`
        // 判断是否是图片
        const isImg = !notImgFile.test(item.fileName.toLocaleLowerCase())
        const obj = {
          ...item,
          uid: index,
          name: item.fileName,
          status: 'done',
          url: isImg ? imgUrl : defaultThumbUrl,
          // url: imgUrl,
        }
        return obj
      })
    },
  },
}
</script>
