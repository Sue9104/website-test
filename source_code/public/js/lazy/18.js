webpackJsonp([18],{"0H7q":function(t,e,r){var a=r("GNtX");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("3b5fb946",a,!0,{})},"6Hp0":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"approvalItemMain"}},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/approvallist"}}},[t._v("Approval List")]),t._v(" "),r("el-breadcrumb-item",[t._v("Approve")])],1),t._v(" "),r("div",{attrs:{id:"approvalItemCon"}},[r("div",[r("el-tag",{attrs:{type:"info"}},[t._v("Project Name:"+t._s(t.currentItem.product))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Priority:\n        "),"1"==t.currentItem.priority?r("span",[t._v("Low")]):t._e(),t._v(" "),"2"==t.currentItem.priority?r("span",[t._v("Normal")]):t._e(),t._v(" "),"3"==t.currentItem.priority?r("span",{staticStyle:{color:"red"}},[t._v("High")]):t._e()]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Language:"+t._s(t.currentItem.lang))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Creator:"+t._s(t.currentItem.allocate_users_name))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Deadline:"+t._s(t.currentItem.deadline&&t.currentItem.deadline.split(" ")[1]?t.currentItem.deadline.split(" ")[0]:t.currentItem.deadline))]),t._v(" "),"Unreviewed"===t.currentItem.status?r("el-button",{attrs:{type:"success",size:"small",id:"agreeBtn"},on:{click:function(e){t.openAgreeModal(1)}}},[t._v("Agree")]):t._e(),t._v(" "),"Unreviewed"===t.currentItem.status?r("el-button",{attrs:{type:"danger",size:"small",id:"refuseBtn"},on:{click:function(e){t.openAgreeModal(0)}}},[t._v("Refuse")]):t._e()],1),t._v(" "),r("div",{attrs:{id:"approvalItemBox"}},[r("div",[r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText1"}},[t._v(t._s(Object.keys(JSON.parse(t.currentItem.key)[0])[0]))])]),t._v(" "),r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText1"}},[t._v(t._s(JSON.parse(t.currentItem.key)[0][Object.keys(JSON.parse(t.currentItem.key)[0])[0]]))])])],1),t._v(" "),t._l(JSON.parse(t.currentItem.translate),function(e,a){return r("div",{key:a,attrs:{name:a+2}},[r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText"+(a+2)}},[t._v(t._s(Object.keys(e)[0]))])]),t._v(" "),r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText1"}},[t._v(t._s(e[Object.keys(e)[0]]))])])],1)})],2)])],1)},staticRenderFns:[]}},C0qk:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;this.$http.post("/api/approve/list",qs.stringify({status:"Unreviewed",translate_approve_id:this.$route.query.id})).then(function(e){t.currentItem=e.data.data[0]})},data:function(){return{activeName:1,currentItem:{key:"[{}]",translate:"[{}]"},agreeFlag:null,tipsForm:{tips:""},dialogVisible:!1,rules:{tips:[{required:!0,message:"Please enter reason."}]}}},methods:{openAgreeModal:function(t){this.dialogVisible=!0,this.agreeFlag=t},submit:function(){var t=this;0===this.agreeFlag&&this.$refs.tipsForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$http.post("/api/approve/approve",qs.stringify({translate_approve_id:t.$route.query.id,approved:t.agreeFlag,tips:t.tipsForm.tips})).then(function(e){setTimeout(function(){t.$store.state.taskList.Approve_nums-=1,t.$router.push("/approvallist")},500)})}),1===this.agreeFlag&&this.$http.post("/api/approve/approve",qs.stringify({translate_approve_id:this.$route.query.id,approved:this.agreeFlag,tips:this.tipsForm.tips})).then(function(e){setTimeout(function(){t.$store.state.taskList.Approve_nums-=1,t.$router.push("/approvallist")},500)})}}}},GNtX:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"",""])},"S+Ou":function(t,e,r){var a=r("VU/8")(r("C0qk"),r("6Hp0"),!1,function(t){r("0H7q")},"data-v-5faa0dd2",null);t.exports=a.exports}});
//# sourceMappingURL=18.js.map