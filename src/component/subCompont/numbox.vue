<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
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
    countChanged() {
      //每当文本框的值发生变化时, 通过时间调用将 文本框的值 发送给父组件
      this.$emit('getCount', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    max: function(newValue, oldValue) {
      //通过mui-numbox 的js代码控制num框的最大值
      mui('.mui-numbox')
        .numbox()
        .setOption('max', newValue)
    }
  }
}
</script>

<style lang="less" scoped>
</style>