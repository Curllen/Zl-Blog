<template>
  <div class="lwj-container">
    <a-row class="cards" :gutter="24">
      <a-col :span="9">
        <a-card title="添加标签">
          <a-form-model :layout="'vertical'" :model="tagForm">
            <a-form-model-item v-model="tagForm.name" extra="* 页面上所显示的名称" label="名称: ">
              <a-input v-model="tagForm.name"/>
            </a-form-model-item>
            <a-form-model-item v-model="tagForm.alias" extra="* 一般为单个分类页面的标识，最好为英文" label="别名: ">
              <a-input v-model="tagForm.alias"/>
            </a-form-model-item>
          </a-form-model>

          <a-row class="mr-tt">
            <a-button v-if="!updateStatus" @click="addTag" type="primary">添加</a-button>
            <a-button v-else @click="updateTag" type="primary">更新</a-button>
            <a-button v-if="updateStatus" @click="handleExcAdd" type="dashed">返回添加</a-button>
            <a-button class="fl-r" v-if="updateStatus" type="danger" @click="deleteTag">删除</a-button>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="15">
        <a-card title="所有标签">
          <a-tooltip placement="top" v-for="item in tags" :key="item.id">
            <template slot="title">
              <span>{{item.count}} 篇文章</span>
            </template>
            <a-tag class="mr-t" @click="handleEditTag(item)" color="blue">{{item.name}}</a-tag>
          </a-tooltip>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import TagsApi from "../../api/Tags";
  export default {
    name: "Tags",
    data() {
      return {
        tags: [],
        tagForm: {
          id: '',
          name: '',
          alias: ''
        },
        updateStatus: false
      }
    },
    created () {
      this.loadTags()
    },
    methods: {
      async loadTags() {
        TagsApi.loadTags().then(res => {
          if (res.code === 1000) {
            this.tags = res.data.tags
          } else {
            this.$message.warning('加载标签列表失败')
          }
        }).catch(err => {
          this.$message.error((err.toString()))
        })
      },
      async addTag() {
        let data = new FormData()
        data.append('name', this.tagForm.name)
        data.append('alias', this.tagForm.alias)
        TagsApi.addTag(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('添加标签成功')
            this.resetTagFrom()
            this.loadTags()
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      updateTag() {
        let data = new FormData()
        data.append('id', this.tagForm.id)
        data.append('name', this.tagForm.name)
        data.append('alias', this.tagForm.alias)
        TagsApi.update(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('更新标签成功')
            this.updateStatus = false
            this.resetTagFrom()
            this.loadTags()
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async deleteTag() {
        TagsApi.delete(this.tagForm.id).then(res => {
          if (res.code === 1000) {
            this.$message.success('删除成功')
            this.resetTagFrom()
            this.loadTags()
            this.updateStatus = false
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleExcAdd() {
        this.updateStatus = false
        this.resetTagFrom()
      },
      handleEditTag(tag) {
        this.updateStatus = true
        this.tagForm.id = tag.id
        this.tagForm.name = tag.name
        this.tagForm.alias = tag.alias
      },
      resetTagFrom() {
        this.tagForm.id = ''
        this.tagForm.name = ''
        this.tagForm.alias = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @media screen and (max-width: 960px) {
    .cards > * {
      width: 100%;
      padding: 0!important;
      & > *:last-child {
        margin-top: 10px;
      }
    }
  }
</style>