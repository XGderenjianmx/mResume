<template>
  <div class="wrap">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "./Footer"
import Header from "./Header"
import Main from "./Main"
export default {
  name: 'Layout',
  components: {
    Footer,
    Header,
    Main
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.wrap {
  background-color: var(--theme-color);
}
</style>
