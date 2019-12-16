import VueRouter from 'vue-router'

//引入自定义的组件
import homeComponent from './component/tarbar/homeComponent.vue'
import memberComponent from './component/tarbar/memberComponent.vue'
import searchComponent from './component/tarbar/searchComponent.vue'
import shopcarComponent from './component/tarbar/shopcarComponent.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [  //配置路由规则
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/search', component: searchComponent },
    { path: '/shopcar', component: shopcarComponent }
  ],
  linkActiveClass: 'mui-active'  //覆盖默认的设置路由高亮的类
})

// 把路由对象暴露出去
export default router