import Vue from 'vue'
import VueRouter from 'vue-router'


import BasicLayout from "../views/BasicLayout";
import DashBoard from "../components/DashBoard/DashBoard";
import Articles from "../components/Articles/Articles";
import WriteArticle from "../components/Articles/WriteArticle";
import Categories from "../components/Categories/Categories";
import Tags from "../components/Tags/Tags";
import Links from "../components/Links/Links";
import Essays from "../components/Essays/Essays";
import Profile from "../components/Profile/Profile";
import Setting from "../components/System/Setting";
import Logs from "../components/Logs/Logs";
import Login from "../components/Login/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: BasicLayout,
    meta: {
      requireAuth: true
    },
    redirect: '/admin/dashboard',
    children: [
      {
        path: '/admin/dashboard',
        component: DashBoard
      },
      {
        path: '/admin/articles',
        component: Articles
      },
      {
        path: '/admin/write',
        component: WriteArticle
      },
      {
        path: '/admin/write/:id',
        component: WriteArticle
      },
      {
        path: '/admin/categories',
        component: Categories
      },
      {
        path: '/admin/tags',
        component: Tags
      },
      {
        path: '/admin/links',
        component: Links
      },
      {
        path: '/admin/essays',
        component: Essays
      },
      {
        path: '/admin/profile',
        component: Profile
      },
      {
        path: '/admin/setting',
        component: Setting
      },
      {
        path: '/admin/logs',
        component: Logs
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (token == null) {
      Vue.prototype.$notification['error']({
        message: '警告',
        description: '您还未登录, 请先登录'
      })
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
