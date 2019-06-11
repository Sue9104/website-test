<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Feedback</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Project Name:">
            <div class="searchInp">
              <el-input v-model.trim="searchForm.product" placeholder="plese enter project name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="Keywords:">
            <el-input v-model.trim="searchForm.key" placeholder="please enter keywords"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
            <el-select v-model="searchForm.is_done" placeholder="please select status">
              <el-option label="Not Replied" value="0"></el-option>
              <el-option label="All" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showTransList">
      <el-table ref="translationTable" :data="approvalListTable" v-loading="loading" stripe border style="width: 100%" @row-dblclick="rowDblClick">
        <el-table-column label="Suggestion" align="center" type="expand" width="100">
          <template slot-scope="scope">
            <div>{{scope.row.objection}}</div>
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
        <el-table-column prop="status" label="Status" align="center">
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="view" @click="transItem(scope.row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.searchForm.product = this.$route.query.name||''
    this.loading = true
    this.onSearch()
    // this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||'',is_done:"1"})).then(response=>{
    //   // console.log(response.data);
    //   this.approvalListTable = response.data.data;
    //   this.total = response.data.total;
    //   this.loading = false
    // })
  },
  data() {
    return {
      searchForm: {
        product:'',
        key: '',
        is_done:'1'
      },
      loading:false,
      searchFlag:false,
      rules: {},
      approvalListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.key===''&&this.searchForm.product===''&&this.searchForm.is_done===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||'',is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.approvalListTable = response.data.data;
        this.total = response.data.total;
        this.loading = false
      })
    },
    rowDblClick(row, column, event){
      this.transItem(row)
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      this.$router.push({path:'/viewfeedback',query:{id:row.product_id,oid:row.id}})
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.loading = true
      this.currentPage = val;
      if(this.searchFlag){
        this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||'',is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.approvalListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||'',is_done:'1',page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.approvalListTable = response.data.data;
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
