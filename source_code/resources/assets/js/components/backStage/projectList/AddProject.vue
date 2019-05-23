<template>
  <div id="addProjectMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/projectlist' }">Project List</el-breadcrumb-item>
      <el-breadcrumb-item>Add New Project</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="addProjectDetail" class="clearfix">
      <el-form :model="addProjectForm" :rules="rules" ref="addProjectForm" label-position="left" label-width="120px">
        <el-form-item prop="product" label="Project Name">
          <div class="namePwdInp">
            <el-input v-model.trim="addProjectForm.product" placeholder="please enter project name"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="attribute" label="Attribute">
          <div class="namePwdInp">
            <el-radio-group v-model="addProjectForm.attribute">
              <el-radio label="public">Public</el-radio>
              <el-radio label="private">Private</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="priority" label="Priority">
          <div class="namePwdInp">
            <el-select v-model="addProjectForm.priority" placeholder="please select priority">
              <el-option label="High" value="3"></el-option>
              <el-option label="Normal" value="2"></el-option>
              <el-option label="Low" value="1"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="lang" label="Language">
          <div class="namePwdInp">
            <el-select v-model="addProjectForm.slang" style="width:49%" placeholder="source language">
              <el-option label="ZH-CN" value="ZH-CN"></el-option>
              <el-option label="EN" value="EN"></el-option>
            </el-select>
            <el-select v-model="addProjectForm.tlang" style="width:49%" placeholder="target language">
              <el-option label="ZH-CN" value="ZH-CN"></el-option>
              <el-option label="EN" value="EN"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="Deadline" prop="deadline">
          <div class="namePwdInp">
            <el-date-picker v-model.trim="addProjectForm.deadline" type="date" :default-value="new Date()" value-format="yyyy-MM-dd" :picker-options="pickerOptions" placeholder="please select deadline"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item prop="translate_users" label="Translator">
          <div class="namePwdInp">
            <el-select v-model="addProjectForm.translate_users" placeholder="please select translator" multiple @change="changeUser('t',$event)">
              <el-option v-for="(item,index) in userList" :key="'Translator'+index" :label="item.name" :value="item.id" v-if="item.status==='t'||item.status===''"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="approve_users" label="Approver">
          <div class="namePwdInp">
            <el-select v-model="addProjectForm.approve_users" placeholder="please select approver" multiple @change="changeUser('a',$event)">
              <el-option v-for="(item,index) in userList" :key="'approver'+index" :label="item.name" :value="item.id" v-if="item.status==='a'||item.status===''"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="Viewer">
          <div class="namePwdInp">
            <el-select v-model="addProjectForm.viewed_users" placeholder="please select viewer" multiple :disabled="addProjectForm.attribute==='public'" @change="changeUser('v',$event)">
              <el-option v-for="(item,index) in userList" :key="'Viewer'+index" :label="item.name" :value="item.id" v-if="item.status==='v'||item.status===''"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="product_desc" label="Description">
          <div class="namePwdInp">
            <el-input type="textarea" v-model.trim="addProjectForm.product_desc" placeholder="please enter description of product"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addProjectForm')">Add</el-button>
          <el-button @click="resetForm('addProjectForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.addProjectForm.product=this.$route.query.name||''
    this.$http.post("/api/user/list").then(response=>{
      // console.log(response.data);
      response.data.data.forEach(item=>{
        // item.mode='unSelect'
        item.status = ''
        this.userList.push(item)
      })
      
    })
  },
  data() {
    const validateProject = (rule,value,callback)=>{
      // console.log(this)
      let nameReg =  /^[A-Za-z0-9']{2,20}$|^[\u4e00-\u9fa5.']{2,20}$/;
      if(!nameReg.test(value)){
        callback(new Error("Supports Chinese, English, Number, etc.)"));
      }else if(value.length<2){
        callback(new Error("Cannot be less than two characters in length."));
      }else if(value.length>20){
        callback(new Error("Cannot exceed 20 characters in length."));
      }else{
        callback()
      }
    }
    const validateLang = (rule,value,callback)=>{
      // console.log(this)
      if(this.addProjectForm.slang===''){
        callback(new Error("Please select source language."));
      }else if(this.addProjectForm.tlang===''){
        callback(new Error("Please select target language."));
      }else if(this.addProjectForm.slang===this.addProjectForm.tlang){
        callback(new Error("The source language cannot be the same as the target language."));
      }else{
        callback();
      }
    }
    return {
      pickerOptions:{
        disabledDate(date){
          // console.log(date)
          return date && date.valueOf() <= Date.now();
        }
      },
      userList:[],
      addProjectForm: {
        product: '',
        attribute:'public',
        priority:'',
        deadline:'',
        lang:'',
        slang:'',
        tlang:'',
        translate_users:[],
        approve_users:[],
        viewed_users:[],
        product_desc:''
      },
      rules: {
        product: [
          {
            required: true,
            message: 'Please enter product.'
          },
          {validator:validateProject,trigger:'blur'}
        ],
        attribute: [
          {
            required: true,
            message: 'Please enter attribute.'
          }
        ],
        priority: [
          {
            required: true,
            message: 'Please enter priority.'
          }
        ],
        lang: [
          {
            required: true,
            message: 'Please select language.'
          },
          {validator:validateLang,trigger:'blur'}
        ],
        deadline: [
          {
            required: true,
            message: 'Please select deadline.'
          }
        ],
        translate_users: [
          {
            required: true,
            message: 'Please enter translator.'
          }
        ],
        approve_users: [
          {
            required: true,
            message: 'Please enter approver.'
          }
        ]
      }
    }
  },
  watch:{
    'addProjectForm.slang':{
      handler(val,oldVal){
        this.addProjectForm.lang = this.addProjectForm.slang+'->'+this.addProjectForm.tlang
      },
      deep:true
    },
    'addProjectForm.tlang':{
      handler(val,oldVal){
        this.addProjectForm.lang = this.addProjectForm.slang+'->'+this.addProjectForm.tlang
      },
      deep:true
    },
    'addProjectForm.attribute':{
      handler(val,oldVal){
        val==='public'?this.addProjectForm.viewed_users = []:null
      },
      deep:true
    },
    'addProjectForm.translate_users':{
      handler(val,oldVal){
        // console.log(val,oldVal);
        //增加
        if(val.length>oldVal.length){
          this.userList.forEach(item=>{
            if(val[length-1]===item.id){
              item.status='t'
            }
          })
        }else{ //减少
          //找出减少的哪个id
          let id ;
          oldVal.forEach((item,index)=>{
            val.indexOf(item)<0?id = item:null
          })
          // console.log(id);
          this.userList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }
      },
      deep:true
    },
    'addProjectForm.approve_users':{
      handler(val,oldVal){
        // console.log(val);
        //增加
        if(val.length>oldVal.length){
          this.userList.forEach(item=>{
            if(val[length-1]===item.id){
              item.status='a'
            }
          })
        }else{ //减少
          //找出减少的哪个id
          let id ;
          oldVal.forEach((item,index)=>{
            val.indexOf(item)<0?id = item:null
          })
          // console.log(id);
          this.userList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }

      },
      deep:true
    },
    'addProjectForm.viewed_users':{
      handler(val,oldVal){
        // console.log(val);
        //增加
        if(val.length>oldVal.length){
          this.userList.forEach(item=>{
            if(val[length-1]===item.id){
              item.status='v'
            }
          })
        }else{ //减少
          //找出减少的哪个id
          let id ;
          oldVal.forEach((item,index)=>{
            val.indexOf(item)<0?id = item:null
          })
          // console.log(id);
          this.userList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }

      },
      deep:true
    }
  },
  methods: {
    changeUser(mode,list){
      switch(mode){
        case 't':
          list.forEach(item=>{
            this.userList.forEach(item1=>{
              if(item===item1.id){
                item1.status='t'
              }
            })
          })
        break;
        case 'a':
          list.forEach(item=>{
            this.userList.forEach(item1=>{
              if(item===item1.id){
                item1.status='a'
              }
            })
          })
        break;
        case 'v':
          list.forEach(item=>{
            this.userList.forEach(item1=>{
              if(item===item1.id){
                item1.status='v'
              }
            })
          })
        break;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(this.addProjectForm);
        if (valid) {
          let obj = {
            product:this.addProjectForm.product,
            attribute:this.addProjectForm.attribute,
            priority:this.addProjectForm.priority,
            lang:this.addProjectForm.slang+'->'+this.addProjectForm.tlang,
            translate_users:JSON.stringify(this.addProjectForm.translate_users),
            approve_users:JSON.stringify(this.addProjectForm.approve_users),
            viewed_users:JSON.stringify(this.addProjectForm.viewed_users),
            deadline:this.addProjectForm.deadline,
            product_desc:this.addProjectForm.product_desc
          }
          // console.log(obj);
          this.$http.post("/api/product/create",qs.stringify(obj)).then(response=>{
            setTimeout(()=>{
              this.$router.push('/projectlist')
            },1500)
          })
        } else {
          // console.log('error submit!!')
          this.$notify({
            title: 'Notice',
            message: 'Please check if the form is filled in correctly',
            type: 'warning'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  
}
</script>

<style lang="less" scoped>

</style>



