<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/viewlist'}">Released Projects</el-breadcrumb-item>
      <el-breadcrumb-item>Entry</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Keywords:">
            <el-input v-model.trim="searchForm.key" placeholder="please enter keywords"></el-input>
          </el-form-item>
          <el-form-item label="Version:">
            <el-input v-model.trim="searchForm.version_name" placeholder="please enter version"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showTransList">
      <el-table ref="translationTable" :data="viewItemListTable" v-loading="loading" stripe border style="width: 100%" @row-dblclick="rowDblClick">
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
        <el-table-column prop="version_name" label="Version" align="center">
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="view" @click="transItem(scope.row)" v-if="scope.row.status !== 'Untranslated'">View</el-button>
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
    this.loading = true
    this.$route.query.v?this.searchForm.version_name=this.$route.query.v:this.searchForm.version_name=''
    this.onSearch()
    // this.$http.post("/api/view/list_items",qs.stringify({product_id:this.$route.query.id,version_name:this.$route.query.v})).then(response=>{
    //   // console.log(response.data);
    //   this.viewItemListTable = response.data.result.data;
    //   this.total = response.data.result.total;
    //   this.loading = false
    // })
  },
  data() {
    return {
      searchForm: {
        key: '',
        version_name: ''
      },
      loading:false,
      searchFlag:false,
      rules: {},
      viewItemListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.key===''&&this.searchForm.version_name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_items",qs.stringify({key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.viewItemListTable = response.data.result.data;
        this.total = response.data.result.total;
        this.loading = false
      })
    },
    rowDblClick(row, column, event){
      this.$router.push({path:'/viewdetail',query:{id:row.product_id,eid:row.export_id}})
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      this.$router.push({path:'/viewdetail',query:{id:row.product_id,eid:row.export_id}})
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.loading = true
      if(this.searchFlag){
        this.$http.post("/api/view/list_items",qs.stringify({key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.viewItemListTable = response.data.result.data;
          this.total = response.data.result.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/view/list_items",qs.stringify({product_id:this.$route.query.id,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.viewItemListTable = response.data.result.data;
          this.total = response.data.result.total;
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
