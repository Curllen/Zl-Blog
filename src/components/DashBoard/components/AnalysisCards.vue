<template>
  <div>
    <a-row class="cards" :gutter="24">
      <a-col :span="6">
        <a-card>
          <div class="card-content">
            <span>文章</span>
            <router-link to="/admin/articles"><a-icon type="link"/></router-link>
          </div>
          <span class="h1">{{data.article_count}}</span>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <div class="card-content">
            <span>分类</span>
            <router-link to="/admin/categories"><a-icon type="link"/></router-link>
          </div>
          <span class="h1">{{data.category_count}}</span>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <div class="card-content">
            <span>标签</span>
            <router-link to="/admin/tags"><a-icon type="link"/></router-link>
          </div>
          <span class="h1">{{data.tag_count}}</span>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <div class="card-content">
            <span>总访问</span>
            <a-tooltip placement="left">
              <template slot="title">
                <span>文章共被访问 {{data.visit}} 次</span>
              </template>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </div>
          <span class="h1">{{data.visit}}</span>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "AnalysisCards",
    props: {
      data: {
        type: Object
      }
    }
  }
</script>

<style lang="less" scoped>
  .cards {
    padding: 8px;
  }
  .card-content {
    display: flex;
    justify-content: space-between;
  }
  @media screen and (max-width: 960px) {
    .cards {
      padding: 0!important;
    }
    .cards > * {
      width: 50%;
    }
    .cards > *:nth-child(2n) {
      padding-left: 12px;
      padding-right: 0!important;
    }
    .cards > *:nth-child(n) {
      padding-left: 0!important;
    }
    .cards > *:nth-child(3),
    .cards > *:nth-child(4){
      margin-top: 10px;
    }
  }
</style>