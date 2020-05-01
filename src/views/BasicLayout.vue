<template>
  <a-layout id="Layout" :hasSider="true">
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
    <a-layout-sider
      id="sider"
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      width="250px"
    >
      <div class="logo">
        <a href="/admin/dashboard" class="link">
          <h1>
            Zl - Blog
          </h1>
        </a>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="dashboard" />
          <span class="nav-text h4"><router-link to="/admin/dashboard" class="link-white">仪表盘</router-link></span>
        </a-menu-item>
        <a-sub-menu key="2">
          <span slot="title"><a-icon type="edit" />
            <span class="nav-text h4 link-white">文章</span>
          </span>
          <a-menu-item key="3">
            <span class="nav-text h4">
              <router-link to="/admin/articles" class="link-white">所有文章</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="4">
            <span class="nav-text h4">
              <router-link to="/admin/write" class="link-white">写文章</router-link>
            </span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="5">
          <a-icon type="diff" />
          <span class="nav-text h4"><router-link to="/admin/categories" class="link-white">分类管理</router-link></span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="tags" />
          <span class="nav-text h4"><router-link to="/admin/tags" class="link-white">标签管理</router-link></span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="link" />
          <span class="nav-text h4"><router-link to="/admin/links" class="link-white">友链管理</router-link></span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="smile" />
          <span class="nav-text h4"><router-link to="/admin/essays" class="link-white">悄悄话</router-link></span>
        </a-menu-item>
        <a-menu-item key="9">
          <a-icon type="profile" />
          <span class="nav-text h4"><router-link to="/admin/profile" class="link-white">个人资料</router-link></span>
        </a-menu-item>
        <a-sub-menu key="10">
          <span slot="title"><a-icon type="setting" />
            <span class="nav-text h4 link-white">博客设置</span>
          </span>
          <a-menu-item key="11">
            <span class="nav-text h4">
              <router-link to="/admin/setting" class="link-white">博客信息</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="12">
            <span class="nav-text h4">
              <router-link to="/admin/logs" class="link-white">系统日志</router-link>
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div class="user-wrapper">
          <div class="content-box">
            <router-link to="/" class="link-black">
              <a-tooltip placement="bottom">
                <template slot="title">
                  点击跳转至首页
                </template>
                <a-icon type="link" />
              </a-tooltip>
            </router-link>
            <a-icon @click="showDrawer" type="setting"/>
            <span>
              <a-avatar style="margin-bottom: 3px" size="small" :src="admin.avatar" />
              <a-dropdown :style="{'margin-left': '5px'}">
                <a class="link-black" @click="e => e.preventDefault()">
                  {{admin.nickname}}
                </a>
                <a-menu style="margin: 20px; width: 100%" slot="overlay">
                  <a-menu-item>
                    <router-link to="/admin/profile" class="link-black"><a-icon class="mr-r" type="user" />个人资料</router-link>
                  </a-menu-item>
                   <a-menu-divider />
                  <a-menu-item @click="logout"><a class="link-black"><a-icon class="mr-r" type="logout" />退出登录</a></a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <router-view/>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        © 2020, made with <a-icon type="heart" theme="filled"/> by lwjppz
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import AdminApi from "../api/Admin";
  export default {
    name: "BasicLayout",
    data() {
      return {
        visible: false,
        admin: {
          avatar: '',
          nickname: ''
        }
      }
    },
    created () {
      console.log('token', localStorage.getItem('token'))
      this.getAdminInfo()
    },
    methods: {
      async getAdminInfo() {
        AdminApi.getAdminInfo().then(res => {
          if (res.code === 1000) {
            this.admin = res.data.admin
          } else {
            this.$message.warning('获取用户信息失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      },
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
      onCollapse (collapsed, type) {
        console.log(collapsed, type);
      },
      onBreakpoint (broken) {
        console.log(broken);
      },
      logout() {
        let that = this
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            localStorage.removeItem('token')
            that.$router.push('/')
          },
          onCancel() {}
        });
      }
    }
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 960) {
      document.getElementById('sider').style.position = 'absolute'
      document.getElementById('sider').style.minHeight = document.getElementById('Layout').clientHeight + 'px'
      document.getElementById('sider').style.zIndex = '999999'
    } else {
      document.getElementById('sider').style.position = 'relative'
    }
  })
  window.addEventListener('load', () => {
    if (window.innerWidth < 960) {
      document.getElementById('sider').style.position = 'absolute'
      document.getElementById('sider').style.minHeight = document.getElementById('Layout').clientHeight + 'px'
      document.getElementById('sider').style.zIndex = '999999'
    } else {
      document.getElementById('sider').style.position = 'relative'
    }
  })
</script>

<style lang="less" scoped>
  #Layout {
    min-height: 100vh;
  }
  #Layout .logo {
    position: relative;
    height: 60px;
    text-align: center;
    overflow: hidden;
    line-height: 60px;
    background: #002140;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  #sider {
    width: 300px;
  }
  .logo h1 {
    color: #fff;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
    vert-align: middle;
  }
  .user-wrapper {
    float: right;
    margin-right: 10px;
    .content-box > *{
      display: inline-block;
      padding: 0 20px;
    }
  }
</style>