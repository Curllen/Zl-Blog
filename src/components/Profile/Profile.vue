<template>
  <div class="lwj-container">
    <a-row class="cards" :gutter="12">
      <a-col
        :lg="10"
        :md="24"
        :style="{ 'padding-bottom': '12px' }"
      >
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '16px' }"
        >
          <div style="display: flex; justify-content: center;" class="lwj-container">
            <a-tooltip placement="right">
              <template slot="title">
                <span>点击上传头像</span>
              </template>
            <div>
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img style="width: 100px;" v-if="admin.avatar" :src="admin.avatar" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </div>
            </a-tooltip>
          </div>
          <div style="display: flex; justify-content: center;" class="lwj-container">
            <div>
              <div style="text-align: center" class="h3">
                {{admin.nickname}}
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: center;" class="lwj-container">
            <div>
              <div class="mr-t">
                {{admin.personalNote}}
              </div>
            </div>
          </div>
          <div class="mr-tt">
            <p>
              <a-icon class="mr-r" type="link" /><a
              target="method"
            >
              {{blogInfo.blog_url}}
            </a>
            </p>
            <p>
              <a-icon class="mr-r" type="mail" />
              {{admin.email}}
            </p>
            <p>
              <a-icon class="mr-r" type="calendar" />
              {{ staticInfo.visit || 0 }}
              天
            </p>
          </div>
          <a-divider />
          <div class="general-profile">
            <a-list
              :loading="statisticsLoading"
              itemLayout="horizontal"
            >
              <a-list-item>累计发表了 {{staticInfo.article_count}} 篇文章。</a-list-item>
              <a-list-item>累计创建了 {{staticInfo.category_count}} 个分类。</a-list-item>
              <a-list-item>累计创建了 {{staticInfo.tag_count}} 个标签。</a-list-item>
              <a-list-item>累计添加了 {{staticInfo.link_count}} 个友链。</a-list-item>
              <a-list-item>文章总阅读 {{staticInfo.visit}} 次。</a-list-item>
              <a-list-item></a-list-item>
            </a-list>
          </div>
        </a-card>
      </a-col>
      <a-col
        :lg="14"
        :md="24"
        :style="{ 'padding-bottom': '12px' }"
      >
        <a-card
          :bodyStyle="{ padding: '0' }"
          :bordered="false"
          title="个人资料"
        >
          <div class="lwj-container" style="width: 95%">
            <a-tabs class="mr-t">
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-icon type="idcard" />基本资料
                </span>
                <a-form layout="vertical">
                  <a-form-item label="用户名：">
                    <a-input v-model="admin.username" />
                  </a-form-item>
                  <a-form-item label="昵称：">
                    <a-input v-model="admin.nickname" />
                  </a-form-item>
                  <a-form-item label="邮箱：">
                    <a-input v-model="admin.email" />
                  </a-form-item>
                  <a-form-item label="个人说明：">
                    <a-input
                      :autoSize="{ minRows: 5 }"
                      type="textarea"
                      v-model="admin.personalNote"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      @click="handleUpdateProfile"
                      type="primary"
                    >保存</a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <a-icon type="lock" />密码
                </span>
                <a-form layout="vertical">
                  <a-form-item label="原密码：">
                    <a-input-password
                      v-model="passwordParam.oldPassword"
                      autocomplete="new-password"
                    />
                  </a-form-item>
                  <a-form-item label="新密码：">
                    <a-input-password
                      v-model="passwordParam.newPassword"
                      autocomplete="new-password"
                    />
                  </a-form-item>
                  <a-form-item label="确认密码：">
                    <a-input-password
                      v-model="passwordParam.confirmPassword"
                      autocomplete="new-password"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      @click="handleUpdatePassword"
                      type="primary"
                    >确认更改</a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import AdminApi from "../../api/Admin";
  import DashBoardApi from "../../api/DashBoard";
  import BlogInfoApi from "../../api/BlogInfo";
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {
    name: "Profile",
    data() {
      return {
        statisticsLoading: false,
        admin: {
          username: '',
          nickname: '',
          email: '',
          personalNote: ''
        },
        staticInfo: {
          article_count: '',
          category_count: '',
          tag_count: '',
          link_count: '',
          visit: '',
        },
        blogInfo: {
          blog_url: ''
        },
        passwordParam: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        loading: false
      }
    },
    created () {
      this.loadAdminInfo()
      this.loadStaticInfo()
      this.loadBlogInfo()
    },
    methods: {
      async loadAdminInfo() {
        AdminApi.getAdminInfo().then(res => {
          if (res.code === 1000) {
            this.admin = res.data.admin
          } else {
            this.$message.warning('加载用户信息失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async loadStaticInfo() {
        DashBoardApi.get().then(res => {
          if (res.code === 1000) {
            this.staticInfo = res.data
          } else {
            this.$message.warning('加载博客统计信息失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async loadBlogInfo() {
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
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('你只能上传 JPG 格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('图片大小必须小于 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
      handleChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        getBase64(info.file.originFileObj, imageUrl => {
          console.log(imageUrl);
          this.admin.avatar = imageUrl;
          this.loading = false;
          let admin = new FormData()
          admin.append('avatar', imageUrl)
          AdminApi.uploadAvatar(admin).then(res => {
            if (res.code === 1000) {
              this.$message.success('上传头像成功')
              this.loadAdminInfo()
            } else {
              this.$message.warning('上传头像失败')
            }
          }).catch(err => {
            this.$message.error(err.toString())
          })
        });
      },
      async handleUpdateProfile() {
        if (!this.admin.username) {
          this.$notification['error']({
            message: '提示',
            description: '用户名不能为空！'
          })
          return
        }
        if (!this.admin.nickname) {
          this.$notification['error']({
            message: '提示',
            description: '用户昵称不能为空！'
          })
          return
        }
        if (!this.admin.email) {
          this.$notification['error']({
            message: '提示',
            description: '邮箱不能为空！'
          })
          return
        }
        let admin = new FormData()
        admin.append('username', this.admin.username)
        admin.append('nickname', this.admin.nickname)
        admin.append('email', this.admin.email)
        admin.append('personalNote', this.admin.personalNote)
        AdminApi.updateInfo(admin).then(res => {
          if (res.code === 1000) {
            this.$message.success('修改用户信息成功')
            this.loadAdminInfo()
          } else {
            this.$message.warning('修改用户信息失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      async handleUpdatePassword() {
        if (this.passwordParam.newPassword !== this.passwordParam.confirmPassword) {
          this.$message.error('确认密码和新密码不匹配！')
          return
        }
        AdminApi.updatePwd(this.passwordParam.oldPassword, this.passwordParam.newPassword).then(res => {
          if (res.code === 1000) {
            this.$message.success('密码修改成功')
            this.passwordParam.oldPassword = ''
            this.passwordParam.newPassword = ''
            this.passwordParam.confirmPassword = ''
          } else {
            this.$message.warning('原密码不正确, 请重新输入')
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
      width: 100%;
      & > *:last-child {
        margin-top: 15px;
      }
    }
    .cards {
      margin: -15px !important
    }
  }
</style>