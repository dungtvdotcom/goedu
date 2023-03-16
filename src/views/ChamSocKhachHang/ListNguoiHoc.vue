<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách học viên</h2>
      </div>
      <Search
        title="Nhập email"
        @sentKeyword="sentKeyword"
        @clearFilter="clearFilter"
        @searchEnter="searchEnter"
      ></Search>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="listUserCourse"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.ctime`]="{ item }">
          <span>{{ item.ctime | moment("DD/MM/YYYY") }}</span>
        </template>

        <template v-slot:[`item.mtime`]="{ item }">
          <span>{{ item.mtime | moment("DD/MM/YYYY") }}</span>
        </template>

        <template v-slot:[`item.etime`]="{ item }">
          <span>{{ item.etime | moment("DD/MM/YYYY") }}</span>
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
import { mdiPencil } from "@mdi/js";
import Search from "../../components/Search";
export default {
  components: {
    Search,
  },
  data: () => ({
    headers: [
      { text: "Mã học viên", value: "userId" },
      { text: "Tên khách", value: "fullName" },
      { text: "Tài khoản", value: "userName" },
      { text: "Mã khoá học", value: "courseId" },
      { text: "Tên khoá học", value: "courseCode" },
      { text: "Ngày tạo", value: "ctime" },
      { text: "Ngày chỉnh sửa", value: "mtime" },
      { text: "Ngày kết thúc", value: "etime" },
      { text: "Học thử", value: "isTrial" },
      { text: "Bài học thử", value: "trialLessonIds" },
      // { text: "Action", value: "actions", sortable: false },
    ],
    listUserCourse: [
      {
        active: 1,
        btime: "2020-10-17T17:21:05.000",
        courseActive: 1,
        courseCode: "Perfect Slide",
        courseId: 3,
        courseIsPublic: 0,
        ctime: "2020-10-17T17:21:05.000",
        etime: "4758-09-13T17:21:05.000",
        fullName: "Mai Trần",
        isTrial: 0,
        mtime: "2020-10-17T17:21:05.000",
        number: 999999,
        trialLessonIds: "[]",
        userId: 67,
        userName: "tranhongmai2601@gmail.com",
      },
    ],
    icons: {
      mdiPencil,
    },
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
    activeStatus: true,
  }),
  methods: {
    sentKeyword(e) {
      this.keyWord = e.trim();
      let query = {
        query: `userName=="*${this.keyWord}*"`,
        size: 10,
        page: 0,
      };
      this.getListUserCourse(query);
    },
    getListUserCourse(query) {
      let result = this.$store.dispatch("code/listUserCourse", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            this.listUserCourse = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getListUserCourse(this.query);
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListUserCourse(this.query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query = {
          query: `userName=="*${this.keyWord}*"`,
          size: 10,
          page: 0,
        };
        this.getListUserCourse(query);
      }
    },
  },
  computed: {
    query() {
      return {
        query: "",
        size: 10,
        page: this.curentPage - 1,
      };
    },
  },
  created() {
    this.getListUserCourse(this.query);
  },
};
</script>