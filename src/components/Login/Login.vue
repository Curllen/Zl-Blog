<template>
  <div class="lwj-container">
    <div class="zl-logo animated fadeInUp">
      <span>ZL-Blog</span>
    </div>
    <div class="animated">
      <a-input class="animated fadeInUp" v-model="username" placeholder="用户名/邮箱: lwjppz">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
      <a-input v-model="password" class="mr-tt animated fadeInUp" placeholder="密码: 123456">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
      <a-button style="width: 100%" class="mr-tt animated fadeInUp" type="primary" @click="loginClick">登录</a-button>
      <router-link class="fl-r mr-tt animated fadeInUp" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
  import AdminApi from "../../api/Admin";
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async loginClick() {
        if (this.username === '') {
          this.$message.warning('用户名不能为空')
          return
        }
        if (this.password === '') {
          this.$message.warning('密码不能为空')
          return
        }
        AdminApi.login(this.username, this.password).then(res => {
          if (res.code === 1000) {
            localStorage.setItem('token', this.username)
            this.$notification['success']({
              message: '欢迎',
              description: this.username + '，欢迎登录'
            })
            this.$router.push('/admin')
          } else {
            this.$message.warning('用户名或密码不正确')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .lwj-container {
    background: #fff;
    position: absolute;
    border-radius: 5px;
    top: 45%;
    left: 50%;
    margin: -160px 0 0 -160px;
    width: 320px;
    padding: 18px 28px 28px 28px;
    -webkit-box-shadow: -4px 7px 46px 2px rgba(0,0,0,.1);
    box-shadow: -4px 7px 46px 2px rgba(0,0,0,.1);
  }
  .zl-logo {
    margin-bottom: 20px;
    text-align: center;
  }
  .zl-logo span {
    vertical-align: text-bottom;
    font-size: 38px;
    display: inline-block;
    font-weight: 600;
    color: #1790fe;
    background-image: linear-gradient(-20deg,#6e45e2,#88d3ce);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
</style>