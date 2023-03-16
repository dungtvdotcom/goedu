<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "CardDaily",
  data: () => ({
    lstChart: [],
    lstLabels: [],
    dataChart: [],
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Số thẻ đã sinh theo ngày",
          backgroundColor: "#34a853",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  props: ["datetimeSearch"],
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
    // console.log(this.chartdata);
    // this.renderChart(this.chartdata, this.options);
    // this.renderChart(this.chartdata, this.options);
  },
  computed: {
    query() {
      return {
        query: "",
        page: 0,
        size: 10,
      };
    },
  },
  created() {
    this.cardDaily(this.query);
  },
  methods: {
    cardDaily(query) {
      let result = this.$store.dispatch("report/cardDaily", query);
      result.then(
        (res) => {
          if (res.body && res.body.data) {
            let { content } = res.body.data;
            this.lstChart = content.reverse();
            // console.log(content);
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
        this.cardDaily(query);
      }
    },
  },
};
</script>