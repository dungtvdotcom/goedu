<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6">
      <div class="title-page">
        <h2>Theo dõi quá trình học</h2>
      </div>
    </div>

    <v-col cols="12">
      <v-row class="align-baseline justify-space-between">
        <div class="col-6 row">
          <v-col cols="5">
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
          <v-col cols="5">
            <v-text-field
              label="Nhập số điện thoại"
              v-model="numberPhone"
            ></v-text-field>
          </v-col>
        </div>
        <v-col cols="2" class="text-center">
          <v-btn elevation="2" @click="moreFilter">Thêm bộ lọc</v-btn>
        </v-col>
      </v-row>
      <div v-if="isFilter">
        <v-row class="align-baseline">
          <v-col cols="2">
            <v-select
              :items="items"
              label="Trạng thái học"
              item-text="title"
              item-value="status"
              v-model="isTrialCourse"
            ></v-select>
          </v-col>

          <v-col cols="2">
            <v-select
              :items="lstCourse"
              item-text="code"
              item-value="code"
              dense
              v-model="courseName"
              required
              label="Chọn khoá học"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-btn elevation="2" @click="filterDate">Tìm kiếm</v-btn>
    </v-col>

    <div>
      <v-data-table
        :headers="dessertHeaders"
        :items="desserts"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`header.image`]="{ header }">
          {{ header.text.toUpperCase() }}
        </template>

        <template v-slot:[`item.day`]="{ item }">
          <span>{{ item.day | moment("DD/MM/YYYY") }}</span>
        </template>

        <template v-slot:[`item.timeView`]="{ item }">
          <span>{{
            item.timeView === null
              ? 0 + " phút"
              : (item.timeView / 60).toFixed(0) + " phút"
          }}</span>
        </template>

        <template v-slot:[`item.videoTimeView`]="{ item }">
          <span>{{
            item.videoTimeView === null
              ? 0 + " phút"
              : (item.videoTimeView / 60).toFixed(0) + " phút"
          }}</span>
        </template>

        <template v-slot:[`item.cTime`]="{ item }">
          <span>{{ item.cTime | moment("DD/MM/YYYY HH:mm:ss") }}</span>
        </template>

        <template v-slot:[`item.mTime`]="{ item }">
          <span>{{ item.mTime | moment("DD/MM/YYYY HH:mm:ss") }}</span>
        </template>

        <template v-slot:[`item.isTrialCourse`]="{ item }">
          <span>{{
            item.isTrialCourse === 1 ? "Học thử" : "Không học thử"
          }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          <!-- <span >Sửa</span> -->
          <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
        </template>
      </v-data-table>
    </div>

    <div>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="curentPage"
                  class="my-4"
                  :length="totalPage"
                  :total-visible="7"
                  @input="handlePageChange"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import moment from "moment";
export default {
  data: () => ({
    dessertHeaders: [
      {
        text: "Tên người dùng",
        value: "userName",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Số điện thoại",
        value: "mobile",
      },
      {
        text: "Tên khoá học",
        value: "courseName",
      },
      {
        text: "Tên bài học",
        value: "lesson_name",
      },
      { text: "Thời gian xem bài học", value: "timeView" },
      { text: "Số lần vào bài học", value: "timeViewFrequency" },
      { text: "Thời gian xem video", value: "videoTimeView" },
      { text: "Số lần xem video", value: "videoTimeViewFrequency" },
      { text: "Ngày học", value: "day" },
      // { text: "Ngày tạo", value: "cTime" },
      // { text: "Ngày chỉnh sửa", value: "mTime" },
      { text: "Điểm", value: "scoreValue" },
      { text: "Trạng thái học thử", value: "isTrialCourse" },
      { text: "TestPath", value: "testPath" },
      // { text: "Content", value: "content" },
      // { text: "Action", value: "actions", sortable: false },
    ],
    desserts: [
      {
        stt: "Frozen Yogurt",
        name: "Nguyễn Kim Ánh",
        phone: "0123466",
        Email: "email",
        plan: "Kế hoạch học tập",
        number: "Số buổi học thực tế",
        study: "Tổng thời gian học",
        test: "Hoàn thành bài test",
        mark: "Điểm trung bình",
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    totalPage: 1,
    curentPage: 1,
    date_to: new Date().toISOString().substr(0, 10),
    date_from: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    dates: [],
    items: [
      { title: "Mặc định", status: "" },
      { title: "Học thử", status: 1 },
      { title: "Không học thử", status: 0 },
    ],
    isFilter: false,
    isTrialCourse: "",
    numberPhone: "",
    lstCourse: [],
    courseName: "",
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    handlePageChange(value) {
      this.curentPage = value;
      let startDate = moment(this.dates[0]).format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment(this.dates[1]).format("YYYY-MM-DD HH:mm:ss");

      let query;
      if (
        this.isTrialCourse === "" &&
        this.dates.length == 0 &&
        this.numberPhone === ""
      ) {
        query = {
          query: "",
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      } else if (
        this.numberPhone.length > 0 &&
        this.isTrialCourse === "" &&
        this.dates.length == 0
      ) {
        query = {
          query: `mobile=="${this.numberPhone}*"`,
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      } else if (this.isTrialCourse === "" && this.numberPhone.length == 0) {
        query = {
          query: `cTime>="${startDate}";cTime<="${endDate}"`,
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      } else {
        query = {
          query: `(cTime>="${startDate}";cTime<="${endDate}"),isTrialCourse==${this.isTrialCourse};mobile=="${this.numberPhone}*";courseName=="${this.courseName}*"`,
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      }
      // console.log(query);
      this.lessonResultDaily(query);
    },
    lessonResultDaily(query) {
      let result = this.$store.dispatch("lesson/lessonResultDaily", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            this.desserts = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    filterDate() {
      let startDate = moment(this.dates[0]).format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment(this.dates[1]).format("YYYY-MM-DD HH:mm:ss");

      let query;
      if (
        this.isTrialCourse === "" &&
        this.dates.length == 0 &&
        this.numberPhone === ""
      ) {
        query = {
          query: "",
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      } else if (
        this.numberPhone.length > 0 &&
        this.isTrialCourse === "" &&
        this.dates.length == 0
      ) {
        query = {
          query: `mobile=="${this.numberPhone}*"`,
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      } else if (this.isTrialCourse === "" && this.numberPhone.length == 0) {
        query = {
          query: `cTime>="${startDate}";cTime<="${endDate}"`,
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      } else {
        query = {
          query: `(cTime>="${startDate}";cTime<="${endDate}"),isTrialCourse==${this.isTrialCourse};mobile=="${this.numberPhone}*";courseName=="${this.courseName}*"`,
          sortBy: ["userId"],
          direction: "ASC",
          page: this.curentPage - 1,
          size: 10,
        };
      }

      this.lessonResultDaily(query);
    },
    moreFilter() {
      this.isFilter = !this.isFilter;
    },
    getListCourse(query) {
      let result = this.$store.dispatch("course/getListCourse", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data.content);
            this.lstCourse = res.body.data.content;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.lessonResultDaily(this.query);
    this.getListCourse(this.query);
  },
  computed: {
    query() {
      return {
        query: "",
        sortBy: ["userId"],
        direction: "ASC",
        size: 10,
        page: this.curentPage - 1,
      };
    },

    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

