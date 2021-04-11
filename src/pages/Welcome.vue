<template>
  <div class="welcome">
    <mFontAnimate :msg="msg" />
  </div>
</template>

<script>
import mFontAnimate from "../components/m-font-animate/index.vue"
export default {
  name: "Welcome",
  data() {
    return {
      //传入的字符串使用 空格 进行分割，转换为数组
      msg: "Hello, I'm A Web Developer"
    }
  },
  components: {
    mFontAnimate
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
