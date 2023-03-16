<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách vai trò</h2>
      </div>
      <Search
        title="Nhập vào nhóm vai trò"
        @sentKeyword="sentKeyword"
        @searchEnter="searchEnter"
        @clearFilter="clearFilter"
      ></Search>
      <div>
        <router-link to="/role/them-moi-nhom-quyen">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="listRole"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.ctime`]="{ item }">
          <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
          <span>{{ item.ctime | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="'/role/them-moi-nhom-quyen/' + item.roleId">
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
import { mdiPencil, mdiDelete } from "@mdi/js";
import Search from "./../../../components/Search";
export default {
  components: {
    Search,
  },
  data: () => ({
    headers: [
      { text: "Nhóm quyền", value: "roleName" },
      { text: "Tên viết tắt", value: "roleNameShort" },
      { text: "Ngày tạo", value: "ctime" },
      { text: "Action", value: "actions", sortable: false },
    ],
    listRole: [
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
    roleId: null,
    curentPage: 1,
    totalPage: 1,
    keyWord: "",
  }),
  methods: {
    editItem(item) {
      // console.log(item);
    },
    deleteItem(item) {
      this.dialogDelete = true;
      // this.deleteRole(item.roleId)
      this.roleId = item.roleId;
    },
    deleteItemConfirm() {
      this.closeDelete();
      this.deleteRole(this.roleId);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    getRole(query) {
      let result = this.$store.dispatch("role/getListRole", query);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body.data.content);
            this.listRole = res.body.data.content;
            this.totalPage = res.body.data.totalPages;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteRole(id) {
      let result = this.$store.dispatch("role/deleteRole", id);
      result.then(
        (res) => {
          // alert('delete done')
          this.getRole();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getRole(this.query);
    },
    sentKeyword(e) {
      this.keyWord = e;
      let query = {
        query: "roleName==" + this.keyWord,
        size: 10,
        page: 0,
      };
      this.getRole(query);
    },
    searchEnter(e, search) {
      if (e.keyCode === 13) {
        this.keyWord = search.trim();
        let query = {
          query: `roleName==${this.keyWord}`,
          size: 10,
          page: 0,
        };
        this.getRole(query);
      }
      this.keyWord = search;
    },
    clearFilter(e) {
      this.keyWord = e;
      this.getRole(this.query);
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
    this.getRole(this.query);
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>

<style scoped>
</style>