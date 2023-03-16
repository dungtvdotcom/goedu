<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách stories</h2>
      </div>
      <Search
        title="Nhập vào tên story"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search>
      <div>
        <router-link to="/danh-sach-cau-chuyen/them-moi">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="listStories"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.active`]="{ item }">
          <span>{{
            item.active == true ? "Kích hoạt" : "Không kích hoạt"
          }}</span>
        </template>

        <template v-slot:[`item.banner`]="{ item }">
          <div>
            <img :src="item.banner" alt="img" />
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/danh-sach-cau-chuyen/them-moi/' + item.id">
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
    <!-- <FileUpload :idd="'storiesImages'" :fileTag="'stories'"></FileUpload> -->

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
// import FileUpload from "../util/FileUpload.vue";
import Search from "../../../components/Search";
import { mdiPencil, mdiDelete } from "@mdi/js";
export default {
  components: {
    Search,
    // FileUpload,
  },
  data: () => ({
    headers: [
      { text: "STT", value: "stt" },
      { text: "Tiêu đề", value: "title" },
      { text: "Đường dẫn", value: "path" },
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
    listStories: [
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
    ItemId: "",
  }),
  methods: {
    editItem(item) {
      // console.log(item);
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.ItemId = item.id;
    },
    deleteItemConfirm() {
      this.deleteStory(this.ItemId);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getStories(this.query);
    },
    clearFilter(e) {},
    sentKeyword(e) {},
    searchEnter(e, search) {},
    getStories(query) {
      let result = this.$store.dispatch("stories/getStories", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body);
            this.listStories = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    deleteStory(id) {
      let result = this.$store.dispatch("stories/deleteStory", id).then(
        (res) => {
          if (res.body) {
            this.getStories(this.query);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.getStories(this.query);
  },
  computed: {
    query() {
      return {
        query: "",
        direction: "ASC",
        size: 10,
        page: this.curentPage - 1,
      };
    },
  },
};
</script>

<style>
</style>