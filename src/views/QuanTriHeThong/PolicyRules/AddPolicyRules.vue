<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa nhóm quyền" : "Thêm mới" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Permission</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="lstPermission"
                  item-text="code"
                  item-value="id"
                  dense
                  v-model="permissionId"
                  required
                  :error-messages="permissionIdErrors"
                  @input="$v.permissionId.$touch()"
                  @blur="$v.permissionId.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Role</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="listRole"
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
                <label for="#">Trạng thái</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="listActive"
                  item-text="activeText"
                  item-value="activeValue"
                  dense
                  v-model="active"
                  required
                  :error-messages="activeErrors"
                  @input="$v.active.$touch()"
                  @blur="$v.active.$touch()"
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
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Ngày chỉnh sửa</label>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="date2"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date2"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(date2)"
                    >
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
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import moment from "moment";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    roleId: { required },
    permissionId: { required },
    active: { required },
  },
  components: {
    Alert,
  },
  data: () => ({
    listRole: [],
    lstPermission: [],
    permissionId: "",
    roleId: "",
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    date2: new Date().toISOString().substr(0, 10),
    submitStatus: null,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    active: "",
    listActive: [
      { activeText: "Kích hoạt", activeValue: 1 },
      { activeText: "Không kích hoạt", activeValue: 0 },
    ],
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    query() {
      return {
        query: "",
        size: 100,
        page: 0,
      };
    },
    roleIdErrors() {
      const errors = [];
      if (!this.$v.roleId.$dirty) return errors;
      !this.$v.roleId.required && errors.push("Hãy chọn nhóm quyền");
      return errors;
    },
    permissionIdErrors() {
      const errors = [];
      if (!this.$v.permissionId.$dirty) return errors;
      !this.$v.permissionId.required && errors.push("Hãy chọn nhóm quyền");
      return errors;
    },
    activeErrors() {
      const errors = [];
      if (!this.$v.active.$dirty) return errors;
      !this.$v.active.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          // this.updateRole();
        } else {
          this.addPolicyRules();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },

    getDetails(id) {
      let result = this.$store.dispatch("policy/getDetails", id);
      result.then(
        (res) => {
          if (res.body) {
            let { data } = res.body;
            console.log(res.body.data);
            this.roleId = data.roleId;
            this.permissionId = data.permissionId;
            this.date = moment(data.createdTimestamp)
              .local()
              .format("YYYY-MM-DD");
            this.date2 = moment(data.lastUpdatedTimestamp)
              .local()
              .format("YYYY-MM-DD");
            this.active = data.active;
          }
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
            console.log(res.body.data.content);
            this.listRole = res.body.data.content;
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
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addPolicyRules() {
      let data = {
        roleId: this.roleId,
        permissionId: this.permissionId,
        createdTimestamp: moment(this.date).toISOString(),
        lastUpdatedTimestamp: moment(this.date2).toISOString(),
        active: this.active,
      };
      let result = this.$store.dispatch("policy/addPolicyRules", data);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Thêm mới thành công";
          this.type = "success";
          setTimeout(() => {
            this.snackbar = false;
            this.getBack();
          }, 1500);
        },
        (err) => {
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
          setTimeout(() => {
            this.snackbar = false;
          }, 1500);
        }
      );
      console.log(data);
    },
    getBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getRole(this.query);
    this.getPermission(this.query);
    if (this.id) {
      this.getDetails(this.id);
    }
  },
};
</script>
