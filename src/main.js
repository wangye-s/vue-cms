// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
//2.1 导入 vue-resource
import vueResource from 'vue-resource'

// 1.2 安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义一个全局的时间过滤器
Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

//2.2 安装vue-resource
Vue.use(vueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.yjste.cn:5000'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import MintUI from 'mint-ui'
Vue.use(MintUI)

//导入缩略图插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

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
  router //1.4 挂载路由
})
