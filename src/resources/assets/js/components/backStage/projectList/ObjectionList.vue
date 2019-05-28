<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/projectlist'}">Project List</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/projectdetail',query:{id:$route.query.id}}">Detail</el-breadcrumb-item>
      <el-breadcrumb-item>Objection List</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Project Name:" v-if="!$route.query.id">
            <div class="searchInp">
              <el-input v-model.trim="searchForm.product" placeholder="plese enter project name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="Keywords:">
            <el-input v-model.trim="searchForm.key" placeholder="please enter keywords"></el-input>
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
        <el-table-column prop="status" label="Status" align="center">
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" icon="el-icon-document" title="view" @click="transItem(scope.row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 150, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loading = true
    this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||''})).then(response=>{
      // console.log(response.data);
      this.approvalListTable = response.data.data;
      this.total = response.data.total;
      this.loading = false
    })
  },
  data() {
    return {
      searchForm: {
        product:'',
        key: ''
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
      this.searchForm.key===''&&this.searchForm.product===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id,product:this.searchForm.product,key:this.searchForm.key})).then(response=>{
        // console.log(response.data);
        this.approvalListTable = response.data.data;
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
      this.$router.push({path:'/viewobjection',query:{id:this.$route.query.id,oid:row.id}})
    },
    handleCurrentChange(val) {
      this.loading = true
      this.currentPage = val;
      if(this.searchFlag){
        this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id,product:this.searchForm.product,key:this.searchForm.key,page:val})).then(response=>{
          // console.log(response.data);
          this.approvalListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/approve/list_conflict",qs.stringify({page:val})).then(response=>{
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
