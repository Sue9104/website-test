<template>
  <div id="historyItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: prePath }">History</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="historyItemCon">
      <div>
        <el-tag type="info">Project Name:{{currentItem.product}}</el-tag>
        <el-tag type="info">Language:{{currentItem.lang}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/t_browhistoryitem')||($route.path === '/a_browhistoryitem')">Status:{{currentItem.status}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">Status:
          <span v-if="currentItem.approved===2">Ignore</span>
          <span v-if="currentItem.approved===1">Agree</span>
          <span v-if="currentItem.approved===0">Unprocessed</span>
        </el-tag>
        <el-tag type="info" v-if="($route.path === '/t_browhistoryitem')">TranslationDate:{{currentItem.created_at}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/a_browhistoryitem')">ApprovalDate:{{currentItem.updated_at}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">SuggestionDate:{{currentItem.created_at}}</el-tag>
      </div>
      <div v-if="($route.path === '/a_browhistoryitem')&&currentItem.tips">
        <el-alert :title="currentItem.tips" type="warning" show-icon :closable="false"></el-alert>
      </div>
      <div id="historyItemBox">
        <div class='boxTitleCon'>
          <p>Source</p>
          <p>Translation</p>
        </div>
        <div class="st_con">
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{Object.keys(JSON.parse(currentItem.key)[0])[0]}}</div>
          </el-card>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{JSON.parse(currentItem.key)[0][Object.keys(JSON.parse(currentItem.key)[0])[0]]}}</div>
          </el-card>
        </div>
        <div v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2" class="st_con">
          <el-card class="boxCard">
            <div :id="'rawDataText'+(index+2)" class="rawDataText">{{Object.keys(item)[0]}}</div>
          </el-card>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{item[Object.keys(item)[0]]}}</div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route.query.id)
    new Promise((resolve,reject)=>{
      this.$route.path === '/t_browhistoryitem'?this.prePath = '/t_history':null
      this.$route.path === '/a_browhistoryitem'?this.prePath = '/a_history':null
      this.$route.path === '/v_browhistoryitem'?this.prePath = '/v_history':null

      this.$route.path === '/t_browhistoryitem'?this.url = '/api/translate/history':null
      this.$route.path === '/a_browhistoryitem'?this.url = '/api/approve/list':null
      this.$route.path === '/v_browhistoryitem'?this.url = '/api/view/list_conflict_mine':null
      resolve()
    }).then(data=>{
      // console.log(this.url)
      this.$http.post(this.url,qs.stringify({
        id: this.$route.query.id,
        })).then(response=>{
        // console.log(response.data);
        this.currentItem = response.data.data[0];
        this.total = response.data.total;
      })
    })
    

  },
  data() {
    return {
      prePath:'',
      url:'',
      currentItem: {
        key:'[{}]',
        translate:'[{}]'
      },
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
