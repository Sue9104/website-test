<template>
  <div id="projectDetailMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/projectlist'}">Overview</el-breadcrumb-item>
      <el-breadcrumb-item>Detail</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="projectDetailCon">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Information" name="info">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Information</span>
              <el-button class="operationBtn" size="large" type="text" @click="openEditProject">Edit</el-button>
              <el-button class="operationBtn" size="large" type="text" style="color:orange" @click="deleteProject">Delete</el-button>
            </div>
            <div class="infoItemCon">
              <div class="infoItem">Project: <span>{{currentProject.product}}</span></div>
              <div class="infoItem">Visibility: <span>{{currentProject.attribute}}</span></div>
              <div class="infoItem">Priority: 
                <span v-if="currentProject.priority=='1'">Low</span>
                <span v-if="currentProject.priority=='2'">Normal</span>
                <span v-if="currentProject.priority=='3'" style="color:red">High</span>
              </div>
              <div class="infoItem">Language: <span>{{currentProject.lang}}</span></div>
              <div class="infoItem">Creator: <span>{{currentProject.users_name}}</span></div>
              <div class="infoItem">Deadline: <span>{{currentProject.deadline&&(currentProject.deadline.split(" ")[1])?currentProject.deadline.split(" ")[0]:currentProject.deadline}}</span></div>
              <div class="infoItem">CreateDate: <span>{{currentProject.created_at&&(currentProject.created_at.split(" ")[1])?currentProject.created_at.split(" ")[0]:currentProject.created_at}}</span></div>
              <div class="infoItem">Description: <span>{{currentProject.product_desc}}</span></div>
            </div>
          </el-card>
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Add Members</span>
              <el-button class="operationBtn" size="large" type="text" v-if="!translatorMembersFlag&&!approverMembersFlag&&!viewerMembersFlag" @click="membersEdit">Edit</el-button>
              <el-button class="operationBtn submitBtn" size="large" type="text" v-if="translatorMembersFlag||approverMembersFlag||viewerMembersFlag" @click="allSubmitMembers">All Submit</el-button>
              <el-button class="operationBtn cancelBtn" size="large" type="text" v-if="translatorMembersFlag||approverMembersFlag||viewerMembersFlag" @click="memberCancel">Cancel</el-button>
            </div>
            <el-form :model="addMembersForm" ref="addMembersForm" label-position="left" label-width="100px">
              <el-form-item prop="translate_users" label="Translator">
                <div class="membersInput">
                  <div><span v-for="(item,index) in currentProject.translatorName" :key="index" style="margin-right:6px;">{{item}}</span></div>
                  <el-select v-model="addMembersForm.translate_users" :disabled="!translatorMembersFlag" placeholder="please select translator" multiple @change="changeUser('t',$event)">
                    <el-option v-for="(item,index) in currentProject.remainingUserList" :key="'Translator'+index" :label="item.name" :value="item.id" v-if="item.status==='t'||item.status===''"></el-option>
                  </el-select>
                  <el-button v-if="translatorMembersFlag" size="medium" type="warning" @click="submitMembers('translator')">Submit</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="approve_users" label="Reviewer">
                <div class="membersInput">
                  <div><span v-for="(item,index) in currentProject.approverName" :key="index" style="margin:6px;">{{item}}</span></div>
                  <el-select v-model="addMembersForm.approve_users" :disabled="!approverMembersFlag" placeholder="please select approver" multiple @change="changeUser('a',$event)">
                    <el-option v-for="(item,index) in currentProject.remainingUserList" :key="'approver'+index" :label="item.name" :value="item.id" v-if="item.status==='a'||item.status===''"></el-option>
                  </el-select>
                  <el-button v-if="approverMembersFlag" size="medium" type="warning" @click="submitMembers('reviewer')">Submit</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="viewed_users" label="Viewer">
                <div class="membersInput">
                  <div><span v-for="(item,index) in currentProject.viewerName" :key="index" style="margin:6px;">{{item}}</span></div>
                  <el-select v-model="addMembersForm.viewed_users" :disabled="(currentProject.attribute==='public')||!viewerMembersFlag" placeholder="please select viewer" multiple @change="changeUser('v',$event)">
                    <el-option v-for="(item,index) in currentProject.remainingUserList" :key="'Viewer'+index" :label="item.name" :value="item.id" v-if="item.status==='v'||item.status===''"></el-option>
                  </el-select>
                  <el-button v-if="(currentProject.attribute==='private')&&viewerMembersFlag" size="medium" type="warning" @click="submitMembers('viewer')">Submit</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Schedule" name="schedule">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Project Schedule</span>
              <el-button class="operationBtn" size="large" type="text" @click="viewAllocationList">Assignment</el-button>
              <el-button class="operationBtn" size="large" type="text" @click="viewObjectionList">Feedback</el-button>
            </div>
            <div class="statisticsCon">
              <span style="margin-right:10px;">Total number of entries: {{statisticInfo.total_nums}}</span>
              <div>
                <span>Assignment:</span>
                <el-progress :stroke-width="4" :percentage="statisticInfo.allocationPercentage"></el-progress>
              </div>
              <div>
                <span>Translation:</span>
                <el-progress :stroke-width="4" :percentage="statisticInfo.translationPercentage"></el-progress>
              </div>
              <div>
                <span>Approval:</span>
                <el-progress :stroke-width="4" :percentage="statisticInfo.approvalPercentage"></el-progress>
              </div>
            </div>
          </el-card>
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Member Schedule</span>
            </div>
            <div class="statisticsCon">
              <div class="progressItem">
                <span>Owner:
                  <div style="margin:6px 20px;">
                    {{currentProject.users_name}}
                    <el-progress :stroke-width="4" :percentage="statisticInfo.allocationPercentage"></el-progress>
                  </div>
                </span>
              </div>
              <div class="progressItem">
                <span>Translators:
                  <div v-for="(item,index) in currentProject.translatorName" :key="index" style="margin:6px 20px;">{{item}}
                    <el-progress :stroke-width="4" :percentage="translatorsStatistics[item]&&(translatorsStatistics[item].Error+translatorsStatistics[item].Qualified+translatorsStatistics[item]['Re-translated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated)?parseInt((translatorsStatistics[item].Error+translatorsStatistics[item].Qualified+translatorsStatistics[item].Unreviewed)*100/(translatorsStatistics[item].Error+translatorsStatistics[item].Qualified+translatorsStatistics[item]['Re-translated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated)):0" v-if='translatorsStatistics[item]'></el-progress>
                    <span v-if='!translatorsStatistics[item]' style="color:#aaa;font-size:12px;margin-left:10px">[ Unassigned task ]</span>
                  </div>
                </span>
              </div>
              <div class="progressItem">
                <span>Reviewers:
                  <div v-for="(item,index) in currentProject.approverName" :key="index" style="margin:6px 20px;">{{item}}
                    <el-progress :stroke-width="4" :percentage="approversStatistics[item]&&(approversStatistics[item].Error+approversStatistics[item].Qualified+approversStatistics[item]['Re-translated']+approversStatistics[item].Unreviewed)?parseInt((approversStatistics[item].Error+approversStatistics[item].Qualified+approversStatistics[item]['Re-translated'])*100/(approversStatistics[item].Error+approversStatistics[item].Qualified+approversStatistics[item]['Re-translated']+approversStatistics[item].Unreviewed)):0"  v-if="JSON.stringify(translatorsStatistics)!='{}'"></el-progress>
                    <span v-if="JSON.stringify(translatorsStatistics)=='{}'" style="color:#aaa;font-size:12px;margin-left:10px">[ Unassigned task ]</span>
                  </div>
                </span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Upload" name="upload">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Upload</span>
            </div>
            <div>
              <el-button type="primary" size="small" @click="downloadFileFormat">Download Template</el-button>
              <el-button type="primary" size="small" @click="openUploadModal">Upload File</el-button>
            </div>
            <div class="recordListCon">Import records:
              <span style="color:#41babc" v-show="importVersionLoading">
                <i class="el-icon-loading"></i> Requesting...
              </span>
              <span style="color:#ccc;" v-if="!importVersionLoading&&importList.length===0">[ No Record ]</span>
              <div style="padding: 6px 30px;font-weight:bold;" v-if="importList.length>0">
                <span style="display:inline-block;width:100px;text-align:center;">Total</span>
                <span style="display:inline-block;width:200px;text-align:center;">Time</span>
              </div>
              <div v-if="importList.length>0" v-for="(item,index) in importList" :key="index" class="versionHistoryItem" title="export this version" @click="downloadImportFile(item)">
                <span style="display:inline-block;width:100px;text-align:center;">{{item.nums}}</span>
                <span style="display:inline-block;width:200px;text-align:center;">{{item.updated_at}}</span>
              </div>
              <el-pagination v-if="importList.length>0" :total="importTotal" @current-change="importCurrentChange" layout="prev, pager, next"></el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Release" name="export">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Version Control</span>
            </div>
            <div>
              <el-button size="small" type="primary" @click="openExportVersionModal">Release New Version</el-button>
            </div>
            <div class="recordListCon">Export records:
              <span style="color:#41babc" v-show="exportVersionLoading">
                <i class="el-icon-loading"></i> Requesting...
              </span>
              <span style="color:#ccc;" v-if="!exportVersionLoading&&!versionList[0].version_name">[ No Record ]</span>
              <div style="padding: 6px 30px;font-weight:bold;" v-if="versionList[0].version_name">
                <span style="display:inline-block;width:100px;text-align:center;">Name</span>
                <span style="display:inline-block;width:200px;text-align:center;">Time</span>
              </div>
              <div v-if="versionList[0].version_name" v-for="(item,index) in versionList" :key="index" class="versionHistoryItem" title="click to export the version" @click="exportHistoryVersion(item.version_name)">
                <span style="display:inline-block;width:100px;text-align:center;">{{item.version_name}}</span>
                <span style="display:inline-block;width:200px;text-align:center;">{{item.version_created_at}}</span>
              </div>
              <el-pagination v-if="versionList[0].version_name" :total="versionsTotal" @current-change="versionCurrentChange" layout="prev, pager, next"></el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="Operation" :visible.sync="dialogVisible" width="30%">
        <span>Version ID: </span>
        <!--<el-input-number size="small" v-model="newVersionID" :step="0.1" :precision="1" :min="currentProject.version_name?Number(this.currentProject.version_name.substr(1))+0.1:0.1" :max="currentProject.version_name?Math.floor(Number(this.currentProject.version_name.substr(1))+1):1.0"></el-input-number>-->
        <el-input-number size="small" v-model="newVersionID" :step="0.1" :precision="1" :min="currentProject.version_name?(Number(this.currentProject.version_name.substr(1))*10+1)/10:0.1" :max="currentProject.version_name?Math.floor(Number(this.currentProject.version_name.substr(1))+1.0):1.0"></el-input-number>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="exportQualified">Export</el-button>
        </span>
      </el-dialog>
      <el-dialog title="Upload File" :visible.sync="dialogUploadVisible" @close="closeUploadModal" :close-on-click-modal="false" :close-on-press-escape="false">
        <input type="file" id="translateUpload" style="display:none" accept=".csv" @change="changeImportFile" />
        <el-button size="small" type="primary" @click="procductImport">Select File</el-button>
        <div style="font-size:14px;margin:8px 0;">File Name：
          <span style="font-weight:bold;">{{uploadFile.name?uploadFile.name:''}}</span>
          <i class="el-icon-loading" v-show="uploadLoadingFlag"></i>
        </div>
        <el-dialog width="40%" title="Upload Result" :visible.sync="resultVisible" @close="closeResultModal" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
          <div style="max-height:500px;overflow:auto;">
            <div v-for="(item, index) in uploadResult.success_nums" style="margin-bottom:20px;">
              <span>success_nums:</span>
              <span style="font-weight:bold;margin-left:5px;">{{item.success_nums}}</span>
            </div>
            <div v-for="(item, index) in uploadResult.error_row" style="margin-bottom:20px;">
              <span>error:</span>
              <span style="font-weight:bold;margin-left:5px;">{{item.error}}</span>
            </div>
            <div v-show="uploadResult.row_key.length>0">
              <div style="margin-bottom:20px;font-wieght:bold;">
                <span style="font-weight:bold;display:inline-block;width:20%;">Rows</span>
                <span style="font-weight:bold;margin-left:5px;">Tip</span>
              </div>
              <div v-for="(item, index) in uploadResult.row_key" style="border-bottom:1px dashed #ccc;margin-bottom:20px;">
                <span style="display:inline-block;width:20%;">{{item.row_key}}:</span>
                <span style="font-weight:bold;margin-left:5px;">{{item.tips}}</span>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer" v-if="uploadResult.success_nums[0].success_nums>0">
            <el-button @click="$router.push('/assignment?id='+$route.query.id+'&name='+currentProject.product)">Go to Assign</el-button>
          </span>
        </el-dialog>
      </el-dialog>
      <el-dialog title="Edit" :visible.sync="editDialogVisible" width="40%">
        <el-form :model="editProjectForm" :rules="rules" ref="editProjectForm" class="demo-ruleForm" label-width="90px">
          <el-form-item prop="product" label="Project:">
            <el-input v-model.trim="editProjectForm.product" style="width:100%" placeholder="please enter project name"></el-input>
          </el-form-item>
          <el-form-item prop="attribute" label="Visibility:">
            <el-radio-group v-model="editProjectForm.attribute">
              <el-radio label="public">Public</el-radio>
              <el-radio label="private" disabled>Private</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="priority" label="Priority:">
            <el-select v-model="editProjectForm.priority" style="width:100%" placeholder="please select priority">
              <el-option label="High" :value="3"></el-option>
              <el-option label="Normal" :value="2"></el-option>
              <el-option label="Low" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="lang" label="Language:">
            <el-select v-model="editProjectForm.slang" style="width:49%" placeholder="source language">
              <el-option v-for="item in langList" :key="item.code" :label="item.code" :value="item.code">
                <span style="float: left">{{ item.code }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.language }}</span>
              </el-option>
              <el-pagination small layout="prev, pager, next" :current-page="langCurrentPage" @current-change="handleCurrentPage" :page-size="langPageSize" :total="langTotal"></el-pagination>
            </el-select>
            <el-select v-model="editProjectForm.tlang" style="width:49%" placeholder="target language">
              <el-option v-for="item in langList" :key="item.code" :label="item.code" :value="item.code">
                <span style="float: left">{{ item.code }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.language }}</span>
              </el-option>
              <el-pagination small layout="prev, pager, next" :current-page="langCurrentPage2" @current-change="handleCurrentPage2" :page-size="langPageSize2" :total="langTotal2"></el-pagination>
            </el-select>
          </el-form-item>
          <el-form-item prop="deadline" label="Deadline:">
            <el-date-picker v-model.trim="editProjectForm.deadline" type="date" style="width:100%" :default-value="new Date()" value-format="yyyy-MM-dd" :picker-options="pickerOptions" placeholder="please select deadline"></el-date-picker>
          </el-form-item>
          <el-form-item prop="product_desc" label="Description:">
            <el-input type="textarea" v-model.trim="editProjectForm.product_desc" style="width:100%" placeholder="please enter description of product"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitProject('editProjectForm')">Submit</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    switch (this.$route.query.pane){
      case 'info':
        this.activeName = 'info'
      break;
      case 'schedule':
        this.activeName = 'schedule'
      break;
      case 'upload':
        this.activeName = 'upload'
      break;
      case 'export':
        this.activeName = 'export'
      break;
    }
    new Promise((resolve,reject)=>{
      this.$http.post("/api/user/list").then(response=>{
        // console.log(response.data);
        this.userList = response.data.data;
        resolve('success')
      }).catch(err=>{
        reject('Request failed!')
      })
    }).then(data=>{
      this.projectDetail()
    },error=>{
      // 这里的error是上面reject()里的值
      console.log(error);
    })
    this.$http.post("/api/Statistic/ProductAccount",qs.stringify({product_id:this.$route.query.id})).then(response=>{
      // console.log(response.data.data;
      response.data.result.allocationPercentage = response.data.result.total_nums?parseInt(((response.data.result.total_nums-response.data.result.Unassigned)/response.data.result.total_nums)*1000)/10:0
      // response.data.result.translationPercentage = response.data.result.total_nums-response.data.result.Unassigned>0?parseInt(((response.data.result.total_nums-response.data.result.Unassigned-response.data.result.Untranslated-response.data.result['Re-translated'])/(response.data.result.total_nums-response.data.result.Unassigned))*1000)/10:0
      // response.data.result.approvalPercentage = response.data.result.Qualified+response.data.result.Unreviewed?parseInt((response.data.result.Qualified/(response.data.result.Qualified+response.data.result.Unreviewed))*1000)/10:0
      response.data.result.translationPercentage = response.data.result.total_nums?parseInt(((response.data.result.Qualified+response.data.result.Unreviewed)/response.data.result.total_nums)*1000)/10:0
      response.data.result.approvalPercentage = response.data.result.total_nums?parseInt((response.data.result.Qualified/response.data.result.total_nums)*1000)/10:0
      this.statisticInfo = response.data.result

    })
    this.$http.post('/api/Statistic/Accout_task_p',qs.stringify({product_id:this.$route.query.id})).then(response=>{
      this.translatorsStatistics = response.data.result['static_t']
      for(let k in response.data.result['static_a']){
        if(k!=='Unreviewed'){
          this.approversStatistics[k] = response.data.result['static_a'][k]
          this.approversStatistics[k].Unreviewed = response.data.result['static_a'].Unreviewed?response.data.result['static_a'].Unreviewed:0
        }
      }
      // console.log(this.approversStatistics)
    })
    this.$http.post("/api/Import/import_list",qs.stringify({product_id:this.$route.query.id})).then(response=>{
      // console.log(response.data.data)
      this.importList = response.data.data
      this.importVersionLoading = false;
    })
    
  },
  data() {
    const validateLang = (rule,value,callback)=>{
      // console.log(this)
      if(this.editProjectForm.slang===''){
        callback(new Error("Please select source language."));
      }else if(this.editProjectForm.tlang===''){
        callback(new Error("Please select target language."));
      }else if(this.editProjectForm.slang===this.editProjectForm.tlang){
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
      editDialogVisible:false,
      langList:[],
      langCurrentPage:1,
      langPageSize:30,
      langTotal:0,
      langCurrentPage2:1,
      langPageSize2:30,
      langTotal2:0,
      editProjectForm:{
        product:'',
        attribute:'',
        priority:'',
        deadline:'',
        lang:'',
        slang:'',
        tlang:'',
        product_desc:''
      },
      activeName: 'info',
      statisticsFlag:false,
      translatorsStatistics:{},
      approversStatistics:{},
      importVersionLoading:true,
      importList:[],
      importTotal:0,
      exportVersionLoading:true,
      versionList:[{version_name:''}],
      versionsTotal:0,
      currentProject:{},
      userList:[],
      // remainingUserList:[],
      statisticInfo:{
        allocationPercentage:0,
        translationPercentage:0,
        approvalPercentage:0
      },

      // translatorList:[],
      // approverList:[],
      // viewerList:[],
      translatorMembersFlag:false,
      approverMembersFlag:false,
      viewerMembersFlag:false,
      addMembersForm: {
        translate_users:[],
        approve_users:[],
        viewed_users:[]
      },
      dialogVisible:false,
      newVersionID:1.0,
      dialogUploadVisible:false,
      resultVisible: false,
      uploadLoadingFlag:false,
      uploadResult:{
        success_nums:[{success_nums:0}],
        error_row:[],
        row_key:[]
      },
      uploadProjectId:null,
      uploadFile:{},
      rules: {
        product: [
          {
            required: true,
            message: 'Please enter product.'
          }
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
        ]
      }
    }
  },
  watch:{
    'editProjectForm.slang':{
      handler(val,oldVal){
        this.editProjectForm.lang = this.editProjectForm.slang+' -> '+this.editProjectForm.tlang
      },
      deep:true
    },
    'editProjectForm.tlang':{
      handler(val,oldVal){
        this.editProjectForm.lang = this.editProjectForm.slang+' -> '+this.editProjectForm.tlang
      },
      deep:true
    },
    'translatorsStatistics':{
      handler(val){
        
      },
      deep:true
    },
    'approversStatistics':{
      handler(val){
        
      },
      deep:true
    },
    'addMembersForm.translate_users':{
      handler(val,oldVal){
        // console.log(val,oldVal);
        //增加
        if(val.length>oldVal.length){
          this.currentProject.remainingUserList.forEach(item=>{
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
          this.currentProject.remainingUserList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }
      },
      deep:true
    },
    'addMembersForm.approve_users':{
      handler(val,oldVal){
        // console.log(val);
        //增加
        if(val.length>oldVal.length){
          this.currentProject.remainingUserList.forEach(item=>{
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
          this.currentProject.remainingUserList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }

      },
      deep:true
    },
    'addMembersForm.viewed_users':{
      handler(val,oldVal){
        // console.log(val);
        //增加
        if(val.length>oldVal.length){
          this.currentProject.remainingUserList.forEach(item=>{
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
          this.currentProject.remainingUserList.forEach(item=>{
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
    projectDetail(){
      this.$http.post("/api/product/details",qs.stringify({product_id:this.$route.query.id})).then(response=>{
        // console.log(response.data.data;
        response.data.data.forEach(item=>{
          this.$set(item,'translatorName',[])
          this.$set(item,'approverName',[])
          this.$set(item,'viewerName',[])
          this.$set(item,'remainingUserList',[])
          // console.log(object);
          JSON.parse(item.translate_users).forEach(item1=>{
            this.userList.forEach(item2=>{
              item1===item2.id?item.translatorName.push(item2.name):null
            })
          })
          JSON.parse(item.approve_users).forEach(item11=>{
            this.userList.forEach(item22=>{
              item11===item22.id?item.approverName.push(item22.name):null
            })
          })
          if(!item.viewed_users){
            item.viewed_users='[]'
          }
          JSON.parse(item.viewed_users).forEach(item111=>{
            this.userList.forEach(item222=>{
              item111===item222.id?item.viewerName.push(item222.name):null
            })
          })

          this.userList.forEach(item00=>{
            
              // console.log(item00)
            let flag = false
            JSON.parse(item.translate_users).forEach(item11=>{
              // console.log(item11)
              item00.id === item11?flag = true:null
            })
            JSON.parse(item.approve_users).forEach(item11=>{
              item00.id === item11?flag = true:null
            })
            JSON.parse(item.viewed_users).forEach(item11=>{
              item00.id === item11?flag = true:null
            })
            if(!flag){
              item00.status = ''
              item.remainingUserList.push(item00)
            }
            // console.log(item.remainingUserList)
          })
        })

        this.versionList = response.data.data
        this.versionsTotal = response.data.total
        this.currentProject = response.data.data[0]
        this.exportVersionLoading = false
      })
    },
    handleClick(tab, event) {
      // console.log(tab.name);
      this.$router.push({path:'/projectdetail',query:{id:this.$route.query.id,pane:tab.name}})
    },
    deleteProject(){
      this.$confirm('Confirm to delete the project?', 'Confirm', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post("/api/product/delete_p",qs.stringify({
          id:this.$route.query.id,
        })).then(response=>{
          if(response.data.success){
            this.$router.push('/projectlist')
          }else{
            this.$message('Failed to delete!')
          }
        })
      }).catch(() => {
        
      })
    },
    openEditProject(){
      this.editDialogVisible=true
      this.editProjectForm.product = this.currentProject.product
      this.editProjectForm.attribute = this.currentProject.attribute
      this.editProjectForm.priority = this.currentProject.priority
      this.editProjectForm.deadline = this.currentProject.deadline
      this.editProjectForm.product_desc = this.currentProject.product_desc
      this.editProjectForm.slang = this.currentProject.lang.split(' -> ')[0]
      this.editProjectForm.tlang = this.currentProject.lang.split(' -> ')[1]
      this.$http.post("/api/product/lang_list",qs.stringify({count:30})).then(response=>{
        this.langList = response.data.data
        this.langTotal = response.data.total
        this.langTotal2 = response.data.total
      })
    },
    handleCurrentPage(val){
      // console.log(val)
      this.langCurrentPage = val
      this.$http.post("/api/product/lang_list",qs.stringify({page:val,count:this.langPageSize})).then(response=>{
        this.langList = response.data.data
        this.langTotal = response.data.total
      })
    },
    handleCurrentPage2(val){
      // console.log(val)
      this.langCurrentPage2 = val
      this.$http.post("/api/product/lang_list",qs.stringify({page:val,count:this.langPageSize2})).then(response=>{
        this.langList = response.data.data
        this.langTotal2 = response.data.total
      })
    },
    submitProject(formName){
      this.$refs[formName].validate(valid => {
        // console.log(this.editProjectForm);
        if (valid) {
          let obj = {
            id:this.$route.query.id,
            product:this.editProjectForm.product,
            attribute:this.editProjectForm.attribute,
            priority:this.editProjectForm.priority,
            deadline:this.editProjectForm.deadline,
            product_desc:this.editProjectForm.product_desc,
            lang:this.editProjectForm.slang+' -> '+this.editProjectForm.tlang,
          }
          // console.log(obj);
          this.$http.post("/api/product/edit_product",qs.stringify(obj)).then(response=>{
            if(response.data.success){
              this.editDialogVisible=false
              this.projectDetail()
            }
          })
        }
      })
    },
    membersEdit(){
      this.translatorMembersFlag=true
      this.approverMembersFlag=true
      this.viewerMembersFlag=true
    },
    memberCancel(){
      this.translatorMembersFlag=false
      this.approverMembersFlag=false
      this.viewerMembersFlag=false
    },
    allSubmitMembers(){
      let arr = []
      let obj={}
      obj.id = this.$route.query.id
      if(this.addMembersForm.translate_users.length!==0){
        obj.users = JSON.stringify(this.addMembersForm.translate_users)
        obj.role = 'translator'
        arr.push(obj)
      }
      let obj1={}
      obj1.id = this.$route.query.id
      if(this.addMembersForm.approve_users.length!==0){
        obj1.users = JSON.stringify(this.addMembersForm.approve_users)
        obj1.role = 'reviewer'
        arr.push(obj1)
      }
      let obj2={}
      obj2.id = this.$route.query.id
      if(this.addMembersForm.viewed_users.length!==0){
        obj2.users = JSON.stringify(this.addMembersForm.viewed_users)
        obj2.role = 'viewer'
        arr.push(obj2)
      }
      if(arr.length===0){
        this.translatorMembersFlag=false
        this.approverMembersFlag=false
        this.viewerMembersFlag=false
      }else{
        arr.forEach((item,index)=>{
          this.$http.post('/api/product/add_t_ap',qs.stringify({id:this.$route.query.id,users:item.users,role:item.role})).then(response=>{
            // if(response.data.success){
            //   this.translatorMembersFlag=false
            //   this.approverMembersFlag=false
            //   this.viewerMembersFlag=false
            //   this.addMembersForm.translate_users=[]
            //   this.addMembersForm.approve_users=[]
            //   this.addMembersForm.viewed_users=[]
            //   this.projectDetail()
            // }
            if(response.data.success){
              switch (item.role){
                case 'translator':
                  this.translatorMembersFlag=false
                  this.addMembersForm.translate_users=[]
                break;
                case 'reviewer':
                  this.approverMembersFlag=false
                  this.addMembersForm.approve_users=[]
                break;
                case 'viewer':
                  this.viewerMembersFlag=false
                  this.addMembersForm.viewed_users=[]
                break;
              }
            if(index===arr.length-1){
              this.projectDetail()
            }
          }
          })
        })
      }
    },
    submitMembers(role){
      let obj={}
      obj.id = this.$route.query.id
      switch (role){
        case 'translator':
          if(this.addMembersForm.translate_users.length!==0){
            obj.users = JSON.stringify(this.addMembersForm.translate_users)
            obj.role = role
          }
        break;
        case 'reviewer':
          if(this.addMembersForm.approve_users.length!==0){
            obj.users = JSON.stringify(this.addMembersForm.approve_users)
            obj.role = role
          }
        break;
        case 'viewer':
          if(this.addMembersForm.viewed_users.length!==0){
            obj.users = JSON.stringify(this.addMembersForm.viewed_users)
            obj.role = role
          }
        break;
      }
      if(JSON.parse(obj.users).length!==0){
        this.$http.post('/api/product/add_t_ap',qs.stringify(obj)).then(response=>{
          if(response.data.success){
            switch (role){
              case 'translator':
                this.translatorMembersFlag=false
                this.addMembersForm.translate_users=[]
                this.projectDetail()
              break;
              case 'reviewer':
                this.approverMembersFlag=false
                this.addMembersForm.approve_users=[]
                this.projectDetail()
              break;
              case 'viewer':
                this.viewerMembersFlag=false
                this.addMembersForm.viewed_users=[]
                this.projectDetail()
              break;
            }
          }
        })
      }else{
        switch (role){
          case 'translator':
            this.translatorMembersFlag=false
            this.addMembersForm.translate_users=[]
            this.projectDetail()
          break;
          case 'reviewer':
            this.approverMembersFlag=false
            this.addMembersForm.approve_users=[]
            this.projectDetail()
          break;
          case 'viewer':
            this.viewerMembersFlag=false
            this.addMembersForm.viewed_users=[]
            this.projectDetail()
          break;
        }
        this.$message({
          message: 'No one is selected!',
          type: 'warning'
        });
      }
      
    },
    changeUser(mode,list){
      switch(mode){
        case 't':
          list.forEach(item=>{
            this.currentProject.remainingUserList.forEach(item1=>{
              if(item===item1.id){
                item1.status='t'
              }
            })
          })
        break;
        case 'a':
          list.forEach(item=>{
            this.currentProject.remainingUserList.forEach(item1=>{
              if(item===item1.id){
                item1.status='a'
              }
            })
          })
        break;
        case 'v':
          list.forEach(item=>{
            this.currentProject.remainingUserList.forEach(item1=>{
              if(item===item1.id){
                item1.status='v'
              }
            })
          })
        break;
      }
    },
    downloadImportFile(item){
      this.$confirm('Confirm to download this file?', 'Download', {
        confirmButtonText: 'Download',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post("/api/Import/export_import",qs.stringify({id:item.id})).then(response=>{
          if(response.data.require){
            window.open('','_self').location.href = response.data.require
          }
          if(response.data.error){
            this.$message.warning("Download failed!" + response.data.error)
          }
        })
      })
    },
    openExportVersionModal(){
      if(this.currentProject.version_name){
        this.newVersionID = Number(this.currentProject.version_name.substr(1))+0.1
      }else{
        this.newVersionID = 1.0
      }
      this.dialogVisible = true
    },
    exportQualified(){
      // console.log(Number.isInteger(this.newVersionID)?'V'+this.newVersionID+'.0':'V'+this.newVersionID);
      this.$http.post("/api/export/qualifiedexport",qs.stringify({product_id:this.$route.query.id,version_name:Number.isInteger(this.newVersionID)?'V'+this.newVersionID+'.0':'V'+this.newVersionID})).then(response=>{
        if(response.data.require){
          // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
          // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
          window.open('','_self').location.href = response.data.require
          // this.newVersionID = ((this.newVersionID)*10+1)/10
          this.$http.post("/api/product/details",qs.stringify({product_id:this.$route.query.id})).then(response=>{
            // console.log(response.data.data;
            this.versionList = response.data.data
            this.versionsTotal = response.data.total
            this.currentProject = response.data.data[0]
          })
          this.dialogVisible = false

        }
        if(response.data.error){
          this.$Message.warning("Export failed!" + response.data.error)
        }
      })
    },
    exportHistoryVersion(version_name){
      // console.log(version_name)
      this.$confirm('Confirm to download '+version_name+'?', 'Download', {
        confirmButtonText: 'Download',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post("/api/export/oldversion",qs.stringify({product_id:this.$route.query.id,version_name:version_name})).then(response=>{
          if(response.data.require){
            // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
            // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
            window.open('','_self').location.href = response.data.require
          }
          if(response.data.error){
            this.$message.warning("Export failed!" + response.data.error)
          }
        })
      })
      
    },
    importCurrentChange(val){
      this.$http.post("/api/Import/import_list",qs.stringify({product_id:this.$route.query.id,page:val})).then(response=>{
        // console.log(response.data.data)
        this.importList = response.data.data
        this.importVersionLoading = false;
      })
    },
    versionCurrentChange(val){
      this.$http.post("/api/product/details",qs.stringify({product_id:this.$route.query.id,page:val})).then(response=>{
        // console.log(response.data.data;
        this.versionList = response.data.data
        this.versionsTotal = response.data.total
      })
    },
    downloadFileFormat(){
      this.$http.post("/api/translate/download").then(response=>{
        if(response.data.require){
          // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
          // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
          window.open('','_self').location.href = response.data.require
        }else{
          this.$message.warning("Export failed, please try again later.")
        }
      })
    },
    openUploadModal(){
      this.dialogUploadVisible = true
      this.uploadProjectId = this.$route.query.id
    },
    closeResultModal(){
      this.resultVisible= false
      this.dialogUploadVisible = false
      this.uploadResult={
        success_nums:[{success_nums:0}],
        error_row:[],
        row_key:[]
      }
    },
    closeUploadModal(){
      this.uploadProjectId= null
      this.dialogUploadVisible=false
      $("#translateUpload").val("")
      this.uploadFile={}
    },
    viewAllocationList(){
      this.$router.push({path:'/assignment',query:{id:this.$route.query.id,name:this.currentProject.product}})
    },
    viewObjectionList(){
      this.$router.push({path:'/feedback',query:{id:this.$route.query.id,name:this.currentProject.product}})
    },
    changeImportFile(event){
      // console.log(event.target.files[0]);
      if(/.csv$/.test(event.target.files[0].name)){
        this.uploadFile = event.target.files[0]
        this.uploadLoadingFlag = true
        // console.log(this.uploadFile)
        this.submitUpload()
      }else{
        this.$message.warning("Only files with a suffix of .csv are supported!")
      }
      
    },
    procductImport(){
      $("#translateUpload").trigger("click")
    },
    submitUpload() {
      // this.$refs.upload.submit();
      let formFileData = new FormData(document.getElementById("translateUpload"))
        formFileData.append("translate_import",this.uploadFile);
        formFileData.append("product_id",this.uploadProjectId);
        // console.log(formFileData.get('sample_import'));
        this.$http.post("/api/translate/import",formFileData,{headers: {
          'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
        }}).then(response=>{
          this.uploadLoadingFlag = false
          this.resultVisible = true
          this.uploadResult = response.data.result
          // 刷新导入历史列表
           this.$http.post("/api/Import/import_list",qs.stringify({product_id:this.$route.query.id,page:1})).then(response=>{
            // console.log(response.data.data)
            this.importList = response.data.data
            this.importVersionLoading = false;
          })
        })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
