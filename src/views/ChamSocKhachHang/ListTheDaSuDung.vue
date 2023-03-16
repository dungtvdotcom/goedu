<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách thẻ đã kích hoạt</h2>
      </div>
      <Search
        title="Nhập tên tài khoản hoặc mã thẻ"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search>
      <!-- <div>
        <router-link to="/user/them-moi-nguoi-dung">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div> -->
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="listUserCard"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.cardActivedTime`]="{ item }">
          <span>{{ item.cardActivedTime | moment("DD/MM/YYYY") }}</span>
        </template>

        <template v-slot:[`item.cardExpiredTime`]="{ item }">
          <span>{{ item.cardExpiredTime | moment("DD/MM/YYYY") }}</span>
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
      { text: "Mã thẻ", value: "cardId" },
      { text: "Thẻ", value: "card" },
      { text: "Card Active", value: "cardActive" },
      { text: "Trạng thái thẻ", value: "cardStatus" },
      { text: "Mã khoá học", value: "courseId" },
      { text: "Thời gian học", value: "cardActivedTime" },
      { text: "Thời gian hết hạn", value: "cardExpiredTime" },
      { text: "CourseId", value: "courseId" },
      { text: "CourseIds", value: "courseIds" },
      { text: "Học thử", value: "isTrial" },
      { text: "Bài học thử", value: "trialLessonIds" },
      // { text: "Action", value: "actions", sortable: false },
    ],
    listUserCard: [
      {
        active: 1,
        card: "PTDMj50gt",
        cardActive: 0,
        cardActivedTime: "2020-10-17T17:21:05.000",
        cardExpiredTime: "4758-09-13T17:21:05.000",
        cardId: 7733,
        cardStatus: "USED",
        courseId: 3,
        courseIds: "[3]",
        fullName: "Mai Trần",
        isTrial: 0,
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
      let query;
      if (parseInt(this.keyWord)) {
        query = {
          query: `cardId==${this.keyWord}`,
          size: 10,
          page: 0,
        };
      } else {
        query = {
          query: `userName=="*${this.keyWord}*",card=="${this.keyWord}"`,
          size: 10,
          page: 0,
        };
      }
      this.getListUserCard(query);
    },
    getListUserCard(query) {
      let result = this.$store.dispatch("code/listUserCard", query);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body.data.content);
            this.listUserCard = res.body.data.content;
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
      this.getListUserCard(this.query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query;
        if (parseInt(this.keyWord)) {
          query = {
            query: `cardId==${this.keyWord}`,
            size: 10,
            page: 0,
          };
        } else {
          query = {
            query: `userName=="*${this.keyWord}*",card=="${this.keyWord}"`,
            size: 10,
            page: 0,
          };
        }
        this.getListUserCard(query);
      }
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListUserCard(this.query);
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
    this.getListUserCard(this.query);
  },
};
</script>