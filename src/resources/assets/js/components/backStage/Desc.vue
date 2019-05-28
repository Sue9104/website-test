<template>
  <div id="descMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Project Instruction</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="descDetail">
      <span @click="downloadProDoc">Manual of Online Translation System v1.0.0<Icon type="android-download" title="preview"></Icon></span>
    </div>
    <div class="videoCon">Reference Video:
      <div :style="videostyle">
        <span @click="closeVideo" v-if="closeBtnFlag">close</span>
        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" v-if="videoFlag" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"></video-player>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
export default {
  mounted() {
    // this.$http.post("/php/root_user_administration/VD4_check_and_edit.php",qs.stringify({
    //   EmployeeID:this.$cookies.get('ID')
    // })).then(response=>{
    //   this.selfInfoForm = response.data;
    //   switch(this.selfInfoForm.Authority){
    //     case "1":
    //       this.openVideo("root");
    //       this.videoFlag = true
    //       break;
    //     case "2":
    //       this.openVideo("curator");
    //       this.videoFlag = true
    //       break;
    //     case "3":
    //       this.openVideo("translator");
    //       this.videoFlag = true
    //       break;
    //     case "4":
    //       this.openVideo("browser");
    //       this.videoFlag = true
    //       break;
    //   }
    // })
  },
  components:{
    videoPlayer
  },
  data(){
    return {
      selfInfoForm:{},
      videostyle:'width:400px;height:400px;',
      videoFlag:false,
      closeBtnFlag:false,
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
            type: "video/mp4",
            src: "" //url地址
          }],
        // poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: 'The video is temporarily unavailable. Please try again later.', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  methods:{
    downloadProDoc(){
      window.open("/static/doc/Translation使用说明书_20180305.pdf")
    },
    openVideo(name){
      this.playerOptions={
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay:false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
            type: "video/mp4",
            src: "/php/videoDemo/鹍远基因在线人工翻译系统_"+name+".mp4" //url地址
          }],
        // poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: 'This video is temporarily unavailable. Please try again later.', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    },
    closeVideo(){
      this.videostyle='width:400px;height:400px;'
      this.$refs.videoPlayer.player.pause();
      this.closeBtnFlag = false;
    },
    onPlayerPlay(player) {
      // console.log("play");
      this.videostyle = ""
      this.closeBtnFlag = true

    },
    onPlayerPause(player){
      // console.log("pause");
    },
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player
    // }
  }
}
</script>

<style lang="less" scoped>

</style>
