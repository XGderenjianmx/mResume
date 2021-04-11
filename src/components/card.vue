<template>
  <div class="card">
    <div class="scale">这是一个可以把卡片放大到全屏的按钮</div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: {
    msg: {
      type: String,
      reqiured: true
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  background-color: aquamarine;
}
</style>
