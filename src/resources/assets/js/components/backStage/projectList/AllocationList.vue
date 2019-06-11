<template>
  <div id="missionListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Assignment</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" class="demo-form-inline" size="small">
          <el-form-item label="Project Name:">
            <div class="searchInp">
              <el-input v-model.trim="searchForm.product_name" placeholder="plese enter project name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="Keywords:">
            <div class="searchInp">
              <el-input v-model.trim="searchForm.key" placeholder="plese enter keyword"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="Status:">
            <el-select v-model.trim="searchForm.status" clearable placeholder="please select status">        
              <el-option label="Unassigned" value="Unassigned"></el-option>
              <el-option label="Untranslated" value="Untranslated"></el-option>
              <el-option label="Unreviewed" value="Unreviewed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
            <!--<el-button type="primary" class="searchBtn" title="Assign all current entries with status 'Unassigned' in the following table" @click="allAllocation">
                <i class="el-icon-upload">Allocate all</i></el-button>-->
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showTransList">
     <el-table ref="allocationTable" :data="allocationListTable" v-loading="loading" stripe border style="width: 100%" max-height="560" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35" align="center" :selectable="selectable">
        </el-table-column>
        <el-table-column label="Source" align="center" type="expand" width="75">
          <template slot-scope="scope">
            <ol style="padding-left: 20px;">
              <li v-for="(item,index) in JSON.parse(scope.row.translate)" :key="index" style="margin:10px 0;padding:5px 0;border-bottom:1px dashed #ccc;">{{item}}</li>
            </ol>
          </template>
        </el-table-column>
        <el-table-column prop="product" label="Project Name" align="center">
        </el-table-column>
        <el-table-column prop="key" label="Keywords" align="center">
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center">
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center">
        </el-table-column>
        <el-table-column label="Translator" align="center">
          <template slot-scope="scope" v-if="scope.row.status==='Unassigned'">
            <el-select v-model="scope.row.translate_users_name" :id="'selectTranslator'+scope.row.id" placeholder="required" @visible-change="visibleSelect(scope.row)">
              <el-option v-for="(item,index) in translators" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="medium" title="submit" @click="submit(scope.row)" v-if="scope.row.status==='Unassigned'">Assign</el-button>
            <!--<el-button type="text" size="medium" title="remove" @click="deleteCurrent(scope.row)" icon="el-icon-delete">Delete</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div id="batchSelected">
        {{multipleSelection.length}} {{multipleSelection.length>1?'entries':'entry'}} selected
        <el-button type="text" style="color:rgb(255, 208, 75);" @click="batchSubmitOpen">Bulk Allocation</el-button>
      </div>
      <el-pagination background  @current-change="handleCurrentChange" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <el-dialog
      title="Confirm"
      :visible.sync="dialogVisible"
      width="20%" top="40vh">
        <div id="batchModal">
          <el-select center v-model="batch_translate_users_name" placeholder="please select translator">
            <el-option v-for="(item,index) in translators" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="batchSubmit">OK</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.searchForm.product_name = this.$route.query.name||''

    this.loading = true
    new Promise((resolve,reject)=>{
      this.$http.post("/api/user/list").then(response=>{
        // console.log(response.data);
        this.userList=response.data.data;
        resolve()
      })
    }).then(()=>{
      // this.onSearch()
      this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||'',status:'Unassigned'})).then(response=>{
        response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
        })
        if(response.data.data.length>0){
          JSON.parse(response.data.data[0].translate_users).forEach(item1=>{
            this.userList.forEach(item2=>{
              if(item1===item2.id){
                this.translators.push(item2)
                return false;
              }
            })
          })
        }
        
        // console.log(this.translators);
        this.allocationListTable = response.data.data
        this.total = response.data.total
        this.loading = false
      })
    })
    
  },
  data() {
    return {
      loading:false, 
      searchForm: {
        product_name:'',
        key: '',
        status:'Unassigned',
      },
      searchFlag:false,
      userList:[],
      rules: {},
      translators: [],
      allocationListTable: [],
      total:0,
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      batch_translate_users_name:''
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.status===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
        })
        this.allocationListTable = response.data.data;
        this.total = response.data.total;
        this.loading = false
      })
    },
    allAllocation(){

    },
    visibleSelect(row){
      document.getElementById("selectTranslator"+row.id).style.border = "1px solid #DCDFE6";
    },
    submit(row) {
      // console.log(row)
      if (row.translate_users_name) {
        document.getElementById("selectTranslator"+row.id).style.border = "1px solid #DCDFE6";
        let submitObj = {};
        submitObj.translate_in_id = JSON.stringify([row.id]);
        submitObj.translate_users_name = row.translate_users_name;
        // console.log(submitObj);
        this.$http
          .post(
            '/api/translate/assign',
            qs.stringify(submitObj)
          )
          .then(response => {
            setTimeout(()=>{
              this.$store.state.taskList.Unassigned_nums -= 1
              this.handleCurrentChange(this.currentPage);
            },1000)
          })
      } else {
        document.getElementById("selectTranslator"+row.id).style.border = "1px solid #f00";
        this.$notify({
          title: 'Notice',
          message: 'Translator are required.',
          type: 'error'
        })
      }
    },
    selectable(row,index){
      return row.status==='Unassigned'
    },
    batchSubmitOpen(){
      if(this.multipleSelection.length===0){
        this.$notify({
          title: 'notice',
          message: 'No entries to select for operation.',
          type: 'warning'
        })
        return false;
      }
      this.dialogVisible = true;
    },
    batchSubmit(){
      let IDS = [];
      $.each(this.multipleSelection, function(i, ele) {
        IDS.push(ele.id)
      })
      if (this.batch_translate_users_name) {
        let submitObj = {};
        submitObj.translate_in_id = JSON.stringify(IDS);
        submitObj.translate_users_name = this.batch_translate_users_name;
        // console.log(submitObj);
        this.$http
          .post(
            '/api/translate/assign',
            qs.stringify(submitObj)
          )
          .then(response => {
            setTimeout(()=>{
              this.$store.state.taskList.Unassigned_nums -= IDS.length
              this.batch_translate_users_name = '';
              this.dialogVisible = false;
              this.handleCurrentChange(this.currentPage);
            },1000)
          })
      } else {
        this.$notify({
          title: 'Notice',
          message: 'Translator and priority are required.',
          type: 'error'
        })
      }
    },
    // deleteCurrent(row) {
      // this.$http
      //   .post(
      //     '/php/allocation_list/VD6_remove.php',
      //     qs.stringify({
      //       ID: [row.ID],
      //     })
      //   )
      //   .then(response => {
      //     this.$notify({
      //       title: 'Success',
      //       message: 'Entry' + row.ID + 'was successfully deleted from the allocation list and can be viewed in the translation list.',
      //       type: 'success'
      //     })
      //     setTimeout(()=>{
      //       this.onSearch();
      //     },1000)
      //   })
    // },
    // deleteSelected() {
    //   let IDS = []
    //   if(this.multipleSelection.length===0){
    //     this.$notify({
    //       title: 'Notice',
    //       message: 'No entries to delete are selected.',
    //       type: 'warning'
    //     })
    //     return false;
    //   }
    //   $.each(this.multipleSelection, function(i, ele) {
    //     IDS.push(ele.ID)
    //   })
      // this.$http
      //   .post(
      //     '/php/allocation_list/VD6_remove.php',
      //     qs.stringify({
      //       ID: IDS,
      //     })
      //   )
      //   .then(response => {
      //     this.$notify({
      //       title: 'Success',
      //       message: 'Entry' + IDS + 'were successfully deleted from the allocation list and can be viewed in the translation list.',
      //       type: 'success'
      //     })
        //   setTimeout(()=>{
        //     this.onSearch();
        //   },1000)
        // })
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // console.log(this.currentPage)
      this.currentPage = val
      // this.currentPageTable = this.missionListTable.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      this.loading = true
      if(this.searchFlag){
        this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
        })
          this.allocationListTable = response.data.data;
          this.total = response.data.total;
          this.loading = false
        }).catch((err)=>{
          throw err;
        })
      }else{
        this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||'',page:this.currentPage,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
        })
          this.allocationListTable = response.data.data;
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
