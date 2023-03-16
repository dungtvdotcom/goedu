<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa nhóm quyền" : "Phân quyền tài khoản" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">User Name</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="lstUser"
                  item-text="userName"
                  item-value="userId"
                  dense
                  v-model="userId"
                  required
                  :error-messages="userIdErrors"
                  @input="$v.userId.$touch()"
                  @blur="$v.userId.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Quyền</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="lstRole"
                  item-text="roleName"
                  item-value="roleId"
                  dense
                  v-model="roleId"
                  required
                  :error-messages="roleIdErrors"
                  @input="$v.roleId.$touch()"
                  @blur="$v.roleId.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Ngày tạo</label>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row>
              <v-col cols="12">
                <v-btn class="mr-4 bgc-custom" type="submit"> Xác nhận </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import moment from "moment";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    userId: { required },
    roleId: { required },
  },
  components: {
    Alert,
  },
  data: () => ({
    lstUser: [],
    lstRole: [],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    userId: "",
    roleId: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  methods: {
    getUser() {
      let result = this.$store.dispatch("user/getData", { ...this.query });
      result.then(
        (res) => {
          if (res.body) {
            this.lstUser = res.body.data.content;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getRole() {
      let result = this.$store.dispatch("role/getListRole", { ...this.query });
      result.then(
        (res) => {
          this.lstRole = res.body.data.content;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addRoleUser() {
      let data = {
        roleId: this.roleId,
        userId: this.userId,
        cTime: moment(this.cTime).toISOString(),
      };
      let result = this.$store.dispatch("role/addRoleUser", data);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Thêm mới thành công";
          this.type = "success";
          setTimeout(() => {
            this.getBack();
          }, 1500);
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log(this.submitStatus);
      } else {
        this.addRoleUser();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    getBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    query() {
      return {
        query: "",
        size: 10,
        page: 0,
      };
    },
    userIdErrors() {
      const errors = [];
      if (!this.$v.userId.$dirty) return errors;
      !this.$v.userId.required && errors.push("Hãy chọn tài khoản");
      return errors;
    },
    roleIdErrors() {
      const errors = [];
      if (!this.$v.roleId.$dirty) return errors;
      !this.$v.roleId.required && errors.push("Hãy chọn nhóm quyền");
      return errors;
    },
  },
  created() {
    this.getUser();
    this.getRole();
  },
};
</script>