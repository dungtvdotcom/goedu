<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Permisson</h2>
      </div>
      <Search title="Permisson name" @sentKeyword="sentKeyword"></Search>
      <div>
        <router-link to="/permisson/them-moi">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="lstPermission"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.createdTimestamp`]="{ item }">
          <span>{{ item.createdTimestamp | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.lastUpdatedTimestamp`]="{ item }">
          <span>{{
            item.lastUpdatedTimestamp | moment("DD/MM/YYYY HH:mm")
          }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/permisson/them-moi/' + item.id">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link>

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
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import Search from "./../../../components/Search";
import Alert from "../../../components/Alert";
export default {
  components: {
    Search,
    Alert,
  },
  data: () => ({
    headers: [
      {
        text: "Id",
        align: "start",
        value: "id",
      },
      { text: "Mã", value: "code" },
      { text: "Tên", value: "name" },
      { text: "Pattern", value: "pattern" },
      { text: "Ngày tạo", value: "createdTimestamp" },
      { text: "Ngày chỉnh sửa", value: "lastUpdatedTimestamp" },
      { text: "Trạng thái", value: "active" },
      { text: "Action", value: "actions", sortable: false },
    ],
    lstPermission: [
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
    dialogDelete: false,
    permission_id: 0,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      this.permission_id = item.id;
      this.dialogDelete = true;
    },
    getListPermisson(query) {
      let result = this.$store.dispatch("policy/getListPermisson", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data.content);
            this.lstPermission = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItemConfirm() {
      this.deletePermission(this.permission_id);
      this.closeDelete();
      this.getListPermisson(this.query);
    },
    sentKeyword(e) {
      this.keyWord = e;
      let query = {
        query: "name==" + this.keyWord,
        size: 10,
        page: 0,
      };
      this.getListPermisson(query);
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getListPermisson(this.query);
    },
    deletePermission(id) {
      let result = this.$store.dispatch("policy/deletePermission", id);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Đã xoá thành công";
          this.type = "success";
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra. Xoá không thành công";
          this.type = "error";
        }
      );
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
    this.getListPermisson(this.query);
  },
};
</script>

