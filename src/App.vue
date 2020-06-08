<template>
  <v-app>
    <div>
      <v-app-bar app color="blue darken-4" dark flat>
        <v-toolbar-title>
          <img
            class="logo"
            src="../src/assets/899b078a070d1b65e4d815182ccdb84.jpg"
            alt=""
          />
          <span id="title">一体化智能广域交通检测雷达</span>
          <span class="vison">v1.05</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          tile
          dark
          class="ma-4"
          id="initialization"
          text
          v-on:click="onVisual"
          >实时监控</v-btn
        >

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              active-class="button-active"
              v-on="on"
              class="ma-4 "
              text
              retain-focus-on-click
              tile
              id="initialization"
              >数据查询</v-btn
            >
          </template>
          <v-list dense>
            <v-list-item v-on:click="onEvent">
              <v-list-item-title>事件检测</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onStat">
              <v-list-item-title>雷达流量统计</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onLine">
              <v-list-item-title>排队长度记录</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onSection">
              <v-list-item-title>虚拟断面统计</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onWinding">
              <v-list-item-title>虚拟线圈检测</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              v-on="on"
              class="ma-4"
              active-class="active"
              id="initialization"
              tile
              text
              >配置参数</v-btn
            >
          </template>
          <v-list dense>
            <v-list-item v-on:click="onSetEcu">
              <v-list-item-title>ECU参数</v-list-item-title>
            </v-list-item>
            <v-list-item v-on:click="onSetRadar">
              <v-list-item-title>雷达参数</v-list-item-title>
            </v-list-item>
            <v-list-item v-on:click="onSetSection">
              <v-list-item-title>虚拟断面</v-list-item-title>
            </v-list-item>
            <v-list-item v-on:click="onSetWinding">
              <v-list-item-title>虚拟线圈</v-list-item-title>
            </v-list-item>
            <v-list-item v-on:click="changePassword">
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          dark
          class="ma-4"
          id="initialization"
          text
          tile
          @click="overlay = !overlay"
          >关于</v-btn
        >
        <v-btn
          dark
          class="ma-4"
          id="initialization"
          text
          tile
          @click="sysRest"
          >系统维护</v-btn
        >
        <v-alert
          class="center lighten-2"
          v-if="overlay"
          @click="overlay = false"
          dark
          dismissible
        >
          一体化智能广域交通检测雷达
        </v-alert>
        <div class="time_now">
          <div>{{ currentDay }}</div>
          <div class="text-right">{{ currentTime }}</div>
        </div>
      </v-app-bar>

      <v-content>
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    timer: "", //定义一个定时器的变量
    currentTime: new Date(), // 获取当前
    currentDay: 0,
    on: {},
  }),
  computed: {},
  created: function() {


		
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentDay =
        new Date().getFullYear() +
        "." +
        (new Date().getMonth() + 1) +
        "." +
        new Date().getDate();
      _this.currentTime = //修改数据date
        new Date().getHours() +
        ":" +
        (new Date().getMinutes() >= 9
          ? new Date().getMinutes()
          : "0" + new Date().getMinutes()) +
        ":" +
        (new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds());
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //清除的定时器
    }
  },
  methods: {
		sysRest(){
      this.$router.push("SysReset");

		},
    changePassword() {
      this.$router.push("changPassword");
    },
    onVisual: function() {
      this.$router.push("Visual");
    },
    onEvent: function() {
      console.log(this.$router);
      this.$router.push("QueryEvent");
    },
    onStat: function() {
      this.$router.push("QueryStat");
    },
    onLine: function() {
      this.$router.push("QueryLine");
    },
    onSection: function() {
      this.$router.push("QuerySection");
    },
    onWinding: function() {
      this.$router.push("QueryWinding");
    },
    onSetEcu: function() {
      this.$router.push("SetEcu");
    },
    onSetRadar: function() {
      this.$router.push("SetRadar");
    },
    onSetSection: function() {
      this.$router.push("SetSection");
    },
    onSetWinding: function() {
      this.$router.push("SetWinding");
    },
    onAbout: function() {
      this.$router.push("About");
    },
  },
};
</script>

<style scoped>
html body {
  min-width: 62.5rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.vison {
  padding: 0.5rem;
  font-size: 0.5rem;
  float: left;
  margin-top: 0.3125rem;
}
.v-toolbar__content {
  height: 2rem;
}
#initialization {
  transform: translate(0, 10px) !important;
}
.time_now {
  float: left;
}
.logo_bar {
  width: 3.125rem;
  height: 3.125rem;
}

#initialization:hover {
  border-bottom: 0.125rem solid #b44737 !important;
}
.last_btn {
  margin-right: 3.125rem !important;
}
.v-toolbar__title {
  position: relative;
  overflow: hidden !important;
  min-width: 22rem;
}
.logo {
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0px 0 0 0;
  float: left;

  /* display: none; */
}
#title {
  margin: 0.3125rem 0 0 0.25rem;
  line-height: 1.625rem;
  float: left;
  /* padding: 35px; */
}
.center {
  position: absolute;
  width: 450px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  text-align: center;
  line-height: 25px;
}
</style>
