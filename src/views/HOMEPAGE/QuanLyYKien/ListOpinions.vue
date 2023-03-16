<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Quản lý ý kiến</h2>
      </div>
      <Search title="Nhập vào tên ý kiến"></Search>
      <div>
        <router-link to="/danh-sach-y-kien/them-moi/">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="listOpinion"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.active`]="{ item }">
          <span>{{
            item.active === true ? "Kích hoạt" : "Không kích hoạt"
          }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/danh-sach-y-kien/them-moi/' + item.id">
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
  icons: {
    mdiPencil,
    mdiDelete,
  },
  data: () => ({
    headers: [
      { text: "Số thứ tự", value: "stt" },
      { text: "Tiêu đề", value: "title" },
      { text: "Đường dẫn", value: "path" },
      { text: "Ngày tạo", value: "createdTimestamp" },
      { text: "Ngày sửa", value: "modifiedTimestamp" },
      { text: "Source", value: "source" },
      { text: "Trạng thái", value: "active" },
      { text: "Mô tả", value: "description" },
      { text: "Action", value: "actions", sortable: false },
    ],
    listOpinion: [
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
      this.dialogDelete = true;
      this.ItemId = item.id;
    },
    deleteItemConfirm() {
      this.closeDelete();
      this.deleteOpinion(this.ItemId);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getListOpinions(this.query);
    },
    clearFilter(e) {},
    sentKeyword(e) {},
    searchEnter(e, search) {},
    getListOpinions(query) {
      this.$store.dispatch("opnions/getListOpinions", query).then(
        (res) => {
          if (res.body) {
            console.log(res.body.data.content);
            this.listOpinion = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    deleteOpinion(id) {
      this.$store.dispatch("opnions/deleteOpinion", id).then(
        () => {
          this.getListOpinions(this.query);
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
    this.getListOpinions(this.query);
  },
};
</script>

<style>
</style>