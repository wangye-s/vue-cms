<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initCount"
      ref="numbox"
      @change="countChange()"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  mounted() {
    mui('.mui-numbox').numbox()
  },
  methods: {
    //当 numbox 中的数据发生改变时
    countChange() {
      this.$store.commit('updateCarCount', {
        id: this.shopid,
        count: this.$refs.numbox.value
      })
    }
  },
  //父组件向子组件传值
  props: ['initCount', 'shopid']
}
</script>

<style lang="less" scoped>
</style>