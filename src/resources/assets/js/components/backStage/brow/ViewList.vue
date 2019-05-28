<template>
  <div id="viewProjectMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>View List</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Project Name:" prop="product_name">
            <el-input v-model.trim="searchForm.product_name" placeholder="please enter project name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="ProjectTable" :data="viewProjectListTable" v-loading="loading" stripe border style="width: 100%" @row-dblclick="rowDblClick">
        <el-table-column prop="product" label="Project Name" align="center">
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center">
        </el-table-column>
        <el-table-column label="Versions" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" title="upload" @click.stop="openUploadModal(scope.row)">View</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="large" title="detail" @click="$router.push('/viewentry?id='+scope.row.id)">Detail</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <el-dialog title="version list" width="450px" :visible.sync="dialogTableVisible" @close="closeUploadModal" :close-on-click-modal="false">
        <div class="requestLoadingCon" v-show="versionLoading">
          <i class="el-icon-loading"></i> Requesting...
        </div>
        <div style="color:#aaa;text-align:center;" v-if="!versionLoading&&(versionList.length===0)">[ No Version ]</div>
        <ol id="versionList" v-show="!versionLoading">
          <li v-for="(item,index) in versionList" :key="index" style="text-align:center" title="select the version" @click="selectVersion(item.version_name)"><span class="versionNameCon">{{item.version_name}}</span><span class="versionIdCon">{{' ------ ' +item.version_id}}</span></li>
        </ol>
        <el-pagination small @current-change="versionHandleCurrentChange" :current-page="versionCurrentPage" :page-size="versionPageSize" layout="total, prev, pager, next, jumper" :total="versionTotal" v-show="!versionLoading&&versionList.length>0"></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.loading = true
    new Promise((resolve,reject)=>{
        resolve('success')
    }).then(data=>{
      // 这里的data是上面resolve()里的值
      // console.log(data);
      this.$http.post("/api/view/list_project").then(response=>{
        this.viewProjectListTable = response.data.data;
        this.total = response.data.total;
        this.loading = false
      })
    },error=>{
      // 这里的error是上面reject()里的值
      console.log(error);
    })
  },
  data() {
    return {
      searchForm: {
        product_name: ''
      },
      userList:[],
      loading:false,
      versionLoading:false,
      searchFlag:false,
      dialogTableVisible:false,
      currentProjectId:null,
      uploadFile:{},
      rules: {},
      versionList:[],
      versionTotal:0,
      versionCurrentPage: 1,
      versionPageSize: 10,
      viewProjectListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.product_name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_project",qs.stringify(this.searchForm)).then(response=>{
        // console.log(response.data);
        this.viewProjectListTable = response.data.data;
        this.total = response.data.total;
        this.loading = false
      })
    },
    rowDblClick(row, column, event){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.$router.push({path:'/viewentry',query:{id:row.id}})
    },
    openUploadModal(row){
      this.versionLoading = true
      this.dialogTableVisible = true
      this.currentProjectId = row.id
      this.$http.post("/api/view/list_version",qs.stringify({product_id:row.id})).then(response=>{
        this.versionList = response.data.data;
        this.versionTotal = response.data.total;
        this.versionLoading = false
      })
    },
    closeUploadModal(){
      this.versionList = [];
      this.versionTotal = 0;
      this.versionCurrentPage=1;
      this.versionLoading = false
    },
    selectVersion(versionName){
      this.$router.push({path:'/viewentry',query:{id:this.currentProjectId,v:versionName}})
    },
    versionHandleCurrentChange(val){
      this.$http.post("/api/view/list_version",qs.stringify({page:val,product_id:row.id})).then(response=>{
        this.versionList = response.data.data;
        this.versionTotal = response.data.total;
      })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // this.currentPage = val;
      this.loading = true
      if(this.searchFlag){
        this.$http.post("/api/view/list_project",qs.stringify({product_name:this.searchForm.product_name,page:val})).then(response=>{
          // console.log(response.data);
          this.viewProjectListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/view/list_project",qs.stringify({page:val})).then(response=>{
          // console.log(response.data);
          this.viewProjectListTable = response.data.data;
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
