<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#Dashboard</h2>
      </div>
    </div>
    <div class="report-main-content">
      <div class="report-main-counter">
        <h3>1. Thống kê số liệu</h3>
        <div
          class="report-user-counter"
          v-if="user_number.active"
          :key="'user-number-' + user_number_key"
        >
          <p><b>Tổng người dùng: </b></p>
          <p class="sub_tab" style="color: green">
            Active: {{ user_number.active }}
          </p>
          <p class="sub_tab" style="color: red">
            Inactive: {{ user_number.inactive }}
          </p>
        </div>
        <div
          class="report-card-counter"
          v-if="card_number.active"
          :key="'card-number-' + card_number_key"
        >
          <p><b>Tổng số thẻ: </b></p>
          <p class="sub_tab" style="color: green">
            Active: {{ card_number.active }}
          </p>
          <p class="sub_tab" style="color: red">
            Inactive: {{ card_number.inactive }}
          </p>
        </div>
        <div class="clear-float"></div>
      </div>
      <div class="report-user-daily-content report-chart">
        <h3 class="pl-4">2. Biểu đồ số người dùng theo ngày</h3>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Từ ngày - đến ngày"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              @input="menu2 = false"
              range
            ></v-date-picker>
          </v-menu>
        </v-col>
        <Bar :datetimeSearch="dates"></Bar>
      </div>
      <div class="report-card-daily-content report-chart">
        <h3 class="pl-4 mt-4">3. Biểu đồ số thẻ đã sinh theo ngày</h3>
        <!-- <v-row>
          <v-col cols="4" sm="4">
            <v-text-field
              v-model="dateRangeText"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
          </v-col>
        </v-row> -->
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText2"
                label="Từ ngày - đến ngày"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates2"
              @input="menu2 = false"
              range
            ></v-date-picker>
          </v-menu>
        </v-col>
        <CardDaily :datetimeSearch="dates2"></CardDaily>
      </div>
      <div class="clear-float"></div>

      <div class="report-card-daily-content report-chart">
        <h3 class="pl-4 mt-4">4. Biểu đồ số thẻ đã được kích hoạt theo ngày</h3>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText2"
                label="Từ ngày - đến ngày"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates3"
              @input="menu2 = false"
              range
            ></v-date-picker>
          </v-menu>
        </v-col>
        <!-- <CardDaily :datetimeSearch="dates2"></CardDaily> -->
        <UserCardDaily :datetimeSearch="dates3"></UserCardDaily>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from "../../components/LineChart";
import CardDaily from "../../components/CardDailyChart";
import UserCardDaily from "../../components/UserCardDaily";

export default {
  data: () => ({
    loaded: false,
    chartdata: null,
    dates: [],
    dates2: [],
    dates3: [],
    menu: false,
    menu3: false,
    menu2: false,
    user_number: {
      active: 0,
      inactive: 0,
    },
    user_number_key: 0,
    card_number: {
      active: 0,
      inactive: 0,
    },
    card_number_key: 0,
  }),
  components: {
    Bar,
    CardDaily,
    UserCardDaily,
  },
  methods: {
    userCouter() {
      let result = this.$store.dispatch("report/userCouter");
      result.then((res) => {
        if (res.body && res.body.data) {
          let rs = res.body.data;
          for (var i = 0; i < rs.length; i++) {
            if (rs[i].active === 1) {
              this.user_number.active = rs[i].number;
            } else {
              this.user_number.inactive = rs[i].number;
            }
          }
          this.user_number_key += 1;
        }
      });
    },
    cardCouter() {
      let result = this.$store.dispatch("report/cardCouter");
      result.then(
        (res) => {
          if (res.body && res.body.data) {
            let rs = res.body.data;
            for (var i = 0; i < rs.length; i++) {
              if (rs[i].active === 1) {
                this.card_number.active = rs[i].number;
              } else {
                this.card_number.inactive = rs[i].number;
              }
            }
            this.card_number_key += 1;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {},
  mounted() {
    this.userCouter();
    this.cardCouter();
  },
  computed: {
    query() {
      return {
        query: "",
        page: 0,
        size: 10,
      };
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    dateRangeText2() {
      return this.dates2.join(" ~ ");
    },
  },
};
</script>
<style>
.report-chart {
  margin-top: 20px;
}

.report-main-content {
  font-size: 14px;
}
.report-main-content input {
  width: 160px;
}

.clear-float {
  clear: both;
}

.report-user-counter {
  width: 200px;
  height: 120px;
  border: 1px solid #cdcdcd;
  float: left;
  margin: 20px;
  padding: 10px;
}
.report-card-counter {
  width: 200px;
  height: 120px;
  border: 1px solid #cdcdcd;
  float: left;
  margin: 20px;
  padding: 10px;
}
.report-main-counter {
  padding-left: 16px !important;
}
.sub_tab {
  margin: 0 10px 0 20px;
}
</style>