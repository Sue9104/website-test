import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const Login = ()=>import('./components/Login.vue')
const Register = ()=>import('./components/Register.vue')
const NotAuth = ()=>import('./components/NotAuth.vue')
const NotFound = ()=>import('./components/NotFound.vue')

const UserInfo = ()=>import('./components/backStage/user/UserInfo')
const AddUser = ()=>import('./components/backStage/user/AddUser')
const EditUser = ()=>import('./components/backStage/user/EditUser')

const BackStage = ()=>import('./components/BackStage.vue')
const ProjectList = () => import('./components/backStage/projectList/ProjectList.vue')
const AddProject = () => import('./components/backStage/projectList/AddProject.vue')
const ProjectDetail = () => import('./components/backStage/projectList/ProjectDetail.vue')
const ObjectionList = () => import('./components/backStage/projectList/ObjectionList.vue')
const ViewObjection = () => import('./components/backStage/projectList/ViewObjection.vue')
const AllocationList = () => import('./components/backStage/projectList/AllocationList.vue')

const OverviewList = () => import('./components/backStage/tranlationManagement/OverviewList.vue')

const TranslationList = () => import('./components/backStage/tranlationManagement/TranslationList.vue')
const OnTrans = () => import('./components/backStage/tranlationManagement/OnTrans.vue')
const ApprovalList = () => import('./components/backStage/approvalManagement/ApprovalList.vue')
const BrowApprovalItem = () => import('./components/backStage/approvalManagement/BrowApprovalItem.vue')

const HistoryList = () => import('./components/backStage/historyList/HistoryList.vue')
const BrowHistoryItem = () => import('./components/backStage/historyList/BrowHistoryItem.vue')

const PersonalStatistics = () => import('./components/backStage/Statistics/PersonalStatistics.vue')

const Dashboard = () => import('./components/backStage/Dashboard.vue')
const Desc = () => import('./components/backStage/Desc.vue')

const ViewList = ()=>import('./components/backStage/brow/ViewList')
const ViewEntry = ()=>import('./components/backStage/brow/ViewEntry')
const ViewDetail = ()=>import('./components/backStage/brow/ViewDetail')

export default new VueRouter({
  // saveScrollPosition: true,
  // mode:'history',
  linkActiveClass:'ivu-menu-item-selected',
  routes: [
    {
      path:'/login',
      component: Login
    },
    {
      path:'/register',
      component: Register
    },
    {
      path: '/401',
      component: NotAuth
    },
    {
      path:'/',
      // redirect: '/projectlist',
      component: BackStage,
      children:[
        {
          path: '/userinfo',
          component: UserInfo,
          meta: {
            auth: true,
            role: 2
          }
        },
        {
          path: '/adduser',
          component: AddUser,
          meta: {
            auth: true,
            role: 2
          }
        },
        {
          path: 'edituser',
          component: EditUser,
          meta: {
            auth: true,
            role: 2
          }
        },
        {
          path: '/dashboard',
          component: Dashboard,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/projectlist',
          component: ProjectList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/addproject',
          component: AddProject,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/projectdetail',
          component: ProjectDetail,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/objectionlist',
          component: ObjectionList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/viewobjection',
          component: ViewObjection,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/allocationlist',
          component: AllocationList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path:'/t_overviewlist',
          component: OverviewList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path:'/a_overviewlist',
          component: OverviewList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path:'/translationlist',
          component: TranslationList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path:'/retranslationlist',
          component: TranslationList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: '/qualifiedlist',
          component: TranslationList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'ontrans',
          component: OnTrans,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'retrans',
          component: OnTrans,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'viewqualified',
          component: OnTrans,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'approvallist',
          component: ApprovalList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'browapprovalitem',
          component: BrowApprovalItem,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 't_historylist',
          component: HistoryList,
          meta: {
            auth: true,
            role: 1
          }
        }, 
        {
          path: 't_browhistoryitem',
          component: BrowHistoryItem,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'a_historylist',
          component: HistoryList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'a_browhistoryitem',
          component: BrowHistoryItem,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'viewlist',
          component: ViewList,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'viewentry',
          component: ViewEntry,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'viewdetail',
          component: ViewDetail,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'personalstatistics',
          component: PersonalStatistics,
          meta: {
            auth: true,
            role: 1
          }
        },
        {
          path: 'desc',
          component: Desc
        },
      ]
    },
    {
      path: '*',
      component: NotFound
    },
  ]
})