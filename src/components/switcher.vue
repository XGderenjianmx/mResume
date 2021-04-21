<template>
  <div class="switcher">
    <router-link class="switcher-item" to="/home">home</router-link>
    <router-link class="switcher-item" to="/concise">resume</router-link>
  </div>
</template>
<script>
export default {
  name: "Switcher"
}
</script>
<style lang="scss" scoped>
.switcher {
  width: 100px;
  min-width: 60px;
  display: flex;
  margin: 0 auto;
  border-radius: 5px;
  .switcher-item {
    flex: 1;
  }
}
</style>