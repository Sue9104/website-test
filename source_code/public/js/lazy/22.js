webpackJsonp([22],{"/2JW":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"register"}},[r("div",{attrs:{id:"formCon"}},[r("b-form",{attrs:{id:"registerForm",method:"post",novalidate:!0},on:{submit:e.onSubmit}},[r("b-form-group",[r("b-link",{attrs:{href:"#/health"}},[r("img",{attrs:{src:"/images/logo.png",height:"50",width:"180",alt:"Singlera Genomics Logo"}})]),e._v(" "),r("div",{staticClass:"modeTitle"},[e._v("Sign Up")])],1),e._v(" "),r("b-form-group",{attrs:{label:"E-mail:","label-for":"emailRegister"}},[r("b-form-input",{attrs:{id:"emailRegister",type:"email",state:e.emailState,required:"",placeholder:"please enter E-mail"},model:{value:e.registerForm.email,callback:function(t){e.$set(e.registerForm,"email","string"==typeof t?t.trim():t)},expression:"registerForm.email"}})],1),e._v(" "),r("b-form-group",{attrs:{label:"Employee Name:","label-for":"nameRegister"}},[r("b-form-input",{attrs:{id:"nameRegister",state:e.nameState,required:"",placeholder:"please enter employee name"},model:{value:e.registerForm.name,callback:function(t){e.$set(e.registerForm,"name","string"==typeof t?t.trim():t)},expression:"registerForm.name"}})],1),e._v(" "),r("b-form-group",{attrs:{label:"Password:","label-for":"pwdRegister"}},[r("b-form-input",{attrs:{id:"pwdRegister",type:"password",state:e.pwdState,required:"",placeholder:"please enter password"},model:{value:e.registerForm.password,callback:function(t){e.$set(e.registerForm,"password","string"==typeof t?t.trim():t)},expression:"registerForm.password"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"pwdRegisterFeedback"}},[e._v("\n          Password length cannot be less than 6.\n        ")])],1),e._v(" "),r("b-form-group",{attrs:{label:"Repeat the password:","label-for":"c_pwdRegister"}},[r("b-form-input",{attrs:{type:"password",id:"c_pwdRegister",state:e.c_passwordState,required:"",placeholder:"Please enter your password again"},model:{value:e.registerForm.c_password,callback:function(t){e.$set(e.registerForm,"c_password","string"==typeof t?t.trim():t)},expression:"registerForm.c_password"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"c_pwdRegisterFeedback"}},[e._v("\n          Inconsistent password entered twice.\n        ")])],1),e._v(" "),r("b-form-group",[r("b-form-checkbox",{staticClass:"rememberStatus",attrs:{plain:"",id:"agreeCheckbox",value:"accepted","unchecked-value":"not_accepted"},model:{value:e.registerForm.agree,callback:function(t){e.$set(e.registerForm,"agree","string"==typeof t?t.trim():t)},expression:"registerForm.agree"}},[e._v("\n          I agree\n          "),r("b-link",{attrs:{href:"#"}},[e._v("User Agreement")])],1),e._v(" "),r("div",{staticClass:"formLink"},[e._v("\n          Registered account?"),r("b-link",{attrs:{href:"#/login"}},[e._v("Sign In")])],1)],1),e._v(" "),r("b-form-group",[r("b-alert",{attrs:{variant:"danger",dismissible:"",show:e.showAlert},on:{dismissed:function(t){e.showAlert=!1}}},[e._v("\n        "+e._s(e.alertTitle)+"\n      ")]),e._v(" "),r("b-button",{staticClass:"registerBtn",attrs:{type:"submit",variant:"info",disabled:e.registerDisabled}},[e._v("Sign Up")])],1)],1)],1),e._v(" "),e._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("footer",[t("div",{staticClass:"sectionCenter"},[this._v("Copyright 2019")])])}]}},K56u:function(e,t,r){var s=r("OQug");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);r("rjj0")("1225b0ba",s,!0,{})},OQug:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"",""])},Ox3G:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={mounted:function(){$("#formCon").get(0).style.minHeight=window.innerHeight-100+"px",this.currentMode=this.mode},data:function(){return{showAlert:!1,alertTitle:"",registerForm:{name:"",email:"",password:"",c_password:"",agree:""}}},computed:{registerDisabled:function(){return!(this.registerForm.name&&this.registerForm.email&&this.registerForm.password&&this.pwdState&&this.registerForm.c_password&&this.c_passwordState&&"accepted"==this.registerForm.agree&&this.c_passwordState)},emailState:function(){return!!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.registerForm.email)},nameState:function(){return!!/^[A-Za-z]{2,20}$|^[\u4e00-\u9fa5]{2,20}$/.test(this.registerForm.name)},pwdState:function(){return!(this.registerForm.password.length<6)},c_passwordState:function(){return this.registerForm.c_password===this.registerForm.password}},watch:{"registerForm.agree":{handler:function(e,t){"not_accepted"===e?(this.alertTitle="Please read and select the user agreement before clicking on the registration.",this.showAlert=!0):this.showAlert=!1},deep:!0}},methods:{onSubmit:function(e){var t=this;return e.preventDefault(),this.registerForm.password!==this.registerForm.c_password?(this.showAlert=!0,this.alertTitle="Inconsistent password entered twice.",!1):"not_accepted"===this.registerForm.agree?(this.showAlert=!0,this.alertTitle="Please read and select the user agreement before clicking on the registration.",!1):void this.$http.post("/api/register",qs.stringify(this.registerForm)).then(function(e){e.data.success.token?(t.$cookies.set("Authorization","Bearer "+e.data.success.token,43200),t.$cookies.set("email",t.registerForm.email,43200),t.$cookies.set("pwd",t.registerForm.password,43200),t.$router.push("/dashboard")):(t.showAlert=!0,t.alertTitle="Registration failed, please try again later."),t.$nextTick(function(){t.$http.defaults.headers.common.Authorization=t.$cookies.get("Authorization")||""})})}}}},tef1:function(e,t,r){var s=r("VU/8")(r("Ox3G"),r("/2JW"),!1,function(e){r("K56u")},"data-v-1213f0b8",null);e.exports=s.exports}});
//# sourceMappingURL=22.js.map