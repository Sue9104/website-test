webpackJsonp([1],{"/OLT":function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"",""])},MeXu:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"clearfix",attrs:{id:"userMain"}},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",[t._v("User Management")])],1),t._v(" "),e("div",{staticClass:"addSearch clearfix"},[e("div",{attrs:{id:"searchCon"}},[e("el-form",{ref:"searchForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchForm,rules:t.rules,"label-position":"left","label-width":"90px",size:"small"},nativeOn:{submit:function(t){t.preventDefault()}}},[e("el-form-item",{attrs:{label:"Email:",prop:"email"}},[e("el-input",{attrs:{placeholder:"please enter Email"},model:{value:t.searchForm.email,callback:function(a){t.$set(t.searchForm,"email",a)},expression:"searchForm.email"}})],1),t._v(" "),e("el-form-item",[e("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:t.onSearch}},[e("i",{staticClass:"el-icon-search"},[t._v("Search")])]),t._v(" "),e("el-button",{attrs:{type:"primary",id:"addUser"},on:{click:t.addUser}},[e("i",{staticClass:"el-icon-plus"}),t._v(" New User")])],1)],1)],1)]),t._v(" "),e("div",{staticClass:"showUserInfo"},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:t.userListTable,stripe:"",border:""}},[e("el-table-column",{attrs:{prop:"email",label:"Email",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"name",label:"Name",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"status",label:"Status",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-switch",{attrs:{"active-color":"#41babc"},on:{change:function(e){t.changeSwitch(a.row)}},model:{value:a.row.statusSwitch,callback:function(e){t.$set(a.row,"statusSwitch",e)},expression:"scope.row.statusSwitch"}}),t._v(" "),a.row.statusSwitch?e("span",{staticClass:"themeColor"},[t._v("Available")]):t._e(),t._v(" "),a.row.statusSwitch?t._e():e("span",{staticClass:"red"},[t._v("Unavailable")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Password",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{staticStyle:{"font-size":"14px"},attrs:{type:"text",title:"reset password"},on:{click:function(e){t.resetPwd(a.row)}}},[t._v("Reset")])]}}])})],1),t._v(" "),e("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},Ri91:function(t,a,e){var s=e("/OLT");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("1a3c626f",s,!0,{})},gE0F:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={mounted:function(){var t=this;this.loading=!0,this.$http.post("/api/User/list").then(function(a){a.data.data.forEach(function(a){t.$set(a,"statusSwitch","1"==a.status)}),t.userListTable=a.data.data,t.total=a.data.total,t.loading=!1})},data:function(){return{searchForm:{email:""},rules:{},loading:!1,searchFlag:!1,statusSwitch:!0,userListTable:[],total:0,currentPage:1,pageSize:10}},methods:{onSearch:function(){var t=this;this.loading=!0,this.currentPage=1,""===this.searchForm.email?this.searchFlag=!1:this.searchFlag=!0,this.$http.post("/api/User/list",qs.stringify(this.searchForm)).then(function(a){a.data.data.forEach(function(a){t.$set(a,"statusSwitch","1"==a.status)}),t.userListTable=a.data.data,t.total=a.data.total,t.loading=!1})},addUser:function(){this.$router.push({path:"/adduser",query:{email:this.searchForm.email}})},changeSwitch:function(t){var a=this;this.$confirm("Confirm to change status?","Confirm",{confirmButtonText:"Submit",cancelButtonText:"Cancel",type:"warning",center:!0}).then(function(){a.$http.post("/api/User/close_open",qs.stringify({uid:t.id,status:t.statusSwitch?"1":"0"})).then(function(t){t.data.success})}).catch(function(){t.statusSwitch=!t.statusSwitch})},resetPwd:function(t){var a=this;this.$confirm("Confirm to reset password?","Confirm",{confirmButtonText:"Reset",cancelButtonText:"Cancel",type:"warning",center:!0}).then(function(){a.$http.post("/api/User/ChangeUserPwd",qs.stringify({uid:t.id,newpassword:"123456"})).then(function(t){t.data.success&&a.$message({message:"The password was successfully reset to [ 123456 ]!",type:"success"})})})},handleCurrentChange:function(t){var a=this;this.loading=!0,this.currentPage=t,this.searchFlag?this.$http.post("/api/User/list",qs.stringify({email:this.searchForm.email,page:t})).then(function(t){t.data.data.forEach(function(t){a.$set(t,"statusSwitch","1"==t.status)}),a.userListTable=t.data.data,a.total=t.data.total,a.loading=!1}):this.$http.post("/api/User/list",qs.stringify({page:t})).then(function(t){t.data.data.forEach(function(t){a.$set(t,"statusSwitch","1"==t.status)}),a.userListTable=t.data.data,a.total=t.data.total,a.loading=!1})}}}},y8dX:function(t,a,e){var s=e("VU/8")(e("gE0F"),e("MeXu"),!1,function(t){e("Ri91")},"data-v-e324955e",null);t.exports=s.exports}});
//# sourceMappingURL=1.js.map