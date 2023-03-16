<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  name: "UserCardDaily",
  data: () => ({
    lstChart: [],
    lstLabels: [],
    dataChart: [],
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Số thẻ đã kích hoạt theo ngày",
          backgroundColor: "#FBBC05",
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
  computed: {
    query() {
      return {
        query: "",
        page: 0,
        size: 10,
      };
    },
  },
  methods: {
    userCardDaily(query) {
      let result = this.$store.dispatch("report/userCardDaily", query);
      result.then(
        (res) => {
          if (res.body && res.body.data) {
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
  created() {
    this.userCardDaily(this.query);
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
        this.userCardDaily(query);
      }
    },
  },
};
</script>