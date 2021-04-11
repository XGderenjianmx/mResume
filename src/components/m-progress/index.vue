<template>
  <div class="container">
    <div class="canvas-container">
      <canvas id="circle" width="300" height="300" v-show="show"></canvas>
    </div>
    <ul class="list">
      <li v-for="value in set.data" :key="value.key">
        <p>{{ value.key }}</p>
        <p>{{ value.value }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import EnableCircle from "./index";
export default {
  name: "mProgress",
  props: {
    set: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    new EnableCircle(
      this.set
    )
  }
};
</script>
<style lang="scss" scoped >
// 在<style>标签外引入的不会被加上scoped属性
.container {
  width: 100%;
  display: flex;
  .canvas-container {
    flex: 1;
  }
  .list {
    list-style: none;
    flex: 1;
    display: flex;
    flex-flow: column;
    color: #f7fff7;
    li {
      padding: 20px 0 0 0;
    }
  }
}
</style>
