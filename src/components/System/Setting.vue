<template>
  <div class="lwj-container">
    <a-row>
      <a-col :span="24" >
      <a-card>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="博客标题">
            <a-input v-model="blogInfo.blog_title" />
          </a-form-model-item>
          <a-form-model-item label="博客地址">
            <a-input v-model="blogInfo.blog_url"/>
          </a-form-model-item>
          <a-form-model-item label="Logo：">
            <a-input v-model="blogInfo.blog_logo" placeholder="输入外部图片链接"/>
          </a-form-model-item>
          <a-form-model-item label="Favicon：">
            <a-input v-model="blogInfo.blog_favicon" placeholder="输入外部图片链接"/>
          </a-form-model-item>
          <a-form-model-item label="页脚信息：">
            <a-textarea :rows="5" v-model="blogInfo.blog_footer" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">
              保存
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import BlogInfoApi from "../../api/BlogInfo";
  export default {
    name: "Setting",
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        blogInfo: {
          blog_title: '',
          blog_url: '',
          blog_logo: '',
          blog_favicon: '',
          blog_footer: ''
        },
      };
    },
    created () {
      this.loadInfo()
    },
    methods: {
      async loadInfo() {
        BlogInfoApi.loadInfo().then(res => {
          if (res.code === 1000) {
            this.blogInfo = res.data.staticInfo
          } else {
            this.$message.warning('加载博客信息失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async onSubmit() {
        let data = new FormData()
        data.append('blog_title', this.blogInfo.blog_title)
        data.append('blog_url', this.blogInfo.blog_url)
        data.append('blog_logo', this.blogInfo.blog_logo)
        data.append('blog_favicon', this.blogInfo.blog_favicon)
        data.append('blog_footer', this.blogInfo.blog_footer)
        BlogInfoApi.updateInfo(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('修改博客信息成功')
            this.loadInfo()
          } else {
            this.$message.warning('修改失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>