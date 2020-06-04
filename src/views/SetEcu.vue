<template>
<v-container>
  <v-row dense >
    <v-col cols="6">
      <span class="title font-weight-bold">ECU参数</span>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="6">
      <v-btn class="float-right" color="primary" v-on:click="onSet">更新参数</v-btn>
    </v-col>
  </v-row>
  <v-form ref="form"
    v-model="valid"
    lazy-validation>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.id" label="ECU ID" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.position" label="安装位置(1上行路侧2中间3下行路侧)" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.mileage" label="桩号" required :rules="[numberRules]"></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.cycle" label="交通量统计周期" :rules="[numberRules]" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.ip" label="设备ip地址" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.netmask" label="子网掩码" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.gateway" label="网关" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.radarip" label="雷达IP" :rules="dataRules" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.nextip" label="下一ECUIP" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.checkpointip" label="联动卡口IP" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.domeip" label="联动球机IP" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.domeport" label="联动球机端口" :rules="[numberRules]" required></v-text-field>
      </v-col>
     </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.timeip" label="时钟服务器IP" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.longitude" label="经度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.latitude" label="纬度" :rules="[numberRules]" required></v-text-field>
      </v-col>
     </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanenum" label="车道数" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.medial" label="中央隔离带宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth" label="车道宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.epswidth" label="紧急停车带宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
     </v-row>

  </v-form>

</v-container>
</template>
<script>
  export default {
    created : function() {
      var api = "/api/param/ecu"
      this.$http.get(api).then((response) => {
				this.p = response.data;
				console.log(this.p);
				
      })
      .catch((error) => {
        this.$toasted.show(error)
      })       
    },
    data: () => ({
      p : {},
      valid: false,
      dataRules: [
        v => !!v || '请输入',
      ],
      numberRules: v  => {
        if (!isNaN(parseFloat(v))) return true;
        return '请输入数字';
      },      
    }),
    methods : {
      onSet() {
        if (!this.valid){
          return
        }
        var api = "/api/param/ecu/set";
        this.$http.post(api, this.$qs.stringify(this.p)).then((response) => {
					var msg = response.data.msg;
					console.log(this.p);
					
          if (response.data.ret == 0){
            this.$toasted.success('参数设置成功', { 
              position: "bottom-center", 
              duration : 2000
						});
          } else {
            this.$toasted.error('参数设置失败:' + msg, { 
              position: "bottom-center", 
              duration : 2000
            });            
          }
        })
        .catch((error) => {
          this.$toasted.show(error)
        })
      }
    }
  }
</script>