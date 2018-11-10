<template>
  <div class="side-bar">
    <el-menu router :default-active="activeIndex">
      <el-menu-item index="banner">{{$t('sideBar.banner')}}</el-menu-item>
      <el-menu-item index="team">{{$t('sideBar.team')}}</el-menu-item>
      <el-menu-item index="portfolio">{{$t('sideBar.portfolio')}}</el-menu-item>
      <el-menu-item index="community">{{$t('sideBar.community')}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.name
      }
    }
  }

</script>
<style lang="less">
  .side-bar {
    width: 300px;
    height: 100%;
    border-right: 1px solid #eee;
    .el-menu {
      border-right: none;
    }
    .el-menu-item {
      border-bottom: 1px solid #eee;
    }
  }
</style>
