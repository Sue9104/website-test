
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


window.Vue = require('vue');
window.$ = require('jquery');
import { Base64 } from 'js-base64';

// import iview from './iview.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import '../less/init.less'
import '../less/theme.less'
import uploader from 'vue-simple-uploader'
import VueCookies from 'vue-cookies'
import App from './App.vue';
import router from './router';
import store from './store'
import './axiosInterceptor.js'
Vue.prototype.$Loading = NProgress

Vue.prototype.taskListTimer = null

Vue.prototype.$changeDate=(dateA,time)=>{
  var dateee = new Date(dateA);
  // 目前只考虑带入当时填写时间
  var currentDate=new Date()
  if (!time){
    var date = dateee.getFullYear() + '-' + (dateee.getMonth() + 1) + '-' + dateee.getDate()
  }else{
    var hh = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()
    var mm = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
    var ss = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds()
    var date = dateee.getFullYear() + '-' + (dateee.getMonth() + 1) + '-' + dateee.getDate() + ' ' + hh + ':' + mm + ':' + ss
  }
  return date;
}

Vue.use(ElementUI, { locale });
Vue.use(uploader)
Vue.use(BootstrapVue)
Vue.use(VueCookies)
NProgress.configure({
  showSpinner: false
})


router.beforeEach((to, from, next) => {
  NProgress.start();

  // 判断用户是否登录,role为3和4直接跳转后台
  let token = VueCookies.get("Authorization")
  let role = VueCookies.get("role")
  // console.log(token)
  // console.log(to)
  // console.log(to.matched.some(record => record.meta.auth))
    if(token){
      if (to.matched.some(record => record.meta.auth)){
        if (role == to.meta.role) {
            next()
          }else{
            next({path:'/401'})
          }
      }else{
        if(to.path==="/"){
          if(role=='1'){
            next({path:'/dashboard'})
          }else if(role=='2'){
            next({path:'/userinfo'})
          }else{
            next({path:'/401'})
          }
        }else{
          next()          
        }
      }
    }else{
      if(to.path==='/login'||to.path==='/register'){
        VueCookies.get('Authorization') ? VueCookies.remove('Authorization') : null
        VueCookies.get('role') ? VueCookies.remove('role') : null
        next()
      }else{
        next({path:'/login'})
      }
      
    }

});

router.afterEach(route => {
  NProgress.done();
});

Vue.component('app', require('./App.vue'));

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
}); 
