<template>
  <div id="userMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>User Management</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" label-width="90px" class="demo-form-inline" size="small" @submit.native.prevent>
          <el-form-item label="Email:" prop="email">
            <el-input v-model="searchForm.email" placeholder="please enter Email"></el-input>
          </el-form-item>
            <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
            <el-button  type="primary" id="addUser" @click="addUser">
              <i class="el-icon-plus"></i> New User</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="singleTable" :data="userListTable" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="email" label="Email" align="center">
        </el-table-column>
        <el-table-column prop="name" label="Name" align="center">
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.statusSwitch" active-color="#41babc"@change="changeSwitch(scope.row)"></el-switch>
            <span v-if="scope.row.statusSwitch" class="themeColor">Available</span>
            <span v-if="!scope.row.statusSwitch" class="red">Unavailable</span>
          </template>
        </el-table-column>
        <el-table-column label="Password" align="center">
          <template slot-scope="scope">
            <el-button type="text" title="reset password" @click="resetPwd(scope.row)" style="font-size:14px;">Reset</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.loading = true
    this.$http.post("/api/User/list").then(response=>{
      // console.log(response.data);
      response.data.data.forEach(item=>{
        this.$set(item,'statusSwitch',item.status=='1'?true:false)
      })
      this.userListTable = response.data.data;
      this.total = response.data.total;
      this.loading = false
    })
  },
  data() {
    return {
      searchForm: {
        email: '',
      },
      rules: {},
      loading:false,
      searchFlag:false,
      statusSwitch:true,
      userListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.email===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/User/list",qs.stringify(this.searchForm)).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'statusSwitch',item.status=='1'?true:false)
        })
        this.userListTable = response.data.data;
        this.total = response.data.total;
        this.loading = false
      })
    },
    addUser() {
      this.$router.push({path:'/adduser',query:{email:this.searchForm.email}})
    },
    changeSwitch(row){
      this.$confirm('Confirm to change status?', 'Confirm', {
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post("/api/User/close_open",qs.stringify({
          uid:row.id,
          status:row.statusSwitch?'1':'0'
        })).then(response=>{
          if(response.data.success){

          }
        })
      }).catch(() => {
        row.statusSwitch = !row.statusSwitch
      })
    },
    resetPwd(row) {
      this.$confirm('Confirm to reset password?', 'Confirm', {
        confirmButtonText: 'Reset',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post("/api/User/ChangeUserPwd",qs.stringify({
          uid : row.id,
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
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.loading = true
      this.currentPage = val;
      if(this.searchFlag){
        this.$http.post("/api/User/list",qs.stringify({email:this.searchForm.email,page:val})).then(response=>{
          // console.log(response.data);
          response.data.data.forEach(item=>{
            this.$set(item,'statusSwitch',item.status=='1'?true:false)
          })
          this.userListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/User/list",qs.stringify({page:val})).then(response=>{
          // console.log(response.data);
          response.data.data.forEach(item=>{
            this.$set(item,'statusSwitch',item.status=='1'?true:false)
          })
          this.userListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }
    }
  }
}
</script>


<style lang="less" scoped>

</style>
