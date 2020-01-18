<template>
  <div class="shopListCon">
    <!-- router-Link -->
    <!-- <routerLink class="shopItem" v-for="item in this.shop_list" :key="item.id"
    :to="'/home/shopInfo/' + item._id" tag="div">-->

    <!-- 编程式导航 -->
    <div class="shopItem" v-for="item in this.shop_list" :key="item.id" @click="goInfo(item._id)">
      <img :src="item.img_url" alt />
      <h1>{{ item.title }}</h1>
      <div class="shop_bottom">
        <p class="price">
          <span class="now_price">{{ item.market_price }}</span>
          <span class="old_price">{{ item.sell_price }}</span>
        </p>0
        <p class="sell">
          <span>热卖中</span>
          <span>剩 {{ item.stock_quantify }} 件</span>
        </p>
      </div>
    </div>
    <mt-button size="large" type="danger" @click="getMore()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: 'shopList',
  data() {
    return {
      pageIndex: 0,
      shop_list: []
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    //获取商品列表
    getShopList() {
      this.$http
        .get('shop_list?pageIndex=' + this.pageIndex)
        .then(function(result) {
          this.shop_list = this.shop_list.concat(result.body.messages)
        })
    },

    //获取更多
    getMore() {
      this.pageIndex++
      this.getShopList()
    },

    //跳转详情的方法
    goInfo(id) {
      //方法1 字符串
      // this.$router.push('/home/shopInfo/' + id)
      //方法二 对象
      // this.$router.push({ path: '/home/shopInfo/' + id })
      //方法三 命名路由
      this.$router.push({ name: 'shopInfo', params: { id } })
      //方法四 带查询参数
      // this.$router.push({ path: '/home/shopInfo', query: { id } })
    }
  }
}
</script>

<style scoped lang="less">
.shopListCon {
  display: flex;
  flex-wrap: wrap;
  padding: 0.7rem;
  justify-content: space-between;
  .shopItem {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 0.8rem #ccc;
    margin: 0.4rem 0;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 29.3rem;
    img {
      width: 100%;
    }
    h1 {
      font-size: 1.8rem;
    }

    .shop_bottom {
      background-color: #eee;
      padding: 0.5rem;
      padding-bottom: 0;
      .price {
        .now_price {
          font-size: 1.6rem;
          color: red;
          font-weight: bold;
        }
        .old_price {
          font-size: 1.2rem;
          margin-left: 1rem;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 1.3rem;
      }
    }
  }
}
</style>
