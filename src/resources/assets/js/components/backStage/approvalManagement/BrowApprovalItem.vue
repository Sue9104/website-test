<template>
  <div id="approvalItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/review' }">Review</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="approvalItemCon">
      <div>
        <el-tag type="info">Project Name:{{currentItem.product}}</el-tag>
        <el-tag type="info">Priority:
          <span v-if="currentItem.priority=='1'">Low</span>
          <span v-if="currentItem.priority=='2'">Normal</span>
          <span v-if="currentItem.priority=='3'" style="color:red">High</span>
        </el-tag>
        <el-tag type="info">Language:{{currentItem.lang}}</el-tag>
        <el-tag type="info">Creator:{{currentItem.allocate_users_name}}</el-tag>
        <el-tag type="info">Deadline:{{currentItem.deadline&&(currentItem.deadline.split(" ")[1])?currentItem.deadline.split(" ")[0]:currentItem.deadline}}</el-tag>
        <el-button type="success" size="small" id="agreeBtn" @click='openAgreeModal(1)' v-if="currentItem.status==='Unreviewed'">Agree</el-button>
        <el-button type="danger" size="small" id="refuseBtn" @click='openAgreeModal(0)' v-if="currentItem.status==='Unreviewed'">Refuse</el-button>
      </div>
      <div id="approvalItemBox">
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
        <span v-show="agreeFlag===1">Are you sure to pass this entry?</span>
        <el-form :model="tipsForm" :rules="rules" ref="tipsForm" class="demo-ruleForm" v-show="agreeFlag===0">
          <el-form-item prop="tips">
            <el-input v-model="tipsForm.tips" placeholder="please enter reason"></el-input>
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
export default {
  mounted(){
    // console.log(this.$route);
    this.$http.post("/api/approve/list",qs.stringify({
        status:'Unreviewed',
        translate_approve_id: this.$route.query.id,
      })).then(response=>{
      // console.log(response.data);
      this.currentItem = response.data.data[0];
    })
  },
  data() {
    return {
      currentItem: {
        key:'[{}]',
        translate:'[{}]'
      },
      agreeFlag:null,
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
    openAgreeModal(agree){
      this.dialogVisible = true
      this.agreeFlag = agree
    },
    submit(){
      //不通过
      if(this.agreeFlag===0){
        this.$refs.tipsForm.validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$http.post("/api/approve/approve",qs.stringify({
              translate_approve_id: this.$route.query.id,
              approved: this.agreeFlag,
              tips:this.tipsForm.tips.trim()
            })).then(response=>{
              // console.log(response.data);
              setTimeout(()=>{
                this.$store.state.taskList.Approve_nums -= 1
                this.$router.push("/review")
              }, 500)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      //通过
      if(this.agreeFlag===1){
        this.$http.post("/api/approve/approve",qs.stringify({
          translate_approve_id: this.$route.query.id,
          approved: this.agreeFlag,
          tips:this.tipsForm.tips
        })).then(response=>{
          // console.log(response.data);
          setTimeout(()=>{
            this.$store.state.taskList.Approve_nums -= 1
            this.$router.push("/review")
          }, 500)
        })
      }
      
      
      
    }
  }
}
</script>

<style lang="less" scoped>


</style>
