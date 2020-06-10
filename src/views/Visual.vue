<template>
  <div>
    <h-title></h-title>
    <div>
      <v-card id="container" class="pa-4 mb-4">
        <svg id="tunnel"></svg>
      </v-card>
      <div class="main_ms">
        <div class="video_main">
          <div>
            <v-btn color="primary" class="video_btn" small top>打开视频</v-btn>
            <span class="ip">IP:192.108.1.1</span>
            <span class="state">状态：未连接</span>
          </div>
          <v-card-text class="pa-4 mb-4 border_black ">
					</v-card-text>
        </div>
        <div class="message_container">
          <div class="massage_main">
            <v-data-table
              dense
              disable-sort
              hide-default-footer
              :headers="headers"
              :items="desserts"
              item-key="id"
              disable-pagination
              single-select
              @click:row="carClick"
            >
              <template v-slot:item.xspeed="{ item }">
                <div>{{ getspped(item.xspeed) + "km/h" }}</div>
              </template>
              <template v-slot:item.yspeed="{ item }">
                <div>{{ getspped(item.yspeed) + "km/h" }}</div>
              </template>
            </v-data-table>
          </div>
          <v-card-text class="location">
            <div class="message">
              <div class="left">
                <div>目标ID：</div>
                <div>车型：</div>
                <div>X坐标：</div>
                <div>车头时距：</div>
              </div>
              <div class="right">
                <div>{{ id }}</div>
                <div v-if="clickCar.ckind === 0">
                  小型车
                </div>
                <div v-else-if="clickCar.ckind == 3">
                  中型车
                </div>
                <div v-else-if="clickCar.ckind == 4">
                  大型车
                </div>
                <div v-else></div>
                <div>{{ clickCar.xxx }}</div>
                <div>{{ clickCar.ctimespan }}</div>
              </div>
              <div class="left">
                <div>车道：</div>
                <div class="blank"></div>
                <div>Y坐标：</div>
                <div>车头间距：</div>
              </div>
              <div class="right">
                <div>{{ clickCar.clane }}</div>
                <div class="blank"></div>
                <div>{{ clickCar.cypos }}</div>
                <div>{{ clickCar.cspace }}</div>
              </div>
            </div>
            <div class="speed">
              <div class="real_time">实时速度</div>
              <i class="big-font">{{ getspped(clickCar.yspeed) }}</i>
              <span class="small_font">Km/H</span>
              <div class="waring" :class="{ routine: getclass }">
                {{ eve }}
              </div>
            </div>
          </v-card-text>
          <v-card-text class="machine_state">
            <div class="local">
              <div class="left">
                <div>本机ECU：</div>
                <div>前ECU：</div>
                <div>联动视频：</div>
              </div>
              <div class="right">
                <div
                  :class="{
                    error_msg: configParams.local_ecu == 1 ? false : true,
                  }"
                >
                  {{ computingMode(configParams.local_ecu) }}
                </div>
                <div
                  :class="{
                    error_msg: configParams.front_ecu == 1 ? false : true,
                  }"
                >
                  {{ computingMode(configParams.front_ecu) }}
                </div>
                <div
                  :class="{
                    error_msg: configParams.linkage_video == 1 ? false : true,
                  }"
                >
                  {{ computingMode(configParams.linkage_video) }}
                </div>
              </div>
              <div class="left">
                <div>雷达传感器：</div>
                <div>后ECU：</div>
                <div>联动卡口：</div>
              </div>
              <div class="right">
                <div
                  :class="{
                    error_msg: configParams.vadar_senso == 1 ? false : true,
                  }"
                >
                  {{ computingMode(configParams.vadar_senso) }}
                </div>
                <div
                  :class="{
                    error_msg: configParams.quee_ecu == 1 ? false : true,
                  }"
                >
                  {{ computingMode(configParams.quee_ecu) }}
                </div>
                <div
                  :class="{
                    error_msg: configParams.linkage_bayonet == 1 ? false : true,
                  }"
                >
                  {{ computingMode(configParams.linkage_bayonet) }}
                </div>
              </div>
            </div>
            <div class="fle">
              <div class="text">
                <div>CPU：</div>
                <div>存储：</div>
              </div>
              <div class="box">
                <div class="histogram">
                  <div
                    class="cpu_fill"
                    :style="{ width: configParams.cpu_num + '%' }"
                  ></div>
                </div>
                <div class="histogram">
                  <div
                    class="memory_fill"
                    :style="{ width: configParams.disk + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </v-card-text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Snap from "snapsvg-cjs";
