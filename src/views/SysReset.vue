<template>
  <div>
    <h-title></h-title>
    <div class="reset_container">
      <div class="box">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto"
            height="350"
            max-width="350"
          >
            <div class="left_box" @click="overlay = true"></div>
          </v-card>
        </v-hover>
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto"
            height="350"
            max-width="350"
          >
            <div class="right_box" @click="overlay1 = true"></div>
          </v-card>
        </v-hover>
      </div>
      <v-overlay :absolute="absolute" :value="overlay" class="ov_box">
        <h2>你确定要重启吗？</h2>
        <div class="flex">
          <v-btn color="success" @click="reBoot" class="butn">
            是
          </v-btn>
          <v-btn color="error" @click="overlay = false" class="btnn">
            否
          </v-btn>
        </div>
      </v-overlay>

      <v-overlay :absolute="absolute" :value="overlay1" class="ov_box">
        <set-time @childByValue="ByValue"></set-time>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import setTime from "../views/setTime";
export default {
  name: "SysReset",
  components: {
    "set-time": setTime,
  },
  props: {},
  data() {
    return {
      result2: null,
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
    ByValue(data) {
      this.overlay1 = data;
    },
    formatDatetime: function(datetime) {
      if (datetime === null) {
        return "[null]";
      } else {
        return datetime.format("YYYY-MM-DD HH:mm:ss");
      }
    },
    async reBoot() {
      const res = await this.$http.get(`/api/reboot`);
      console.log(res);
      this.overlay = false;
      this.$toasted.success("设备重启成功", {
        position: "bottom-center",
        duration: 2000,
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
.reset_container {
  width: 100%;
  height: 92.5vh;
  background-image: linear-gradient(to right, #359edb, #014fba);
}
.box {
  width: 1024px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.left_box {
  cursor: pointer;
  width: 300px;
  height: 300px;
  background: url(../assets/373650b5a4f234152ff160142a82be9.png);
}
.right_box {
  cursor: pointer;
  width: 300px;
  height: 300px;
  background: url(../assets/09f6a9c7261581972410d6cdec0f2c9.png);
}
h2 {
  font-size: 40px;
}
.flex {
  width: 100px;
  height: 50px;
  display: flex;
  transform: translate(100%, 0);
  justify-content: center;
  align-content: space-around;
}
.btnn {
  margin-left: 50px;
  margin-top: 50px;
}
.butn {
  margin-top: 50px;
}
</style>
