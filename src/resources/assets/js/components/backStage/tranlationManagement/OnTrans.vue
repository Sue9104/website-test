<template>
  <div id="onTransTaskMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/translation'}" v-if="$route.path==='/ontrans'">Translation</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/retranslation' }" v-if="$route.path==='/retrans'">Re-translation</el-breadcrumb-item>
      <el-breadcrumb-item>Translate</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="onTransCon">
      <div>
        <el-tag type="info">Project Name: {{currentItem.product}}</el-tag>
        <el-tag type="info">Priority:
          <span v-if="currentItem.priority=='1'">Low</span>
          <span v-if="currentItem.priority=='2'">Normal</span>
          <span v-if="currentItem.priority=='3'" style="color:red">High</span>
        </el-tag>
        <el-tag type="info">Language: {{currentItem.lang}}</el-tag>
        <el-tag type="info">Creator: {{currentItem.allocate_users_name}}</el-tag>
        <el-tag type="info">Deadline: {{currentItem.deadline&&(currentItem.deadline.split(" ")[1])?currentItem.deadline.split(" ")[0]:currentItem.deadline}}</el-tag>
        <el-button type="success" size="small" id="submitBtn" @click='submit' v-if="currentItem.status==='Untranslated'||currentItem.status==='Re-translated'">Submit</el-button>
      </div>
      <div id="transBox">
        <div class='boxTitleCon'>
          <p>Source</p>
          <p>Translation</p>
        </div>
        <div class="st_con">
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{currentItem.key}}</div>
            <div class="btnCon">
              <el-button type="primary" size="small" id="googleBtn1" @click="googleTrans(currentItem.key,'k')">Google</el-button>
            </div>
          </el-card>
          <el-card class="boxCard">
            <el-input id="afterDataText1" class="afterDataText" v-model="currentItem.targetKey" type="textarea" placeholder="Please enter content"></el-input>
          </el-card>
        </div>
        <div v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2" class="st_con">
          <el-card class="boxCard">
            <div :id="'rawDataText'+(index+2)" class="rawDataText">{{item}}</div>
              <div class="btnCon">
                <el-button type="primary" size="small" :id="'googleBtn'+(index+2)" @click="googleTrans(item,index)">Google</el-button>
              </div>
            </el-card>
            <el-card class="boxCard">
              <el-input :id="'afterDataText'+(index+2)" class="afterDataText" v-model="currentItem.target[index]" type="textarea" placeholder="Please enter content"></el-input>
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
      // console.log(response.data)
      if(this.status==='Untranslated'){
        response.data.result.data.forEach(item=>{
          this.$set(item,'target',[])
          this.$set(item,'targetKey','')
        })
        JSON.parse(response.data.result.data[0].translate).forEach(item=>{
          // console.log(item)
          response.data.result.data[0].target.push('')
        })
      }
      if(this.status==='Re-translated'){
        response.data.result.data.forEach(item=>{
          this.$set(item,'target',[])
          JSON.parse(item.approve.translate).forEach((item1,index)=>{
            item.target.push(item1[JSON.parse(item.translate)[index]])
          })
          this.$set(item,'targetKey',JSON.parse(item.approve.key)[0][item.key])
        })
      }
      
      // console.log(response.data.result.data)
      this.currentItem = response.data.result.data[0];
    })
  },
  data() {
    return {
      currentItem: {
        translate:'[]',
        approve:{
          key:'[]',
          translate:'[]'
        }
      },
    }
  },
  computed:{
    status(){
      if(this.$route.path==='/ontrans'){
        return 'Untranslated'
      }else if(this.$route.path==='/retrans'){
        return 'Re-translated'
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
        let slang = this.currentItem.lang.split(" -> ")[0]
        let tlang = this.currentItem.lang.split(" -> ")[1]
        window.open(
          'https://translate.google.cn/#view=home&op=translate&sl='+slang+'&tl='+tlang+'&text='+encodeURIComponent(c)
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
        setTimeout(()=>{
          if(this.$route.path==='/ontrans'){
            this.$store.state.taskList.Untranslated_nums -= 1
            this.$router.push("/translation")
          }
          if(this.$route.path==='/retrans'){
            this.$store.state.taskList['Re_translated_nums'] -= 1
            this.$router.push("/retranslation")
          }
        }, 500)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
