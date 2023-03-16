<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách blog</h2>
      </div>
      <!-- <Search
        title="Nhập vào tên blog"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search> -->
      <Search title="Nhập vào tên blog"></Search>
      <div>
        <router-link to="/blog/them-moi">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="listBlogs"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.source`]="{ item }">
          <span>{{
            item.source == "0" ? "Ý kiến khách hàng" : "Ý kiến báo chí"
          }}</span>
        </template>

        <template v-slot:[`item.active`]="{ item }">
          <span>{{
            item.active == true ? "Kích hoạt" : "Không kích hoạt"
          }}</span>
        </template>

        <template v-slot:[`item.banner`]="{ item }">
          <img :src="item.banner" alt="" />
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/blog/them-moi/' + item.id">
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
  </div>
</template>

<script>
import Search from "../../../components/Search";
import { mdiPencil, mdiDelete } from "@mdi/js";
export default {
  components: {
    Search,
  },
  data: () => ({
    headers: [
      { text: "STT", value: "stt" },
      { text: "Đường dẫn", value: "path" },
      { text: "Tiêu đề", value: "title" },
      { text: "Banner", value: "banner" },
      { text: "Mô tả", value: "description" },
      // { text: "Html", value: "html" },
      { text: "Source", value: "source" },
      { text: "Ngày tạo", value: "createdTimestamp" },
      { text: "Ngày sửa", value: "modifiedTimestamp" },
      { text: "Kind", value: "kind" },
      { text: "Tag", value: "tags" },
      { text: "Trạng thái", value: "active" },
      { text: "Action", value: "actions", sortable: false },
    ],
    listBlogs: [
      {
        roleName: "",
        roleNameShort: "",
        ctime: Date,
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    dialogDelete: false,
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
    ItemId: 0,
  }),
  methods: {
    editItem(item) {},
    deleteItem(item) {
      console.log(item);
      this.dialogDelete = true;
      this.ItemId = item.id;
    },
    deleteItemConfirm() {
      this.dialogDelete = false;
      this.deleteBlog(this.ItemId);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getBlogs(this.query);
    },
    clearFilter(e) {},
    sentKeyword(e) {},
    searchEnter(e, search) {},

    getBlogs(query) {
      let result = this.$store.dispatch("blogs/getBlogs", query);
      result.then(
        (res) => {
          if (res.body) {
            this.listBlogs = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    deleteBlog(id) {
      let result = this.$store.dispatch("blogs/deleteBlogs", id);
      result.then(
        (res) => {
          this.getBlogs(this.query);
        },
        (err) => {
          console.log(err);
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
    this.getBlogs(this.query);
  },
};
</script>

<style>
</style>