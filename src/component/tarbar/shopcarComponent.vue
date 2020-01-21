<template>
  <div class="shopCarInfo">
    <!-- 商品列表项区域 -->
    <div class="mui-card" v-for="(item, i) in shopCarList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch
            v-model="$store.getters.getShopSelected[item.shop_id]"
            @change="
              changeSeleCar(
                item.shop_id,
                $store.getters.getShopSelected[item.shop_id]
              )
            "
          ></mt-switch>
          <img :src="item.thumb_path" alt />
          <div class="info">
            <h1>{{ item.title }}</h1>
            <p>
              <span class="price">￥{{ item.sell_price }}</span>
              <numbox
                :initCount="$store.getters.getShopCount[item.shop_id]"
                :shopid="item.shop_id"
              ></numbox>
              <a href="#" @click.prevent="deleteCar(item.shop_id, i)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{
                $store.getters.getShopCountAndPrice.count
              }}</span
              >件,总价:
              <span class="red"
                >￥{{ $store.getters.getShopCountAndPrice.price }}</span
              >
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from 'mint-ui'
import numbox from './../subCompont/shopNumbox.vue'

export default {
  name: 'shopcarComponent',
  data() {
    return {
      shopCarList: []
    }
  },
  created() {
    this.getShopCar()
  },
  methods: {
    //从后台获取购物车的数据
    getShopCar() {
      //从 vuex 的store 中获取 car 的数据, 然后将其中的 id 拼接成一个以 , 分割的字符串
      let carList = []
      this.$store.state.car.forEach(item => carList.push(item.id))
      //如果购物车中没有商品, 则直接返回
      if (carList.length <= 0) {
        return
      }

      this.$http
        .get('getShopCar?id=' + carList.join(','))
        .then(function(result) {
          if (result.status === 200) {
            this.shopCarList = result.body.message
          } else {
            Toast('轮播图获取失败')
          }
        })
    },
    //删除
    deleteCar(id, index) {
      //先将数据从 shopCarList 中删除
      this.shopCarList.splice(index, 1)
      //再将 store 中存储的 car 中的对应数据删除
      this.$store.commit('deleteCar', id)
    },
    //修改购物车物品选中状态
    changeSeleCar(id, sele) {
      this.$store.commit('changeSelected', {
        id,
        selected: sele
      })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="less" scoped>
.shopCarInfo {
  background-color: #eee;
  overflow: hidden;

  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }

  img {
    width: 6rem;
  }
  h1 {
    font-size: 1.3rem;
  }
  p {
    margin: 0;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0.4rem 0 0 0.4rem;
    .price {
      color: red;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .red {
      color: red;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
}
</style>
