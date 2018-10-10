<template>
  <div>
    <el-row>
      <el-col>
        <el-button @click="showCreateDialog" style="float: right" type="primary" size="mini">添加成员</el-button>
      </el-col>
    </el-row>
    <el-table :data="list">
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="link"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="showEditDialog(scope.$index, scope.row)" size="mini" type="primary">编辑</el-button>
          <el-button @click="onDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="dialog" :visible.sync="dialogVisible" title="添加成员">
      <el-form ref="form" size="mini" style="width: 80%" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="领英名片地址">
          <el-input v-model="form.link" placeholder="请输入领英名片地址"></el-input>
        </el-form-item>
      </el-form>
      <span class="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="onSubmit" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import request from '@/util/request'
  import url from '@/util/url'
  export default {
    data() {
      return {
        list: [],
        form: {
          id: null,
          name: null,
          link: null
        },
        actionType: 'create',
        dialogVisible: false
      }
    },
    computed: {
      uploadUrl() {
        return url.domain + '/api/upload'
      }
    },
    created() {
      this.getTeamList()
    },
    methods: {
      onUpload(response) {
        if (response.code == 200) {
          this.form.logo = response.data.url
        }
      },
      getTeamList() {
        request.getTeamList().then(data => {
          this.list = data.list
        })
      },
      onSubmit() {
        if (this.actionType === 'create') {
          this.createTeam()
        } else if (this.actionType === 'edit') {
          this.updateTeam()
        }
      },
      createTeam() {
        request.createTeam(this.form).then(data => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          this.getTeamList()

        })
      },
      updateTeam() {
        request.updateTeam(this.form).then(data => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.getTeamList()

        })
      },
      deleteTeam(id) {
        request.deleteTeam({ id }).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTeamList()
        })
      },
      showCreateDialog() {
        this.actionType = 'create'
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      },
      showEditDialog(index, row) {
        this.actionType = 'edit'
        this.form.id = row.id
        this.form.name = row.name
        this.form.link = row.link
        this.dialogVisible = true
      },
      onDelete(index, row) {
        this.$confirm('确定删除该Team?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTeam(row.id)
        })
      }
    }
  }

</script>
<style lang="less">
  .dialog {
    .footer {
      display: flex;
      justify-content: center;
    }
  }

  .logo {
    width: 60px;
    height: 60px;
  }

</style>
