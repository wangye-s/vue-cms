<template>
  <div class="critic">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容(最多评论120个字)" maxlength="120" v-model="msg"></textarea>
    <mt-button size="large" type="primary" @click="puplishCri">发表评论</mt-button>
    <div class="commentList" v-for="(item, i) in this.comments" :key="item.id">
      <div class="commentItem">
        <div class="commentTop">
          第{{ i + 1 }}楼 用户: {{ item.user_name }} 发表时间:
          {{ item.add_time | dataFormat }}
        </div>
        <div class="commentBottom">
          {{
          item.content === 'undefined' ? '此用户很懒，嘛都没说' : item.content
          }}
        </div>
      </div>
    </div>
    <mt-button size="large" type="danger" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  name: 'criticComp',
  data() {
    return {
      pageIndex: 0, //当前评论展示的页数
      comments: [], //获取的评论列表
      msg: '' //输入评论的内容
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    //获取评论列表的方法  传入当前的页数
    getComment() {
      this.$http
        .get('comment_list?id=' + this.id + '&pages=' + this.pageIndex)
        .then(function(result) {
          this.comments = this.comments.concat(result.body)
        })
    },
    //获取更多评论
    getMore() {
      this.pageIndex++
      this.getComment()
    },
    //提交评论的方法
    puplishCri() {
      //判断用户输入的内容是否为空
      if (this.msg.trim().length === 0) {
        return Toast('评论不能为空')
      }
      //发起请求
      this.$http
        .post('news_cri', { news_id: this.id, content: this.msg })
        .then(function(result) {
          //在用户评论后,手动拼接一个对象,通过数组的 unshift 方法将其添加到评论列表的顶端
          let critic = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.comments.unshift(critic)
          this.msg = ''
        })
    }
  },
  props: ['id']
}
</script>

<style scoped lang="less">
.critic {
  h3 {
    font-size: 1.6rem;
  }
  textarea {
    font-size: 1.4rem;
  }
  .commentList {
    padding: 0.5rem;
    .commentItem {
      color: #000;
      .commentTop {
        font-size: 1.3rem;
        background-color: #ccc;
      }
      .commentBottom {
        font-size: 1.4rem;
        text-indent: 2rem;
      }
    }
  }
}
</style>
