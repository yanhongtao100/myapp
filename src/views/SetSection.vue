<template>
  <div>
    <h-title></h-title>
    <v-container>
      <v-row dense>
        <v-col cols="6" class="mt-2">
          <span class="title font-weight-bold">虚拟断面</span>
        </v-col>
        <v-col cols="6">
          <v-btn class="float-right" color="primary" @click="setAll"
            >设置生效</v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        disable-sort
        :headers="headers"
        :items="desserts"
        item-key="index"
        no-data-text
      >
        <template v-slot:item.using="{ item }">
          <v-chip @click="changeUsing(item)">
            <div v-if="item.using == 1">使用</div>
            <div v-else-if="item.using == 0">停用</div></v-chip
          >
        </template>
        <template v-slot:item.pos="{ item }">
          <div v-if="item.pos == 1">上行</div>
          <div v-else-if="item.pos == 2">下行</div>
          <div v-else-if="item.pos == 3">全部</div>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  created: function() {
    var api = "/api/section";
    this.$http
      .get(api)
      .then((response) => {
        this.desserts = response.data;
        console.log(this.desserts);
      })
      .catch((error) => {
        this.$toasted.show(error);
      });
  },
  methods: {
    setAll() {
      var api = `/api/winding/refresh`;
      this.$http.post(api).then((response) => {
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
    },
    changeUsing(data) {
      //修改虚拟断面是否使用
      if (data.using == 1) {
        data.using = 0;
      } else if (data.using == 0) {
        data.using = 1;
      }
      var api = "/api/section/refresh";
      this.$http.post(api).then((response) => {
        var msg = response.data.msg;
        console.log(data);

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
      });
    },
  },
  data: () => ({
    desserts: [],
    headers: [
      { text: "断面ID", value: "id", width: 100 },
      { text: "名称", value: "name" },
      { text: "位置", value: "pos" },
      { text: "桩号", value: "mileage" },
      { text: "统计周期", value: "cycle" },
      { text: "是否使用", value: "using" },
    ],
  }),
};
</script>
