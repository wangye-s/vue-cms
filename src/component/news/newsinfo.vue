<template>
    <div class="news-container">
        <!-- 新闻标题       -->
        <h3 class="title"> {{ this.newsinfo.title }} </h3>
        <!-- 子标题       -->
        <div class="sub-header">
            <span>发表时间: {{ this.newsinfo.add_time | dataFormat }}</span>
            <span>点击数: {{ this.newsinfo.click }}</span>
        </div>
        <hr>
        <!--   内容   -->
        <div class="content" v-html="this.newsinfo.content">
        </div>
        <!--  评论       -->
        <criticComp :id="this.id"></criticComp>
    </div>
</template>

<script>

    import { Toast } from 'mint-ui'
    import criticComp from '../subCompont/criticComp.vue'

  export default {
    name: 'newsinfo',
    data() {
      return {
        id: this.$route.params.id,
        newsinfo: {}
      }
    },
    created() {
      // console.log(this.$route.params.id)
        this.getNewsInfo();
    },
    methods: {
      getNewsInfo() {
        // console.log(this.$route.params)
        this.$http.post('newsinfo',{ id: this.id }, { emulateJSON: true } ).then((result) => {
          if (result.body.status === 200) {
            this.newsinfo = result.body.messages
          } else {
            Toast('获取失败')
          }

        })
      }
    },
    components: {
      criticComp
    }
  }
</script>

<style lang="less">
    .news-container{
        padding: 0 0.4rem;
        .title {
            font-size: 1.6rem;
            margin: 1.5rem 0;
        }
        .sub-header{
            font-size: 1.3rem;
            display: flex;
            color: #226aff;
            justify-content: space-between;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }

</style>