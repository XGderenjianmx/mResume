<template>
  <div class="card">
    <div class="scale"></div>
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
