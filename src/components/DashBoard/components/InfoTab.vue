<template>
  <div class="container">
    <a-row class="cards" :gutter="22">
      <a-col :span="8">
          <a-card
            :bordered="false"
          >
            <span class="h2">新动态</span>
            <a-divider/>
            <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="新文章" key="1">
              <a-list itemLayout="horizontal" :dataSource="data.top_articles">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta>
                    <a :href="'/achives/'+item.article_id" style="width: 200px;float: left" slot="title">{{item.title}}</a>
                    <div class="h4" style="float: right" slot="title">{{ item.publish_time }}</div>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane tab="悄悄话" key="2" forceRender>
              <a-list itemLayout="horizontal" :dataSource="data.top_essays">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta>
                    <div style="width: 200px;float: left" slot="title">{{item.contents}}</div>
                    <div class="h4" style="float: right" slot="title">{{ item.time }}</div>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            </a-tabs>
          </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="速记" :bordered="false">
          <router-link slot="extra" to="/admin/essays">
            <a-tooltip placement="top">
              <template slot="title">
                <span>内容将保存到悄悄话页面</span>
              </template>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </router-link>
          <a-textarea allowClear v-model="essay" placeholder="写点什么吧........" :rows="8" />
          <div class="mr-bt">
            <a-button type="primary" @click="save_essay">保存</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="操作记录" :bordered="false">
          <router-link slot="extra" to="">
            <a-tooltip placement="top">
              <template slot="title">
                <span>查看更多</span>
              </template>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </router-link>
          <a-list :dataSource="data.top_logs">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.time">
                <div slot="title" >{{ item.type }}</div>
              </a-list-item-meta>
              <div>{{item.target}}</div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import DashBoardApi from "../../../api/DashBoard";
  export default {
    name: "InfoTab",
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        essay: ''
      }
    },
    methods: {
      async save_essay() {
        DashBoardApi.saveEssay(this.essay).then(res => {
          if (res.code === 1000) {
            this.$message.success('发布成功!')
          } else {
            this.$message.warn('发布失败!')
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    padding: 9px;
  }
  .ant-divider-horizontal {
    margin: 10px 0 !important;
  }
  .mr-bt {
    margin-top: 24px;
  }
  @media screen and (max-width: 960px) {
    .cards > * {
      margin-top: 10px;
      width: 100%;
      padding: 0 !important;
    }
    .container {
      padding: 0;
    }
  }
</style>