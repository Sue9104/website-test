<template>
  <div id="historyItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/historylist' }">History List</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="historyItemCon">
      <div>
        <el-tag type="info">Project Name:{{currentItem.product}}</el-tag>
        <el-tag type="info">Language:{{currentItem.lang}}</el-tag>
        <el-tag type="info">Status:{{currentItem.status}}</el-tag>
      </div>
      <div id="historyItemBox">
         <div>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{Object.keys(JSON.parse(currentItem.key)[0])[0]}}</div>
          </el-card>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{JSON.parse(currentItem.key)[0][Object.keys(JSON.parse(currentItem.key)[0])[0]]}}</div>
          </el-card>
        </div>
        <div v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2">
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
      this.$route.path === '/t_browhistoryitem'?this.url = '/api/translate/history':null
      this.$route.path === '/a_browhistoryitem'?this.url = '/api/approve/list':null
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
      url:'',
      activeName: 1,
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
