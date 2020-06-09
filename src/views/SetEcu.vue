<template>
  <div>
    <h-title></h-title>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <span class="title font-weight-bold">ECU参数</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6">
          <v-btn class="float-right" color="primary" v-on:click="onSet"
            >更新参数</v-btn
          >
        </v-col>
      </v-row>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.id"
              label="ECU编号"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.ip"
              label="设备ip地址"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.netmask"
              label="子网掩码"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.gateway"
              label="网关"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" class="padding_none">
          <span class="title font-weight-bold">位置参数</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="select"
              :items="items"
              label="安装方向"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="select2"
              :items="wItem"
              label="安装位置"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.mileage"
              label="英里数"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.longitude"
              label="经度"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.latitude"
              label="纬度"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" class="padding_none">
          <span class="title font-weight-bold">目标融合参数</span>
        </v-col>
        <v-spacer></v-spacer>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.prevpos"
              label="上一融合目标"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.nextpos"
              label="下一融合目标"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="12" class="padding_none">
          <span class="title font-weight-bold">雷达参数</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.radarip"
              label="雷达IP"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.previp"
              label="前一雷达IP"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.nextip"
              label="后一雷达IP"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.distance"
              label="雷达检测距离"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="12" class="padding_none">
          <span class="title font-weight-bold">视频联动参数</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.videoip"
              label="视频IP"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.videoport"
              label="视频端口"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.videouser"
              label="视频用户名"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.videopass"
              label="视频密码"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="12" class="padding_none">
          <span class="title font-weight-bold">卡口联动参数</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.checkip"
              label="卡口IP"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.checkport"
              label="卡口端口"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.checkuser"
              label="卡口用户名"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.checkpass"
              label="卡口密码"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="12" class="padding_none">
          <span class="title font-weight-bold">网络较时参数</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="p.timeip"
              label="时间IP"
              :rules="dataRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
export default {
  created: function() {
    var api = "/api/param/ecu";
    this.$http
      .get(api)
      .then((response) => {
        this.p = response.data;
        this.select = response.data.direction;
        this.select2 = response.data.position;
        console.log(this.p, this.select);
      })
      .catch((error) => {
        this.$toasted.show(error);
      });
  },
  data: () => ({
    select: "",
    select2: "",
    wItem: [
      { text: "正向", value: 1 },
      { text: "反向", value: 2 },
    ],
    p: {},
    items: [
      { text: "上行路侧", value: 1 },
      { text: "中间", value: 2 },
      { text: "下行路侧", value: 3 },
    ],
    valid: false,
    dataRules: [(v) => !!v || "请输入"],
    numberRules: (v) => {
      if (!isNaN(parseFloat(v))) return true;
      return "请输入数字";
    },
  }),
  methods: {
    onSet() {
      this.p.direction = this.select;
      this.p.position = this.select2;
      if (!this.valid) {
        return;
      }
      var api = "/api/param/ecu/set";
      this.$http
        .post(api, this.$qs.stringify(this.p))
        .then((response) => {
          var msg = response.data.msg;
          console.log(this.p);

          if (response.data.ret == 0) {
            this.$toasted.success("参数设置成功", {
              position: "bottom-center",
              duration: 2000,
            });
          } else {
            this.$toasted.error("参数设置失败:" + msg, {
              position: "bottom-center",
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          this.$toasted.show(error);
        });
    },
  },
};
</script>
<style scoped>
.padding_none {
  padding: 0 !important;
}
.select {
  width: 100%;
  height: 80%;
  border: 2px solid #ccc;
  border-radius: 5px;
}
.opt {
  width: 100%;
  height: 12.5rem;
}
</style>
