<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>#CMS GoEdu/Danh sách Vai trò - Quyền</h2>
      </div>
      <Search title="Tìm kiếm" @sentKeyword="sentKeyword"></Search>
      <div>
        <router-link to="/list-policy-rules/them-moi/">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="lstPolicyRules"
        class="elevation-1"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.createdTimestamp`]="{ item }">
          <span>{{ item.createdTimestamp | moment("DD/MM/YYYY HH:mm") }}</span>
        </template>

        <template v-slot:[`item.lastUpdatedTimestamp`]="{ item }">
          <span>{{
            item.lastUpdatedTimestamp | moment("DD/MM/YYYY HH:mm")
          }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          <!-- <span >Sửa</span> -->
          <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
        </template>
      </v-data-table>
    </div>
    <Dialog
      :dialog="dialog"
      @closeDialog="closeDialog"
      :dataPolicy="dataPolicy"
      :listRolePr="listRole"
      :lstPermissionPr="lstPermission"
    ></Dialog>

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
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import Search from "./../../../components/Search";
import Dialog from "../../../components/Dialog";
import Alert from "../../../components/Alert";
export default {
  components: {
    Search,
    Dialog,
    Alert,
  },
  data: () => ({
    headers: [
      {
        text: "RoleId",
        align: "start",
        value: "roleId",
      },
      { text: "RoleName", value: "roleName" },
      { text: "PermissionId", value: "permissionId" },
      { text: "PermissionName", value: "permissionName" },
      { text: "Ngày tạo", value: "createdTimestamp" },
      { text: "Ngày chỉnh sửa", value: "lastUpdatedTimestamp" },
      { text: "Trạng thái", value: "active" },
      { text: "Action", value: "actions", sortable: false },
    ],
    lstPolicyRules: [
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
    role_id: 0,
    permission_id: 0,
    listRole: [],
    lstPermission: [],
    dataRolePermission: [],
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  methods: {
    editItem(item) {
      this.dialog = true;
      this.dataPolicy = item;
      this.getRole(this.query);
      this.getPermission(this.query);
    },
    deleteItem(item) {
      this.role_id = item.roleId;
      this.permission_id = item.permissionId;
      this.dialogDelete = true;
    },
    sentKeyword(e) {},
    getPolicyRules(query) {
      let result = this.$store.dispatch("policy/getPolicyRules", query);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body.data.content);
            this.lstPolicyRules = res.body.data.content;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    closeDialog(e) {
      this.dialog = e;
    },
    handlePageChange(value) {
      this.curentPage = value;
      this.getPolicyRules(this.query);
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItemConfirm() {
      let data = {
        role_id: this.role_id,
        permission_id: this.permission_id,
      };
      this.deletePolicyRules(data);
      this.closeDelete();
    },
    deletePolicyRules(data) {
      let result = this.$store.dispatch("policy/deletePolicyRules", data);
      result.then(
        (res) => {
          alert("Xoá thành công");
          this.getPolicyRules(this.query);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getRole(query) {
      let result = this.$store.dispatch("role/getListRole", query);
      result.then(
        (res) => {
          if (res.body) {
            this.listRole = res.body.data.content;
            // this.dataRolePermission.push(this.listRole);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getPermission(query) {
      let result = this.$store.dispatch("policy/getListPermisson", query);
      result.then(
        (res) => {
          if (res.body) {
            this.lstPermission = res.body.data.content;
            // this.dataRolePermission.push(this.lstPermission);
          }
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
    this.getPolicyRules(this.query);
  },
};
</script>

<style scoped>
</style>