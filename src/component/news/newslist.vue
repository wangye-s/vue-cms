<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item._id">
                <router-link :to="'/home/newsinfo/' + item._id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发布时间: {{ item.add_time | dataFormat}}</span>
                            <span>点击次数: {{ item.click }} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  export default {
    name: 'newslist',
    data() {
      return {
        newsList: []
      }
    },
    created() {
      this.getNewsList();
    },
    methods: {
      getNewsList() {
        this.$http.get('http://127.0.0.1:5000/newslist').then(function (result) {
          // console.log(result)
          if (result.body.status === 200) {
            this.newsList = result.body.messages
          } else {
            Toast( '新闻列表获取失败' )
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .mui-table-view{
        li{
            h1{
                font-size: 1.3rem;
            }

            .mui-ellipsis{
                font-size: 1.2rem;
                color: #22eeff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>