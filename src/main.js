// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'

//2.3 导入vuex
import Vuex from 'vuex'
//挂载vuex
Vue.use(Vuex)

//刚进入网站时,会调用main.js 将 localStorage 本地存储中 的购物车数据取出来, 放到 store 中
let car = JSON.parse(localStorage.getItem('car') || '[]')

//创建一个实例对象
const store = new Vuex.Store({
  state: {
    //this.$store.state.***
    // 在 state 中创建一个 car 数组,用于保存其他组件传递过来的 购物车数据
    //{"id": "商品ID", "buyCount": "购买数量", "shopPrice": "购买单价", "seleFlag": "是否选中"}
    car: car
  },
  mutations: {
    //加入购物车的方法
    addToCar(state, buyInfo) {
      //判断前面购物车中是否已将添加了同一件商品,若是, 则直接改变 buyCount 的值
      //若不是, 则直接 push 到 car 中
      console.log(buyInfo + '4')
      //假设在购物车中没有找到相同的物品
      let flag = false

      state.car.some(item => {
        if (item.id == buyInfo.id) {
          item.buyCount += parseInt(buyInfo.buyCount)
          flag = true
          return true
        }
      })
      //如果循环结束, flag 还是false, 则直接push
      if (!flag) {
        state.car.push(buyInfo)
      }
      //将数据保存到本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    //更新购物车商品数量的方法
    updateCarCount(state, buyInfo) {
      //根据 numbox 修改的商品数量来 更新 car 的数据
      state.car.some(item => {
        if (item.id == buyInfo.id) {
          item.buyCount = parseInt(buyInfo.count)
          return true
        }
      })
      //将修改后的数据保存到 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //删除car 中对应的数据
    deleteCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      //删除完毕, 更新 localStorge 中的数据
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //修改购物车中物品的选中状态
    changeSelected(state, shopInfo) {
      state.car.some(item => {
        if (item.id == shopInfo.id) {
          item.seleFlag = shopInfo.selected
        }
      })
      //将更新后的数据保存到localStroage中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // this.$store.getters.****
    //获取购物车数量总和
    getAllCount(state) {
      let c = 0
      state.car.forEach(item => {
        c += item.buyCount
      })

      return c
    },

    //获取选中商品的数量
    getShopCount(state) {
      let count = {}
      state.car.forEach(item => {
        count[item.id] = item.buyCount
      })
      return count
    },

    //获取商品选中的状态
    getShopSelected(state) {
      let selected = {}
      state.car.forEach(item => {
        selected[item.id] = item.seleFlag
      })
      return selected
    },

    //计算购物车的总数量和总价格
    getShopCountAndPrice(state) {
      let shop = {
        count: 0,
        price: 0
      }
      //当物品被选中时计算
      state.car.forEach(item => {
        if (item.seleFlag) {
          shop.count += item.buyCount
          shop.price += item.shopPrice * shop.count
        }
      })
      return shop
    }
  }
})

// 1.2 安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义一个全局的时间过滤器
Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

//2.1 导入 vue-resource
import vueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(vueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.yjste.cn:5000'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

//导入 Mui 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

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

//1.3 导入自己的 router.js 路由模块
import router from './router'

//导入 App 根组件
import app from './App.vue'

let vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, //1.4 挂载路由
  store // 挂载vuex.store 实例
})
