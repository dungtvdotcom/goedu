<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>Danh sách khoá học</h2>
      </div>
      <Search
        title="Tìm kiếm"
        @sentKeyword="sentKeyword"
        @clearFilter="clearFilter"
        @searchEnter="searchEnter"
      ></Search>
      <div>
        <router-link to="/danhsachkhoahoc/them-moi-khoa-hoc">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="listCourse"
        class="elevation-1"
        :hide-default-footer="true"
        :expanded.sync="expanded"
        show-expand
        @item-expanded="loadDetails"
      >
        <template v-slot:[`item.atTime`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <span>{{ item.atTime | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.imgSrc`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <img :src="item.imgSrc" alt="" />
        </template>

        <template v-slot:[`item.banner`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <img :src="item.banner" alt="" />
        </template>

        <template v-slot:[`item.videoSrcPoster`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <img :src="item.videoSrcPoster" alt="" />
        </template>

        <template v-slot:[`item.guide`]="{ item }">
          <p class="text-table mb-0">
            {{ item.guide }}
          </p>
        </template>

        <template v-slot:[`item.active`]="{ item }">
          <v-switch
            value
            :input-value="item.active"
            @click="changeActive(item)"
          ></v-switch>
        </template>

        <template v-slot:[`item.goal`]="{ item }">
          <p class="text-table mb-0">{{ item.goal }}</p>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/danhsachkhoahoc/them-moi-khoa-hoc/' + item.id">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link>
          <!-- <span >Sửa</span> -->
          <!-- <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon> -->
        </template>

        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <v-simple-table class="custom-extended-course">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Tiêu đề ngày</th>
                    <th>Topic</th>
                    <th>Tiêu đề Topic</th>
                    <th>Test</th>
                    <th>Tiêu đề test</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ overviewList[0].day }}</td>
                    <td>{{ overviewList[0].day_title }}</td>
                    <td>{{ overviewList[0].test }}</td>
                    <td>{{ overviewList[0].test_title }}</td>
                    <td>{{ overviewList[0].topic }}</td>
                    <td>{{ overviewList[0].topic_title }}</td>
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

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Bạn muốn xoá khoá học này ?</v-card-title
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
  data: () => ({
    headers: [
      { text: "Id khoá học", value: "id" },
      { text: "Tên khoá học", value: "title" },
      {
        text: "Ảnh đại diện",
        align: "start",
        value: "imgSrc",
      },
      { text: "Tag", value: "tag" },

      { text: "Banner", value: "banner" },
      { text: "Thời gian học", value: "dayNumber" },
      { text: "Tài liệu học tập", value: "document" },
      { text: "Facebook Group", value: "fbGroup" },
      { text: "Hướng dẫn học tập", value: "guide" },
      { text: "Kết quả đạt được", value: "goal" },
      { text: "LandingPage", value: "landingPage" },
      { text: "Số chủ đề", value: "topicNumber" },
      { text: "Số video", value: "videoNumber" },
      { text: "Số bài kiểm tra", value: "testNumber" },
      { text: "Đường dẫn video", value: "videoSrc" },
      { text: "Ảnh video", value: "videoSrcPoster" },
      { text: "Ngày tạo", value: "atTime" },
      { text: "Trạng thái", value: "active" },
      { text: "Action", value: "actions", sortable: false },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    listCourse: [
      {
        image: "Frozen Yogurt",
        listCourse:
          "Thành thạo Excel theo tiêu chuẩn nhân sự ở các Tập đoàn, Tổng Công ty hàng đầu (Cơ bản) ",
        dayNumber: "30 ngày",
        createDate: "10h-23/12/19",
      },
    ],
    dialogDelete: false,
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
    expanded: [],
    overviewList: [],
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      this.dialogDelete = true;
      // this.deleteRole(item.roleId)
      this.courseId = item.id;
    },
    deleteItemConfirm() {
      this.closeDelete();
      this.deleteCourse(this.courseId);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    getListCourse(query) {
      let result = this.$store.dispatch("course/getListCourse", query);
      result.then(
        (res) => {
          if (res.body && res.body.data && res.body.data.content) {
            console.log(res.body);
            this.listCourse = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteCourse(id) {
      // let courseID = {
      //   id: id,
      // };
      let result = this.$store.dispatch("course/deleteCourse", id);
      result.then(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    },
    sentKeyword(e) {
      this.keyWord = e.trim();
      let query = {
        query: `tag=="*${this.keyWord}*",title=="*${this.keyWord}*"`,
        size: 10,
        page: 0,
      };
      this.getListCourse(query);
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getListCourse(this.query);
    },

    changeActive(value) {
      let data = {};
      if (value.active === 1) {
        data = {
          course_id: value.id,
          active: 0,
        };
      } else {
        data = {
          course_id: value.id,
          active: 1,
        };
      }
      this.activeCourse(data);
    },
    activeCourse(data) {
      let result = this.$store.dispatch("course/activeCourse", data);
      result.then(
        (res) => {
          this.getListCourse(this.query);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    loadDetails({ item }) {
      this.overviewList = [];
      let element;
      for (const key in this.listCourse) {
        if (this.listCourse.hasOwnProperty(key)) {
          if (item.id === this.listCourse[key].id) {
            element = this.listCourse[key].overview;
          }
        }
      }
      this.overviewList.push(JSON.parse(element));
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListCourse(this.query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query = {
          query: `tag=="*${this.keyWord}*",title=="*${this.keyWord}*"`,
          size: 10,
          page: 0,
        };
        this.getListCourse(query);
      }
    },
  },
  components: {
    Search,
  },
  created() {
    this.getListCourse(this.query);
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
};
</script>

<style scoped>
.text-table {
  width: 450px !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
.custom-extended-course {
  width: 26%;
}
</style>