<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Review</el-breadcrumb-item>
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
          <el-form-item label="Deadline:">
            <el-date-picker v-model.trim="searchForm.deadline" type="date" :default-value="new Date()" value-format="yyyy-MM-dd" placeholder="please select deadline"></el-date-picker>
          </el-form-item>
          <el-form-item label="Priority:">
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
    this.searchForm.product_name = this.$route.query.name||''
    this.onSearch()
    // this.$http.post("/api/approve/list",qs.stringify({product_name:this.searchForm.product_name,status:'Unreviewed'})).then(response=>{
    //   // console.log(response.data);
    //   this.approvalListTable = response.data.data;
    //   this.total = response.data.total;
    //   this.loading = false
    // })
  },
  data() {
    return {
      searchForm: {
        product_name:'',
        key: '',
        priority:'',
        deadline:''
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
      this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/approve/list",qs.stringify({product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:'Unreviewed',page:this.currentPage,count:this.pageSize})).then(response=>{
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
      this.$router.push({path:'/browreviewitem',query:{id:row.id}})
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      this.$router.push({path:'/browreviewitem',query:{id:row.id}})
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
        this.$http.post("/api/approve/list",qs.stringify({product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:'Unreviewed',page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.approvalListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/approve/list",qs.stringify({status:'Unreviewed',page:val,count:this.pageSize})).then(response=>{
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