import mqtt from "mqtt";
var client = {};
export default {
  data: () => ({
    clickCar: {},
    configParams: {
      local_ecu: 2,
      front_ecu: 1,
      linkage_video: 1,
      cpu_num: 0,
      memory: 0,
      vadar_senso: 2,
      quee_ecu: 2,
      linkage_bayonet: 1,
    },
    paper: {},
    // 车的数据
    //限速值
    speed_value: "50",
    eve: "正常行驶",
    id: "",
    kind: "",
    lane: "",
    space: "",
    timespan: "",
    xpos: "",
    xspeed: "",
    ypos: "",
    yspeed: "",
    //是否超速
    isWaring: true,
    //画面宽度
    window_width: 0,
    //浏览器宽度
    picWidth: 900,
    //车道数,默认为8
    laneNum: 8,
    //车道长度
    roadLength: 300,
    //车道号对应位置
    lanePos: [],
    //所有车辆
    cars: new Map(),
    //上次所有车辆
    preCars: new Map(),
    ecu: {},
    //ecu数据
    desserts: [],
    headers: [
      { text: "ID", value: "id", width: 100 },
      { text: "车道", value: "lane" },
      { text: "车型", value: "kind" },
      { text: "X坐标", value: "xpos" },
      { text: "Y坐标", value: "ypos" },
      { text: "X速度", value: "xspeed" },
      { text: "Y速度", value: "yspeed" },
      { text: "事件", value: "event" },
      { text: "车头间距", value: "space" },
      { text: "车头时距", value: "timespan" },
    ],
  }),
  computed: {
    getCpu() {
      return function(data) {
        this.styles = {
          width: data + "%",
        };
      };
    },
    computingMode() {
      return function(data) {
        var a = "";
        if (data == 1) {
          a = "正常";
        } else if (data == 2) {
          a = "连接失败";
        }
        return a;
      };
    },
    getspped() {
      return function(data) {
        var a = (data * 3600) / 1000;
        return isNaN(a) ? "0" : Math.abs(Math.round(a));
      };
    },
    getclass() {
      return this.eve == "正常行驶";
    },
    getkind() {
      return function() {
        var a = "";
        if (this.kind == "") {
          a = "";
        }
        if (this.kind == 0) {
          a = "小型车";
        }
        if (this.kind == 3) {
          a = "中型车";
        }
        if (this.kind == 4) {
          a = "大型车";
        }
        return a;
      };
    },
	},

  created: function() {
    var ip = "127.0.0.1";
    var api = "/api/param/ecu";
    this.$http
      .get(api)
      .then((response) => {
        ip = response.data.ip;
        console.log(ip, response);
        client = mqtt.connect("ws://" + ip + ":1020/msg", {
          username: "admin",
          password: "password",
        });
        this.initMqtt();
      })
      .catch((error) => {
        this.$toasted.show(error);
			});
			
			
    this.$http
      .get("/api/param/radar")
      .then((res) => {
				this.picWidth = res.data.distance;
      })
      .catch((error) => {
        this.$toasted.show(error);
      });

    //获取车道
  },
  mounted: function() {
    this.drawRoad();
  },
  beforeDestroy: function() {
    console.log("mq close");
    client.end();
  },
  methods: {
    carClick(e) {
      var id = e.id;
      if (this.cars.has(id)) {
        this.clickCar = this.cars.get(id);
        console.log(this.clickCar);
      }
      this.id = e.id;
      this.kind = e.kind;
      this.lane = e.lane;
      this.space = e.space;
      this.timespan = e.timespan;
      this.xpos = e.xpos;
      this.xspeed = e.xspeed;
      this.ypos = e.ypos;
      this.yspeed = e.yspeed;
      if (e.event == 0) {
        this.eve = "正常行驶";
      } else if (e.event == 1) {
        this.eve = "畅通停车";
      } else if (e.event == 2) {
        this.eve = "拥堵停车";
      } else if (e.event == 4) {
        this.eve = "车辆超速";
      } else if (e.event == 8) {
        this.eve = "交通事故";
      } else if (e.event == 16) {
        this.eve = "慢行车辆";
      } else if (e.event == 32) {
        this.eve = "行人";
      } else if (e.event == 64) {
        this.eve = "逆行车辆";
      } else if (e.event == 128) {
        this.eve = "抛撒物";
      }
    },
    initMqtt() {
      client.on("connect", function() {
        client.subscribe("ui/objects");
        console.log("connected");
      });
      client.on("error", function(a) {
        console.log("error!" + a);
      });
      client.on("offline", function(a) {
        console.log("lost connection!" + a);
      });
      client.on("message", (topic, payload) => {
        if (topic == "ui/objects") {
          var objs = JSON.parse(payload);
          this.desserts = objs.objs;

          this.getConfigParams(objs.status);
          this.drawCars(objs.objs);
        }
      });
    },
    getConfigParams(data) {
      this.configParams = data;
      console.log(this.configParams);
    },
    //画虚线
    drawLane(y, w) {
      var x = 0;
      for (var i = 0; i < 100; i++) {
        this.paper
          .line(x, y, x + 10, y)
          .attr({ stroke: "#FFF", strokeWidth: 1 });
        x = x + 20;
        if (x > w) {
          break;
        }
      }
    },
    async drawBackground(w, h) {
      try {
        const { data } = await this.$http.get("/api/param/radar");
        this.ecu = data;
        //原始数据
        let original_arr = [
          this.ecu.lanewidth1,
          this.ecu.lanewidth2,
          this.ecu.lanewidth3,
          this.ecu.lanewidth4,
          this.ecu.lanewidth5,
          this.ecu.lanewidth6,
          this.ecu.lanewidth7,
          this.ecu.lanewidth8,
        ];
        //已有车道数组
        let lane_arr = [];
        for (let n = 0; n < this.ecu.lanenum; n++) {
          lane_arr.push(original_arr[n]);
        }
        let sum = 0;
        for (let c = 0; c < lane_arr.length; c++) {
          sum += lane_arr[c];
        }
        //获取基准数
        let part = 200 / sum;
        this.paper.rect(0, 0, w, h).attr({ fill: "#383735" });
        let offset = 0;
        for (let i = 0; i < lane_arr.length; i++) {
          //计算在哪划线
          var y = lane_arr[i] * part + offset;
          offset += lane_arr[i] * part;
          var x = 0;
          //画虚线
          for (var j = 0; j < 100; j++) {
            this.paper
              .line(x, y, x + 10, y)
              .attr({ stroke: "#FFF", strokeWidth: 1 });
            x = x + 20;
            if (x > w) {
              break;
            }
          }
        }
      } catch (error) {
        this.$toasted.show(error);
      }
      //h=200 w=1334
      //整个背景
      // 获取车道宽度

      // this.paper.line(0, 10, w, 10).attr({ stroke: "#ccc", strokeWidth: 1 });
      // this.paper
      //   .line(0, h - 10, w, h - 10)
      //   .attr({ stroke: "#FFF", strokeWidth: 1 });

      // 绿线
      var num = this.laneNum;
      // //每个车道的宽度
      var hoffset = (h - 20) / num;
      var ctnum = 0;
      if (num % 2 == 0) {
        ctnum = num / 2;
        var ypos = ctnum * hoffset + 10;
        this.paper
          .line(0, ypos, w, ypos)
          .attr({ stroke: "#137B37", strokeWidth: 10 });
      }
      // //划黄线
      let yellow_line = await this.$http.get("/api/section");
      let make_num = await this.$http.get("/api/param/ecu");
      yellow_line.data.forEach((element) => {
        var x = element.mileage - make_num.data.mileage;
        let width_part = w / this.roadLength;
        let z = 0;
        for (let i = 0; i < 50; i++) {
          this.paper
            .line(x * width_part, z, x * width_part, z + 5)
            .attr({ stroke: "#EA9407", strokeWidth: 3 });
          z += 10;
        }
      });
      //   var y = 10;
      //   var i = 0;
      //   for (i = 0; i < num; i++) {
      //     this.lanePos[i + 1] = y + hoffset / 2 - 5;
      //     y = y + hoffset;
      //   }
      //   y = 10;
      //   for (i = 0; i < num - 1; i++) {
      //     y = y + hoffset;
      //     if (ctnum - 1 == i) {
      //       continue;
      //     }
      //     this.drawLane(y, w);
      // }

      // //划黄线

      // //画箭头
      // //正箭头
      // let gx = 300;
      // let gy = 50;
      // this.paper
      //   .polygon(
      //     [gx, gy],
      //     [gx + 100, gy],
      //     [gx + 100, gy - 6],
      //     [gx + 120, gy + 4],
      //     [gx + 100, gy + 14],
      //     [gx + 100, gy + 8],
      //     [gx, gy + 8]
      //   )
      //   .attr({ stroke: "#ccc", strokeWidth: 1 });
      //反箭头
      // this.paper
      //   .polygon(
      //     [gx, gy],
      //     [gx - 100, gy],
      //     [gx - 100, gy - 6],
      //     [gx - 120, gy + 4],
      //     [gx - 100, gy + 14],
      //     [gx - 100, gy + 8],
      //     [gx, gy + 8]
      //   )
      //   .attr({ stroke: "#ccc", strokeWidth: 1 });
    },
    drawRoad() {
      this.paper = Snap("#tunnel");
      var o = document.getElementById("container");
      this.picWidth = o.offsetWidth; //宽度
      this.drawBackground(this.picWidth, 199);
    },
    drawCars(objs) {
      for (var i = 0; i < objs.length; i++) {
        var id = objs[i].id;
        this.car_params = objs.id;
        if (this.cars.has(id)) {
          this.preCars.delete(id);
          var car = this.cars.get(id);
          var y = ((200 - 20) * (objs[i].xpos - car.ypos)) / 28;
          var x = (this.picWidth * (objs[i].ypos - car.xpos)) / this.roadLength; //实际路宽× Y坐标减去车上一次的X轴坐标
          var posStr = "t" + x + "," + y;
          if (car.kind != objs[i].kind) {
            car.kind = objs[i].kind;
            if (car.kind == 0) {
              car.attr({ fill: "#F00" });
            } else if (car.kind == 3) {
              car.attr({ fill: "#0F0" });
            } else if (car.kind == 4) {
              car.attr({ fill: "#0FF" });
            }
          }
          car.xxx = objs[i].xpos;
          car.id = objs[i].id;
          car.ckind = objs[i].kind;
          car.ckind = objs[i].kind;
          car.clane = objs[i].lane;
          car.cspace = objs[i].space;
          car.ctimespan = objs[i].timespan;
          car.cypos = objs[i].ypos;
          car.yspeed = objs[i].yspeed;
          car.transform(posStr);
        } else {
          if (objs[i].lane > this.laneNum) {
            continue;
          }
          y = ((200 - 20) * objs[i].xpos) / 28 + 100 - 5;
          x = (this.picWidth * objs[i].ypos) / this.roadLength; //画面高度×车的坐标除以道路的长度
          car = {};
          if (objs[i].kind == 0) {
            car = this.paper.rect(x, y, 10, 10).attr({ fill: "#F00" });
            console.log(x, y);
          } else if (objs[i].kind == 3) {
            car = this.paper.rect(x, y, 15, 10).attr({ fill: "#0F0" });
          } else if (objs[i].kind == 4) {
            car = this.paper.rect(x, y, 20, 10).attr({ fill: "#0FF" });
          } else {
            console.log(objs[i].kind);
            continue;
          }
          car.xpos = objs[i].ypos;
          car.ypos = objs[i].xpos;

          car.xxx = objs[i].xpos;
          car.ckind = objs[i].kind;
          car.ckind = objs[i].kind;
          car.clane = objs[i].lane;
          car.cspace = objs[i].space;
          car.ctimespan = objs[i].timespan;
          car.cypos = objs[i].ypos;

          car.xspeed = objs[i].xspeed;
          car.yspeed = objs[i].yspeed;
          this.cars.set(id, car);
        }
      }
      //去除已经离开的车辆
      this.preCars.forEach((item, key) => {
        var car = this.cars.get(key);
        if (car != null) {
          car.remove();
          this.clickCar = {};
          this.id = "";
          this.eve = "正常行驶";
        }
        this.cars.delete(key);
      });
      //保存为上次车辆
      this.preCars.clear();
      this.cars.forEach((item, key) => {
        this.preCars.set(key, 1);
      });
    },
  },
};
</script>

