<template>
  <Main>
    <div class="lskh w-100">
      <div class="d-flex">
        <div class="pa-3 w-100">
          <div class="d-flex justify-space-between mb-6 align-baseline">
            <div class="title-page">
              <h2>#CMS GoEdu/Lịch sử kích hoạt tài khoản</h2>
            </div>
            <Search
              title="Nhập vào mã thẻ, email hoặc số điện thoại"
              @sentKeyword="sentKeyword"
              @clearFilter="clearFilter"
              @searchEnter="searchEnter"
            ></Search>
          </div>

          <div>
            <v-data-table
              :headers="headers"
              :items="lstActived"
              class="elevation-1"
              :hide-default-footer="true"
            >
              <template v-slot:[`item.lastName`]="{ item }">
                <span>{{ item.lastName + " " + item.firstName }}</span>
              </template>

              <template v-slot:[`item.atTime`]="{ item }">
                <span>{{ item.atTime | moment("DD/MM/YYYY HH:mm") }}</span>
              </template>

              <!-- <template v-slot:[`item.status`]="{ item }">
                <span>{{ item.status === false ? "N/A" : item.status }}</span>
              </template> -->

              <!-- <template v-slot:[`item.actions`]="{ item }">
                <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
                <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
              </template> -->
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
      </div>
    </div>
  </Main>
</template>
<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import Main from "./../../../components/Main";
import Search from "./../../../components/Search";
export default {
  name: "lskh",
  components: {
    Main,
    Search,
    // LeftMenu
  },
  data: () => ({
    headers: [
      { text: "Mã thẻ", value: "card" },
      {
        text: "Họ và tên",
        align: "start",
        value: "lastName",
      },
      { text: "Công việc", value: "jobTitle" },
      { text: "Email", value: "email" },
      { text: "Số điện thoại", value: "mobile" },
      { text: "Ngày tạo", value: "atTime" },
      { text: "Ghi chú", value: "note" },
      { text: "Trạng thái", value: "status" },
      // { text: "Action", value: "actions", sortable: false },
    ],
    lstActived: [
      {
        image: "Frozen Yogurt",
        listTeacher: "Nguyễn Kim Ánh",
        describe: "Giảng viên đại học Thăng Long",
        createDate: "10h-23/12/19",
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
  }),
  methods: {
    // editItem(item) {
    //   console.log(item);
    // },
    // deleteItem(item) {
    //   console.log(item);
    // },
    getListActived(query) {
      let result = this.$store.dispatch("code/listActived", query);
      result.then(
        (res) => {
          if (res.body) {
            this.lstActived = res.body.data.content;
            // console.log(res.body.data);
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
      if (this.keyWord == "") {
        this.getListActived(this.query);
      } else {
        let query = {
          query: `card=="${this.keyWord}",email=="${this.keyWord}",mobile=="${this.keyWord}"`,
          size: 10,
          page: this.curentPage - 1,
        };
        this.getListActived(query);
      }
    },
    sentKeyword(e) {
      this.keyWord = e.trim();
      let query = {
        query: `card=="${this.keyWord}",email=="${this.keyWord}",mobile=="${this.keyWord}"`,
        size: 10,
        page: 0,
      };
      this.getListActived(query);
      // console.log(query);
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListActived(this.query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query = {
          query: `card=="${this.keyWord}",email=="${this.keyWord}",mobile=="${this.keyWord}"`,
          size: 10,
          page: 0,
        };
        this.getListActived(query);
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
    this.getListActived(this.query);
  },
};
</script>

<style scoped>
</style>