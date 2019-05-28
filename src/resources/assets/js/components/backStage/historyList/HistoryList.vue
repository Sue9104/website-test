<template>
  <div id="historyListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>History List</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small">
          <el-form-item label="Project:">
            <el-input v-model.trim="searchForm.product_name" placeholder="please enter project name"></el-input>
          </el-form-item>
          <el-form-item label="Keywords:">
            <el-input v-model.trim="searchForm.key" placeholder="please enter keywords"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
            <el-select v-model.trim="searchForm.status" clearable placeholder="please select status">
              <el-option label="Unreviewed" value="Unreviewed" v-if="$route.path === '/t_historylist'"></el-option>
              <el-option label="Re-translated" value="Re-translated" v-if="$route.path === '/t_historylist'"></el-option>
              <el-option label="Qualified" value="Qualified" v-if="$route.path === '/t_historylist'"></el-option>
              <el-option label="Error" value="Error" v-if="$route.path === '/t_historylist'"></el-option>
              <el-option label="Qualified" value="Qualified" v-if="$route.path === '/a_historylist'"></el-option>
              <el-option label="Unqualified" value="Unqualified" v-if="$route.path === '/a_historylist'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showHistoryList">
      <el-table ref="historyListTable" :data="historyListTable" v-loading="loading" stripe border style="width: 100%" @row-dblclick="rowDblClick">
        <el-table-column label="Source" align="center" type="expand" width="75">
          <template slot-scope="scope">
            <ol style="padding-left: 20px;">
              <li v-for="(item,index) in JSON.parse(scope.row.translate)" :key="index" style="margin:10px 0;padding:5px 0;border-bottom:1px dashed #ccc;">{{Object.keys(item)[0]}}</li>
            </ol>
          </template>
        </el-table-column>
        <el-table-column prop="product" label="Project Name" align="center">
        </el-table-column>
        <el-table-column prop="key" label="Keywords" align="center">
          <template slot-scope="scope">
            <div>{{Object.keys(JSON.parse(scope.row.key)[0])[0]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center">
        </el-table-column>
        <el-table-column prop="allocate_users_name" label="Creator" align="center">
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center">
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" icon="el-icon-document" title="view" @click="transItem(scope.row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route.path);
    this.$route.path === '/t_historylist'?this.url = '/api/translate/history':null
    this.$route.path === '/a_historylist'?this.url = '/api/approve/list':null
    this.loading = true
    this.$http.post(this.url).then(response=>{
      // console.log(response.data);
      this.historyListTable = response.data.data;
      this.total = response.data.total;
      this.loading = false
    })
  },
  data() {
    return {
      searchForm: {
        product_name:'',
        key: '',
        status: ''
      },
      listUrl:'',
      loading:false,
      searchFlag:false,
      rules: {},
      historyListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch:{
    '$route.path':{
      handler(val,oldVal){
        val === '/t_historylist'?this.url = '/api/translate/history':null
        val === '/a_historylist'?this.url = '/api/approve/list':null
        this.loading = true
        this.$http.post(this.url).then(response=>{
          // console.log(response.data);
          this.historyListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      },
      deep:true
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.status===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post(this.url,qs.stringify(this.searchForm)).then(response=>{
        // console.log(response.data);
        this.historyListTable = response.data.data;
        this.total = response.data.total;
        this.loading = false
      })
    },
    rowDblClick(row, column, event){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.transItem(row)
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      let path = ''
      this.$route.path === '/t_historylist'?path = '/t_browhistoryitem':null
      this.$route.path === '/a_historylist'?path = '/a_browhistoryitem':null
      this.$router.push({path:path,query:{id:row.id}})
    },
    handleCurrentChange(val) {
      this.loading = true
      this.currentPage = val;
      if(this.searchFlag){
        this.$http.post(this.url,qs.stringify({product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:val})).then(response=>{
          // console.log(response.data);
          this.historyListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }else{
        this.$http.post(this.url,qs.stringify({page:val})).then(response=>{
          // console.log(response.data);
          this.historyListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
