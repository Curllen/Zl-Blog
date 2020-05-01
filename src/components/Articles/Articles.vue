<template>
  <div class="lwj-container">
    <a-card class="card-container">
      <a-row class="cards" type="flex" :gutter="16">
        <a-col :span="6" :order="1">
          <div style="float: left; margin-right: 10px;padding-top: 4px">关键词 :</div> <a-input v-model="queryParam.keyword" style="width: 75%" />
        </a-col>
        <a-col :span="7" :order="2">
          <div style="float: left; margin-right: 10px;padding-top: 4px">文章状态 :</div>
          <a-input-group compact>
            <a-select
              v-model="queryParam.status"
              style="width: 75%">
              <a-select-option v-for="(item, index) in articleStatus" :value="item.status" :key="index">{{item.text}}</a-select-option>
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="7" :order="3">
          <div style="float: left; margin-right: 10px;padding-top: 4px">分类目录 :</div>
          <a-input-group compact>
            <a-select
              v-model="queryParam.category"
              placeholder="请选择分类"
              style="width: 75%">
              <a-select-option v-for="(item, index) in categories" :value="item.name" :key="index">{{item.name}}</a-select-option>
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="4" :order="4">
          <a-button @click="handleQuery()" class="mr-t" style="margin-right: 10px" type="primary">查询</a-button>
          <a-button @click="handleResetParam">重置</a-button>
        </a-col>
      </a-row>

      <a-row  class="mr-bl">
        <a-button @click="addArticle" class="mr-t" style="margin-right: 10px" type="primary" icon="plus">写文章</a-button>
      </a-row>

      <a-row class="mr-bl">
        <a-table
          :dataSource="articles"
          :columns="columns"
          :loading="loading"
          :pagination="false"
          :scrollToFirstRowOnChange="true"
          :scroll="{ x: 1300 }"
          :rowKey="article => article.id"
        >
          <span slot="status" slot-scope="status">
            <a-badge :color="getColor(status)" :text="getStatus(status)" />
          </span>
          <span slot="categories" slot-scope="categories">
            <a-tag
              v-for="cate in categories.split(',')"
              color="blue"
              :key="cate"
              style="margin: 5px"
            >
            {{ cate }}
            </a-tag>
          </span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags.split(',')"
              color="green"
              :key="tag"
              style="margin: 5px"
            >
            {{ tag }}
            </a-tag>
          </span>
          <span slot-scope="visit" slot="visit">
            <a-badge :count="visit" />
          </span>
          <span slot="action" slot-scope="text, article">
            <a class="mr-r" @click="handleEditClick(article)">编辑</a>
            <a-popconfirm
              :title="'你确定要永久删除【' + article.title + '】文章？'"
              @confirm="handleDeleteClick(article.id)"
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;" class="mr-r">删除</a>
            </a-popconfirm>
          </span>
        </a-table>
        <div class="page-wrapper">
          <a-pagination
            class="pagination"
            :current="pagination.page"
            :total="pagination.total"
            :defaultPageSize="pagination.size"
            :pageSizeOptions="['1', '2', '5', '10', '20', '50']"
            showSizeChanger
            @showSizeChange="handlePaginationChange"
            @change="handlePaginationChange"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            </template>
          </a-pagination>
        </div>
      </a-row>
    </a-card>

  </div>
</template>

<script>
  import ArticleApi from "../../api/Articles";
  import CategoryApi from "../../api/Categories";
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '200',
      ellipsis: true,
      scopedSlots: { customRender: 'title' }
    },
    {
      title: '状态',
      className: 'status',
      dataIndex: 'status',
      width: '100px',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '分类',
      dataIndex: 'categories',
      scopedSlots: { customRender: 'categories' }
    },
    {
      title: '标签',
      dataIndex: 'tags',
      scopedSlots: { customRender: 'tags' }
    },
    {
      title: '访问',
      width: '70px',
      dataIndex: 'visit',
      scopedSlots: { customRender: 'visit' }
    },
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      width: '170px',
      scopedSlots: { customRender: 'publish_time' }
    },
    {
      title: '操作',
      width: '180',
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
  export default {
    name: "Articles",
    data() {
      return {
        columns: columns,
        articles: [],
        categories: [],
        pagination: {
          page: 1,
          size: 5,
          total: 1
        },
        queryParam: {
          page: 0,
          size: 5,
          keyword: '',
          category: '',
          status: ''
        },
        loading: false,
        selectedPost: {},
        articleStatus: ArticleApi.articleStatus
      }
    },
    created () {
      this.loadPosts()
      this.loadCategories()
    },
    methods: {
      getColor(status) {
        if (status === 'success') return 'red'
        else if (status === 'draft') return 'yellow'
        else return 'lime'
      },
      getStatus(status) {
        if (status === 'success') return '已发布'
        else if (status === 'draft') return '草稿'
        else return '回收站'
      },
      async loadPosts() {
        this.loading = true
        // Set from pagination
        this.queryParam.page = this.pagination.page - 1
        this.queryParam.size = this.pagination.size
        this.queryParam.sort = this.pagination.sort
        ArticleApi.query(this.queryParam).then(response => {
          if (response.code === 1000) {
            this.articles = response.data.articles
            this.pagination.total = response.data.total
            this.loading = false
          } else {
            this.$message.warning('加载文章列表失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async loadCategories() {
        CategoryApi.All().then(res => {
          if (res.code === 1000) {
            this.categories = res.data.categories
          } else {
            this.$message.warning('加载分类目录失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleQuery() {
        this.loadPosts()
      },
      onShowSizeChange(current, pageSize) {
        this.pageSize = pageSize;
      },
      handlePaginationChange(page, pageSize) {
        this.pagination.page = page
        this.pagination.size = pageSize
        this.loadPosts()
      },
      handleResetParam() {
        this.queryParam.keyword = ''
        this.queryParam.categoryId = ''
        this.queryParam.status = ''
        this.handlePaginationChange(1, this.pagination.size)
      },
      handleEditClick(article) {
        this.$router.push({
          path: `/admin/write/${article.id}`
        })
      },
      async handleDeleteClick(id) {
        ArticleApi.delete(id).then(res => {
          if (res.code === 1000) {
            this.$message.success('删除成功')
            this.loadPosts()
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      addArticle() {
        this.$router.push('/admin/write')
      }
    }
  }
</script>

<style lang="less" scoped>
  .mr-bl {
    margin-top: 25px;
  }
  .mr-r {
    margin-right: 5px;
  }
  .page-wrapper {
    float: right;
    margin-top: 20px;
  }
  @media screen and (max-width: 960px) {
    .cards > * {
      width: 100%;
      margin: 10px;
    }
    .card-container {
      margin-left: -12px!important;
      margin-right: -12px !important;
    }
    .mr-bl {
      margin-left: 9px;
      margin-top: 10px;
    }
  }
</style>