<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created(){
    document.title = '建材一条街';
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>
