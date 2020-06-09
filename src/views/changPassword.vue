<template>
  <div>
    <h-title></h-title>
    <div class="container">
      <v-row class="login_box">
        <div class="center_box">
          <div class="right_box">
            <h2>一体化智能广域交通检测雷达</h2>
            <v-img
              class="img_login"
              width="400px"
              src="../assets/b319e8ccc7bf7bf3775a98ea718f718.png"
            ></v-img>
          </div>
          <v-card width="400" height="350" class="login_input">
            <v-row class="text_center" style="margin-top:50px">
              <v-col cols="10" class="title_user">
                密码修改
              </v-col>
              <v-col cols="10">
                <v-text-field
                  class=""
                  placeholder="请输入新账号"
                  v-model="from.username"
                  required
                  single-line
                  outlined
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row class="text_center">
              <v-col cols="10">
                <v-text-field
                  class=""
                  placeholder="请输入新密码"
                  v-model="from.password"
                  :counter="16"
                  :type="'password'"
                  required
                  single-line
                  outlined
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row class="text_center">
              <v-btn
                class="float-right"
                color="primary"
                block
                v-on:click="onSet"
                >修改</v-btn
              >
            </v-row>
          </v-card>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "changPassword",
  components: {},
  props: {},
  data() {
    return {
      from: {
        username: "",
        password: "",
      },
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    onSet() {
      if (this.from.username == "" | this.from.password == "") {
        this.$toasted.error("账号密码不能为空", {
          position: "bottom-center",
          duration: 2000,
        });
      } else if (this.from.username != this.from.password) {
        this.$toasted.error("密码输入错误", {
          position: "bottom-center",
          duration: 2000,
        });
        console.log(1);
      } else if (this.from.username === this.from.password) {
        this.$http
          .get(`/api/param/setpass`, this.$qs.stringify(this.from))
          .then((response) => {
            if (response.data.ret == 0) {
              this.$toasted.success("参数设置成功", {
                position: "bottom-center",
                duration: 2000,
              });
            } else {
              this.$toasted.error("参数设置失败:", {
                position: "bottom-center",
                duration: 2000,
              });
            }
          });
      }
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
.img_login {
  margin: 40px 0 0 35px;
}
h2 {
  font-size: 36px;
  color: aliceblue;
}
.text_center {
  text-align: center;
  justify-content: center;
}
.col {
  padding: 0 !important;
}
.title_user {
  font-size: 24px;
  margin-top: -10px;
  margin-bottom: 20px;
  font-weight: 700;
}
.container {
  margin: 0 !important;
  margin-top: -60px !important;
  padding: 0 !important;
  width: 100%;
  height: 100%;
  position: relative;
  max-width: 100% !important;
}
.center_box {
  width: 1300px;
  height: 650px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_box {
  width: 100%;
  margin-left: 0;
  height: 92.8vh;
  overflow: hidden;
  background-image: linear-gradient(to right, #359edb, #014fba);
  position: relative;
}
</style>
