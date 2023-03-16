<template>
  <div class="pa-3" style="width: 100%">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>Danh sách ngày học</h2>
      </div>
      <Search
        title="Nhập vào tên khoá học"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search>
      <div>
        <router-link to="/danhsachngayhoc/them-moi-ngay-hoc">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="lstLesson"
        class="elevation-1"
        :expanded.sync="expanded"
        show-expand
        :hide-default-footer="true"
        @item-expanded="loadDetails"
      >
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
          <router-link :to="'/danhsachngayhoc/them-moi-ngay-hoc/' + item.id">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link>
          <!-- <span >Sửa</span> -->
          <!-- <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon> -->
        </template>

        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <v-simple-table class="custom-extended">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Layout</th>
                    <th>Bài tập</th>
                    <th>Ảnh bìa</th>
                    <th>Bài kiểm tra</th>
                    <th>Video</th>
                    <th>Video thực hành</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in contentLesson" :key="index">
                    <td>{{ item.layout }}</td>
                    <td>{{ item.exercise }}</td>
                    <td>
                      <img :src="item.poster" alt="" />
                    </td>
                    <td>{{ item.test }}</td>
                    <td>{{ item.video }}</td>
                    <td>{{ item.video_thuchanh }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
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
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import Alert from "../../../components/Alert";
import { mdiPencil, mdiDelete } from "@mdi/js";
import Search from "./../../../components/Search";
export default {
  data: () => ({
    headers: [
      { text: "Tên ngày học", value: "title" },
      { text: "Ngày học", value: "dayLevel" },
      { text: "Tên khoá học", value: "courseName" },
      { text: "Phần", value: "partLevel" },
      { text: "Ngày tạo", value: "atTime" },
      { text: "Trạng thái", value: "active" },
      { text: "Action", value: "actions", sortable: false },
    ],
    lstLesson: [
      {
        title: "",
        courseName: "",
        atTime: "",
      },
    ],
    expanded: [],
    contentLesson: [],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    getListLesson(query) {
      let result = this.$store.dispatch("lesson/getListLesson", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data.content);
            this.lstLesson = res.body.data.content;
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
      this.getListLesson(this.query);
    },
    activeLesson(data) {
      let result = this.$store.dispatch("lesson/activeLesson", data);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Cập nhập trạng thái thành công";
          this.type = "success";
          this.getListLesson(this.query);
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Cập nhật thất bại, có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    changeActive(value) {
      let data = {};
      if (value.active === 1) {
        data = {
          lesson_id: value.id,
          active: 0,
        };
      } else {
        data = {
          lesson_id: value.id,
          active: 1,
        };
      }
      this.activeLesson(data);
    },
    loadDetails({ item }) {
      this.contentLesson = [];
      let element;
      for (const key in this.lstLesson) {
        if (this.lstLesson.hasOwnProperty(key)) {
          if (item.id === this.lstLesson[key].id) {
            element = this.lstLesson[key].content;
          }
        }
      }
      this.contentLesson = JSON.parse(element);
      // console.log(this.contentLesson);
    },
    sentKeyword(e) {
      this.keyWord = e.trim();
      let query = {
        query: `courseName=="*${this.keyWord}*",title=="*${this.keyWord}*"`,
        size: 10,
        page: 0,
      };
      this.getListLesson(query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query = {
          query: `courseName=="*${this.keyWord}*",title=="*${this.keyWord}*"`,
          size: 10,
          page: 0,
        };
        this.getListLesson(query);
      }
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListLesson(this.query);
    },
  },
  components: {
    Search,
    Alert,
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
    this.getListLesson(this.query);
  },
};
</script>

<style scoped>
</style>