<template>
<v-container>
  <v-row dense >
    <v-col cols="2" class="mt-2">
      <span class="title font-weight-bold">虚拟断面</span>
    </v-col>
  </v-row>

  <v-data-table 
    disable-sort 
    :headers="headers" 
    :items="desserts" 
    item-key="index" 
    no-data-text>
  </v-data-table>

</v-container>
</template>

<script>
  export default {
    created: function () {
      var api = "/api/section"
      this.$http.get(api).then((response) => {
        this.desserts = response.data;
      })
      .catch((error) => {
        this.$toasted.show(error)
      })       
    },
    methods: {
    },
    data: () => ({
      desserts: [],
      headers: [
        { text: '断面ID', value: 'id', width:100 },
        { text: '名称', value: 'name' },
        { text: '位置', value: 'pos' },
        { text: '桩号', value: 'mileage' },
        { text: '统计周期', value: 'cycle' },
        { text: '是否使用', value: 'using' },
      ],
    }),
  }
</script>
