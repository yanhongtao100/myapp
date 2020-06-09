<template>
  <div>
    <vue-datepicker-local
      v-model="time"
      format="YYYY-MM-DD HH:mm:ss"
    ></vue-datepicker-local>

    <div class="flex">
      <v-btn color="success" @click="setTime">
        是
      </v-btn>
      <v-btn color="error" @click="byValue" class="buttn">
        否
      </v-btn>
    </div>
  </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local";
export default {
  name: "",
  components: {
    VueDatepickerLocal,
  },
  props: {},
  data() {
    return {
      time: new Date(),
      range: [new Date(), new Date()],
      emptyTime: "",
      emptyRange: [],
      local: {
        dow: 0, // Sunday is the first day of the week
        hourTip: "Select Hour", // tip of select hour
        minuteTip: "Select Minute", // tip of select minute
        secondTip: "Select Second", // tip of select second
        yearSuffix: "", // suffix of head year
        monthsHead: "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ), // months of head
        months: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), // months of panel
        weeks: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), // weeks,
        cancelTip: "cancel",
        submitTip: "confirm",
      },
      overlay1: false,
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    byValue() {
			this.$emit("childByValue", this.overlay1);
			
    },
    setTime() {
      //写到这儿了
      var dt = this.getTime;
      console.log(dt);

      this.$http.get(`/api/settime`, dt).then((res) => {
        console.log(res);
        this.byValue();
        // this.$router.go(0);
      });
    },
    //disable the weekend
    disabledDate(time) {
      var day = time.getDay();
      return day === 0 || day === 6;
    },
  },
  filter: {},
  computed: {
    getTime() {
      var d = new Date(this.time);

      var datetime =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return datetime;
    },
  },
  watch: {},
};
</script>

<style scoped>
.datepicker {
  margin: 5px;
  box-shadow: #014fba 0px 2px 5px;
  border-radius: 5px;
}
.datepicker > input {
  color: aliceblue;
}
.flex {
  display: flex;
  justify-content: center;
  align-content: space-around;
}
.buttn {
  margin-left: 20px;
}
</style>
