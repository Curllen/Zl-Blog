<template>
  <div class="lwj-container">
    <a-card>
      <a-row class="cards" type="flex" :gutter="16">
        <a-col :span="6" :order="1">
          <div style="float: left; margin-right: 10px;padding-top: 4px">关键词 :</div> <a-input v-model="queryParam.keyword" style="width: 75%" />
        </a-col>
        <a-col :span="4" :order="4">
          <a-button @click="handleQuery()" style="margin-right: 10px" type="primary">查询</a-button>
          <a-button @click="handleResetParam">重置</a-button>
        </a-col>
      </a-row>

      <a-row  class="mr-tt">
        <a-button type="primary" icon="plus" @click="AddEssayDia = true">发牢骚</a-button>
      </a-row>
      <a-divider/>
      <a-row class="mr-t">
        <a-list :loading="loading" item-layout="vertical" size="large" :pagination="pagination" :data-source="essays">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <div
              slot="extra"
            >
              <a class="mr-r" @click="handleEditClick(item)">编辑</a>
              <a-popconfirm
                :title="'你确定要删除这条日志？'"
                @confirm="handleDeleteClick(item.id)"
                okText="确定"
                cancelText="取消"
                placement="leftTop"
              >
                <a href="javascript:;" class="mr-r">删除</a>
              </a-popconfirm>
            </div>
            <a-list-item-meta >
              <a slot="title">{{ item.time }}</a>
              <a-avatar slot="avatar" :src="avatar" />
            </a-list-item-meta>
            {{ item.contents }}
          </a-list-item>
        </a-list>
      </a-row>
    </a-card>

    <a-modal
      title="新建"
      :visible="AddEssayDia"
      okText="发布"
      cancelText="取消"
      @ok="addEssaySubmit"
      @cancel="addCancelDia"
    >
    <a-textarea v-model="essayForm.contents" :rows="8"/>
    </a-modal>

    <a-modal
      title="编辑"
      :visible="EditEssayDia"
      okText="发布"
      cancelText="取消"
      @ok="editEssaySubmit"
      @cancel="editCancelDia"
    >
      <a-textarea v-model="essayForm.contents" :rows="8"/>
    </a-modal>
  </div>
</template>

<script>
  import EssaysApi from "../../api/Essays";
  export default {
    name: "Essays",
    data() {
      return {
        queryParam: {
          keyword: ''
        },
        essays: [],
        avatar: '',
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        },
        AddEssayDia: false,
        EditEssayDia: false,
        essayForm: {
          id: '',
          contents: ''
        },
        loading: true
      }
    },
    created () {
      this.loadEssays()
    },
    methods: {
      async loadEssays() {
        EssaysApi.All().then(res => {
          if (res.code === 1000) {
            this.essays = res.data.essays
            this.avatar = res.data.avatar
            this.loading = false
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async handleQuery() {
        EssaysApi.query(this.queryParam).then(res => {
          if (res.code === 1000) {
            this.essays = res.data.essays
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      handleResetParam() {
        this.queryParam.keyword = ''
        this.loadEssays()
      },
      handleEditClick(item) {
        this.essayForm.id = item.id
        this.essayForm.contents = item.contents
        this.EditEssayDia = true
      },
      async handleDeleteClick(id) {
        EssaysApi.delete(id).then(res => {
          if (res.code === 1000) {
            this.$message.success('删除成功')
            this.loadEssays()
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      addEssay() {
        this.AddEssayDia = true
      },
      async addEssaySubmit() {
        let data = new FormData()
        data.append('contents', this.essayForm.contents)
        EssaysApi.addEssay(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('发布成功')
            this.essayForm.contents = ''
            this.AddEssayDia = false
            this.loadEssays()
          } else {
            this.$message.warning('发布失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async editEssaySubmit() {
        let data = new FormData()
        data.append('id', this.essayForm.id)
        data.append('contents', this.essayForm.contents)
        EssaysApi.update(data).then(res => {
          if (res.code === 1000) {
            this.$message.success('发布成功')
            this.essayForm.contents = ''
            this.EditEssayDia = false
            this.loadEssays()
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      addCancelDia() {
        this.AddEssayDia = false
        this.essayForm.contents = ''
      },
      editCancelDia() {
        this.EditEssayDia = false
        this.essayForm.contents = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @media screen and (max-width: 960px) {
    .cards > * {
      width: 100%;
      margin: 10px;
    }
    .mr-tt > * {
      margin-left: 10px;
    }
  }
</style>