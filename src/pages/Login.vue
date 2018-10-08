<template>
  <el-form size="mini" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: null,
        password: null
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
