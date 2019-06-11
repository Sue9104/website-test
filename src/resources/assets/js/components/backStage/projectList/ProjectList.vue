<template>
  <div id="projectMain" class="clearfix">
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
            <el-button type="warning" size="small" @click="addProject" icon="el-icon-plus">New Project</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="ProjectTable" :data="projectListTable" v-loading="loading" stripe border style="width: 100%" @row-dblclick="rowDblClick">
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
        <el-table-column prop="total_nums" label="Total" align="center">
        </el-table-column>
        <el-table-column prop="is_completed" label="completed" align="center">
          <template slot-scope="scope">
            <div :style="scope.row.completePercentage==='0%'?'color:red':''">{{scope.row.completePercentage}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="large" title="detail" @click="$router.push('/projectdetail?id='+scope.row.id+'&pane=info')">Detail</el-button>
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
    // new Promise((resolve,reject)=>{
    //   this.$http.post("/api/user/list").then(response=>{
    //     // console.log(response.data);
    //     this.userList = response.data.data;
    //     resolve('success')
    //   }).catch(err=>{
    //     reject('Request failed!')
    //   })
    // }).then(data=>{
      // 这里的data是上面resolve()里的值
      // console.log(data);
      this.$http.post("/api/product/list").then(response=>{
        response.data.result.data.forEach(item=>{
          let p = '0%';
          if(!item.total_nums){
            p="0%"
          }else{
            if(!item.Qualified_nums){
              p="0%"
            }else{
              p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
            }
          }
          this.$set(item,'completePercentage',p)
        })
        this.projectListTable = response.data.result.data;
        this.total = response.data.result.total;
        this.loading = false
      })
    // },error=>{
    //   // 这里的error是上面reject()里的值
    //   console.log(error);
    // })
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
      projectListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    onSearch() {
      this.loading = true
      this.currentPage = 1
      this.searchForm.product_name===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/product/list",qs.stringify(this.searchForm)).then(response=>{
        // response.data.result.data.forEach(item=>{
        //   this.$set(item,'translatorName',[])
        //   this.$set(item,'approverName',[])
        //   this.$set(item,'viewerName',[])
        //   // console.log(object);
        //   JSON.parse(item.translate_users).forEach(item1=>{
        //     this.userList.forEach(item2=>{
        //       item1===item2.id?item.translatorName.push(item2.name):null
        //     })
        //   })
        //   JSON.parse(item.approve_users).forEach(item11=>{
        //     this.userList.forEach(item22=>{
        //       item11===item22.id?item.approverName.push(item22.name):null
        //     })
        //   })
        //   JSON.parse(item.viewed_users).forEach(item111=>{
        //     this.userList.forEach(item222=>{
        //       item111===item222.id?item.viewerName.push(item222.name):null
        //     })
        //   })
        // })
        // console.log(response.data);
        this.projectListTable = response.data.result.data;
        this.total = response.data.result.total;
        this.loading = false
      })
    },
    addProject() {
      this.$router.push(this.searchForm.product_name?'/addproject?name='+this.searchForm.product_name:'/addproject')
    },
    // downloadFileFormat(){
    //   this.$http.post("/api/translate/download").then(response=>{
    //     if(response.data.require){
    //       // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
    //       // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
    //       window.open('','_self').location.href = response.data.require
    //     }else{
    //       this.$message.warning("Export failed, please try again later.")
    //     }
    //   })
    // },
    rowDblClick(row, column, event){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.$router.push({path:'/projectdetail',query:{id:row.id,pane:'info'}})
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      this.loading = true
      if(this.searchFlag){
        this.$http.post("/api/product/list",qs.stringify({product_name:this.searchForm.product_name,page:val})).then(response=>{
          // console.log(response.data);
        //   response.data.result.data.forEach(item=>{
        //   this.$set(item,'translatorName',[])
        //   this.$set(item,'approverName',[])
        //   this.$set(item,'viewerName',[])
        //   // console.log(object);
        //   JSON.parse(item.translate_users).forEach(item1=>{
        //     this.userList.forEach(item2=>{
        //       item1===item2.id?item.translatorName.push(item2.name):null
        //     })
        //   })
        //   JSON.parse(item.approve_users).forEach(item11=>{
        //     this.userList.forEach(item22=>{
        //       item11===item22.id?item.approverName.push(item22.name):null
        //     })
        //   })
        //   JSON.parse(item.viewed_users).forEach(item111=>{
        //     this.userList.forEach(item222=>{
        //       item111===item222.id?item.viewerName.push(item222.name):null
        //     })
        //   })
        // })
          this.projectListTable = response.data.result.data;
          this.total = response.data.result.total;
          this.loading = false
        })
      }else{
        this.$http.post("/api/product/list",qs.stringify({page:val})).then(response=>{
          // console.log(response.data);
        //   response.data.result.data.forEach(item=>{
        //   this.$set(item,'translatorName',[])
        //   this.$set(item,'approverName',[])
        //   this.$set(item,'viewerName',[])
        //   // console.log(object);
        //   JSON.parse(item.translate_users).forEach(item1=>{
        //     this.userList.forEach(item2=>{
        //       item1===item2.id?item.translatorName.push(item2.name):null
        //     })
        //   })
        //   JSON.parse(item.approve_users).forEach(item11=>{
        //     this.userList.forEach(item22=>{
        //       item11===item22.id?item.approverName.push(item22.name):null
        //     })
        //   })
        //   JSON.parse(item.viewed_users).forEach(item111=>{
        //     this.userList.forEach(item222=>{
        //       item111===item222.id?item.viewerName.push(item222.name):null
        //     })
        //   })
        // })
          this.projectListTable = response.data.result.data;
          this.total = response.data.result.total;
          this.loading = false
        })
      }
    }
  }
}
</script>


<style lang="less" scoped>


</style>
