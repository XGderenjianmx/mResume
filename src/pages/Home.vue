<template>
  <div class="home">
    <h1>Sweet Home</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  computed: {

  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: $theme-color;
  h1 {
    color: $font-color;
    font-size: 30px;
    line-height: 1;
    text-align: center;
    font-weight: 700;
  }
}
</style>
