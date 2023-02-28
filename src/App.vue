<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view />
    <h1>黑马头条</h1>
    <div>
      <i class="iconfont icon-shouji"></i>
    </div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
