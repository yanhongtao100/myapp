<template>
  <div>
    <h-title></h-title>
    <v-container>
      <v-row dense>
        <v-col cols="2" class="mt-2">
          <span class="title font-weight-bold">虚拟线圈检测</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-select v-model="select" :items="items" label="选择线圈"></v-select>
        </v-col>
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
  mounted: function() {
    var api = "/api/winding";
    this.$http
      .get(api)
      .then((response) => {
        var arr = [];
        var len = response.data.length;
        if (len == 0) {
          this.$toasted.info("未定义线圈", {
            theme: "toasted-primary",
            position: "bottom-center",
            duration: 2000,
          });
        }
        for (var i = 0; i < len; i++) {
          var obj = {};
          obj.text = response.data[i].name;
          obj.value = response.data[i].id;
          arr.push(obj);
        }
        this.items = arr;
        if (i > 0) {
          this.select = response.data[0].id;
        }
      })
      .catch((error) => {
        this.$toasted.show(error);
      });
  },
  methods: {
    onQuery() {
      console.log(this.bDatetime.format("yyyy-MM-dd HH:mm:ss"), this.select);
      var api = "/query/winding";
      var param = {
        params: {
          id: this.select,
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
    items: [],
    select: {},
    bDatetime: new Date(),
    eDatetime: new Date(),
    desserts: [],
    headers: [
      { text: "线圈ID", value: "id", width: 100 },
      { text: "时间", value: "time" },
      { text: "触发", value: "trigger" },
    ],
  }),
};
</script>
