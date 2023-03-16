<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    lstChart: [],
    lstLabels: [],
    dataChart: [],
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Số người dùng theo ngày",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    // this.renderChart(
    //   {
    //     labels: ["Tháng 1", "Tháng 2"],
    //     datasets: [
    //       {
    //         label: "Data One",
    //         backgroundColor: "#f87979",
    //         data: [4, 4],
    //       },
    //     ],
    //   },
    //   { responsive: true, maintainAspectRatio: false }
    // );
    // this.renderChart(this.chartdata, this.options);
    // console.log(this.chartdata.datasets[0].data);
    // console.log("data chart", this.chartdata);
    // this.renderChart({ ...this.chartdata }, { ...this.options });
  },
  props: ["datetimeSearch"],
  computed: {
    // day>=2020-10-16;day<=2020-10-16
    query() {
      return {
        query: "",
        page: 0,
        size: 10,
      };
    },
  },
  created() {
    this.userDaily(this.query);
  },
  methods: {
    async userDaily(query) {
      await this.$store.dispatch("report/userDaily", query).then(
        (res) => {
          if (res.body && res.body.data) {
            // console.log(res.body.data.content);
            let { content } = res.body.data;
            this.lstChart = content.reverse();
            for (const key in this.lstChart) {
              const element = this.lstChart[key];
              this.chartdata.labels.push(element.day);
              this.chartdata.datasets[0].data.push(element.number);
            }
            this.renderChart(this.chartdata, this.options);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  watch: {
    datetimeSearch: function (newVal, oldVal) {
      let startDate = newVal[0];
      let endDate = newVal[1];
      let query = {
        query: `day>=${startDate};day<=${endDate}`,
        page: 0,
        size: 10,
      };
      if (endDate) {
        this.userDaily(query);
      }
    },
  },
};
</script>