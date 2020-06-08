<template>
  <v-container>
    <v-row dense>
      <v-col cols="6" class="mt-2">
        <span class="title font-weight-bold">虚拟线圈</span>
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
          <div v-else-if="item.using == 0">停用</div>
        </v-chip>
      </template>
      <template v-slot:item.detect="{ item }">
        <div v-if="item.detect == 1">进入检测</div>
        <div v-else-if="item.detect == 0">离开检测</div>
      </template>
      <template v-slot:item.output="{ item }">
        <div v-if="item.output == 1">低电平</div>
        <div v-else-if="item.output == 0">高电平</div>
      </template>
      <template v-slot:item.detect="{ item }">
        <div v-if="item.detect == 1">进入检测</div>
        <div v-else-if="item.detect == 0">离开检测</div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  created: function() {
    var api = "/api/winding";
    this.$http
      .get(api)
      .then((response) => {
        this.desserts = response.data;
        console.log(this.desserts);

        for (let i = 0; i < this.desserts.length; i++) {
          const element = this.desserts[i];
          if (element.pos == 1) {
            element.pos = "上行";
          } else if (element.pos == 2) {
            element.pos = "下行";
          } else if (element.pos == 3) {
            element.pos = "全部";
          }
        }
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
      if (data.using == 1) {
        data.using = 0;
      } else if (data.using == 0) {
        data.using = 1;
      }
      var api = "/api/winding/modify";
      this.$http.post(api, this.$qs.stringify(data)).then((response) => {
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
      { text: "线圈ID", value: "id", width: 100 },
      { text: "名称", value: "name" },
      { text: "位置", value: "pos" },
      { text: "桩号", value: "mileage" },
      { text: "所在车道", value: "lane" },
      { text: "检测方式", value: "detect" },
      { text: "输出方式", value: "output" },
      { text: "是否使用", value: "using" },
    ],
  }),
};
</script>
