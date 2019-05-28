<template>
  <div id="editUserMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userinfo' }">User Management</el-breadcrumb-item>
      <el-breadcrumb-item>Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="editUserDetail" class="clearfix">
      <el-form :model="editUserForm" :rules="rules" ref="editUserForm" label-position="right" label-width="100px" class="demo-ruleForm">
        <el-form-item type='Email' prop="email" label="Email">
          <el-input :value="editUserForm.email" disabled></el-input>
        </el-form-item>
        <el-form-item prop="name" label="Name">
          <el-input :value="editUserForm.name" disabled></el-input>
          <el-button class="resetPwdBtn" type="text" @click="resetPwd">Reset Password</el-button>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-radio-group v-model="editUserForm.status">
            <el-radio :label="1">Available</el-radio>
            <el-radio :label="0">Unavailable</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editUserForm')">Submit</el-button>
          <el-button @click="backUserList">Back</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$http.post("/api/User/list",qs.stringify({user_id:this.$route.query.id})).then(response=>{
      // console.log(response.data);
      this.editUserForm = response.data.data[0];
    })
  },
  data() {
    return {
      editUserForm: {},
      rules: {
        email: [
          {
            required: true,
            message: 'Please enter Email.',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: 'Please enter name'
          }
        ],
        status: [
          {
            required: true,
            message: 'Please select status.'
          }
        ]
      }
    }
  },
  methods: {
    resetPwd() {
      this.$confirm('Confirm to reset password?', 'Confirm', {
        confirmButtonText: 'Reset',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post("/api/User/ChangeUserPwd",qs.stringify({
          uid : this.$route.query.id,
          newpassword:'123456'
        })).then(response=>{
          if(response.data.success){
            this.$message({
              message: 'The password was successfully reset to [ 123456 ]!',
              type: 'success'
            })
          }
        })
      })
    },
    backUserList() {
      this.$router.push('/userinfo')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("/api/User/close_open",qs.stringify({
            uid:this.$route.query.id,
            status:this.editUserForm.status
          })).then(response=>{
            if(response.data.success){
              this.$router.push('/userinfo')
            }
          })
        } else {
          // console.log('error submit!!')
          this.$notify({
            title: 'Notice',
            message: 'Please check if the form is filled in correctly.',
            type: 'warning'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
