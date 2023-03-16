<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách mã kích hoạt</h2>
      </div>
      <Search
        title="Nhập Id thẻ hoặc mã thẻ"
        @sentKeyword="sentKeyword"
        @clearFilter="clearFilter"
        @searchEnter="searchEnter"
      ></Search>
      <div>
        <router-link to="/code/them-ma-kich-hoat">
          <v-btn depressed> Nhập danh sách mã kích hoạt </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="listCard"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.atTime`]="{ item }">
          <span>{{ item.atTime | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.mtime`]="{ item }">
          <span>{{ item.mtime | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.isTrial`]="{ item }">
          <span>{{ item.isTrial === true ? "Học thử" : "Không học thử" }}</span>
        </template>

        <template v-slot:[`item.active`]="{ item }">
          <!-- <span>{{ item.active }}</span> -->
          <v-switch
            value
            :input-value="item.active"
            @click="changeActiveCode(item)"
          ></v-switch>
        </template>

        <!-- <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/role/them-moi-nhom-quyen/' + item.Id">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          </router-link>
          <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          <span >Sửa</span>
          <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
        </template> -->
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
                  class="mt-4"
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

    <!-- <div>
      <Alert></Alert>
    </div> -->
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import Search from "./../../../components/Search";
// import Alert from "./../../../components/Alert";
export default {
  components: {
    Search,
    // Alert,
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Mã thẻ", value: "card" },
      { text: "Ngày tạo", value: "atTime" },
      { text: "Ngày hết hạn", value: "number" },
      { text: "Tag", value: "tag" },
      { text: "Trạng thái in", value: "status" },
      { text: "Trạng thái học thử", value: "isTrial" },
      { text: "Bài học thử", value: "trialLessonIds" },
      { text: "Trạng thái", value: "active" },
      { text: "Ngày chỉnh sửa", value: "mtime" },
      // { text: "Action", value: "actions", sortable: false },
    ],
    listCard: [
      {
        card: "",
        course: "Excel 1",
        number: Number,
        tag: "",
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
    snackbar: true,
    text: `Hello, I'm a snackbar`,
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    getListCode(query) {
      let result = this.$store.dispatch("code/getListCode", query);
      result.then(
        (res) => {
          if (res.body) {
            this.listCard = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
            // console.log(res.body.data.content);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    // CHANGE ACTIVE THẺ
    activeCode(data) {
      let result = this.$store.dispatch("code/activeCode", data);
      result.then(
        (res) => {
          this.getListCode(this.query);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeActiveCode(item) {
      console.log(item);
      let data = {};
      if (item.active === 1) {
        data = {
          card_id: item.id,
          active: 0,
        };
      } else {
        data = {
          card_id: item.id,
          active: 1,
        };
      }
      this.activeCode(data);
    },

    handlePageChange(value) {
      this.curentPage = value;
      this.getListCode(this.query);
    },

    sentKeyword(e) {
      this.keyWord = e;
      let query;
      if (parseInt(this.keyWord)) {
        query = {
          query: `id==${this.keyWord}`,
          size: 10,
          page: 0,
        };
      } else {
        query = {
          query: `card=="${this.keyWord}"`,
          size: 10,
          page: 0,
        };
      }
      this.getListCode(query);
      // console.log(query);
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getListCode(this.query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search;
        let query;
        if (parseInt(this.keyWord)) {
          query = {
            query: `id==${this.keyWord}`,
            size: 10,
            page: 0,
          };
        } else {
          query = {
            query: `card=="${this.keyWord}"`,
            size: 10,
            page: 0,
          };
        }
        this.getListCode(query);
      }
    },
  },
  computed: {
    query() {
      return {
        query: "",
        page: this.curentPage - 1,
        size: 10,
      };
    },
  },
  created() {
    this.getListCode(this.query);
  },
};
</script>

<style scoped>
</style>