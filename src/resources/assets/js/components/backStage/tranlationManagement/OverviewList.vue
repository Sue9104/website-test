<template>
  <div id="overviewListMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Overview</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small" @submit.native.prevent>
          <el-form-item label="Project Name:" prop="product_name">
            <el-input v-model.trim="searchForm.product_name" placeholder="please enter project name"></el-input>
          </el-form-item>
          <el-form-item label="Deadline:" prop="deadline">
            <el-date-picker v-model.trim="searchForm.deadline" type="date" :default-value="new Date()" value-format="yyyy-MM-dd" placeholder="please select deadline"></el-date-picker>
          </el-form-item>
          <el-form-item label="Priority:" prop="priority">
            <el-select v-model="searchForm.priority" placeholder="please select priority">
              <el-option label="High" value="3"></el-option>
              <el-option label="Normal" value="2"></el-option>
              <el-option label="Low" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="ProjectTable" :data="overviewListTable" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="product" label="Project Name" align="center">
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center">
        </el-table-column>
        <el-table-column prop="deadline" label="Deadline" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.deadline&&(scope.row.deadline.split(" ")[1])?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="Priority" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.priority=='1'">Low</div>
            <div v-if="scope.row.priority=='2'">Normal</div>
            <div v-if="scope.row.priority=='3'" style="color:red">High</div>
          </template>
        </el-table-column>
        <el-table-column prop="task Nums" label="Not Translated" align="center" v-if="$route.path==='/t_overview'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/translation?name='+scope.row.product)">translation: {{scope.row.Untranslated}}</div>
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/retranslation?name='+scope.row.product)">re-translation: {{scope.row['Re-translated']}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="task Nums" label="Unreviewed" align="center" v-if="$route.path==='/a_overview'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/review?name='+scope.row.product)">{{scope.row.Unreviewed}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="large" title="detail" @click="$router.push('/projectdetail?id='+scope.row.id+'&pane=info')">Detail</el-button>
          </template>
        </el-table-column> -->
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
    // console.log(this.$route.path)
    // switch (this.$route.path){
    //   case '/t_overviewlist':
    //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
    //       this.overviewListTable = response.data.result.data;
    //       this.total = response.data.result.total
    //       this.loading = false
    //     })
    //   break;
    //   case '/a_overviewlist':
    //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
    //       this.overviewListTable = response.data.result.data;
    //       this.total = response.data.result.total
    //       this.loading = false
    //     })
    //   break;
    // }
    this.onSearch()
  },
  data() {
    return {
      searchForm: {
        product_name: '',
        priority: '',
        deadline: '',
      },
      userList:[],
      loading:false,
      searchFlag:false,
      rules: {},
      overviewListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch:{
    "$route.path":{
      handler(val){
        // this.loading = true
        this.searchForm.product_name = ""
        this.searchForm.priority = ""
        this.searchForm.deadline = ""
        // this.currentPage = 1
        this.pageSize = 10
        this.onSearch()
        // switch (this.$route.path){
        //   case '/t_overviewlist':
        //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
        //       this.overviewListTable = response.data.result.data;
        //       this.total = response.data.result.total
        //       this.loading = false
        //     })
        //   break;
        //   case '/a_overviewlist':
        //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
        //       this.overviewListTable = response.data.result.data;
        //       this.total = response.data.result.total
        //       this.loading = false
        //     })
        //   break;
        // }
      },
      deep:true
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.product_name===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      switch (this.$route.path){
        case '/t_overview':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline})).then(response=>{
            this.overviewListTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
        case '/a_overview':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline})).then(response=>{
            this.overviewListTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      this.loading = true
      if(this.searchFlag){
        switch (this.$route.path){
          case '/t_overview':
            this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val})).then(response=>{
              this.overviewListTable = response.data.result.data;
              this.total = response.data.result.total
              this.loading = false
            })
          break;
          case '/a_overview':
            this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val})).then(response=>{
              this.overviewListTable = response.data.result.data;
              this.total = response.data.result.total
              this.loading = false
            })
          break;
        }
      }else{
        switch (this.$route.path){
          case '/t_overview':
            this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:val})).then(response=>{
              this.overviewListTable = response.data.result.data;
              this.total = response.data.result.total
              this.loading = false
            })
          break;
          case '/a_overview':
            this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:val})).then(response=>{
              this.overviewListTable = response.data.result.data;
              this.total = response.data.result.total
              this.loading = false
            })
          break;
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>


</style>
