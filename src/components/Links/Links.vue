<template>
  <div class="lwj-container">
    <a-row class="cards" :gutter="24">
      <a-col :span="9">
        <a-card title="添加友情链接">
          <a-form-model :layout="'vertical'" :model="linkForm">
            <a-form-model-item v-model="linkForm.name" label="网站名称: ">
              <a-input v-model="linkForm.name"/>
            </a-form-model-item>
            <a-form-model-item v-model="linkForm.url" extra="* 需要加上 http://" label="网站地址: ">
              <a-input v-model="linkForm.url"/>
            </a-form-model-item>
            <a-form-model-item  label="Logo: ">
              <a-input v-model="linkForm.logo"/>
            </a-form-model-item>
            <a-form-model-item  label="描述: ">
             <a-textarea :rows="5" v-model="linkForm.descption"/>
            </a-form-model-item>
          </a-form-model>

          <a-row class="mr-tt">
            <a-button v-if="!updateStatus" @click="addLink" type="primary">添加</a-button>
            <a-button v-else @click="updateLink" type="primary">更新</a-button>
            <a-button v-if="updateStatus" @click="handleExcAdd" type="dashed">返回添加</a-button>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="15">
        <a-card title="所有友情链接">
          <a-table
            :loading="loading"
            :rowKey="link => link.name"
            :columns="columns"
            :dataSource="links"
          >
         <span slot="action" slot-scope="text, link">
            <a class="mr-r" @click="handleEditClick(link)">编辑</a>
            <a-popconfirm
              :title="'你确定要永久删除【' + link.name + '】链接吗？'"
              @confirm="handleDeleteClick(link.id)"
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;" class="mr-r">删除</a>
            </a-popconfirm>
          </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import LinksApi from "../../api/Links";
  const columns = [
    {
      title: '名称',
      ellipsis: true,
      dataIndex: 'name'
    },
    {
      title: '网站',
      ellipsis: true,
      dataIndex: 'url'
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'descption'
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  export default {
    name: "Links",
    data() {
      return {
        columns,
        linkForm: {
          id: '',
          name: '',
          url: '',
          logo: '',
          descption: ''
        },
        links: [],
        updateStatus: false,
        loading: true
      }
    },
    created () {
      this.loadLinks()
    },
    methods: {
      async loadLinks() {
        LinksApi.All().then(res => {
          if (res.code === 1000) {
            this.links = res.data.links
            this.loading = false
          } else {
            this.$message.warning('加载友情链接列表失败失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleEditClick(link) {
        this.linkForm.id = link.id
        this.linkForm.name = link.name
        this.linkForm.url = link.url
        this.linkForm.logo = link.logo
        this.linkForm.descption = link.descption
        this.updateStatus = true
      },
      addLink() {
        let item = new FormData()
        item.append('name', this.linkForm.name)
        item.append('url', this.linkForm.url)
        item.append('descption', this.linkForm.descption)
        LinksApi.addLink(item).then(res => {
          if (res.code === 1000) {
            this.$message.success('添加链接成功')
            this.resetLinkForm()
            this.loadLinks()
          } else {
            this.$message.warning('添加链接失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      updateLink() {
        let item = new FormData()
        item.append('id', this.linkForm.id)
        item.append('name', this.linkForm.name)
        item.append('url', this.linkForm.url)
        item.append('logo', this.linkForm.logo)
        item.append('descption', this.linkForm.descption)
        LinksApi.update(item).then(res => {
          if (res.code === 1000) {
            this.loadLinks()
            this.resetLinkForm()
            this.$message.success('更新成功')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleExcAdd() {
        this.updateStatus = false
        this.resetLinkForm()
      },
      resetLinkForm() {
        this.linkForm.id = ''
        this.linkForm.name = ''
        this.linkForm.url = ''
        this.linkForm.logo = ''
        this.linkForm.descption = ''
      },
      async handleDeleteClick(id) {
        LinksApi.delete(id).then(res => {
          if (res.code === 1000) {
            this.$message.success('删除成功')
            this.loadLinks()
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @media screen and (max-width: 960px) {
    .cards > * {
      padding: 0 !important;
      width: 100%;
    }
  }
</style>