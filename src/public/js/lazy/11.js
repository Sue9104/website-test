webpackJsonp([11],{Cqyr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;this.searchForm.product_name=this.$route.query.name||"",this.loading=!0,new Promise(function(e,a){t.$http.post("/api/user/list").then(function(a){t.userList=a.data.data,e()})}).then(function(){t.$http.post("/api/translate/list",qs.stringify({product_id:t.$route.query.id||"",status:"Unassigned"})).then(function(e){e.data.data.forEach(function(e){t.$set(e,"translate_users_name","")}),e.data.data.length>0&&JSON.parse(e.data.data[0].translate_users).forEach(function(e){t.userList.forEach(function(a){if(e===a.id)return t.translators.push(a),!1})}),t.allocationListTable=e.data.data,t.total=e.data.total,t.loading=!1})})},data:function(){return{loading:!1,searchForm:{product_name:"",key:"",status:"Unassigned"},searchFlag:!1,userList:[],rules:{},translators:[],allocationListTable:[],total:0,multipleSelection:[],currentPage:1,pageSize:10,dialogVisible:!1,batch_translate_users_name:""}},methods:{onSearch:function(){var t=this;this.loading=!0,this.currentPage=1,""===this.searchForm.product_name&&""===this.searchForm.key&&""===this.searchForm.status?this.searchFlag=!1:this.searchFlag=!0,this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||"",product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(function(e){e.data.data.forEach(function(e){t.$set(e,"translate_users_name","")}),t.allocationListTable=e.data.data,t.total=e.data.total,t.loading=!1})},allAllocation:function(){},visibleSelect:function(t){document.getElementById("selectTranslator"+t.id).style.border="1px solid #DCDFE6"},submit:function(t){var e=this;if(t.translate_users_name){document.getElementById("selectTranslator"+t.id).style.border="1px solid #DCDFE6";var a={};a.translate_in_id=JSON.stringify([t.id]),a.translate_users_name=t.translate_users_name,this.$http.post("/api/translate/assign",qs.stringify(a)).then(function(t){setTimeout(function(){e.$store.state.taskList.Unassigned_nums-=1,e.handleCurrentChange(e.currentPage)},1e3)})}else document.getElementById("selectTranslator"+t.id).style.border="1px solid #f00",this.$notify({title:"Notice",message:"Translator are required.",type:"error"})},selectable:function(t,e){return"Unassigned"===t.status},batchSubmitOpen:function(){if(0===this.multipleSelection.length)return this.$notify({title:"notice",message:"No entries to select for operation.",type:"warning"}),!1;this.dialogVisible=!0},batchSubmit:function(){var t=this,e=[];if($.each(this.multipleSelection,function(t,a){e.push(a.id)}),this.batch_translate_users_name){var a={};a.translate_in_id=JSON.stringify(e),a.translate_users_name=this.batch_translate_users_name,this.$http.post("/api/translate/assign",qs.stringify(a)).then(function(a){setTimeout(function(){t.$store.state.taskList.Unassigned_nums-=e.length,t.batch_translate_users_name="",t.dialogVisible=!1,t.handleCurrentChange(t.currentPage)},1e3)})}else this.$notify({title:"Notice",message:"Translator and priority are required.",type:"error"})},handleSelectionChange:function(t){this.multipleSelection=t},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.handleCurrentChange(this.currentPage)},handleCurrentChange:function(t){var e=this;this.currentPage=t,this.loading=!0,this.searchFlag?this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||"",product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(function(t){t.data.data.forEach(function(t){e.$set(t,"translate_users_name","")}),e.allocationListTable=t.data.data,e.total=t.data.total,e.loading=!1}).catch(function(t){throw t}):this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||"",page:this.currentPage,count:this.pageSize})).then(function(t){t.data.data.forEach(function(t){e.$set(t,"translate_users_name","")}),e.allocationListTable=t.data.data,e.total=t.data.total,e.loading=!1})}}}},MHEw:function(t,e,a){var s=a("VU/8")(a("Cqyr"),a("yhWC"),!1,function(t){a("Moqb")},"data-v-b1898074",null);t.exports=s.exports},Moqb:function(t,e,a){var s=a("jvix");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("7b8b00bc",s,!0,{})},jvix:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"",""])},yhWC:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"missionListMain"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[t._v("Assignment")])],1),t._v(" "),a("div",{staticClass:"addSearch clearfix"},[a("div",{attrs:{id:"searchCon"}},[a("el-form",{ref:"searchForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchForm,rules:t.rules,"label-position":"left",size:"small"}},[a("el-form-item",{attrs:{label:"Project Name:"}},[a("div",{staticClass:"searchInp"},[a("el-input",{attrs:{placeholder:"plese enter project name"},model:{value:t.searchForm.product_name,callback:function(e){t.$set(t.searchForm,"product_name","string"==typeof e?e.trim():e)},expression:"searchForm.product_name"}})],1)]),t._v(" "),a("el-form-item",{attrs:{label:"Keywords:"}},[a("div",{staticClass:"searchInp"},[a("el-input",{attrs:{placeholder:"plese enter keyword"},model:{value:t.searchForm.key,callback:function(e){t.$set(t.searchForm,"key","string"==typeof e?e.trim():e)},expression:"searchForm.key"}})],1)]),t._v(" "),a("el-form-item",{attrs:{label:"Status:"}},[a("el-select",{attrs:{clearable:"",placeholder:"please select status"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status","string"==typeof e?e.trim():e)},expression:"searchForm.status"}},[a("el-option",{attrs:{label:"Unassigned",value:"Unassigned"}}),t._v(" "),a("el-option",{attrs:{label:"Untranslated",value:"Untranslated"}}),t._v(" "),a("el-option",{attrs:{label:"Unreviewed",value:"Unreviewed"}})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:t.onSearch}},[a("i",{staticClass:"el-icon-search"},[t._v("Search")])])],1)],1)],1)]),t._v(" "),a("div",{staticClass:"showTransList"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"allocationTable",staticStyle:{width:"100%"},attrs:{data:t.allocationListTable,stripe:"",border:"","max-height":"560"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"35",align:"center",selectable:t.selectable}}),t._v(" "),a("el-table-column",{attrs:{label:"Source",align:"center",type:"expand",width:"75"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("ol",{staticStyle:{"padding-left":"20px"}},t._l(JSON.parse(e.row.translate),function(e,s){return a("li",{key:s,staticStyle:{margin:"10px 0",padding:"5px 0","border-bottom":"1px dashed #ccc"}},[t._v(t._s(e))])}))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"product",label:"Project Name",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"key",label:"Keywords",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lang",label:"Language",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"Status",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"Translator",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return"Unassigned"===e.row.status?[a("el-select",{attrs:{id:"selectTranslator"+e.row.id,placeholder:"required"},on:{"visible-change":function(a){t.visibleSelect(e.row)}},model:{value:e.row.translate_users_name,callback:function(a){t.$set(e.row,"translate_users_name",a)},expression:"scope.row.translate_users_name"}},t._l(t.translators,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}))]:void 0}}])}),t._v(" "),a("el-table-column",{attrs:{label:"Operation",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["Unassigned"===e.row.status?a("el-button",{attrs:{type:"text",size:"medium",title:"submit"},on:{click:function(a){t.submit(e.row)}}},[t._v("Assign")]):t._e()]}}])})],1),t._v(" "),a("div",{attrs:{id:"batchSelected"}},[t._v("\n      "+t._s(t.multipleSelection.length)+" "+t._s(t.multipleSelection.length>1?"entries":"entry")+" selected\n      "),a("el-button",{staticStyle:{color:"rgb(255, 208, 75)"},attrs:{type:"text"},on:{click:t.batchSubmitOpen}},[t._v("Bulk Allocation")])],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,50,100,200],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}}),t._v(" "),a("el-dialog",{attrs:{title:"Confirm",visible:t.dialogVisible,width:"20%",top:"40vh"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{attrs:{id:"batchModal"}},[a("el-select",{attrs:{center:"",placeholder:"please select translator"},model:{value:t.batch_translate_users_name,callback:function(e){t.batch_translate_users_name=e},expression:"batch_translate_users_name"}},t._l(t.translators,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}))],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("Cancel")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.batchSubmit}},[t._v("OK")])],1)])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=11.js.map