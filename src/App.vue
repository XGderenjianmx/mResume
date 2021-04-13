<template>
  <div id="app">
    <transition name="fade" mode="out-in"><router-view /></transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {

    }
  }

}
</script>

<style lang="scss">
@import "./assets/base.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transition: all 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
