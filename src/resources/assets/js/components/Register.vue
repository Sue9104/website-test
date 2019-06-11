<template>
  <div id="register">
    <div id="formCon">
      <b-form id="registerForm" method="post" @submit="onSubmit" :novalidate="true">
        <b-form-group>
          <b-link href="#/health">
            <img src="/images/logo.png" height="50" width="180" alt="Singlera Genomics Logo">
          </b-link>
          <div class="modeTitle">Sign Up</div>
        </b-form-group>
        <b-form-group label="E-mail:" label-for="emailRegister">
          <b-form-input id="emailRegister" type="email" v-model.trim="registerForm.email" :state="emailState" required placeholder="please enter E-mail">
          </b-form-input>
        </b-form-group>
        <b-form-group label="User Name:" label-for="nameRegister">
          <b-form-input id="nameRegister" v-model.trim="registerForm.name" :state="nameState" required placeholder="please enter user name">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="pwdRegister">
          <b-form-input id="pwdRegister" type="password" v-model.trim="registerForm.password" :state="pwdState" required placeholder="please enter password"></b-form-input>
          <b-form-invalid-feedback id="pwdRegisterFeedback">
            Password length cannot be less than 6.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Repeat the password:" label-for="c_pwdRegister">
          <b-form-input type="password" id="c_pwdRegister" v-model.trim="registerForm.c_password" :state="c_passwordState" required placeholder="Please enter your password again"></b-form-input>
          <b-form-invalid-feedback id="c_pwdRegisterFeedback">
            Inconsistent password entered twice.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox class="rememberStatus" plain id="agreeCheckbox" v-model.trim="registerForm.agree" value="accepted" unchecked-value="not_accepted">
            I agree
            <b-link href="#">User Agreement</b-link>
          </b-form-checkbox>
          <div class="formLink">
            Registered account?<b-link href="#/login">Sign In</b-link>
          </div>
        </b-form-group>
        <b-form-group>
        <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert=false">
          {{alertTitle}}
        </b-alert>

          <b-button class="registerBtn" type="submit" variant="info" :disabled="registerDisabled">Sign Up</b-button>
        </b-form-group>
      </b-form>
    </div>
    <footer>
      <div class="sectionCenter">Copyright 2019</div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted(){
    $("#formCon").get(0).style.minHeight=window.innerHeight-100+"px"
    this.currentMode = this.mode
  },
  data(){
    return{
      showAlert:false,
      alertTitle:'',
      registerForm: {
        name:'',
        email:'',
        password:'',
        c_password:'',
        agree:''
      }
    }
  },
  computed:{
    registerDisabled(){
      if(this.registerForm.name&&this.registerForm.email&&this.registerForm.password&&this.pwdState&&this.registerForm.c_password&&this.c_passwordState&&this.registerForm.agree=='accepted'&&this.c_passwordState){
        return false
      }else{
        return true
      }
    },
    emailState(){
      let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; 
      if(!reg.test(this.registerForm.email)){
        return false
      }else{
        return true
      }
    },
    nameState(){
      let nameReg =  /^[A-Za-z]{2,20}$|^[\u4e00-\u9fa5]{2,20}$/;
      if(!nameReg.test(this.registerForm.name)){
        return false
      }else{
        return true
      }
    },
    pwdState(){
      if(this.registerForm.password.length<6){
        return false
      }else{
        return true
      }
    },
    c_passwordState(){
      return this.registerForm.c_password===this.registerForm.password?true : false
    },
  },
  watch:{
    'registerForm.agree':{
      handler(val,oldVal){
        if(val==='not_accepted'){
          this.alertTitle = 'Please read and select the user agreement before clicking on the registration.'
          this.showAlert = true
        }else{
          this.showAlert =  false
        }
      },
      deep:true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      // console.log(this.registerForm)
      if(this.registerForm.password!==this.registerForm.c_password){
        this.showAlert = true
        this.alertTitle = 'Inconsistent password entered twice.'
        return false
      }else if(this.registerForm.agree==='not_accepted'){
        this.showAlert = true
        this.alertTitle = 'Please read and select the user agreement before clicking on the registration.'
        return false
      }else{
        this.$http.post("/api/register",qs.stringify(this.registerForm)).then(response=>{
          // console.log(response.data)
          if(response.data.success.token){
            this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12)
            this.$cookies.set('email', this.registerForm.email, 60 * 60 * 12)
            this.$cookies.set("pwd",this.registerForm.password, 60 * 60 * 12)
            this.$router.push("/dashboard")
          }else{
            this.showAlert = true
            this.alertTitle = 'Registration failed, please try again later.'
          }
          this.$nextTick(()=>{
            //设置请求头
            this.$http.defaults.headers.common['Authorization'] = this.$cookies.get('Authorization')||'';
          })
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>