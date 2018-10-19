<template>
  <div>
    <el-row>
      <el-col>
        <el-button @click="showCreateDialog" style="float: right" type="primary" size="mini">添加Community</el-button>
      </el-col>
    </el-row>
    <el-table :data="list">
      <!-- <el-table-column label="#" prop="id"></el-table-column> -->
      <el-table-column label="内容" prop="text"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img style="width: 50px; height: 50px" :src="scope.row.image">
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="showEditDialog(scope.$index, scope.row)" size="mini" type="primary">编辑</el-button>
          <el-button @click="onDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="dialog" :visible.sync="dialogVisible" title="添加Banner">
      <el-form ref="form" size="mini" style="width: 60%" label-width="80px">
        <el-form-item label="内容">
          <el-input :rows="8" type="textarea" v-model="form.text" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="logo">
          <el-upload :action="uploadUrl" :on-success="onUpload" :show-file-list="false">
            <div class="uploader">
              <img class="uploader-image" v-if="form.image" :src="form.image">
              <i v-else class="el-icon-plus"></i>
            </div>
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
          text: null,
          image: null
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
      this.getCommunityList()
    },
    methods: {
      onUpload(response) {
        if (response.code == 200) {
          this.form.image = response.data.url
        }
      },
      getCommunityList() {
        request.getCommunityList().then(data => {
          this.list = data.list
        })
      },
      onSubmit() {
        if (this.actionType === 'create') {
          this.createCommunity()
        } else if (this.actionType === 'edit') {
          this.updateCommunity()
        }
      },
      createCommunity() {
        request.createCommunity(this.form).then(data => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          this.getCommunityList()

        })
      },
      updateCommunity() {
        request.updateCommunity(this.form).then(data => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.getCommunityList()
        })
      },
      deleteCommunity(id) {
        request.deleteCommunity({
          id
        }).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getCommunityList()
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
        this.form.text = row.text
        this.form.image = row.image
        this.dialogVisible = true
      },
      onDelete(index, row) {
        this.$confirm('确定删除该Banner?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCommunity(row.id)
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

</style>
