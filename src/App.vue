<template>
  <div class="layout">
    <Header></Header>
    <div class="layout-content">
      <SideBar></SideBar>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import SideBar from './components/SideBar.vue'
  export default {
    components: {
      Header,
      SideBar
    }
  }

</script>

<style lang="less">
  .layout {
    display: flex;
    flex-direction: column;
    .layout-content {
      flex: 1;
      display: flex;
      flex-direction: row;
      .container {
        flex: 1;
        margin:  20px;
      }
    }
  }

</style>
