<template>
  <div>
    <el-row>
      <el-col>
        <el-button @click="showCreateDialog" style="float: right" type="primary" size="mini">添加成员</el-button>
      </el-col>
    </el-row>
    <el-table :data="list">
      <!-- <el-table-column label="#" prop="id"></el-table-column> -->
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="领英链接" prop="link"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img style="width: 50px; height: 50px" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description">
        <template slot-scope="scope">
          <p class="description">{{scope.row.description}}</p>
        </template>
      </el-table-column>
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
        <el-form-item label="角色">
          <el-input v-model="form.role" placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload :action="uploadUrl" :on-success="onUpload" :show-file-list="false">
            <div class="uploader">
              <img class="uploader-image" v-if="form.avatar" :src="form.avatar">
              <i v-else class="el-icon-plus"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="领英链接">
          <el-input v-model="form.link" placeholder="请输入领英地址"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description" placeholder="请输入描述"></el-input>
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
          role: null,
          avatar: null,
          link: null,
          description: null
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
          this.form.avatar = response.data.url
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
        request.deleteTeam({
          id
        }).then(data => {
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
        this.form.role = row.role
        this.form.avatar = row.avatar
        this.form.link = row.link
        this.form.description = row.description
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


  .uploader {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

</style>
