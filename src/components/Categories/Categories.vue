<template>
  <div class="lwj-container">
    <a-row class="cards" :gutter="24">
      <a-col :span="9">
        <a-card title="添加分类">
          <a-form-model :layout="'vertical'" :model="cateForm">
            <a-form-model-item v-model="cateForm.name" extra="* 页面上所显示的名称" label="名称: ">
              <a-input v-model="cateForm.name"/>
            </a-form-model-item>
            <a-form-model-item v-model="cateForm.alias" extra="* 一般为单个分类页面的标识，最好为英文" label="别名: ">
              <a-input v-model="cateForm.alias"/>
            </a-form-model-item>
            <a-form-model-item extra="* 分类描述" label="描述: ">
              <a-textarea v-model="cateForm.descption" :rows="5"/>
            </a-form-model-item>
          </a-form-model>

          <a-row class="mr-tt">
            <a-button v-if="!updateStatus" @click="addCate" type="primary">添加</a-button>
            <a-button v-else @click="updateCate" type="primary">更新</a-button>
            <a-button v-if="updateStatus" @click="handleExcAdd" type="dashed">返回添加</a-button>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="15">
        <a-card title="分类列表">
          <a-table
            :loading="loading"
            :rowKey="cate => cate.name"
            :columns="columns"
            :dataSource="categories"
          >
         <span slot="action" slot-scope="text, cate">
            <a class="mr-r" @click="handleEditClick(cate)">编辑</a>
            <a-popconfirm
              :title="'你确定要永久删除【' + cate.name + '】分类吗？'"
              @confirm="handleDeleteClick(cate.id)"
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
  import CategoryApi from "../../api/Categories";
  const columns = [
    {
      title: '名称',
      ellipsis: true,
      dataIndex: 'name'
    },
    {
      title: '别名',
      ellipsis: true,
      dataIndex: 'alias'
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'descption'
    },
    {
      title: '文章数',
      ellipsis: true,
      dataIndex: 'count'
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  export default {
    name: "Categories",
    data() {
      return {
        columns,
        cateForm: {
          id: '',
          name: '',
          alias: '',
          descption: ''
        },
        categories: [],
        updateStatus: false,
        loading: true
      }
    },
    created () {
      this.loadCategories()
    },
    methods: {
      async loadCategories() {
        CategoryApi.loadCategories().then(res => {
          if (res.code === 1000) {
            this.categories = res.data.categories
            this.loading = false
          } else {
            this.$message.warning('加载分类列表失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleEditClick(cate) {
        this.cateForm.id = cate.id
        this.cateForm.name = cate.name
        this.cateForm.alias = cate.alias
        this.cateForm.descption = cate.descption
        this.updateStatus = true
      },
      addCate() {
        let item = new FormData()
        item.append('name', this.cateForm.name)
        item.append('alias', this.cateForm.alias)
        item.append('descption', this.cateForm.descption)
        CategoryApi.addCate(item).then(res => {
          if (res.code === 1000) {
            this.$message.success('添加分类成功')
            this.resetcateForm()
            this.loadCategories()
          } else {
            this.$message.warning('添加分类失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      updateCate() {
        let item = new FormData()
        item.append('id', this.cateForm.id)
        item.append('name', this.cateForm.name)
        item.append('alias', this.cateForm.alias)
        item.append('descption', this.cateForm.descption)
        CategoryApi.updateCate(item).then(res => {
          if (res.code === 1000) {
            this.loadCategories()
            this.resetcateForm()
            this.$message.success('更新成功')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleExcAdd() {
        this.updateStatus = false
        this.resetcateForm()
      },
      resetcateForm() {
        this.cateForm.name = ''
        this.cateForm.alias = ''
        this.cateForm.descption = ''
      },
      async handleDeleteClick(id) {
        CategoryApi.delete(id).then(res => {
          if (res.code === 1000) {
            this.$message.success('删除成功')
            this.loadCategories()
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