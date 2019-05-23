<template>
  <div id="addUserMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userinfo' }">User Management</el-breadcrumb-item>
      <el-breadcrumb-item>Add New User</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="addUserDetail" class="clearfix">
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-position="left" label-width="80px" class="demo-addUserForm">
        <el-form-item type='Email' prop="email" label="E-mail">
          <div class="namePwdInp">
            <el-input v-model.trim="addUserForm.email"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="name" label="Name">
          <div class="namePwdInp">
            <el-input v-model.trim="addUserForm.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addUserForm')">Submit</el-button>
          <el-button @click="resetForm('addUserForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route.query.email)
    this.addUserForm.email=this.$route.query.email?this.$route.query.email:''
  },
  data() {
    return {
      addUserForm: {
        email: '',
        name:''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please enter Email.',
            trigger: 'blur'
          },
          {
            validator:function(rule,value,callback){
              if(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value) == false){
                  callback(new Error("Please input a valid email address."));
              }else{
                  callback();
              }
            }, trigger: 'blur'}
        ],
        name: [
          {
            required: true,
            message: 'Please enter name.'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let addSubmitObj = {};
          addSubmitObj.name = this.addUserForm.name
          addSubmitObj.email = this.addUserForm.email
          this.$http.post("/api/User/addUser",qs.stringify(addSubmitObj)).then(response=>{
            // console.log(addSubmitObj);
             if(response.data.success){
               this.$router.push('/userinfo')
             }
          })
        } else {
          // console.log('error submit!!')
          this.$notify({
            title: 'Notice',
            message: 'Please check if the form is filled in correctly',
            type: 'warning'
          })
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


