<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>#CMS GoEdu/Tra cứu mã kích hoạt</h2>
        </div>
      </div>
      <div>
        <Search
          title="Nhập mã thẻ hoặc id của thẻ"
          @sentKeyword="sentKeyword"
          @searchEnter="searchEnter"
        ></Search>
      </div>
      <h4>Kết quả tìm kiếm</h4>
      <div class="mt-3">
        <v-data-table
          :headers="headers"
          :items="card"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:[`item.is_trial`]="{ item }">
            <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
            <span>{{ item.is_trial }}</span>
          </template>
          <template v-slot:[`item.atTime`]="{ item }">
            <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
            <span>{{ item.atTime | moment("DD/MM/YYYY HH:mm") }}</span>
          </template>
        </v-data-table>
      </div>
    </v-container>

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
  </div>
</template>

<script>
import Search from "./../../components/Search";
export default {
  components: {
    Search,
  },
  methods: {
    searchCard(query) {
      let result = this.$store.dispatch("takecare/searchCard", query);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data.content);
            this.card = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    sentKeyword(e) {
      this.keyWord = e.trim();
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
      this.searchCard(query);
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.searchCard(this.query);
    },
    // clearFilter() {
    //   this.searchCard(this.query);
    // },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
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
        this.searchCard(query);
      }
    },
  },
  data: () => ({
    keyWord: "",
    headers: [
      { text: "Id", value: "id" },
      { text: "Card", value: "card" },
      { text: "Số lượng mã", value: "number" },
      { text: "Trạng thái", value: "status" },
      { text: "Tag", value: "tag" },
      { text: "Trạng thái học thử", value: "is_trial" },
      { text: "Ngày tạo", value: "atTime" },
    ],
    card: [
      {
        Id: "",
        card: "",
        is_trial: "",
        number: "",
        status: "",
        tag: "",
        atTime: "",
      },
    ],
    curentPage: 1,
    totalPage: 1,
  }),
  computed: {
    // query() {
    //   return {
    //     query: `card=="${this.keyWord}",id==${this.keyWord}`,
    //     size: 10,
    //     page: this.curentPage - 1,
    //   };
    // },
  },
  created() {},
};
</script>

<style scoped>
</style>