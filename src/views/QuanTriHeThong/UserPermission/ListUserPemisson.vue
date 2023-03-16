<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/User-Permission</h2>
      </div>
      <Search title="Permisson name" @sentKeyword="sentKeyword"></Search>
      <!-- <div>
        <router-link to="">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div> -->
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="lstUserPermission"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <!-- <template v-slot:[`header.image`]="{ header }">
          {{ header.text.toUpperCase() }}
        </template> -->

        <template v-slot:[`item.permissionCreatedTimestamp`]="{ item }">
          <span>{{
            item.permissionCreatedTimestamp | moment("DD/MM/YYYY HH:mm")
          }}</span>
        </template>

        <template v-slot:[`item.roleCreatedTimestamp`]="{ item }">
          <span>{{
            item.roleCreatedTimestamp | moment("DD/MM/YYYY HH:mm")
          }}</span>
        </template>

        <template v-slot:[`item.permissionLastUpdatedTimestamp`]="{ item }">
          <span>{{
            item.permissionLastUpdatedTimestamp | moment("DD/MM/YYYY HH:mm")
          }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
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
      {
        text: "UserId",
        align: "start",
        value: "userId",
      },
      { text: "RoleId", value: "roleId" },
      { text: "Ngày tạo role", value: "roleCreatedTimestamp" },
      { text: "PermissionId", value: "permissionId" },
      { text: "PermissionCode", value: "permissionCode" },
      { text: "PermissionName", value: "permissionName" },
      { text: "PermissionPattern", value: "permissionPattern" },
      { text: "Ngày tạo Permission", value: "permissionCreatedTimestamp" },
      { text: "Ngày sửa Permission", value: "permissionLastUpdatedTimestamp" },
      { text: "PermissionIsWeb", value: "permissionIsWeb" },
      { text: "PolicyActive", value: "policyActive" },
      { text: "Action", value: "actions", sortable: false },
    ],
    lstUserPermission: [
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
    curentPage: 1,
    totalPage: 1,
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    sentKeyword() {},

    getUserPermission(query) {
      let result = this.$store.dispatch("policy/getUserPermission", query);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body);
            this.lstUserPermission = res.body.data.content;
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
      this.getUserPermission(this.query);
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
    this.getUserPermission(this.query);
  },
};
</script>