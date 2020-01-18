<template>
    <div>
        <!-- 轮播图区域       -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in this.swipeList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格区域       -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                  <img src="../../images/menu1(1).png" alt="">
                  <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photo">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
  export default {
    name: 'homeComponent',
    data() {
      return {
        swipeList: []
      }
    },
    created() {
      this.getSwipe()
    },
    methods: {
      //获得轮播图的方法
      getSwipe() {
        this.$http.get('http://127.0.0.1:5000/').then(function (result) {
          if (result.status === 200) {
            this.swipeList = result.body
          } else {
            Toast('轮播图获取失败')
          }

        })
      }
    }
  }
</script>

<style lang="less" scoped>
    //轮播图样式
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    //九宫格样式
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
            img{
                width: 6rem;
                height: 6rem;
            }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>