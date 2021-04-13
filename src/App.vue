<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in"
      ><router-view
    /></transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
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
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: opacity;
  transition: all 0.7s;
}
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
}
.slide-right-enter-to,
.slide-right-leave {
  opacity: 1;
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}
.slide-left-enter-to,
.slide-left-leave {
  opacity: 1;
}
</style>
