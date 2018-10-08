<template>
  <div class="layout">
    <Header></Header>
    <div class="layout-content">
      <SideBar></SideBar>
      <div class="container">
        <router-view />
      </div>
    </div>
    <el-dialog title="登录" :visible.sync="loginDialogVisible">
      <Login style="width: 60%" v-if="loginDialogVisible"></Login>
      
    </el-dialog>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import SideBar from './components/SideBar.vue'
  import Login from './components/Login.vue'
  export default {
    components: {
      Header,
      SideBar,
      Login
    },
    data() {
      return {
        loginDialogVisible: false
      }
    },
    created() {
      if (window.user == null) {
        this.loginDialogVisible = true
      }
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
        margin: 20px;
      }
    }
  }

</style>
