<template>
  <div id="q-app">
    <router-view/>
    <div style="position: fixed;font-size: 10px;text-align: center;bottom: 0;left: 0;width: 100%;color: #000000;opacity: 0.2;">
      此应用数据来源于新浪、百度，仅供学习编程使用，不得用于商业用途。
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  html, body {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #424242;
  }
</style>
