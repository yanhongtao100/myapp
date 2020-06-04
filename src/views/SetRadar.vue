<template>
<v-container>
  <v-row dense >
    <v-col cols="6">
      <span class="title font-weight-bold">雷达参数</span>
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
        <v-text-field  v-model="p.sensitivity" label="灵敏度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.angle" label="偏转角度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.coangle" label="坐标系偏转角度" required :rules="[numberRules]"></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.height" label="安装高度" :rules="[numberRules]" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.horizontal" label="水平偏移" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.disrepair" label="纵向距离修正" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.xrevise" label="坐标系补偿 X" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.yrevise" label="坐标系补偿 Y" :rules="dataRules" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.frequency" label="雷达频率ID(0-4)" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.prevpos" label="雷达融合区域上边界" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.nextpos" label="雷达融合区域下边界" :rules="dataRules" required></v-text-field>
      </v-col>
     </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.mode" label="工作模式" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.highspeed" label="超速事件设置速度" :rules="dataRules" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lowspeed" label="慢行事件设置速度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanenum" label="车道个数" :rules="[numberRules]" required></v-text-field>
      </v-col>
     </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth1" label="车道1宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth2" label="车道2宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth3" label="车道3宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth4" label="车道4宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth5" label="车道5宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth6" label="车道6宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth7" label="车道7宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field  v-model="p.lanewidth8" label="车道8宽度" :rules="[numberRules]" required></v-text-field>
      </v-col>

     </v-row>

  </v-form>

</v-container>
</template>
<script>
  export default {
    created : function() {
      var api = "/api/param/radar"
      this.$http.get(api).then((response) => {
        this.p = response.data;
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
        var api = "/api/param/radar/set";
        this.$http.post(api, this.$qs.stringify(this.p)).then((response) => {
          var msg = response.data.msg;
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