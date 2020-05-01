<template>
  <div class="lwj-container">
    <a-row>
      <a-input :size="'large'" placeholder="请输入文章标题" v-model="article.title"/>
    </a-row>
    <div id="main" class="mr-t">
      <mavon-editor
        style="height: 550px"
        v-model="article.contents"
        :boxShadow="false"
      />
    </div>
    <a-row class="mr-t" :gutter="16">
      <a-col :span="8">
        <a-card>
          <h4 class="mr-t">文章路径</h4>
          <a-input v-model="article.url" />
          <a-divider/>
          <h3>摘要</h3>
          <a-textarea
            v-model="article.summary"
            placeholder="文章摘要"
            :rows="5"
          />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <h4 class="mr-t">发表时间</h4>
          <a-date-picker
            style="width: 100%"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择文章发表时间"
            :defaultValue="pickerDefaultValue"
            :locale="locale" showTime @change="onChange"
            @ok="onArticleDateOk"
          />
          <a-divider/>
          <h3>分类目录</h3>
          <a-select
            v-if="this.$route.params.id !== '' && this.$route.params.id !== undefined"
            mode="multiple"
            style="width: 100%"
            @change="handleCatesChange"
            :value="selectedCates"
            placeholder="选择或输入新的分类"
          >
            <a-select-option v-for="item in categories" :key="item.name">{{item.name}}</a-select-option>
          </a-select>
          <a-select
            v-else
            mode="multiple"
            style="width: 100%"
            @change="handleCatesChange"
            placeholder="选择或输入新的分类"
          >
            <a-select-option v-for="item in categories" :key="item.name">{{item.name}}</a-select-option>
          </a-select>
          <br/>
          <a-divider/>
          <h3>标签</h3>
          <a-select
            v-if="this.$route.params.id !== '' && this.$route.params.id !== undefined"
            mode="multiple"
            style="width: 100%"
            @change="handleTagsChange"
            :value="selectedTags"
            placeholder="选择或输入新的标签"
          >
            <a-select-option v-for="item in tags" :key="item.name">{{item.name}}</a-select-option>
          </a-select>
          <a-select
            v-else
            mode="multiple"
            style="width: 100%"
            @change="handleTagsChange"
            placeholder="选择或输入新的标签"
          >
            <a-select-option v-for="item in tags" :key="item.name">{{item.name}}</a-select-option>
          </a-select>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <h3>缩略图</h3>
          <img
            style="width: 100%; height: 250px"
            alt="example"
            :src="article.thumbnail === ''||article.thumbnail === undefined?thrumbnailImg:article.thumbnail"
          />
          <a-input class="mr-t" v-model="article.thumbnail" placeholder="输入外部缩略图链接"/>
        </a-card>
      </a-col>
    </a-row>
    <a-row class="mr-t">
      <div class="fl-r">
        <a-button type="primary" class="mr-r" @click="publishArticle">发布</a-button>
        <a-button type="danger" ghost class="mr-r" @click="draftArticle">保存草稿</a-button>
      </div>
    </a-row>
  </div>
</template>

<script>
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import moment from 'moment'
  import ArticleApi from "../../api/Articles";
  import CategoryApi from "../../api/Categories";
  import TagsApi from "../../api/Tags";
  function formatDate(d) {
    let t = new Date(d)
    let year = t.getFullYear();
    let month = t.getMonth()+1 < 10 ? ('0' + (t.getMonth() + 1)):(t.getMonth() + 1);
    let date = t.getDate() < 10 ? ('0' + t.getDate()):t.getDate();
    let hour = t.getHours() < 10 ? ('0' + t.getHours()):t.getHours();
    let minute = t.getMinutes() < 10 ? ('0' + t.getMinutes()):t.getMinutes();
    let second = t.getSeconds() < 10 ? ('0' + t.getSeconds()):t.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
  }
  export default {
    name: "WriteArticle",
    data() {
      return {
        article: {
          title: '',
          article_id: '',
          categories: '',
          tags: '',
          summary: '',
          contents: '',
          publish_time: '',
          update_time: '',
          thumbnail: '',
          status: '',
          url: '',
        },
        locale,
        settingLoading: true,
        selectedCates: [],
        selectedTags: [],
        categories: [],
        tags: [],
        thrumbnailImg: 'https://www.lwjppz.cn/images/placeholder.jpg'
      }
    },
    computed: {
      pickerDefaultValue() {
        if (this.article.publish_time) {
          let date = new Date(this.article.publish_time)
          return moment(date, 'YYYY-MM-DD HH:mm:ss')
        }
        return moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
      },
    },
    beforeRouteEnter(to, from, next) {
      // Get article id from query
      const id = to.params.id
      console.log(id);
      next(vm => {
        if (id) {
          ArticleApi.get(id).then(response => {
            vm.article = response.data.article
            vm.selectedCates = response.data.article.categories.split(',')
            vm.selectedTags = response.data.article.tags.split(',')
          })
        }
      })
    },
    created () {
      this.loadCategories()
      this.loadTags()
    },
    methods: {
      onChange(value) {
        this.article.article_id = value.valueOf()
        this.article.publish_time = formatDate(value.valueOf())
        this.article.update_time = formatDate(value.valueOf())
      },
      onArticleDateOk(value) {
        this.article.publish_time = formatDate(value.valueOf())
        this.article.update_time = formatDate(value.valueOf())
      },
      handleCatesChange(value) {
        this.article.categories = value.toString()
        this.selectedCates = value
      },
      handleTagsChange(value) {
        this.article.tags = value.toString()
        this.selectedTags = value
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
      async loadTags() {
        TagsApi.All().then(res => {
          if (res.code === 1000) {
            this.tags = res.data.tags
          } else {
            this.$message.warning('加载标签列表失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async publishArticle() {
        this.article.status = 'success'
        if (this.article.publish_time === '' || this.article.update_time === '') {
          this.$message.warning('请选择时间')
          return
        }
        let data = new FormData()
        data.append('title', this.article.title)
        data.append('article_id', this.article.article_id)
        data.append('categories', this.article.categories)
        data.append('tags', this.article.tags)
        data.append('summary', this.article.summary)
        data.append('contents', this.article.contents)
        data.append('publish_time', this.article.publish_time)
        data.append('update_time', this.article.update_time)
        data.append('thumbnail', this.article.thumbnail)
        data.append('status', this.article.status)
        data.append('url', this.article.url)
        ArticleApi.create(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('发布成功')
            this.$router.push('/admin/articles')
          } else {
            this.$message.warning('发布失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async draftArticle() {
        this.article.status = 'draft'
        if (this.article.publish_time === '' || this.article.update_time === '') {
          this.$message.warning('请选择时间')
          return
        }
        let data = new FormData()
        data.append('title', this.article.title)
        data.append('article_id', this.article.article_id)
        data.append('categories', this.article.categories)
        data.append('tags', this.article.tags)
        data.append('summary', this.article.summary)
        data.append('contents', this.article.contents)
        data.append('publish_time', this.article.publish_time)
        data.append('update_time', this.article.update_time)
        data.append('thumbnail', this.article.thumbnail)
        data.append('status', this.article.status)
        data.append('url', this.article.url)
        ArticleApi.create(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('发布成功')
            this.$router.push('/admin/articles')
          } else {
            this.$message.warning('发布失败')
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
    .mr-t > * {
      width: 100%;
      margin-top: 10px;
    }
    .mr-t > *:first-child {
      margin-top: 0;
    }
  }
</style>