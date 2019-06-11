<template>
  <div id="viewDetailItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/viewlist'}">Released Projects</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/viewentry',query:{id:$route.query.id} }">Entry</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="viewDetailItemCon">
      <div>
        <el-tag type="info">Project Name:{{currentItem.product}}</el-tag>
        <el-tag type="info">Language:{{currentItem.lang}}</el-tag>
        <el-tag type="info">Status:{{currentItem.status}}</el-tag>
        <el-tag type="info">Version:{{currentItem.version_name}}</el-tag>
        <el-button type="warning" size="small" id="objectionBtn" @click='openAgreeModal' v-if="(currentItem.conflict===0)&&(this.newest_version_name===currentItem.version_name)">Suggestion</el-button>
        <span style="font-size:14px;color:red;margin-left:10px;" v-if="(currentItem.conflict===1)&&(this.newest_version_name===currentItem.version_name)">Suggestion is under review...</span>
        <span style="font-size:12px;color:orange;margin-left:10px;" v-if="!(this.newest_version_name===currentItem.version_name)">Tips: Only object to the latest version.</span>
      </div>
      <div id="viewDetailItemBox">
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
      <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%">
        <el-form :model="tipsForm" :rules="rules" ref="tipsForm" class="demo-ruleForm">
          <el-form-item prop="tips">
            <el-input v-model.trim="tipsForm.tips" placeholder="please enter reason"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit">Submit</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery/dist/jquery.min.js'
export default {
  mounted(){
    this.$http.post("/api/view/list_items",qs.stringify({
          product_id:this.$route.query.id,
          export_id:this.$route.query.eid
        })).then(response=>{
      // console.log(response.data);
      this.currentItem = response.data.result.data[0];
      this.newest_version_name = response.data.result.newest_version_name
    })
  },
  data() {
    return {
      currentItem: {
        key:'[{}]',
        translate:'[{}]'
      },
      newest_version_name:'',
      tipsForm:{
        tips:''
      },
      dialogVisible:false,
      rules:{
        tips: [
          {
            required: true,
            message: 'Please enter reason.'
          }
        ],
      }
    }
  },
  methods: {
    openAgreeModal(){
      this.dialogVisible = true
    },
    submit(){
      this.$refs.tipsForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$http.post("/api/view/advise",qs.stringify({
            export_id: this.$route.query.eid,
            objection:this.tipsForm.tips
          })).then(response=>{
            // console.log(response.data);
            setTimeout(()=>{
              this.$router.push({path:"/viewentry",query:{id:this.$route.query.id}})
            }, 500)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
      
    }
  }
}
</script>

<style lang="less" scoped>

</style>
