<template>
  <div id="overviewMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="overviewHeader">
      <!-- <el-card class="box-card" :shadow="currentMenu==='project'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('project')">
          <span>
            <i class="el-icon-menu" :style="currentMenu==='project'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='project'?'color:#000;':''">
            Project
          </div>
        </div>
      </el-card> -->
      <el-card class="box-card" :shadow="currentMenu==='allocation'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('allocation')">
          <span>
            <i class="el-icon-rank" :style="currentMenu==='allocation'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='allocation'?'color:#000;':''">
            Assignment
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='translation'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('translation')">
          <span>
            <i class="el-icon-edit-outline" :style="currentMenu==='translation'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='translation'?'color:#000;':''">
            Translation
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='approval'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('approval')">
          <span>
            <i class="el-icon-tickets" :style="currentMenu==='approval'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='approval'?'color:#000;':''">
            Review
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='objection'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('objection')">
          <span>
            <i class="el-icon-bell" :style="currentMenu==='objection'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='objection'?'color:#000;':''">
            Feedback
          </div>
        </div>
      </el-card>
    </div>

    <div class="showUserInfo">
      <el-table ref="ProjectTable" :data="overviewTable" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="product" label="Project Name" align="center">
          <template slot-scope="scope">
            <div :style="currentMenu==='project'?'cursor:pointer;color:#41babc;':''" @click="currentMenu==='project'?$router.push('/projectdetail?id='+scope.row.id):null">{{scope.row.product}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center">
        </el-table-column>
        <el-table-column prop="deadline" label="Deadline" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.deadline&&scope.row.deadline.split(" ")[1]?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="Priority" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.priority=='1'">Low</div>
            <div v-if="scope.row.priority=='2'">Normal</div>
            <div v-if="scope.row.priority=='3'" style="color:red">High</div>
          </template>
        </el-table-column>
        <el-table-column key='aotaTotal' prop="total_nums" label="Total" align="center" v-if="currentMenu!=='objection'">
        </el-table-column>
        <el-table-column key="oTotal" prop="total_conflict" label="Total" align="center" v-if="currentMenu==='objection'">
        </el-table-column>
        <el-table-column key="aotaCompleted" label="Completed" align="center">
          <template slot-scope="scope">
            <div v-if="currentMenu==='allocation'" :style="scope.row.completed==='0%'?'color:red':''">
              {{scope.row.completed}}
            </div>
            <div v-if="currentMenu==='objection'" :style="scope.row.completed==='0%'?'color:red':''">
              {{scope.row.completed}}
            </div>
            <div v-if="currentMenu==='translation'" :style="scope.row.completed==='0%'?'color:red':''">
              {{scope.row.completed}}
            </div>
            <div v-if="currentMenu==='approval'" :style="scope.row.completed==='0%'?'color:red':''">
              {{scope.row.completed}}
            </div>
          </template>
        </el-table-column>
        <el-table-column key="aUnssign" label="Unassigned" align="center" v-if="currentMenu==='allocation'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/assignment?id='+scope.row.id+'&name='+scope.row.product)">{{scope.row.Unassigned_nums}}</div>
          </template>
        </el-table-column>
        <el-table-column key="oUnconflict" label="Not Replied" align="center" v-if="currentMenu==='objection'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/feedback?id='+scope.row.id+'&name='+scope.row.product)">{{scope.row.task_conflict}}</div>
          </template>
        </el-table-column>
        <el-table-column key="tUntranslate" label="Not Translated" align="center" v-if="currentMenu==='translation'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/translation?name='+scope.row.product)">translation: {{scope.row.Untranslated}}</div>
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/retranslation?name='+scope.row.product)">re-translation: {{scope.row['Re-translated']}}</div>
          </template>
        </el-table-column>
        <el-table-column key="aUnreviewed" label="Unreviewed" align="center" v-if="currentMenu==='approval'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/review?name='+scope.row.product)">{{scope.row.Unreviewed}}</div>
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
    if(this.$route.query.tab){
      this.selectMenu(this.$route.query.tab)
    }else{
      this.$router.push('/dashboard?tab=allocation')
      this.selectMenu('allocation')
    }
  },
  data() {
    return {
      currentMenu:'allocation',
      loading:false,
      overviewTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    selectMenu(menu){
      // console.log(menu)
      this.currentMenu = menu
      this.currentPage = 1
      this.loading = true
      switch (menu){
        // case 'project':
        //   this.$router.push('/dashboard?tab=project')
        //   this.$http.post("/api/product/list").then(response=>{
        //     this.overviewTable = response.data.result.data;
        //     this.total = response.data.result.total;
        //     this.loading = false
        //   })
        // break;
        case 'allocation':
          this.$router.push('/dashboard?tab=allocation')
          this.$http.post("/api/product/list").then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if(item.total_nums===0){
                c = "0%"
              }else{
                if(item.Unassigned_nums===0){
                  c="100%"
                }else{
                  c = 100-parseInt(Math.round(item.Unassigned_nums*100/item.total_nums))+'%'
                }
              }
              this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
            this.loading = false
          })
        break;
        case 'objection':
          this.$router.push('/dashboard?tab=objection')
          this.$http.post("/api/Statistic/Products_Conflict").then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if(item.total_conflict===0){
                c = "0%"
              }else{
                if(item.task_conflict===0){
                  c = "100%"
                }else{
                  c = 100-parseInt(Math.round(item.task_conflict*100/item.total_conflict))+'%'
                }
              }
              this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
            this.loading = false
          })
        break;
        case 'translation':
          this.$router.push('/dashboard?tab=translation')
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if((item.Untranslated+item['Re-translated']+item.Unreviewed+item.Qualified+item.Error)===0){
                c = "0%"
              }else{
                if((item.Untranslated+item['Re-translated'])===0){
                  c = "100%"
                }else{
                  c = 100-parseInt((Math.round((item.Untranslated+item['Re-translated'])*100)/(item.Untranslated+item['Re-translated']+item.Unreviewed+item.Qualified+item.Error)))+'%'
                }
                
              }
              this.$set(item,'completed',c)
              this.$set(item,'total_nums',item.Error+item.Qualified+item['Re-translated']+item.Unreviewed+item.Untranslated)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
        case 'approval':
          this.$router.push('/dashboard?tab=approval')
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if((item.Error+item.Qualified+item['Re-translated']+item.Unreviewed)===0){
                c = "0%"
              }else{
                if((item['Re-translated']+item.Unreviewed)===0){
                  c = "100%"
                }else{
                  c = 100-parseInt((Math.round((item['Re-translated'])*100)/(item['Re-translated']+item.Unreviewed+item.Qualified+item.Error)))+'%'
                }
                
              }
              this.$set(item,'completed',c)
              this.$set(item,'total_nums',item.Error+item.Qualified+item['Re-translated']+item.Unreviewed)
            })
            this.overviewTable = response.data.result.data;
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
      switch (this.currentMenu){
        // case 'project':
        //   this.$http.post("/api/product/list",qs.stringify({page:val})).then(response=>{
        //     this.overviewTable = response.data.result.data;
        //     this.total = response.data.result.total;
        //     this.loading = false
        //   })
        // break;
        case 'allocation':
          this.$http.post("/api/product/list",qs.stringify({page:val})).then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if(item.total_nums===0){
                c = "0%"
              }else{
                if(item.Unassigned_nums===0){
                  c="100%"
                }else{
                  c = 100-parseInt(Math.round(item.Unassigned_nums*100/item.total_nums))+'%'
                }
              }
              this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
            this.loading = false
          })
        break;
        case 'objection':
          this.$http.post("/api/Statistic/Products_Conflict",qs.stringify({page:val})).then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if(item.total_conflict===0){
                c = "0%"
              }else{
                if(item.task_conflict===0){
                  c = "100%"
                }else{
                  c = 100-parseInt(Math.round(item.task_conflict*100/item.total_conflict))+'%'
                }
              }
              this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
            this.loading = false
          })
        break;
        case 'translation':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if((item.Untranslated+item['Re-translated']+item.Unreviewed+item.Qualified+item.Error)===0){
                c = "0%"
              }else{
                if((item.Untranslated+item['Re-translated'])===0){
                  c = "100%"
                }else{
                  c = 100-parseInt((Math.round((item.Untranslated+item['Re-translated'])*100)/(item.Untranslated+item['Re-translated']+item.Unreviewed+item.Qualified+item.Error)))+'%'
                }
                
              }
              this.$set(item,'completed',c)
              this.$set(item,'total_nums',item.Error+item.Qualified+item['Re-translated']+item.Unreviewed+item.Untranslated)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
        case 'approval':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              let c ;
              if((item.Error+item.Qualified+item['Re-translated']+item.Unreviewed)===0){
                c = "0%"
              }else{
                if((item['Re-translated']+item.Unreviewed)===0){
                  c = "100%"
                }else{
                  c = 100-parseInt((Math.round((item['Re-translated'])*100)/(item['Re-translated']+item.Unreviewed+item.Qualified+item.Error)))+'%'
                }
                
              }
              this.$set(item,'completed',c)
              this.$set(item,'total_nums',item.Error+item.Qualified+item['Re-translated']+item.Unreviewed)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
      }
      
    }
  }
}
</script>


<style lang="less" scoped>


</style>
