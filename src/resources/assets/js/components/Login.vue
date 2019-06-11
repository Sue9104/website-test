<template>
  <div id="login">
    <div id="formCon">
      <b-form id="loginForm" @submit="onSubmit" @reset="onReset">
        <b-form-group>
          <b-link>
            <img src="/images/logo.png" height="50" width="180" alt="Singlera Genomics Logo">
          </b-link>
          <div class="modeTitle">Sign In</div>
        </b-form-group>
        <b-form-group label="Email:" label-for="emailLogin">
          <b-form-input id="emailLogin" v-model.trim="loginForm.email" required placeholder="please enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="pwdLogin">
          <b-form-input id="pwdLogin" type="password" v-model.trim="loginForm.password" required placeholder="please enter password">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox class="rememberStatus" plain id="remembercheckbox" v-model.trim="loginForm.status" value="remember" unchecked-value="forget">
            remember
          </b-form-checkbox>
          <div class="formLink">
            <b-link href="#/register">Sign Up</b-link><b-link v-b-tooltip.focus title="Please contact administrator">Forgot password?</b-link>
          </div>
        </b-form-group>
        <b-form-group>
          <b-button class="submitBtn" type="submit" variant="info" :disabled="submitDisabled">Sign In</b-button>
          <b-button class="resetBtn" type="reset">Reset</b-button>
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
    $("#formCon").get(0).style.minHeight=window.innerHeight-40+"px"
    if(this.$cookies.get('loginStatus')==='remember'){
      this.$cookies.get('email')?this.loginForm.email = this.$cookies.get('email'):this.loginForm.email = ''
      this.$cookies.get('tp')?this.loginForm.password = Base64.decode(this.$cookies.get('tp')):this.loginForm.password = ''
    }else{
      this.$cookies.remove('Authorization')
      this.$cookies.remove('permissionvue')
      this.$cookies.get('email')?this.loginForm.email = this.$cookies.get('email'):this.loginForm.email = ''

    }
  },
  data(){
    return{
      submitDisabled:false,
      loginForm: {
        email:'',
        password:'',
        status:'remember'
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      this.$Loading.start()
      this.submitDisabled = true;
      this.$http.post("/api/login",qs.stringify(this.loginForm)).then(response=>{
        // console.log(response.data)
        if(response.data.success){
          if(this.loginForm.status === 'remember'){
            this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12)
            this.$cookies.set('email',this.loginForm.email,60*60*12)
            this.$cookies.set('tp',Base64.encode(this.loginForm.password),60*60*12)
            this.$cookies.set('loginStatus',this.loginForm.status,60*60*12)
            this.$cookies.set('id',response.data.success.id,60*60*12)
            this.$cookies.set('role',response.data.success.role,60*60*12)
          }else{
            this.$cookies.set('email',this.loginForm.email,60*60*12)
            this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12)
            this.$cookies.set('id',response.data.success.id,60*60*12)
            this.$cookies.set('role',response.data.success.role,60*60*12)
            this.$cookies.remove('tp')
          }
          this.$nextTick(()=>{
            //设置请求头
            this.$http.defaults.headers.common['Authorization'] = this.$cookies.get('Authorization')||'';
          })
          // 1外部用户  23内部用户 4管理员
          if(response.data.success.role==2){
            this.$router.push("/userinfo")
          }else{
            this.$router.push("/dashboard")
          }
        }
        this.submitDisabled = false;
        this.$Loading.done()
      }).catch(error=>{
        // console.log(error)
        this.submitDisabled = false;
        this.$Loading.done()
      })
    },
    onReset (evt) {
      evt.preventDefault();
      this.loginForm.email = '';
      this.loginForm.password = '';
    },
  }
}
</script>
<style lang="less" scoped>
  
  
</style>