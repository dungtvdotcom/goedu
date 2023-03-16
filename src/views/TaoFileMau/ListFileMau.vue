<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách File mẫu</h2>
      </div>
      <Search
        title="Nhập vào tên File mẫu"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search>
      <div>
        <router-link to="/listfilemau/addfile">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="listFile"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.image`]="{ item }">
          <!-- <span>{{ item.image }}</span> -->
          <img :src="item.image" alt="#" />
        </template>

        <template v-slot:[`item.atTime`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <span>{{ item.atTime | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.active`]="{ item }">
          <v-switch
            value
            :input-value="item.active"
            @click="changeActive(item)"
          ></v-switch>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/listfilemau/addfile/' + item.id">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link>
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
        <v-card-title class="headline">Bạn muốn xoá file này ?</v-card-title>
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
import Search from "../../components/Search";
import Alert from "../../components/Alert";
export default {
  components: {
    Search,
    Alert,
  },
  data: () => ({
    headers: [
      { text: "Tên File", value: "title" },
      { text: "Ảnh", value: "image" },
      { text: "Template", value: "template" },
      { text: "Tag", value: "tag" },
      { text: "Trạng thái", value: "active" },
      { text: "Mô tả", value: "description" },
      { text: "Ngày tạo", value: "atTime" },
      { text: "Action", value: "actions", sortable: false },
    ],
    listFile: [
      {
        title: "",
        template: "",
        atTime: Date,
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    dialogDelete: false,
    idFile: null,
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  methods: {
    getListLibrary(query) {
      let result = this.$store.dispatch("library/getListLibrary", query);
      result.then(
        (res) => {
          if (res.body) {
            this.listFile = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
            console.log(res.body.data.content);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      this.dialogDelete = true;
      // this.deleteFile(item.id)
      this.idFile = item.id;
    },
    deleteItemConfirm() {
      this.closeDelete();
      this.deleteFile(this.idFile);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteFile(id) {
      let result = this.$store.dispatch("library/deleteFile", id);
      result.then(
        (res) => {
          this.getListLibrary();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getListLibrary(this.query);
    },
    activeFile(data) {
      let result = this.$store.dispatch("library/activeFile", data);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Chuyển trạng thái thành công";
          this.type = "success";
          this.getListLibrary(this.query);
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    changeActive(value) {
      let data = {};
      if (value.active === 1) {
        data = {
          template_id: value.id,
          active: 0,
        };
      } else {
        data = {
          template_id: value.id,
          active: 1,
        };
      }
      this.activeFile(data);
    },
    sentKeyword(e) {
      this.keyWord = e.trim();
      let query = {
        query: `tag=="*${this.keyWord}*",title=="*${this.keyWord}*"`,
        size: 10,
        page: 0,
      };
      this.getListLibrary(query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query = {
          query: `tag=="*${this.keyWord}*",title=="*${this.keyWord}*"`,
          size: 10,
          page: 0,
        };
        this.getListLibrary(query);
      }
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListLibrary(this.query);
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
    this.getListLibrary(this.query);
  },
};
</script>
 
 <style scoped>
</style>