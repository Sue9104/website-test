<template>
  <div id="personalStatisticsMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Personal Statistics</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="personalStatisticsCon">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Translation" name="translator">
          <div class="statisticsTable">
            <el-table ref="ProjectTable" :data="StatisticsTable.translationTable" v-loading="loading" stripe border style="width: 100%">
              <el-table-column prop="product" label="Project Name" align="center">
              </el-table-column>
              <el-table-column prop="lang" label="Language" align="center">
              </el-table-column>
              <el-table-column prop="users_name" label="Creator" align="center">
              </el-table-column>
              <el-table-column prop="priority" label="Priority" align="center">
              </el-table-column>
              <el-table-column prop="deadline" label="Deadline" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.deadline.split(" ")[1]?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
              </template>
              </el-table-column>
              <el-table-column prop="total_nums" label="Total" align="center">
              </el-table-column>
              <el-table-column label="Undone" align="center">
                <template slot-scope="scope">
                  <div>
                    {{!(scope.row.Untranslated+scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)?'0%':parseInt((Math.round((scope.row.Untranslated+scope.row['Re-translated'])*100)/(scope.row.Untranslated+scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)))+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Completed" align="center">
                <template slot-scope="scope">
                  <div>
                    {{!(scope.row.Untranslated+scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)?'0%':100-parseInt((Math.round((scope.row.Untranslated+scope.row['Re-translated'])*100)/(scope.row.Untranslated+scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)))+'%'}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Approval" name="reviewer">
          <div class="statisticsTable">
            <el-table ref="ProjectTable" :data="StatisticsTable.approvalTable" v-loading="loading" stripe border style="width: 100%">
              <el-table-column prop="product" label="Project Name" align="center">
              </el-table-column>
              <el-table-column prop="lang" label="Language" align="center">
              </el-table-column>
              <el-table-column prop="users_name" label="Creator" align="center">
              </el-table-column>
              <el-table-column prop="priority" label="Priority" align="center">
              </el-table-column>
              <el-table-column prop="deadline" label="Deadline" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.deadline.split(" ")[1]?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="total_nums" label="Total" align="center">
              </el-table-column>
              <el-table-column label="Undone" align="center">
                <template slot-scope="scope">
                  <div>
                    {{!(scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)?'0%':parseInt((Math.round((scope.row.Unreviewed)*100)/(scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)))+'%'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Completed" align="center">
                <template slot-scope="scope">
                  <div>
                    {{!(scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)?'0%':100-parseInt((Math.round((scope.row.Unreviewed)*100)/(scope.row['Re-translated']+scope.row.Unreviewed+scope.row.Qualified+scope.row.Error)))+'%'}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
          <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route.query.sta_pane)
    this.activeName = this.$route.query.sta_pane
    this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:this.$route.query.sta_pane})).then(response=>{
      switch(this.$route.query.sta_pane){
        case 'translator':
          this.StatisticsTable.translationTable = response.data.result.data
        break;
        case 'reviewer':
          this.StatisticsTable.approvalTable = response.data.result.data
        break
      }
      this.total = response.data.result.total
      this.loading = false
    })
    
  },
  data() {
    return {
      loading:false,
      activeName:'translator',
      StatisticsTable:{
        translationTable:[],
        approvalTable:[],
      },
      total:0,
      currentPage: 1,
      pageSize: 10

    }
  },
  methods: {
    handleClick(tab, event) {
      this.loading = true
      this.$router.push({path:'/personalstatistics',query:{sta_pane:tab.name}})
      // console.log(tab.name);
      this.currentPage = 1
      this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:tab.name,page:this.currentPage,count:this.pageSize})).then(response=>{
        switch(tab.name){
          case 'translator':
            this.StatisticsTable.translationTable = response.data.result.data
          break;
          case 'reviewer':
            this.StatisticsTable.approvalTable = response.data.result.data
          break
        }
        this.total = response.data.result.total
        this.loading = false
      })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      this.loading = true
      this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:tab.name,page:this.currentPage,count:this.pageSize})).then(response=>{
        switch(tab.name){
          case 'translator':
            this.StatisticsTable.translationTable = response.data.result.data
          break;
          case 'reviewer':
            this.StatisticsTable.approvalTable = response.data.result.data
          break
        }
        this.total = response.data.result.total
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
