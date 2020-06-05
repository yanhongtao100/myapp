<template>
  <v-container>
    <v-row dense>
      <v-col cols="2" class="mt-2">
        <span class="title font-weight-bold">虚拟线圈</span>
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
        <v-chip @click="changeUsing(item)">{{ item.using }}</v-chip>
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
      })
      .catch((error) => {
        this.$toasted.show(error);
      });
  },
  methods: {
    changeUsing(data) {
      data.using += 1;
      console.log(data);
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
