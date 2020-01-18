import VueRouter from 'vue-router'

//引入自定义的组件
import homeComponent from './component/tarbar/homeComponent.vue'
import memberComponent from './component/tarbar/memberComponent.vue'
import searchComponent from './component/tarbar/searchComponent.vue'
import shopcarComponent from './component/tarbar/shopcarComponent.vue'
import newslistComponent from './component/news/newslist.vue'
import newsInfoComponent from './component/news/newsinfo.vue'
import showPhotoComponent from './component/photo/showPhoto.vue'
import photoInfoComponent from './component/photo/photoInfo.vue'
import shopListComponent from './component/shop/shopList.vue'
import shopInfoComponent from './component/shop/shopInfo.vue'
import shopShowComponent from './component/shop/shopShow.vue'
import shopCriComponent from './component/shop/shopCri.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    //配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/search', component: searchComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/home/newslist', component: newslistComponent },
    { path: '/home/newsinfo/:id', component: newsInfoComponent },
    { path: '/home/photo', component: showPhotoComponent },
    { path: '/home/photoInfo/:id', component: photoInfoComponent },
    { path: '/home/shop', component: shopListComponent },
    {
      path: '/home/shopInfo/:id',
      component: shopInfoComponent,
      name: 'shopInfo'
    },
    {
      path: '/home/shopShow/:id',
      component: shopShowComponent,
      name: 'shopShow'
    },
    { path: '/home/shopCri/:id', component: shopCriComponent, name: 'shopCri' }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的设置路由高亮的类
})

// 把路由对象暴露出去
export default router
