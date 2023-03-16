<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách hướng dẫn</h2>
      </div>
      <Search title="Tìm kiếm" @sentKeyword="sentKeyword" @searchEnter="sentsearchEnterKeyword"></Search>
      <div>
        <router-link to="/huongdankhoahoc">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="lstguide"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <!-- <template v-slot:[`item.createdTimestamp`]="{ item }">
          <span>{{ item.createdTimestamp | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.lastUpdatedTimestamp`]="{ item }">
          <span>{{
            item.lastUpdatedTimestamp | moment("DD/MM/YYYY HH:mm")
          }}</span>
        </template> -->

        <!-- <template v-slot:[`item._source.note`]="{ item }">
          <p class="text-table mb-0">{{ item._source.note }}</p>
        </template> -->

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
          <router-link :to="'/huongdankhoahoc/' + item._id">
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

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Bạn muốn xoá tài liệu này?</v-card-title
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
import Search from "../../components/Search";
import { mdiPencil, mdiDelete } from "@mdi/js";
import Alert from "../../components/Alert";
export default {
  components: {
    Search,
    Alert,
  },
  data: () => ({
    headers: [
      { text: "Action", value: "actions", sortable: false },
      { text: "Tiêu đề", value: "_source.title" },
      { text: "Keyword", value: "_source.keyword", align: "start" },
      { text: "Kind", value: "_source.kind" },
      { text: "Tag", value: "_source.tag" },
      { text: "Ghi chú", value: "_source.note" },
    ],
    lstguide: [
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
    dialog: false,
    dataPolicy: {},
    curentPage: 1,
    totalPage: 1,
    dialogDelete: false,
    guide_id: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    keyWord: "",
    pageSize: 10,
    timer:null,
  }),
  computed: {
    query() {
      return {
        query: "",
        tag: "",
        size: this.pageSize,
        page: this.curentPage - 1,
      };
    },
  },
  methods: {
    sentsearchEnterKeyword(event,value){
      if(this.timer) clearTimeout(this.timer);
      let main = this;
      this.timer = setTimeout(function(){
        main.sentKeyword(value);
        main.timer = null;
      }, 500); 
    },
    sentKeyword(value) {
      this.keyWord = value;
      let query = {
        query: value,
        tag: "",
        size: this.pageSize,
        page: this.curentPage - 1,
      };
      this.guideSearch(query);
    },
    guideSearch(query) {
      let result = this.$store.dispatch("guide/guideSearch", query);
      result.then(
        (res) => {
          if (res.body) {
            let { hits } = res.body.hits;
            this.lstguide = hits;
            // console.log(res.body);
            this.totalPage = Math.floor(
              res.body.hits.total.value / this.pageSize + 1
            );
          }
        },
        (err) => {
        }
      );
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.guideSearch(this.query);
    },
    editItem(item) {
      // console.log(item);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItem(item) {
      // console.log(item);
      this.dialogDelete = true;
      this.guide_id = item._id;
    },
    deleteItemConfirm() {
      this.deleteGuide(this.guide_id);
      this.dialogDelete = false;
    },
    deleteGuide(id) {
      let result = this.$store.dispatch("guide/deleteGuide", id);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Xoá thành công";
          this.type = "success";
          setTimeout(() => {
            this.guideSearch(this.query);
            this.snackbar = false;
          }, 500);
        },
        (err) => {
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
  },
  created() {
    this.guideSearch(this.query);
  },
};
</script>

<style scoped>
.text-table {
  width: 250px !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
</style>