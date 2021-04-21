<template>
  <div class="welcome">
    <mFontAnimate
      :msg="msg"
      :color="'var(--font-color)'"
      :bg="'var(--bar-color)'"
    />
  </div>
</template>

<script>
import mFontAnimate from "../components/m-font-animate/index.vue"
import { setCookie } from "../utils/cookies"
export default {
  name: "Welcome",
  data() {
    return {
      //传入的字符串将按照 空格 进行分割，转换为数组，首位空格则会导致数组第一位为空
      msg: " Welcome to this Site!"
    }
  },
  components: {
    mFontAnimate
  },
  mounted() {
    //
    setCookie(30 * 60 * 1000)
  }
};
</script>


<style lang="scss" scoped>
</style>
