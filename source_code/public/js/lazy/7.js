webpackJsonp([7],{"++cO":function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"",""])},YNQ8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"objectionItemMain"}},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/projectlist"}}},[t._v("Project List")]),t._v(" "),r("el-breadcrumb-item",{attrs:{to:{path:"/projectdetail",query:{id:t.$route.query.id}}}},[t._v("Detail")]),t._v(" "),r("el-breadcrumb-item",{attrs:{to:{path:"/objectionlist",query:{id:t.$route.query.id}}}},[t._v("Objection List")]),t._v(" "),r("el-breadcrumb-item",[t._v("View")])],1),t._v(" "),r("div",{attrs:{id:"objectionItemCon"}},[r("div",[r("el-tag",{attrs:{type:"info"}},[t._v("Project Name:"+t._s(t.currentItem.product))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Language:"+t._s(t.currentItem.lang))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Status:"+t._s(t.currentItem.status))]),t._v(" "),r("el-button",{attrs:{type:"success",size:"small",id:"redistributeBtn"},on:{click:function(e){t.openAgreeModal(1)}}},[t._v("Redistribute")]),t._v(" "),r("el-button",{attrs:{type:"danger",size:"small",id:"ignoreBtn"},on:{click:function(e){t.openAgreeModal(2)}}},[t._v("Ignore")])],1),t._v(" "),r("div",[r("el-alert",{attrs:{title:"Objection",description:t.currentItem.objection,type:"warning","show-icon":"",closable:!1}})],1),t._v(" "),r("div",{attrs:{id:"objectionItemBox"}},[r("el-collapse",{attrs:{accordion:""},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[r("el-collapse-item",{attrs:{name:1}},[r("template",{slot:"title"},[t._v("\n            Keywords\n          ")]),t._v(" "),r("div",{staticClass:"source"},[t._v(t._s(Object.keys(JSON.parse(t.currentItem.key)[0])[0]))]),t._v(" "),r("div",{staticClass:"target"},[t._v(t._s(JSON.parse(t.currentItem.key)[0][Object.keys(JSON.parse(t.currentItem.key)[0])[0]]))])],2),t._v(" "),t._l(JSON.parse(t.currentItem.translate),function(e,a){return r("el-collapse-item",{key:a,attrs:{name:a+2}},[r("template",{slot:"title"},[t._v("\n            "+t._s("Content"+(a+1))+"\n          ")]),t._v(" "),r("div",{staticClass:"source"},[t._v(t._s(Object.keys(e)[0]))]),t._v(" "),r("div",{staticClass:"target"},[t._v(t._s(e[Object.keys(e)[0]]))])],2)})],2)],1),t._v(" "),r("el-dialog",{attrs:{title:"Select",width:"35%",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[0===t.agreeFlag?r("span",[t._v("Are you sure to ignore the objection?")]):t._e(),t._v(" "),1===t.agreeFlag?r("el-form",{ref:"distributeForm",staticClass:"demo-ruleForm",attrs:{model:t.distributeForm,rules:t.rules},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",{attrs:{prop:"translate_users_name"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"please select translator."},model:{value:t.distributeForm.translate_users_name,callback:function(e){t.$set(t.distributeForm,"translate_users_name","string"==typeof e?e.trim():e)},expression:"distributeForm.translate_users_name"}},t._l(t.translators,function(t,e){return r("el-option",{key:e,attrs:{label:t.name,value:t.name}})}))],1)],1):t._e(),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("Cancel")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("Submit")])],1)],1)],1)],1)},staticRenderFns:[]}},eLsh:function(t,e,r){var a=r("VU/8")(r("esgC"),r("YNQ8"),!1,function(t){r("z74M")},"data-v-4564abe4",null);t.exports=a.exports},esgC:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;new Promise(function(e,r){t.$http.post("/api/user/list").then(function(r){t.userList=r.data.data,e()})}).then(function(){t.$http.post("/api/approve/list_conflict",qs.stringify({product_id:t.$route.query.id,t_approve_id:t.$route.query.oid})).then(function(e){e.data.data.length>0&&JSON.parse(e.data.data[0].translate_users).forEach(function(e){t.userList.forEach(function(r){if(e===r.id)return t.translators.push(r),!1})}),t.currentItem=e.data.data[0]})})},data:function(){return{activeName:1,currentItem:{key:"[{}]",translate:"[{}]"},dialogVisible:!1,agreeFlag:null,translators:[],distributeForm:{translate_users_name:""},rules:{translate_users_name:[{required:!0,message:"Please select translator."}]}}},methods:{openAgreeModal:function(t){this.dialogVisible=!0,this.agreeFlag=t},submit:function(){var t=this;1===this.agreeFlag&&this.$refs.distributeForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$http.post("/api/approve/approve_conflict",qs.stringify({t_approve_id:t.$route.query.oid,approved:t.agreeFlag,translate_users_name:t.distributeForm.translate_users_name})).then(function(e){setTimeout(function(){t.$router.push("/objectionlist?id="+t.$route.query.id)},500)})}),2===this.agreeFlag&&this.$http.post("/api/approve/approve_conflict",qs.stringify({translate_approve_id:this.$route.query.id,approved:this.agreeFlag,translate_users_name:this.distributeForm.translate_users_name})).then(function(e){setTimeout(function(){t.$router.push("/objectionlist?id="+t.$route.query.id)},500)})}}}},z74M:function(t,e,r){var a=r("++cO");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("30dcf6c0",a,!0,{})}});
//# sourceMappingURL=7.js.map