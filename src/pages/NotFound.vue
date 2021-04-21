<template>
  <div class="err-container">
    <m-font-animate
      :msg="msg"
      :color="'var(--font-color)'"
      :bg="'var(--bar-color)'"
    />
    <div class="message">
      <p>Sorry , can not find this page !</p>
      <mark>
        <router-link replace to="/">go Home</router-link>
      </mark>
    </div>
  </div>
</template>
<script>
import mFontAnimate from "../components/m-font-animate/index.vue"
export default {
  name: "NotFound",
  components: {
    mFontAnimate
  },
  data() {
    return {
      msg: " 404"
    }
  },
  mounted() {
    console.log(this.$router)
  }
}
</script>
<style lang="scss" scoped>
.err-container {
  position: relative;
  width: 100vw;
}
.message {
  position: absolute;
  bottom: 32vh;
  text-align: center;
  width: 100vw;
  color: var(--font-color);
  font-size: 22px;
  mark {
    background-color: transparent;
    text-decoration: underline;
  }
  a {
    font-size: 30px;
    color: var(--font-color);
  }
}
</style>
