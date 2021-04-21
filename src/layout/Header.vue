<template>
  <div class="header-container">
    <i></i>
    <Switcher />
  </div>
</template>
<script>
import Switcher from "../components/switcher"
export default {
  components: {
    Switcher
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--header-height);
  background-color: var(--theme-color);
  color: var(--font-color);
  &::after {
    width: 0.6rem;
    height: 0.6rem;
    display: block;
    content: "";
    background: url("../assets/img/h1.svg");
    position: absolute;
    bottom: -0.6rem;
    transform: rotateY(180deg);
    right: 2vw;
  }
  &::before {
    width: 0.6rem;
    height: 0.6rem;
    display: block;
    content: "";
    background: url("../assets/img/h1.svg");
    position: absolute;
    bottom: -0.6rem;
    left: 2vw;
  }
}
</style>