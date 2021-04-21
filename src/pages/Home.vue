<template>
  <div class="home">
    <div class="card" v-for="(a, i) in arr" :key="i">
      <h2>标题</h2>
      <p>
        注意：任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合:
        1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为
        16px*62.5%=10px, 这样12px=1.2em, 10px=1em,
        也就是说只需要将你的原来的px数值除以10
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      arr: [123, 321, 123, 321, 123]
    }
  },
  computed: {

  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped>
.home {
  margin: var(--header-height) auto;
  margin-bottom: 0;
  padding: 1rem 0 0 0;
  width: var(--main-width);
  background-color: var(--theme-color);
  border-radius: 0.6rem;
  h2 {
    color: var(--font-color);
    font-size: 30px;
    line-height: 1;
    text-align: left;
    font-weight: 700;
    padding: 0 0 1rem 0;
  }
  .card {
    box-sizing: border-box;
    width: 100%;
    min-height: 50vh;
    margin: 2vw auto;
    margin-bottom: 0;
    background-color: var(--bar-color);
    color: var(--font-color);
    padding: 1rem;
    border-radius: 0.6rem;
  }
}
</style>
