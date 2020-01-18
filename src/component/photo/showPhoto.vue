
<template>
    <div class="photo_container">
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
<!--                    设置导航栏中被选中的元素高亮-->
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active': '']" v-for="item in this.cates" :key="item.id" @tap="getImgInfo(item.cate_id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

<!--       图片列表区域 -->
        <ul class="photo-list">
            <router-link class="photo-info" :to="'/home/photoInfo/'+ item._id " v-for="item in this.list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-content"> {{ item.abstract }} </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //导入 mui.js 配置顶部导航条滑动
    import mui from '../../lib/mui/js/mui.min.js'
    import { Toast } from 'mint-ui'

  export default {
    name: 'showPhoto',
    data() {
      return {
        cates: [], //图片分类
        list: []  //图片内容列表
      }
    },
    created() {
      this.getNav();
      this.getImgInfo(0);
    },
    mounted() {
      //初始化滑动控件
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods: {
      //获取图片分类
      getNav(){
        this.$http
          .get('http://127.0.0.1:5000/photocates')
          .then(function (result) {
          if (result.body.status === 200) {
            this.cates = result.body.messages
          } else {
            Toast('分类获取失败')
          }
        })
      },



      //根据传递的typeNum,获取所有图片列表
      getImgInfo(typeNum) {
        if (typeNum === 0) {
          this.$http
            .get('http://127.0.0.1:5000/photoList')
            .then(function (result) {
              // console.log(result)
              if (result.body.status === 200) {
                this.list = result.body.messages
              } else {
                Toast('图片获取失败')
              }
            })
        } else {
          this.$http
            .get('http://127.0.0.1:5000/photoList?typeNum=' + typeNum)
            .then(function (result) {
              // console.log(result)
              if (result.body.status === 200) {
                this.list = result.body.messages
              } else {
                Toast('图片获取失败')
              }
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
*{
    touch-action: pan-y;  //启用单指垂直平移手势  是谷歌用来提升滑动流畅度的样式
}
    .photo_container {
        .photo-list {
            list-style: none;
            padding: 1rem;
            padding-bottom: 0;
            margin: 0;
            .photo-info {
                background-color: #ccc;
                text-align: center;
                margin-bottom: 1rem;
                box-shadow: 0 0 0.9rem #999;
                position: relative;
                img {
                    width: 100%;
                    vertical-align: middle;
                }
                img[lazy = loading]{
                    width: 4rem;
                    height: 30rem;
                    margin: auto;
                }
                .info {
                    color: #fff;
                    text-align: left;
                    position: absolute;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    max-height: 8.4rem;

                    .info-title {
                        font-size: 1.4rem;
                    }
                    .info-content {
                        font-size: 1.3rem;
                    }
                }
            }
        }
    }
</style>