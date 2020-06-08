<template>
  <div class="reset_container">
    <div class="box">
      <div class="left_box" @click="overlay = true" ></div>
      <div class="right_box" @click="setTime">




				
			</div>
    </div>
    <v-overlay :absolute="absolute" :value="overlay" class="ov_box">
			<h2>你确定要重启吗？</h2>
			<div class="flex">
      <v-btn color="success" @click="reBoot" class="butn" >
        是
      </v-btn>
      <v-btn color="error" @click="overlay = false"  class="btnn">
        否
      </v-btn>
			</div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "SysReset",
  components: {},
  props: {},
  data() {
    return {
      absolute: true,
      overlay: false,
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
			this.overlay=false
    },
    setTime() {},
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
  background-color: #ccc;
}
.box {
  width: 1024px;
  height: 500px;
  background-color: #ff0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.left_box {
  width: 300px;
  height: 300px;
  background-color: #f00;
}
.right_box {
  margin-left: 100px;
  width: 300px;
  height: 300px;
  background-color: #f00;
}
h2{
	font-size: 40px;
}
.flex{
	width: 100px;
	height: 50px;
	display: flex;
	transform: translate(100%,0);
	justify-content: center;
	align-content: space-around;
}
.btnn{
margin-left: 50px;
margin-top: 50px;
}
.butn{
margin-top: 50px;

}
</style>
