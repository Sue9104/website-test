<template>
  <el-container>
    <el-header height="80px" id="header">
      <div class="homeLogo">
        <img src="/images/logo.png" alt="Logo" title="Translation System">
        <p>Online Human Translation System</p>
      </div>
      <div class="homeLogin">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{loginEmail}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- <el-badge :value="newTaskSum" :max="99" v-show="newTaskSum>0" style="transform:translate(-33px,-10px)"></el-badge> -->
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item>
              <span size="small" @click="taskVisible=true">My Task</span>
              <el-badge :value="newTaskSum" :max="99" v-show="newTaskSum>0"></el-badge>
            </el-dropdown-item>-->
            <el-dropdown-item>
              <div size="small" @click="myDetail">My Profile</div>
            </el-dropdown-item>
            <el-dropdown-item @click.native="help">Help</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">Exit</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <el-row class="tac">
          <el-menu class="el-menu-vertical-demo" id="asideUl" height="700px" background-color="#41babc" text-color="#fff" active-text-color="#ffd04b" :default-openeds="asidedefaultOpened">
            <el-menu-item index="dashboard" @click="selectMenu('dashboard')" v-if="role=='1'">
              <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-submenu index="projectManagement" v-if="role=='1'">
              <template slot="title">
                <span>Project Management</span>
              </template>
              <el-menu-item index="projectlist" @click="selectMenu('projectlist')">
                <span slot="title" id="projectlist">Overview</span>
              </el-menu-item>
              <el-menu-item index="assignment" @click="selectMenu('assignment')">
                <span slot="title" id="assignment">Assignment</span>
              </el-menu-item>
              <el-menu-item index="feedback" @click="selectMenu('feedback')">
                <span slot="title" id="feedback">Feedback</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="translationManagement" v-if="role=='1'">
              <template slot="title">
                <span>Translation Management</span>
              </template>
              <el-menu-item index="t_overview" @click="selectMenu('t_overview')">
                <span slot="title" id="t_overview">Overview</span>
              </el-menu-item>
              <el-menu-item index="translation" @click="selectMenu('translation')">
                <span slot="title" id="translation">Translation</span>
              </el-menu-item>
              <el-menu-item index="retranslation" @click="selectMenu('retranslation')">
                <span slot="title" id="retranslation">Re-translation</span>
              </el-menu-item>
              <el-menu-item index="t_history" @click="selectMenu('t_history')">
                <span slot="title" id="t_history">History</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="reviewManagement" v-if="role=='1'">
              <template slot="title">
                <span>Review Management</span>
              </template>
              <el-menu-item index="a_overview" @click="selectMenu('a_overview')">
                <span slot="title" id="a_overview">Overview</span>
              </el-menu-item>
              <el-menu-item index="review" @click="selectMenu('review')">
                <span slot="title" id="review">Review</span>
              </el-menu-item>
              <el-menu-item index="a_history" @click="selectMenu('a_history')">
                <span slot="title" id="a_history">History</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="viewManagement" v-if="role=='1'">
              <template slot="title">
                <span>Released Projects</span>
              </template>
              <el-menu-item index="viewlist" @click="selectMenu('viewlist')">
                <span slot="title" id="viewlist">Projects</span>
              </el-menu-item>
              <el-menu-item index="v_history" @click="selectMenu('v_history')">
                <span slot="title" id="v_history">Suggestion</span>
              </el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="personalstatistics" @click="selectMenu('personalstatistics')" v-if="role=='1'">
              <span slot="title" id="personalstatistics">Personal Statistics</span>
            </el-menu-item>
            <el-menu-item index="selfuserinfo" @click="selectMenu('selfuserinfo')" >
              <span slot="title">Personal Information</span>
            </el-menu-item>-->
            <el-menu-item index="userinfo" @click="selectMenu('userinfo')" v-if="role=='2'">
              <span slot="title" id="userinfo">User Management</span>
            </el-menu-item>
            <!--<el-menu-item index="desc" @click="selectMenu('desc')">
              <span slot="title">Help</span>
            </el-menu-item>-->
          </el-menu>
        </el-row>
      </el-aside>
      <el-container>
        <el-main id="main">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer id="footer">Copyright 2019 ( Recommend Using <img src="/images/chrome.jpg" style="display:inline-block;width:15px;height:15px;vertical-align:middle;"/> Chrome Browser )</el-footer>
      </el-container>
    </el-container>

    <!--<el-dialog width="25%" title="My Task" :visible.sync="taskVisible" :close-on-click-modal="false">
      <div style="padding-left:50px;font-size:16px;">
        <div>Unallocated: <b>{{$store.state.taskList.Unassigned_nums}}</b></div>
        <div>Untranslated: <b>{{$store.state.taskList.Untranslated_nums}}</b></div>
        <div>Unreviewed: <b>{{$store.state.taskList.Approve_nums}}</b></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </el-dialog>-->

    <el-dialog width="40%" title="My Profile" :visible.sync="myProfileOuterVisible" :close-on-click-modal="false">
      <p><span>Name: </span><span style="font-weight:bold;">{{personalInfo.name}}</span></p>
      <p><span>Email: </span><span style="font-weight:bold;">{{personalInfo.email}}</span></p>
      <p>
        <el-button type="primary" size="small" @click="innerVisible = true">Change Password</el-button>
      </p>
      
      <el-dialog width="40%" title="Modify Password" :visible.sync="innerVisible" :close-on-click-modal="false" append-to-body>
        <el-form :model="modifyPasswordForm" status-icon :rules="passwordRules" ref="modifyPasswordForm" label-width="180px" class="demo-ruleForm">
          <el-form-item label="Old Password" prop="oldPass">
            <el-input type="password" v-model.trim="modifyPasswordForm.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="newPass">
            <el-input type="password" v-model.trim="modifyPasswordForm.newPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Repeat New Password" prop="checkPass">
            <el-input type="password" v-model.trim="modifyPasswordForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPassForm('modifyPasswordForm')">Modify</el-button>
            <el-button @click="resetPassForm('modifyPasswordForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="myProfileOuterVisible = false">close</el-button>
      </div>
    </el-dialog>
    <div id="taskListCon" v-if="role!=2">
      <el-card class="box-card" v-show="taskVisibleFlag" style="text-align:left;">
        <div class="per_task" @click="$router.push('/assignment')">Unassigned: <b>{{$store.state.taskList.Unassigned_nums}}</b></div>
        <div class="per_task" @click="$router.push('/translation')">Untranslated: <b>{{$store.state.taskList.Untranslated_nums}}</b></div>
        <div class="per_task" @click="$router.push('/retranslation')">Retranslated: <b>{{$store.state.taskList['Re_translated_nums']}}</b></div>
        <div class="per_task" @click="$router.push('/Review')">Unreviewed: <b>{{$store.state.taskList.Approve_nums}}</b></div>
        <div class="per_task" @click="$router.push('/feedback')">suggested: <b>{{$store.state.taskList.Conflict_nums}}</b></div>
      </el-card>
      <el-button round size="small" type="warning" @click="taskVisibleFlag=!taskVisibleFlag">My Task<el-badge :value="$store.state.taskList.Unassigned_nums+$store.state.taskList.Conflict_nums+$store.state.taskList.Untranslated_nums+$store.state.taskList['Re_translated_nums']+$store.state.taskList.Approve_nums" :max="99" v-show="$store.state.taskList.Unassigned_nums+$store.state.taskList.Conflict_nums+$store.state.taskList.Untranslated_nums+$store.state.taskList['Re_translated_nums']+$store.state.taskList.Approve_nums>0"></el-badge></el-button>
    </div>

  </el-container>
