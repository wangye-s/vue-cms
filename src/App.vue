<template>
  <div class="app-container">
    <!-- 顶部header 区域   -->
    <mt-header fixed title="首页"></mt-header>

    <!-- 中间的 路由 Router-view 区域  -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部的 Tabbar 区域  -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-items" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-items" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">消息</span>
      </router-link>
      <router-link class="mui-tab-items" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-items" to="/search">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>


<style lang="less" scoped>
.mint-header {
  z-index: 99;
}
.app-container {
  padding-top: 4rem;
  padding-bottom: 5rem;
  overflow-x: hidden;
}
.mui-bar {
  vertical-align: bottom;
}

//页面滑动动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
