<template>
  <div>
    <side-bar />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Inter", sans-serif;
  margin-top: 60px;
}
.v-main {
  padding-top: 0 !important;
}
.v-application__wrap {
  min-height: 100% !important;
}
</style>
