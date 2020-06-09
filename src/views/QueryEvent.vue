<template>
  <div>
    <h-title></h-title>
    <v-container>
      <v-row dense>
        <v-col cols="2" class="mt-2">
          <span class="title font-weight-bold">事件记录</span>
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="3">
          <v-datetime-picker label="选择开始时间" v-model="bDatetime">
          </v-datetime-picker>
        </v-col>
        <v-col cols="2">
          <v-datetime-picker label="选择结束时间" v-model="eDatetime">
          </v-datetime-picker>
        </v-col>

        <v-spacer></v-spacer>
        <v-col class="mt-2">
          <v-btn color="primary" v-on:click="onQuery">查 询</v-btn>
        </v-col>
      </v-row>

      <v-data-table
        disable-sort
        :headers="headers"
        :items="desserts"
        item-key="index"
        no-data-text
      >
        <template v-slot:item.kind="{ item }">
          <div v-if="item.kind == 0">小型车</div>
          <div v-if="item.kind == 3">中型车</div>
          <div v-if="item.kind == 4">大型车</div>
        </template>



        <template v-slot:item.event="{ item }">
          <div v-if="item.event == 0">正常行驶</div>
          <div v-if="item.event == 1">畅通停车</div>
          <div v-if="item.event == 2">拥堵停车</div>
          <div v-if="item.event == 4">车辆超速</div>
          <div v-if="item.event == 8">交通事故</div>
          <div v-if="item.event == 16">慢行车辆</div>
          <div v-if="item.event == 32">行人</div>
          <div v-if="item.event == 64">逆行车辆</div>
          <div v-if="item.event == 128">抛撒物</div>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted: function() {},
  methods: {
    onQuery() {
      console.log(this.bDatetime.format("yyyy-MM-dd HH:mm:ss"));
      var api = "/query/event";
      var param = {
        params: {
          start: this.bDatetime.format("yyyy-MM-dd HH:mm:ss"),
          stop: this.eDatetime.format("yyyy-MM-dd HH:mm:ss"),
        },
      };
      this.$http
        .get(api, param)
        .then((response) => {
          var arr = [];
          var len = response.data.length;
          if (len == 0) {
            this.$toasted.info("未查询到数据", {
              theme: "toasted-primary",
              position: "bottom-center",
              duration: 2000,
            });
          }
          if (len > 1000) {
            len = 1000;
          }
          for (var i = 0; i < len; i++) {
            response.data[i].index = i;
            arr.push(response.data[i]);
          }
          this.desserts = arr;
        })
        .catch((error) => {
          this.$toasted.show(error);
        });
    },
  },
  data: () => ({
    bDatetime: new Date(),
    eDatetime: new Date(),
    desserts: [],
    headers: [
      { text: "ID", value: "id", width: 100 },
      { text: "时间", value: "time" },
      { text: "目标类型", value: "kind" },
      { text: "所在车道", value: "lane" },
      { text: "发生事件", value: "event" },
    ],
  }),
};
</script>
