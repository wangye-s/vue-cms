<template>
  <div class="shopInfoBox">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunboList="swipList" :isfull="true"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买详情区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ shopInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{ shopInfo.market_price }}</del>&nbsp;&nbsp;销售价:
            <span class="sell-price">￥{{ shopInfo.sell_price }}</span>
          </p>
          <p>
            <span>
              购买数量:
              <numbox></numbox>
            </span>
          </p>

          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="getBall()">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{ shopInfo.goods_no }}</p>
          <p>库存情况: {{ shopInfo.stock_quantity }}</p>
          <p>上架时间: {{ shopInfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getInfo(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getCritic(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from './../subCompont/swipe.vue'
import numbox from './../subCompont/numbox.vue'

export default {
  name: 'shopInfo',
  data() {
    return {
      id: this.$route.params.id,
      swipList: [],
      shopInfo: [],
      ballFlag: false
    }
  },
  created() {
    this.getLunbo()
    this.getShopInfo()
  },
  methods: {
    // 获取轮播图的方法
    getLunbo() {
      this.$http.get('swipe').then(function(result) {
        if (result.status === 200) {
          this.swipList = result.body
        } else {
          Toast('轮播图获取失败')
        }
      })
    },

    //获取商品详情数据的方法
    getShopInfo() {
      this.$http.get('getShopInfo?id=' + this.id).then(function(result) {
        if (result.status === 200) {
          this.shopInfo = result.body.message[0]
        } else {
          Toast('轮播图获取失败')
        }
      })
    },

    //获取图片介绍
    getInfo(id) {
      this.$router.push({ name: 'shopShow', params: { id } })
    },

    //获取评论
    getCritic(id) {
      this.$router.push({ name: 'shopCri', params: { id } })
    },

    //小球
    getBall() {
      this.ballFlag = !this.ballFlag
    },

    //购物车小球动画
    beforeEnter(el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {
      el.offsetWidth

      //小球动画的优化
      //通过 getBoundingClientRect() 方法拿到小球离顶部和左边的距离,再拿到购物车徽标离顶部和左边的距离, 两者相减.得到小球离徽标的位置
      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById('badge')
        .getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68) '
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="less" scoped>
.shopInfoBox {
  background-color: #eee;
  overflow: hidden;

  .price {
    .sell-price {
      color: red;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }

  .mui-card-footer {
    display: block;

    button {
      margin: 1.5rem 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    left: 13.9rem;
    top: 38.9rem;
    z-index: 99;
  }
}
</style>
