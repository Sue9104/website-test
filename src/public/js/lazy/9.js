webpackJsonp([9],{"1P/U":function(t,e,r){var a=r("VU/8")(r("POl/"),r("Jl/P"),!1,function(t){r("ouNs")},"data-v-619df039",null);t.exports=a.exports},"68E2":function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"",""])},"Jl/P":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"historyListMain"}},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},["/v_history"!==t.$route.path?r("el-breadcrumb-item",[t._v("History")]):r("el-breadcrumb-item",[t._v("Issues")])],1),t._v(" "),r("div",{staticClass:"addSearch clearfix"},[r("div",{attrs:{id:"searchCon"}},[r("el-form",{ref:"searchForm_raw",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchForm_raw,rules:t.rules,"label-position":"left","label-width":"120px",size:"small"}},[r("el-form-item",{attrs:{label:"Project Name:"}},[r("el-input",{attrs:{placeholder:"enter project name"},model:{value:t.searchForm_raw.product_name,callback:function(e){t.$set(t.searchForm_raw,"product_name",e)},expression:"searchForm_raw.product_name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Keyword:"}},[r("el-input",{attrs:{placeholder:"enter keyword"},model:{value:t.searchForm_raw.key,callback:function(e){t.$set(t.searchForm_raw,"key",e)},expression:"searchForm_raw.key"}})],1),t._v(" "),r("el-form-item",{key:"ta_statusSearch",attrs:{label:"Status:"}},[r("el-select",{attrs:{clearable:"",placeholder:"select status"},model:{value:t.searchForm_raw.status,callback:function(e){t.$set(t.searchForm_raw,"status",e)},expression:"searchForm_raw.status"}},[r("el-option",{attrs:{label:"All",value:""}}),t._v(" "),"/t_history"===t.$route.path?r("el-option",{attrs:{label:"Unreviewed",value:"Unreviewed"}}):t._e(),t._v(" "),"/t_history"===t.$route.path?r("el-option",{attrs:{label:"Passed",value:"Qualified"}}):t._e(),t._v(" "),"/t_history"===t.$route.path?r("el-option",{attrs:{label:"Failed",value:"Unretranslated"}}):t._e(),t._v(" "),"/a_history"===t.$route.path?r("el-option",{attrs:{label:"Passed",value:"Qualified"}}):t._e(),t._v(" "),"/a_history"===t.$route.path?r("el-option",{attrs:{label:"Failed",value:"Unretranslated"}}):t._e(),t._v(" "),"/t_history"===t.$route.path||"/a_history"===t.$route.path?r("el-option",{attrs:{label:"Error",value:"Error"}}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-option",{attrs:{label:"Unresolved",value:"0"}}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-option",{attrs:{label:"Agreed",value:"1"}}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-option",{attrs:{label:"Ignored",value:"2"}}):t._e()],1)],1),t._v(" "),r("el-form-item",[r("el-button",{staticClass:"searchBtn",attrs:{type:"primary"},on:{click:t.onSearch}},[r("i",{staticClass:"el-icon-search"},[t._v("Search")])])],1)],1)],1)]),t._v(" "),r("div",{staticClass:"showHistoryList"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"historyListTable",staticStyle:{width:"100%"},attrs:{data:t.historyListTable},on:{"row-dblclick":t.rowDblClick,"sort-change":t.sortChange}},["/v_history"===t.$route.path?r("el-table-column",{key:"o_historySource",attrs:{label:"Issues",align:"center",type:"expand",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",[t._v(t._s(e.row.objection))])]}}])}):t._e(),t._v(" "),"/t_history"===t.$route.path||"/a_history"===t.$route.path?r("el-table-column",{key:"ta_histiorySource",attrs:{label:"Source",align:"center",type:"expand",width:"75"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("ol",{staticStyle:{"padding-left":"20px"}},t._l(JSON.parse(e.row.translate),function(e,a){return r("li",{key:a,staticStyle:{margin:"10px 0",padding:"5px 0","border-bottom":"1px dashed #ccc"}},[t._v(t._s(Object.keys(e)[0]))])}))]}}])}):t._e(),t._v(" "),r("el-table-column",{attrs:{prop:"product",label:"Project Name",align:"center",sortable:"custom"}}),t._v(" "),r("el-table-column",{attrs:{prop:"key",label:"Keyword",align:"center",sortable:"custom","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",[t._v(t._s(Object.keys(JSON.parse(e.row.key)[0])[0]))])]}}])}),t._v(" "),"/t_history"===t.$route.path||"/a_history"===t.$route.path?r("el-table-column",{key:"ta_historyStatus",attrs:{prop:"status",label:"Status",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return["Qualified"===e.row.status?r("div",[t._v("Passed")]):"Unretranslated"===e.row.status?r("div",[t._v("Failed")]):r("div",[t._v(t._s(e.row.status))])]}}])}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-table-column",{key:"v_historyStatus",attrs:{label:"Status",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[2===e.row.approved?r("div",[t._v("Ignored")]):1===e.row.approved?r("div",[t._v("Agreed")]):0===e.row.approved?r("div",{staticStyle:{color:"#E6A23C"}},[t._v("Unresolved")]):t._e()]}}])}):t._e(),t._v(" "),"/t_history"===t.$route.path?r("el-table-column",{key:"t_historyCreate_at",attrs:{prop:"created_at",label:"Translation Time",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{attrs:{title:e.row.created_at}},[t._v(t._s(e.row.created_at))])]}}])}):t._e(),t._v(" "),"/a_history"===t.$route.path?r("el-table-column",{key:"a_historyUpdated_at",attrs:{prop:"updated_at",label:"Review Time",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{attrs:{title:e.row.updated_at}},[t._v(t._s(e.row.updated_at))])]}}])}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-table-column",{key:"v_historyCreate_at",attrs:{prop:"created_at",label:"Creation Time",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{attrs:{title:e.row.created_at}},[t._v(t._s(e.row.created_at))])]}}])}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-table-column",{key:"v_historyAdvice_updated_at",attrs:{prop:"advice_updated_at",label:"Reply Time",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[0!==e.row.approved?r("div",{attrs:{title:0!==e.row.approved?e.row.advice_updated_at:""}},[t._v(t._s(e.row.advice_updated_at))]):t._e()]}}])}):t._e(),t._v(" "),"/v_history"!==t.$route.path?r("el-table-column",{attrs:{label:"Translation",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text",size:"medium",title:"View"},on:{click:function(r){t.transItem(e.row)}}},[t._v("View")])]}}])}):t._e(),t._v(" "),"/v_history"===t.$route.path?r("el-table-column",{attrs:{label:"Operation",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text",size:"medium",title:"View"},on:{click:function(r){t.transItem(e.row)}}},[t._v(t._s(0===e.row.approved&&e.row.users_name===t.userName?"Resolve":"View"))])]}}])}):t._e()],1),t._v(" "),r("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,50],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)},staticRenderFns:[]}},"POl/":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;"/t_history"===this.$route.path&&(this.url="/api/translate/history"),"/a_history"===this.$route.path&&(this.url="/api/approve/list"),"/v_history"===this.$route.path&&(this.url="/api/view/list_conflict_all"),this.$http.post(this.url,qs.stringify({product_name:this.$route.query.name,key:this.$route.query.key,status:this.$route.query.status,page:this.$route.query.page,count:this.$route.query.count})).then(function(e){t.historyListTable=e.data.data,t.total=e.data.total})},data:function(){return{url:"",userName:Base64.decode(this.$cookies.get("tname")),searchForm_raw:{product_name:this.$route.query.name||"",key:this.$route.query.key||"",status:this.$route.query.status||""},searchForm:{product_name:this.$route.query.name||"",key:this.$route.query.key||"",status:this.$route.query.status||""},listUrl:"",loading:!1,sort:[],rules:{},historyListTable:[],total:0,currentPage:Number(this.$route.query.page)||1,pageSize:Number(this.$route.query.count)||10}},watch:{"$route.path":{handler:function(t,e){t!==e&&(this.searchForm_raw.product_name="",this.searchForm_raw.key="",this.searchForm_raw.status="",this.searchForm.product_name="",this.searchForm.key="",this.searchForm.status="",this.pageSize=10,"/t_history"===t&&(this.url="/api/translate/history"),"/a_history"===t&&(this.url="/api/approve/list"),"/v_history"===t&&(this.url="/api/view/list_conflict_all"),this.onSearch())},deep:!0}},methods:{onSearch:function(){var t=this;this.$refs.historyListTable.clearSort(),this.sort=[],this.currentPage=1;var e={};this.searchForm.product_name&&(e.name=this.searchForm.product_name),this.searchForm.key&&(e.key=this.searchForm.key),this.searchForm.status&&(e.status=this.searchForm.status),this.currentPage&&(e.page=this.currentPage),this.pageSize&&(e.count=this.pageSize),this.$router.push({path:this.$route.path,query:e}),this.searchForm.product_name=this.searchForm_raw.product_name,this.searchForm.key=this.searchForm_raw.key,this.searchForm.status=this.searchForm_raw.status,this.$http.post(this.url,qs.stringify({product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(function(e){t.historyListTable=e.data.data,t.total=e.data.total})},sortChange:function(t){var e=this,r="";"ascending"===t.order&&(r="ASC"),"descending"===t.order&&(r="DESC"),this.sort[0]=t.prop,this.sort[1]=r,this.currentPage=1,this.$http.post(this.url,qs.stringify(t.prop?{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(function(t){e.historyListTable=t.data.data,e.total=t.data.total})},rowDblClick:function(t,e,r){this.transItem(t)},transItem:function(t){var e="";"/t_history"===this.$route.path&&(e="/t_browhistoryitem"),"/a_history"===this.$route.path&&(e="/a_browhistoryitem"),"/v_history"===this.$route.path&&(e="/v_browhistoryitem");var r={id:t.id};this.searchForm.product_name&&(r.name=this.searchForm.product_name),this.searchForm.key&&(r.key=this.searchForm.key),this.searchForm.status&&(r.status=this.searchForm.status),this.currentPage&&(r.page=this.currentPage),this.pageSize&&(r.count=this.pageSize),this.$router.push({path:e,query:r})},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.handleCurrentChange(this.currentPage)},handleCurrentChange:function(t){var e=this;this.currentPage=t;var r={};this.searchForm.product_name&&(r.name=this.searchForm.product_name),this.searchForm.key&&(r.key=this.searchForm.key),this.searchForm.status&&(r.status=this.searchForm.status),this.pageSize&&(r.count=this.pageSize),t&&(r.page=t),this.$router.push({path:this.$route.path,query:r}),this.$http.post(this.url,qs.stringify(this.sort[0]?{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:t,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:t,count:this.pageSize})).then(function(t){e.historyListTable=t.data.data,e.total=t.data.total})}}}},ouNs:function(t,e,r){var a=r("68E2");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("1e17267c",a,!0,{})}});