</template>

<script>
export default {
  mounted() {
    // var asideItem = $('.el-menu-vertical-demo .el-menu-item')
    // console.log(asideItem)
    // 防止用户手动刷新页面后侧边栏当前选中效果消失
    let currentPage = location.hash.split('/')[1]
    currentPage.split("?")?currentPage = currentPage.split("?")[0]:null
    this.selectMenu(currentPage)

    //根据当前浏览器的大小，动态生成侧边栏的高度和main的高度
    var winHeight = window.innerHeight
    var headerHeight = parseInt($('#header').outerHeight())
    var footerHeight = parseInt($('#footer').outerHeight())
    // console.log(headerHeight,footerHeight);  // 80  40
    $('#asideUl').css('minHeight', winHeight - headerHeight + 'px')
    $('#main').css('minHeight', winHeight - headerHeight - footerHeight + 'px')

    if(this.role!=2){
      this.myMessage()
      // 启动任务检查定时器
      this.$taskListTimer = setInterval(() => {
        this.myMessage()
      }, 60000)
    }

  },
  beforeDestroy() {
  // 页面销毁时关闭消息定时器
    clearInterval(this.$taskListTimer)
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value != ''){
        if (this.modifyPasswordForm.checkPass !== '') {
          this.$refs.modifyPasswordForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.modifyPasswordForm.newPass) {
        callback(new Error('Inconsistent input password twice!'));
      } else {
        callback();
      }
    };
    return {
      role: this.$cookies.get('role'),
      loginEmail: this.$cookies.get('email').split('@')[0],
      currentLoginID:this.$cookies.get('ID'),
      exitModal: false,
      asidedefaultOpened: ['projectManagement','translationManagement','reviewManagement','viewManagement'],
      // taskVisible: false,
      taskVisibleFlag:false,
      myProfileOuterVisible: false,
      innerVisible: false,
      personalInfo: {
        name: '',
        email: ''
      },
      personalInfoRules: {
        email: [
          { required: true, trigger: 'blur' }
        ],
        name: [
          { required: true, trigger: 'blur' }
        ]
      },
      modifyPasswordForm: {
        oldPass: '',
        newPass: '',
        checkPass: '',
      },
      passwordRules: {
        oldPass: [
          { required:true, trigger: 'blur' }
        ],
        newPass: [
          { required:true, trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required:true, trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  computed:{
    newTaskSum(){
      return this.$store.state.taskList.Unassigned_nums+this.$store.state.taskList.Conflict_nums+this.$store.state.taskList.Untranslated_nums+this.$store.state.taskList['Re_translated']+this.$store.state.taskList.Approve_nums
    }
  },
  watch:{
    '$route.path':{
      handler(val,oldVal){
        // console.log(val)
        this.selectMenu(val.split('/')[1])
      },
      deep:true
    }
  },
  methods: {
    myMessage(){
      this.$http.post('/api/Statistic/Accout_task_nums').then(response=>{
        // console.log(response.data.result)
        // this.$store.state.taskList = response.data.result
        this.$store.state.taskList = response.data.result
        this.$message.info({
          customClass:'intervalNotifyWidth',
          dangerouslyUseHTMLString: true,
          message: `<div>
              <span>Unallocated: <b>${response.data.result.Unassigned_nums}</b>;</span>
              <span>Unallocated: <b>${response.data.result.Conflict_nums}</b>;</span>
              <span>Untranslated: <b>${response.data.result.Untranslated_nums}</b>;</span>
              <span>Retranslated: <b>${response.data.result['Re_translated_nums']}</b>;</span>
              <span>Unreviewed: <b>${response.data.result.Approve_nums}</b>;</span>
          </div>`,
        });
      })
    },
    myDetail(){
      this.$http.post('/api/getDetails').then(response=>{
        if(response.data.result){
          this.personalInfo.name=response.data.result.name
          this.personalInfo.email=response.data.result.email
        }
        this.myProfileOuterVisible = true
      })
    },
    submitPassForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/changepwd',qs.stringify({oldpassword:this.modifyPasswordForm.oldPass,newpassword:this.modifyPasswordForm.newPass})).then(response=>{
            if(response.data.success){
              this.innerVisible = false
              this.modifyPasswordForm.oldPass=''
              this.modifyPasswordForm.newPass=''
              this.modifyPasswordForm.checkPass=''
              this.$router.push('/login')
              this.$cookies.remove('pwd')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetPassForm(formName) {
      this.$refs[formName].resetFields();
    },
    help(){
      window.open('/help/index.html','_blank')
      // window.open('','_blank').location.href = response.data.require
    },
    //退出登录
    logOut() {
      this.$confirm('Confirm to log out?', 'Confirm', {
        confirmButtonText: 'Exit',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post('/api/logout').then(response=>{
          if(response.data.success){
            this.$cookies.remove("Authorization")
            this.$router.push('/login')
          }
        })
        
      })
    },
    //侧边栏菜单点击跳转页面
    selectMenu(index) {
      switch (index) {
        case 'dashboard':
          // this.$store.state.translateSearchForm = {}
          this.$router.push('/dashboard?tab='+(this.$route.query.tab||'allocation'))
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'projectlist':
          // this.$store.state.translateSearchForm = {}
          this.$router.push('/projectlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 1) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'addproject':
          // this.$router.push('/addproject')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 1) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'projectdetail':
          // this.$router.push('/addproject')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 1) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'assignment':
          !this.$route.query.name?this.$router.push('/assignment'):this.$router.push('/assignment?id='+this.$route.query.id+'&name='+this.$route.query.name)
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 2) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'feedback':
          // this.$store.state.missionSearchForm = {}
          !this.$route.query.name?this.$router.push('/feedback'):this.$router.push('/feedback?id='+this.$route.query.id+'&name='+this.$route.query.name)
          // this.$router.push('/feedback')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 3) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewfeedback':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 3) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 't_overview':
          this.$router.push('/t_overview')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 4) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
          case 'translation':
          !this.$route.query.name?this.$router.push('/translation'):this.$router.push('/translation?name='+this.$route.query.name)
          // this.$router.push('/translationlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 5) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
          case 'ontrans':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 5) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'retranslation':
          !this.$route.query.name?this.$router.push('/retranslation'):this.$router.push('/retranslation?name='+this.$route.query.name)
          // this.$router.push('/retranslationlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 6) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'retrans':
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 6) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 't_history':
          // this.$store.state.translateSearchForm = {}
          this.$router.push('/t_history')
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 7) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 't_browhistoryitem':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/t_browhistoryitem')
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 7) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'a_overview':
          // this.$store.state.translateSearchForm = {}
          this.$router.push('/a_overview')
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 8) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'review':
          !this.$route.query.name?this.$router.push('/review'):this.$router.push('/review?name='+this.$route.query.name)
          // this.$router.push('/review')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 9) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'browreviewitem':
          // this.asidedefaultOpened.push('reviewManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 9) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'a_history':
          // this.asidedefaultOpened.push('reviewManagement')
          this.$router.push('/a_history')
          // this.$store.state.approveSearchForm = {}
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'a_browhistoryitem':
          // this.asidedefaultOpened.push('reviewManagement')
          // this.$router.push('/a_browhistoryitem')
          // this.$store.state.approveSearchForm = {}
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewlist':
          // this.$store.state.approveSearchForm = {}
          this.$router.push('/viewlist')
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewentry':
          // this.$store.state.approveSearchForm = {}
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewdetail':
          // this.$store.state.approveSearchForm = {}
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'v_history':
          // this.$store.state.approveSearchForm = {}
          this.$router.push('/v_history')
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 12) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
          case 'v_browhistoryitem':
          // this.$store.state.approveSearchForm = {}
          // this.$router.push('/v_browhistoryitem')
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 12) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        // case 'personalstatistics':
        //   this.$router.push('/personalstatistics?sta_pane='+(this.$route.query.sta_pane||'translator'))
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 13) {
        //       $(ele).css('color', '#fff').children().css('color', '#fff')
        //     }else{
        //       $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        case 'userinfo':
          this.$router.push('/userinfo')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'adduser':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'edituser':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        // case 'desc':
        //   this.$router.push('/desc')
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != $('.el-menu-vertical-demo .el-menu-item').length-1) {
        //       $(ele).css('color', '#fff').children().css('color', '#fff')
        //     }else{
        //       $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sortMenu{
  padding-left: 20px;
  color:#fff;
  font-weight:bold;
  font-size:12px;
}
</style>
