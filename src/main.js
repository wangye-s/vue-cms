// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
//2.1 导入 vue-resource
import vueResource from 'vue-resource'

// 1.2 安装路由
Vue.use(VueRouter)
//2.2 安装vue-resource
Vue.use(vueResource)

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem  } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入 Mui 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//1.3 导入自己的 router.js 路由模块
import router from './router'

//导入 App 根组件
import app from './App.vue'

let vm = new Vue({
  el: '#app',
  render: c => c(app),
  router  //1.4 挂载路由
})