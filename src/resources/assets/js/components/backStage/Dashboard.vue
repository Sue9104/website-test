<template>
  <div id="overviewMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="overviewHeader">
      <el-card class="box-card" :shadow="currentMenu==='project'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('project')">
          <span>
            <i class="el-icon-menu" :style="currentMenu==='project'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='project'?'color:#000;':''">
            Project
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='allocation'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('allocation')">
          <span>
            <i class="el-icon-rank" :style="currentMenu==='allocation'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='allocation'?'color:#000;':''">
            Allocation
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='objection'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('objection')">
          <span>
            <i class="el-icon-bell" :style="currentMenu==='objection'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='objection'?'color:#000;':''">
            Objection
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
            Approval
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
        <el-table-column prop="priority" label="Priority" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.priority=='1'">Low</div>
            <div v-if="scope.row.priority=='2'">Normal</div>
            <div v-if="scope.row.priority=='3'" style="color:red">High</div>
          </template>
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center">
        </el-table-column>
        <el-table-column prop="deadline" label="Deadline" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.deadline&&scope.row.deadline.split(" ")[1]?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="total_nums" label="Total" align="center">
        </el-table-column>
        <el-table-column prop="is_completed" label="completed" align="center" v-if="currentMenu==='project'">
          <template slot-scope="scope">
            <div v-if="scope.row.is_completed=='0'" style="color:red">NO</div>
            <div v-if="scope.row.is_completed=='1'">OK</div>
          </template>
        </el-table-column>
        <el-table-column label="Completed" align="center" v-if="currentMenu!=='project'">
          <template slot-scope="scope">
            <div v-if="currentMenu==='allocation'">
              0%
            </div>
            <div v-if="currentMenu==='objection'">
              0%
            </div>
            <div v-if="currentMenu==='translation'">
              {{!(scope.row.Untranslated+scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)?'0%':100-parseInt((Math.round((scope.row.Untranslated+scope.row['Re-translated'])*100)/(scope.row.Untranslated+scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)))+'%'}}
            </div>
            <div v-if="currentMenu==='approval'">
              {{!(scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)?'0%':100-parseInt((Math.round((scope.row.Unreviewed)*100)/(scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)))+'%'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="task Nums" label="Unassign" align="center" v-if="currentMenu==='allocation'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/allocationlist?name='+scope.row.product)">0</div>
          </template>
        </el-table-column>
        <el-table-column prop="task Nums" label="Unconflict" align="center" v-if="currentMenu==='objection'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/objectionlist?name='+scope.row.product)">0</div>
          </template>
        </el-table-column>
        <el-table-column prop="task Nums" label="Untranslate" align="center" v-if="currentMenu==='translation'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/translationlist?name='+scope.row.product)">translation: {{scope.row.Untranslated}}</div>
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/retranslationlist?name='+scope.row.product)">re-translation: {{scope.row['Re-translated']}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="task Nums" label="Unreviewed" align="center" v-if="currentMenu==='approval'">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/approvallist?name='+scope.row.product)">{{scope.row.Unreviewed}}</div>
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
    this.selectMenu('project')
  },
  data() {
    return {
      currentMenu:'project',
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
        case 'project':
          this.$http.post("/api/product/list").then(response=>{
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
            this.loading = false
          })
        break;
        case 'allocation':
          // this.$http.post("/api/product/list").then(response=>{
          //   this.overviewTable = response.data.result.data;
          //   this.total = response.data.result.total;
          //   this.loading = false
          // })
        break;
        case 'objection':
          // this.$http.post("/api/product/list").then(response=>{
          //   this.overviewTable = response.data.result.data;
          //   this.total = response.data.result.total;
          //   this.loading = false
          // })
        break;
        case 'translation':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
        case 'approval':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
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
        case 'project':
          this.$http.post("/api/product/list",qs.stringify({page:val})).then(response=>{
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
            this.loading = false
          })
        break;
        case 'allocation':
          // this.$http.post("/api/product/list").then(response=>{
          //   this.overviewTable = response.data.result.data;
          //   this.total = response.data.result.total;
          //   this.loading = false
          // })
        break;
        case 'objection':
          // this.$http.post("/api/product/list").then(response=>{
          //   this.overviewTable = response.data.result.data;
          //   this.total = response.data.result.total;
          //   this.loading = false
          // })
        break;
        case 'translation':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
            this.loading = false
          })
        break;
        case 'approval':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
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
