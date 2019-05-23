<template>
  <div id="onTransTaskMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/translationlist'}" v-if="$route.path==='/ontrans'">Translation List</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/retranslationlist' }" v-if="$route.path==='/retrans'">Re-translation List</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/qualifiedlist' }" v-if="$route.path==='/viewqualified'">Qualified List</el-breadcrumb-item>
      <el-breadcrumb-item>Translate</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="onTransCon">
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
        <el-button type="success" size="small"  id="submitBtn" @click='submit' v-if="currentItem.status==='Untranslated'||currentItem.status==='Re-translated'">Submit</el-button>
      </div>
      <div id="transBox">
        <div>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{currentItem.key?currentItem.key:'Please select the content you need to translate.'}}</div>
            <div class="btnCon">
              <el-button type="primary" id="googleBtn1" @click="googleTrans(currentItem.key,'k')">Google</el-button>
            </div>
          </el-card>
          <el-card class="boxCard">
            <el-input v-model="currentItem.targetKey" type="textarea" placeholder="Please enter content"></el-input>
          </el-card>
        </div>
        <div v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2">
          <el-card class="boxCard">
            <div :id="'rawDataText'+(index+2)" class="rawDataText">{{item?item:'Please select the content you need to translate.'}}</div>
              <div class="btnCon">
                <el-button type="primary" :id="'googleBtn'+(index+2)" @click="googleTrans(item,index)">Google</el-button>
              </div>
            </el-card>
            <el-card class="boxCard">
              <el-input v-model="currentItem.target[index]" type="textarea" placeholder="Please enter content"></el-input>
            </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route);
    this.$http.post("/api/translate/translate_list",qs.stringify({
          id: this.$route.query.id,
          status:this.status
        })).then(response=>{
      // console.log(response.data);
      response.data.result.data.forEach(item=>{
        this.$set(item,'target',[])
        this.$set(item,'targetKey','')
      })
      // console.log(response.data.result.data)
      this.currentItem = response.data.result.data[0];
      for(let i = 0;i<JSON.parse(this.currentItem.translate).length;i++){
        this.activeName.push(i+2)
      }
    })
  },
  data() {
    return {
      currentItem: {
        translate:'[]'
      },
    }
  },
  computed:{
    status(){
      if(this.$route.path==='/ontrans'){
        return 'Untranslated'
      }else if(this.$route.path==='/retrans'){
        return 'Re-translated'
      }else if(this.$route.path==='/viewqualified'){
        return 'Qualified'
      }else{
        return null
      }
    }
  },
  watch:{
    'currentItem.target':{
      handler(val,oldVal){
        
      },
      deep:true
    }
  },
  methods: {
    save(content,key){
      // console.log(content)
      if(content.trim()){
        if(key==='k'){
          this.currentItem.targetKey = content.trim()
        }else{
          this.currentItem.target[key] = content.trim()
        }
      }else{
        this.$notify({
          title: 'Notice',
          message: 'Please fill in the translation.',
          type: 'error'
        })
      }
    },
    googleTrans(content,key) {
      // let dataText = document.createElement('input');
      // dataText.value=rawDataText.text()
      // dataText.select(); // 选择对象
      // document.execCommand("Copy"); // 执行浏览器复制命令
      // console.log(document.execCommand("Copy"));
      // console.log(content,key)
      let c;
      let googleBtn;
      if(content.trim()){
        if(key==='k'){
          c = content.trim()
          googleBtn = $("#googleBtn1")
        }else{
          c = content.trim()
          googleBtn = $("#googleBtn"+(key+2))
        }
      }
      
      googleBtn.html('Opening..')
      setTimeout(()=> {
        googleBtn.html('Google')
        window.open(
          'https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text='+c
        )
      }, 500)
    },
    submit(){
      let flag1 = false
      let flag2 = false
      this.currentItem.target.forEach(item=>{
        // !(item&&item.trim())?flag1 = true:null
        item&&item.trim()?null:flag1 = true
      })
      this.currentItem.targetKey.trim()?null:flag2 = true
      // console.log(flag1);
      // console.log(flag2);
      if(flag1||flag2){
        this.$notify({
          title: 'Notice',
          message: 'All entries must be translated before they can be submitted!',
          type: 'error'
        })
        return false;
      }
      let obj = {}
      obj.translate_job_id = this.$route.query.id
      let keyObj={}
      keyObj[this.currentItem.key] = this.currentItem.targetKey
      obj.key_translation = JSON.stringify([keyObj])
      let transArr = []
      JSON.parse(this.currentItem.translate).forEach((item,index)=>{
        let a = {}
        a[item] = this.currentItem.target[index]
        transArr.push(a)
      })
      obj.fields_translation = JSON.stringify(transArr)
      obj.status = this.currentItem.status
      // console.log(obj);
      this.$http.post("/api/translate/translate",qs.stringify(obj)).then(response=>{
        this.$notify({
          title: 'Notice',
          message: 'Save successfully!',
          type: 'success'
        })
        setTimeout(()=>{
          if(this.$route.path==='/ontrans'){
            this.$store.state.taskList.Untranslated_nums -= 1
            this.$router.push("/translationlist")
          }
          if(this.$route.path==='/retrans'){
            this.$store.state.taskList['Re_translated_nums'] -= 1
            this.$router.push("/retranslationlist")
          }
        }, 500)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
