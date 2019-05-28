<template>
  <div id="objectionItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/projectlist'}">Project List</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/projectdetail',query:{id:$route.query.id}}">Detail</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/objectionlist',query:{id:$route.query.id}}">Objection List</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="objectionItemCon">
      <div>
        <el-tag type="info">Project Name:{{currentItem.product}}</el-tag>
        <el-tag type="info">Language:{{currentItem.lang}}</el-tag>
        <el-tag type="info">Status:{{currentItem.status}}</el-tag>
        <el-button type="success" size="small" id="redistributeBtn" @click='openAgreeModal(1)'>Redistribute</el-button>
        <el-button type="danger" size="small" id="ignoreBtn" @click='openAgreeModal(2)'>Ignore</el-button>
      </div>
      <div>
        <el-alert title="Objection" :description="currentItem.objection" type="warning" show-icon :closable="false"></el-alert>
      </div>
      <div id="objectionItemBox">
         <el-collapse v-model="activeName" accordion>
          <el-collapse-item :name="1">
            <template slot="title">
              Keywords
            </template>
            <div class="source">{{Object.keys(JSON.parse(currentItem.key)[0])[0]}}</div>
            <div class="target">{{JSON.parse(currentItem.key)[0][Object.keys(JSON.parse(currentItem.key)[0])[0]]}}</div>
          </el-collapse-item>
          <el-collapse-item v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2">
            <template slot="title">
              {{"Content"+(index+1)}}
            </template>
            <div class="source">{{Object.keys(item)[0]}}</div>
            <div class="target">{{item[Object.keys(item)[0]]}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-dialog title="Select" width="35%" :visible.sync="dialogVisible">
        <span v-if="agreeFlag===0">Are you sure to ignore the objection?</span>
        <el-form :model="distributeForm" :rules="rules" ref="distributeForm" class="demo-ruleForm" v-if="agreeFlag===1" @submit.native.prevent>
          <el-form-item prop="translate_users_name">
            <el-select v-model.trim="distributeForm.translate_users_name" placeholder="please select translator." style="width:100%;">
              <el-option v-for="(item,index) in translators" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
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
    
    new Promise((resolve,reject)=>{
      this.$http.post("/api/user/list").then(response=>{
        // console.log(response.data);
        this.userList=response.data.data;
        resolve()
      })
    }).then(()=>{
      this.$http.post("/api/approve/list_conflict",qs.stringify({
          product_id:this.$route.query.id,
          t_approve_id:this.$route.query.oid
        })).then(response=>{
        // console.log(response.data);
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
        this.currentItem = response.data.data[0];
      })
    })

  },
  data() {
    return {
      activeName: 1,
      currentItem: {
        key:'[{}]',
        translate:'[{}]'
      },
      dialogVisible:false,
      agreeFlag:null,
      translators:[],
      distributeForm:{
        translate_users_name:'',
      },
      rules:{
        translate_users_name: [
          {
            required: true,
            message: 'Please select translator.'
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
      // 通过
      if(this.agreeFlag===1){
        this.$refs.distributeForm.validate((valid) => {
          if (valid) {
            // console.log(1111);
            this.$http.post("/api/approve/approve_conflict",qs.stringify({
              t_approve_id: this.$route.query.oid,
              approved: this.agreeFlag,
              translate_users_name:this.distributeForm.translate_users_name
            })).then(response=>{
              // console.log(response.data);
              setTimeout(()=>{
                this.$router.push("/objectionlist?id="+this.$route.query.id)
              }, 500)
            })
          }else{
            console.log('error submit!!');
            return false;
          }
        })
      }
      //拒绝
      if(this.agreeFlag===2){
        this.$http.post("/api/approve/approve_conflict",qs.stringify({
          translate_approve_id: this.$route.query.id,
          approved: this.agreeFlag,
          translate_users_name:this.distributeForm.translate_users_name
        })).then(response=>{
          // console.log(response.data);
          setTimeout(()=>{
            this.$router.push("/objectionlist?id="+this.$route.query.id)
          }, 500)
        })
      }
      
      
      
    }
  }
}
</script>

<style lang="less" scoped>

</style>
