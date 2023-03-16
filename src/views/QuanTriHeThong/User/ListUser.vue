<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách người dùng</h2>
      </div>
      <Search
        title="Nhập tên tài khoản, email hoặc số điện thoại"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search>
      <div>
        <router-link to="/user/them-moi-nguoi-dung">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="listUser"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.firstName`]="{ item }">
          <span>{{ item.lastName + " " + item.firstName }}</span>
        </template>

        <template v-slot:[`item.active`]="{ item }">
          <v-switch
            value
            :input-value="item.active"
            @click="changeActive(item)"
          ></v-switch>
        </template>

        <template v-slot:[`item.apiDoc`]="{ item }">
          <!-- <span>{{ item.apiDoc === 1 ? "Có quyền" : "Không có quyền" }}</span> -->
          <v-switch
            value
            :input-value="item.apiDoc"
            @click="changeActiveApi(item)"
          ></v-switch>
        </template>

        <template v-slot:[`item.cTime`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <span>{{ item.cTime | moment("DD/MM/YYYY") }}</span>
        </template>

        <template v-slot:[`item.mtime`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <span>{{ item.mtime | moment("DD/MM/YYYY") }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/user/them-moi-nguoi-dung/' + item.userId">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link>
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
import Search from "./../../../components/Search";
export default {
  data: () => ({
    headers: [
      { text: "Tên tài khoản", value: "userName" },
      { text: "Họ và tên", value: "firstName" },
      { text: "Email", value: "email" },
      { text: "Số điện thoại", value: "mobile" },
      { text: "Công việc", value: "jobTitle" },
      { text: "Ngày tạo", value: "cTime" },
      { text: "Ngày chỉnh sửa", value: "mtime" },
      { text: "Trạng thái", value: "active" },
      { text: "ApiDoc", value: "apiDoc" },
      { text: "Action", value: "actions", sortable: false },
    ],
    listUser: [
      {
        userName: "",
        firstName: "",
        email: "",
        mobile: "",
        jobTitle: "",
        cTime: Date,
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
    editItem(item) {
      console.log(item);
    },
    getUser(query) {
      let result = this.$store.dispatch("user/getData", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data.content);
            this.listUser = res.body.data.content;
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
      this.getUser(this.query);
    },

    sentKeyword(e) {
      this.keyWord = e;
      let query = {
        query: `userName=="${this.keyWord}",email=="${this.keyWord}",mobile=="${this.keyWord}"`,
        size: 10,
        page: 0,
      };
      this.getUser(query);
    },

    // CHANGE API USER
    activeUser(data) {
      let result = this.$store.dispatch("user/activeUser", data);
      result.then(
        (res) => {
          // console.log(res.body);
          this.getUser(this.query);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeActive(value) {
      let data = {};
      if (value.active === 1) {
        data = {
          userId: value.userId,
          active: 0,
        };
      } else {
        data = {
          userId: value.userId,
          active: 1,
        };
      }
      this.activeUser(data);
    },

    // CHANGE API DOC
    activeDocApi(data) {
      let result = this.$store.dispatch("user/activeDocApi", data);
      result.then(
        (res) => {
          // console.log(res.body);
          this.getUser(this.query);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeActiveApi(value) {
      let data = {};
      if (value.apiDoc === 1) {
        data = {
          userId: value.userId,
          apiDoc: 0,
        };
      } else {
        data = {
          userId: value.userId,
          apiDoc: 1,
        };
      }
      this.activeDocApi(data);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search;
        let query = {
          query: `userName=="${this.keyWord}",email=="${this.keyWord}",mobile=="${this.keyWord}"`,
          size: 10,
          page: 0,
        };
        this.getUser(query);
      }
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getUser(this.query);
    },
  },
  components: {
    Search,
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
    this.getUser(this.query);
  },
};
</script>

<style scoped>
</style>