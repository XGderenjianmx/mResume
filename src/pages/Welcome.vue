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
      //传入的字符串将按照 空格 进行分割，转换为数组，首位空格则会导致数组地位为空
      msg: " Welcome to this Site!"
    }
  },
  components: {
    mFontAnimate
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
