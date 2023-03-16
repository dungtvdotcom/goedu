<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Phân quyền</h2>
      </div>
      <Search title="Tìm kiếm" @sentKeyword="sentKeyword"></Search>
      <div>
        <router-link to="/list-role-user/them-moi-role-user">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="listRoleUser"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.lastName`]="{ item }">
          <span>{{ item.lastName + " " + item.firstName }}</span>
        </template>

        <template v-slot:[`item.ctime`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <span>{{ item.ctime | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <!-- <router-link
            :to="'/list-role-user/them-moi-role-user/' + item.userId"
          >
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link> -->
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

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Bạn muốn xoá nhóm quyền này ?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >Đồng ý</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import Search from "./../../../components/Search";
export default {
  components: {
    Search,
  },
  data: () => ({
    headers: [
      { text: "Tên tài khoản", value: "userName" },
      { text: "Họ và tên", value: "lastName" },
      { text: "Nhóm quyền", value: "roleName" },
      { text: "Tên rút gọn", value: "roleNameShort" },
      { text: "Ngày tạo", value: "ctime" },
      { text: "Action", value: "actions", sortable: false },
    ],
    listRoleUser: [
      {
        userName: "",
        firstName: "",
        lastName: "",
        roleName: "",
        cTime: Date,
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    dialogDelete: false,
    roleId: "",
    userId: "",
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
  }),
  methods: {
    getRoleUser(query) {
      let result = this.$store.dispatch("role/getRoleUser", query);
      result.then(
        (res) => {
          if (res.body) {
            this.listRoleUser = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // editItem(item) {
    //   console.log(item);
    // },
    deleteItem(item) {
      this.dialogDelete = true;
      this.userId = item.userId;
      this.roleId = item.roleId;
    },
    deleteItemConfirm() {
      this.closeDelete();
      this.deleteRoleUser();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteRoleUser(userId, roleId) {
      let data = {
        userId: this.userId,
        roleId: this.roleId,
      };
      let result = this.$store.dispatch("role/deleteRoleUser", data);
      result.then(
        (res) => {
          this.getRoleUser();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getRoleUser(this.query);
    },
    sentKeyword(e) {
      this.keyWord = e;
      let query = {
        query: "userName==" + this.keyWord,
        size: 10,
        page: 0,
      };
      this.getRoleUser(query);
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
    this.getRoleUser(this.query);
  },
};
</script>

<style scoped>
</style>