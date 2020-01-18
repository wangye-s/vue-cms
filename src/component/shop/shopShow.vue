<template>
  <div class="box">
    <h1>{{ this.shop.title }}</h1>
    <hr />
    <p v-html="this.shop.content" class="content"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shop: {},
      id: this.$route.params.id
    }
  },
  created() {
    this.getShopShow()
  },
  methods: {
    getShopShow() {
      this.$http.get('shopShow?id=' + this.id).then(function(result) {
        if (result.status === 200) {
          this.shop = result.body.message[0]
        } else {
          Toast('详情获取失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.box {
  h1 {
    font-size: 1.8rem;
    color: blue;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>