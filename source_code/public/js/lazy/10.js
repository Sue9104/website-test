webpackJsonp([10],{"+FZ/":function(t,e,a){var r=a("VU/8")(a("W5vu"),a("aXbs"),!1,function(t){a("jaMl")},"data-v-3e86bc59",null);t.exports=r.exports},W5vu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;this.loading=!0,this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||""})).then(function(e){t.approvalListTable=e.data.data,t.total=e.data.total,t.loading=!1})},data:function(){return{searchForm:{product:"",key:""},loading:!1,searchFlag:!1,rules:{},approvalListTable:[],total:0,currentPage:1,pageSize:10}},methods:{onSearch:function(){var t=this;this.loading=!0,this.currentPage=1,""===this.searchForm.key&&""===this.searchForm.product?this.searchFlag=!1:this.searchFlag=!0,this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id,product:this.searchForm.product,key:this.searchForm.key})).then(function(e){t.approvalListTable=e.data.data,t.total=e.data.total,t.loading=!1})},rowDblClick:function(t,e,a){this.transItem(t)},transItem:function(t){this.$router.push({path:"/viewobjection",query:{id:this.$route.query.id,oid:t.id}})},handleCurrentChange:function(t){var e=this;this.loading=!0,this.currentPage=t,this.searchFlag?this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id,product:this.searchForm.product,key:this.searchForm.key,page:t})).then(function(t){e.approvalListTable=t.data.data,e.total=t.data.total,e.loading=!1}):this.$http.post("/api/approve/list_conflict",qs.stringify({page:t})).then(function(t){e.approvalListTable=t.data.data,e.total=t.data.total,e.loading=!1})}}}},aXbs:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"transListMain"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/projectlist"}}},[t._v("Project List")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/projectdetail",query:{id:t.$route.query.id}}}},[t._v("Detail")]),t._v(" "),a("el-breadcrumb-item",[t._v("Objection List")])],1),t._v(" "),a("div",{staticClass:"addSearch clearfix"},[a("div",{attrs:{id:"searchCon"}},[a("el-form",{ref:"searchForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchForm,rules:t.rules,"label-position":"left",size:"small"},nativeOn:{submit:function(e){return e.preventDefault(),t.onSearch(e)}}},[t.$route.query.id?t._e():a("el-form-item",{attrs:{label:"Project Name:"}},[a("div",{staticClass:"searchInp"},[a("el-input",{attrs:{placeholder:"plese enter project name"},model:{value:t.searchForm.product,callback:function(e){t.$set(t.searchForm,"product","string"==typeof e?e.trim():e)},expression:"searchForm.product"}})],1)]),t._v(" "),a("el-form-item",{attrs:{label:"Keywords:"}},[a("el-input",{attrs:{placeholder:"please enter keywords"},model:{value:t.searchForm.key,callback:function(e){t.$set(t.searchForm,"key","string"==typeof e?e.trim():e)},expression:"searchForm.key"}})],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:t.onSearch}},[a("i",{staticClass:"el-icon-search"},[t._v("Search")])])],1)],1)],1)]),t._v(" "),a("div",{staticClass:"showTransList"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"translationTable",staticStyle:{width:"100%"},attrs:{data:t.approvalListTable,stripe:"",border:""},on:{"row-dblclick":t.rowDblClick}},[a("el-table-column",{attrs:{label:"Source",align:"center",type:"expand",width:"75"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("ol",{staticStyle:{"padding-left":"20px"}},t._l(JSON.parse(e.row.translate),function(e,r){return a("li",{key:r,staticStyle:{margin:"10px 0",padding:"5px 0","border-bottom":"1px dashed #ccc"}},[t._v(t._s(Object.keys(e)[0]))])}))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"product",label:"Project Name",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"key",label:"Keywords",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(Object.keys(JSON.parse(e.row.key)[0])[0]))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"lang",label:"Language",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"Status",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"Operation",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"medium",icon:"el-icon-document",title:"view"},on:{click:function(a){t.transItem(e.row)}}},[t._v("View")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100,150,200],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},jaMl:function(t,e,a){var r=a("xhl3");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("2fca59e6",r,!0,{})},xhl3:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"",""])}});
//# sourceMappingURL=10.js.map