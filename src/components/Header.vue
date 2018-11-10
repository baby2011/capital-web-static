<template>
  <el-menu mode="horizontal">
    <el-menu-item index="1" class="logo">{{$t('slogan')}}</el-menu-item>
    <el-submenu index="2" style="float: right;">
      <template slot="title">{{user.real_name}}</template>
      <el-menu-item @click="logout" index="2-1">退出登录</el-menu-item>
    </el-submenu>
    <el-submenu index="3" style="float: right;">
      <template slot="title">语言</template>
      <a href="?lang=cn"><el-menu-item index="3-1">中文</el-menu-item></a>
      <a href="?lang=en"><el-menu-item index="3-2">English</el-menu-item></a>
    </el-submenu>
  </el-menu>
</template>
<script>
  import request from '@/util/request'
  export default {
    computed: {
      user () {
        return window.user
      }
    },
    methods: {
      logout() {
        request.logout().then(() => location.reload())
      }
    }
  }

</script>
<style lang="less">
  .logo {
    font-size: 20px;
    color: #333;
  }

</style>
