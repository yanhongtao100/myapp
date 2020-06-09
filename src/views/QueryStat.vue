<template>
  <div>
    <h-title></h-title>
    <v-container>
      <v-row dense>
        <v-col cols="2" class="mt-2">
          <span class="title font-weight-bold">雷达统计数据</span>
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
      var api = "/query/stat";
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
      { text: "车道", value: "lane", width: 100 },
      { text: "时间", value: "time" },
      { text: "大型车流量", value: "large" },
      { text: "中型车流量", value: "medium" },
      { text: "小型车流量", value: "small" },
      { text: "时间占有率", value: "timeoc" },
      { text: "空间占有率", value: "spaceoc" },
      { text: "平均车速", value: "speed" },
    ],
  }),
};
</script>
