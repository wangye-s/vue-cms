<template>
    <div class="photoInfoContainer">
        <div class="top">
            <h3>{{ photoInfo.title }}</h3>
            <p>
                <span class="pub_time">发表时间: {{ photoInfo.add_time | dataFormat }}</span>
                <span class="click_num">点击: {{ photoInfo.click }} 次</span>
            </p>
        </div>
        <hr>
<!--    缩略图部分    -->
        <div class="thumbs">
            <vue-preview
            :list="this.list"
            :thumbImageStyle="{width: '8rem', height: '8rem', margin: '1rem', 'box-shadow': '0 0 0.8rem #999'}"
            :previewBoxStyle="{border: '0.1rem solid #eee', 'text-align': 'center'}"
            :tapToClose = 'true'
            @close='closeHandler()'
            @destroy='destroyHandler()'>
            </vue-preview>
        </div>

<!--    图片内容部分    -->
        <div class="content" v-html="photoInfo.content"></div>

<!--    评论子模块    -->
        <cmt_2 :id="this.id"></cmt_2>
    </div>
</template>

<script>
    import Comment from '../subCompont/criticComp.vue'
    import { Toast } from 'mint-ui'

  export default {
    name: 'photoInfo',
    data(){
      return {
        id: this.$route.params.id,
        photoInfo: {},
        list: []
      }
    },
    created() {
      this.getPhotoContent()
      this.getThumbImg()
    },
    methods: {
      //获取图文详情内容
      getPhotoContent() {
        this.$http
          .get('http://127.0.0.1:5000/photoContent?id=' + this.id)
          .then(function (result) {
            if (result.body.status === 200) {
              this.photoInfo = result.body.messages[0]
            } else {
              Toast('分类获取失败')
            }
        })
      },

      //获取缩略图
      getThumbImg() {
        this.$http
          .get('http://127.0.0.1:5000/getthumimg?id='+ this.id)
          .then(function (result) {
            if (result.body.status === 200) {
              this.list = result.body.messages
              console.log(this.list)
              this.list.forEach(item => {
                item.w = 600;  //设置以大图浏览时的宽度
                item.h = 400;  //设置以大图浏览时的高度
                item.src = item.src;  //大图
                item.msrc = item.src; //小图
              })
            } else {
              Toast('分类获取失败')
            }
        })
      },

      //缩略图处理
      // 即将关闭的时候，调用这个处理函数
      closeHandler() {
        console.log('closeHandler')
      },
      // 完全关闭之后，调用这个函数清理资源
      destroyHandler() {
        console.log('destroyHandler')
      }

    },
    components: {
      "cmt_2": Comment
    }
  }
</script>

<style lang="less" scoped>
.photoInfoContainer{
    padding: 0.5rem;
    .top {
        h3 {
            text-align: center;
            font-size: 1.6rem;
            color: #02C1ED;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
        }
        p {
            display: flex;
            justify-content: space-between;
        }
    }
    .thumbs {
        margin-top: 1.5rem;
    }
    .content {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
}
</style>