<style scopd>
.routine {
  background-color: blue !important;
}
html body {
  min-width: 83.375rem;
}
#container {
  background: rgb(247, 243, 243);
  width: 100%;
}
#tunnel {
  width: 100%;
  height: 12.5rem;
}
.massage_main {
  overflow: scroll;
  height: 18.75rem;
  margin-top: 10px;
  width: 100%;
  border: 1px solid black;
}
.video_main {
  width: 50%;
  max-width: 31.25rem;
  margin-left: 3.125rem;
  margin-right: 0.625rem;
  height: 26.25rem;
  font-size: 0.875rem;
}
.main_ms {
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  min-width: 460;
}
.border_black {
  border: 0.0625rem solid black;
  height: 100%;
}
.video_btn {
  margin: 0.625rem 0 0.625rem 0;
}
.ip {
  margin-left: 2.125rem;
}
.state {
  margin-left: 1.25rem;
}
.v-data-table-header > tr > th {
  background-color: rgb(114, 112, 113) !important;
}
.text-start {
  background-color: #fff;
}
.location {
  border: 0.0625rem solid black;
  height: 9.125rem;
  width: 58.7%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0;
}
.machine_state {
  border: 0.0625rem solid black;
  height: 9.125rem;
  width: 40%;
  bottom: 0px;
  right: 0px;
  padding: 0;
  position: absolute;
}
.message_container {
  height: 29.125rem;
  position: relative;
  width: 90%;
  margin-right: 3.125rem;
}
.message {
  position: relative;
  width: 65%;
  height: 6.25rem;
  float: left;
  margin: 25px 0 0px 0;
}
.left {
  display: inline-block;
  width: 30%;
}
.right {
  display: inline-block;
  width: 20%;
}
.blank {
  height: 1.375rem;
}
.left > div {
  height: 1.375rem;
  line-height: 1.375rem;
  font-size: 0.875rem;
  text-align: right;
}
.right > div {
  text-align: left;
  height: 1.375rem;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: aqua;
}
.speed {
  position: absolute;
  right: 0;
  margin: 25px 0 0 0;
  width: 27%;
  height: 6.25rem;
}
.real_time {
  font-size: 16px;
}
.big-font {
  display: inline-block;
  margin-top: 10px;
  font-size: 46px;
  font-weight: 700;
  color: black;
  font-style: normal;
}
.small_font {
  font-size: 12px;
  color: black;
}
.waring {
  background-color: #f00;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
}
.local {
  width: 100%;
  margin: 25px 0 0 0;
  height: 80px;
  justify-self: center;
}
.error_msg {
  color: #f00 !important;
}
.histogram {
  margin-top: 5px;
  width: 88%;
  border: 1px solid #ccc;
  height: 18px;
}
.text {
  flex: 10%;
  text-align: right;
  height: 45px;
}
.box {
  flex: 62%;
  height: 45px;
  text-align: left;
}
.fle {
  display: flex;
  position: relative;
  transform: translate(20px, -10px);
}
.cpu_fill {
  width: 20%;
  height: 100%;
  background-color: rgb(0, 154, 68);
}
.memory_fill {
  width: 50%;
  height: 100%;
  background-color: rgb(0, 154, 68);
}
</style>
