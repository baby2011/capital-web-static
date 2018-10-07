<template>
  <div>
    <el-row>
      <el-col>
        <el-button @click="showCreateDialog" style="float: right" type="primary" size="mini">添加Banner</el-button>
      </el-col>
    </el-row>
    <el-table :data="list">
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="logo">
        <template slot-scope="scope">
          <img class="logo" :src="scope.row.logo">
        </template>
      </el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="showEditDialog(scope.$index, scope.row)" size="mini" type="primary">编辑</el-button>
          <el-button @click="onDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="dialog" :visible.sync="dialogVisible" title="添加Banner">
      <el-form ref="form" size="mini" style="width: 60%" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input :rows="8" type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="logo">
          <el-upload :action="uploadUrl" :on-success="onUpload">
            <el-button type="primary">点击上传</el-button>
          </el-upload>
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
          title: null,
          logo: null,
          content: null
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
      this.getBannerList()
    },
    methods: {
      onUpload(response) {
        if (response.code == 200) {
          this.form.logo = response.data.url
        }
      },
      getBannerList() {
        request.getBannerList().then(data => {
          this.list = data.list
        })
      },
      onSubmit() {
        if (this.actionType === 'create') {
          this.createBanner()
        } else if (this.actionType === 'edit') {
          this.updateBanner()
        }
      },
      createBanner() {
        request.createBanner(this.form).then(data => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          this.getBannerList()

        })
      },
      updateBanner() {
        request.updateBanner(this.form).then(data => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.getBannerList()

        })
      },
      deleteBanner(id) {
        request.deleteBanner({ id }).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getBannerList()
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
        this.form.title = row.title
        this.form.content = row.content
        this.form.logo = row.logo
        this.dialogVisible = true
      },
      onDelete(index, row) {
        this.$confirm('确定删除该Banner?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteBanner(row.id)
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
