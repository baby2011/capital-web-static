<template>
  <div class="login">
    <el-form :model="form" ref="form" size="mini" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <span class="footer">
      <el-button @click="loginDialogVisible = false">取消</el-button>
      <el-button @click="login" type="primary">登录</el-button>
    </span>
  </div>
</template>
<script>
  import request from '@/util/request'
  export default {
    data() {
      return {
        form: {
          username: null,
          password: null
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名'
          }],
          password: [{
            required: true,
            message: '请输入密码'
          }]
        }
      }
    },
    methods: {
      login() {
        this.$refs.form.validate(valid => {
          if (valid) {
            request.login(this.form).then(() => {
              location.reload()
            })
          }
        })
      }
    }
  }

</script>
<style lang="less" scoped>
  .footer {
    display: flex;
    justify-content: center;
  }

</style>
