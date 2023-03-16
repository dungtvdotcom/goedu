<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa nhóm quyền" : "Thêm mới nhóm quyền" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Nhập tên quyền</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="roleName"
                  label="Nhập tên quyền"
                  required
                  :error-messages="roleNameErrors"
                  @input="$v.roleName.$touch()"
                  @blur="$v.roleName.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Tên viết tắt</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="roleNameShort"
                  label="Nhập tên viết tắt"
                  required
                  :error-messages="roleNameShortErrors"
                  @input="$v.roleNameShort.$touch()"
                  @blur="$v.roleNameShort.$touch()"
                ></v-text-field>
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
                <label for="#">Ngày sửa</label>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="mtime"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="mtime"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="mtime" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(mtime)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>

          <!-- MÔ TẢ NHÓM QUYỀN -->
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Mô tả nhóm quyền</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="describeRole"
                  label="Nhập mô tả nhóm quyền"
                  required
                ></v-text-field>
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
    roleName: { required },
    roleNameShort: { required, maxLength: maxLength(3) },
  },
  data: () => ({
    roleName: "",
    describeRole: "",
    roleNameShort: "",
    ctime: "",
    mtime: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    submitStatus: null,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  components: {
    Alert,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    roleNameErrors() {
      const errors = [];
      if (!this.$v.roleName.$dirty) return errors;
      !this.$v.roleName.required &&
        errors.push("Tên quyền không được bỏ trống");
      return errors;
    },
    roleNameShortErrors() {
      const errors = [];
      if (!this.$v.roleNameShort.$dirty) return errors;
      !this.$v.roleNameShort.required &&
        errors.push("Tên viết tắt không được bỏ trống");
      !this.$v.roleNameShort.maxLength &&
        errors.push("Tên viết tắt không quá 3 ký tự");
      return errors;
    },
  },
  created() {
    //  console.log(this.$v.$touch())
    if (this.id) {
      this.getData(this.id);
    }
    // console.log(moment.utc(this.date).local().format("YYYY-MM-DD HH:mm"))
    // console.log(moment(this.date).toISOString())
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          this.updateRole();
        } else {
          this.addRole();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    getData(id) {
      let result = this.$store.dispatch("role/getDetailRole", id);
      result.then(
        (res) => {
          if (res.body) {
            let { data } = res.body;
            this.roleName = data.roleName;
            this.roleNameShort = data.roleNameShort;
            this.date = moment(data.ctime).local().format("YYYY-MM-DD");
            this.mtime = moment(data.mtime).local().format("YYYY-MM-DD");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateRole() {
      let data = {
        roleId: this.id,
        roleName: this.roleName,
        roleNameShort: this.roleNameShort,
        cTime: moment(this.date).toISOString(),
        mTime: moment(this.mtime).toISOString(),
        describeRole: this.describeRole,
      };
      let result = this.$store.dispatch("role/updateRole", data);
      result.then(
        (res) => {
          if (res.body) {
            this.snackbar = true;
            this.message = "Cập nhật thành công";
            this.type = "success";
            setTimeout(() => {
              this.getBack();
            }, 1500);
          }
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    addRole() {
      let data = {
        roleId: null,
        roleName: this.roleName,
        roleNameShort: this.roleNameShort,
        cTime: moment(this.date).toISOString(),
        mTime: moment(this.mtime).toISOString(),
        active: "1",
      };
      let result = this.$store.dispatch("role/addRole", data);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body)
            this.snackbar = true;
            this.message = "Thêm mới thành công";
            this.type = "success";
            setInterval(() => {
              this.getBack();
            }, 1500);
          }
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    getBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>