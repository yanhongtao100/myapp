<template>
  <div>
    <h-title></h-title>
    <div class="center">
      <v-row>
        <v-col cols="12">
          <span class="fz-big">系统设置</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span  class="fz-bi">系统重启</span>
          <v-btn color="primary" @click="reBoot" class="btn_reset">重启</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span  class="fz-bi">时间设置</span>
        </v-col>

        <v-row class="tac">
          <v-col cols="4">
            <v-datetime-picker
              class="timeWidth"
              label="选择时间"
              v-model="result2"
            >
            </v-datetime-picker>
						</v-col>
						<v-col cols="4">
            <v-btn color="primary" @click="setTime" class="left">提交</v-btn>
          </v-col>
        </v-row>
      </v-row>
    </div>
    <!-- <v-row>
      <v-col cols="12">
        <span class="title font-weight-bold">系统设置</span>
      </v-col>
      <v-row>
        <v-col cols="12"
          ><span class="text_resert">系统重启</span>
          <v-btn class="btn_reset" color="primary" @click="reBoot">重启</v-btn>
        </v-col>
      </v-row>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="title font-weight-bold">时间设置</span>
      </v-col>
      <div class="time_box">
        <v-row>
          <v-col cols="10">
            <v-datetime-picker label="选择时间" v-model="result2">
            </v-datetime-picker>
          </v-col>
          <v-col cols="2"
            ><v-btn color="primary" @click="setTime">提交</v-btn></v-col
          >
        </v-row>
      </div>
    </v-row> -->
  </div>
</template>

<script>
export default {
  name: "SysReset",
  components: {},
  props: {},
  data() {
    return {
      result2: new Date(),
      absolute: true,
      overlay: false,
      overlay1: false,
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    async reBoot() {
      const res = await this.$http.get(`/api/reboot`);
      console.log(res);
      this.overlay = false;
      this.$toasted.success("设备重启成功", {
        position: "bottom-center",
        duration: 2000,
      });
    },
    setTime() {
      var dt =
        this.result2.getFullYear() +
        "-" +
        (this.result2.getMonth() + 1) +
        "-" +
        this.result2.getDate() +
        " " +
        this.result2.getHours() +
        ":" +
        this.result2.getMinutes() +
        ":" +
        this.result2.getSeconds();
      this.$http.get(`/api/settime`, dt).then((res) => {
        console.log(res, dt);
        this.$toasted.success("设置成功", {
          position: "bottom-center",
          duration: 2000,
        });
      });
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
html body {
  width: 100%;
  height: 100%;
}

.btn_reset {
  margin-left: 87px;
}
.center {
  width: 500px;
  height: 300px;
  margin: 80px auto;
  text-align: center;
}
.timeWidth {
  width: 200px;
}
.tac {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-input {
  width: 100px !important;
}
.fz-big{
	font-size: 24px;
}
.fz-bi{
	font-size: 24px;
	margin-right: 10px;
}

</style>
