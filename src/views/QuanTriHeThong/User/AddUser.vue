<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa thông tin người dùng" : "Thêm mới người dùng" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <v-row class="align-center">
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="4">
                  <label for="#">Nhập tên tài khoản</label>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="userName"
                    label="Nhập tên tài khoản"
                    required
                    :error-messages="userNameErrors"
                    @input="$v.userName.$touch()"
                    @blur="$v.userName.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <!-- HỌ VÀ TÊN -->
            <div class="col-6 d-flex align-center">
              <!-- HỌ -->
              <div class="col-6">
                <v-row class="align-center">
                  <v-col cols="2">
                    <label for="#">Họ</label>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field
                      v-model="lastName"
                      label="Nhập tên người dùng"
                      required
                      :error-messages="lastNameErrors"
                      @input="$v.lastName.$touch()"
                      @blur="$v.lastName.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <!-- TÊN -->
              <div>
                <v-row class="align-center">
                  <v-col cols="2">
                    <label for="#">Tên</label>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field
                      v-model="firstName"
                      label="Nhập tên người dùng"
                      required
                      :error-messages="firstNameErrors"
                      @input="$v.firstName.$touch()"
                      @blur="$v.firstName.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-row>

          <!-- ROW 2 -->
          <v-row class="align-center">
            <!-- EMAIL -->
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="4">
                  <label for="#">Email</label>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="email"
                    label="Nhập email"
                    required
                    type="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <!-- SĐT -->
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Số điện thoại</label>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="mobile"
                    label="Nhập số điện thoại"
                    required
                    type="email"
                    :error-messages="mobileErrors"
                    @input="$v.mobile.$touch()"
                    @blur="$v.mobile.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>

          <!-- ROW 3 -->
          <v-row>
            <div class="col-6 d-flex align-center">
              <div class="col-6">
                <v-row class="align-center">
                  <v-col cols="2">
                    <label for="#">Tuổi</label>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field
                      v-model="age"
                      label="Nhập tuổi"
                      required
                      :error-messages="ageErrors"
                      @input="$v.age.$touch()"
                      @blur="$v.age.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <div class="col-6">
                <v-row class="align-center">
                  <v-col cols="4">
                    <label for="#">Giới tính</label>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      :items="sex"
                      dense
                      label="Chọn giới tính"
                      required
                      :error-messages="sexErrors"
                      @input="$v.sexValue.$touch()"
                      @blur="$v.sexValue.$touch()"
                      v-model="sexValue"
                      item-text="state"
                      item-value="abbr"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Công việc</label>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="jobTitle"
                    label="Nhập công việc"
                    required
                    type="email"
                    :error-messages="jobTitleErrors"
                    @input="$v.jobTitle.$touch()"
                    @blur="$v.jobTitle.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>

          <!-- ROW 4 -->
          <v-row>
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Ngày sinh</label>
                </v-col>
                <v-col cols="9">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="bod"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="bod"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="bod" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(bod)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="2">
                  <label for="#">Địa chỉ</label>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                    v-model="address"
                    label="Nhập tên địa chỉ"
                    required
                    :error-messages="addressErrors"
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>

          <!-- ROW 5 NGÀY THÁNG-->
          <v-row>
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Ngày tạo</label>
                </v-col>
                <v-col cols="9">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="cTime"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="cTime"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="cTime" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(cTime)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Ngày chỉnh sửa</label>
                </v-col>
                <v-col cols="9">
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :return-value.sync="mTime"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="mTime"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="mTime" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu3 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu3.save(mTime)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
          </v-row>

          <!-- ROW 6 -->
          <v-row>
            <!-- MẬT KHẨU -->
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Tạo mật khẩu</label>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="password"
                    label="Nhập mật khẩu"
                    required
                    type="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :disabled="isUpdate"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <!-- XÁC NHẬN MẬP KHẨU -->
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="4">
                  <label for="#">Xác nhận mật khẩu</label>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="repeatPassword"
                    label="Xác nhận mật khẩu"
                    required
                    type="password"
                    :error-messages="repeatPasswordErrors"
                    @input="$v.repeatPassword.$touch()"
                    @blur="$v.repeatPassword.$touch()"
                    :disabled="isUpdate"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>

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
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import moment from "moment";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    userName: { required },
    lastName: { required },
    firstName: { required },
    email: { required, email },
    password: { required },
    repeatPassword: { required, sameAsPassword: sameAs("password") },
    mobile: { required, minLength: minLength(10), maxLength: maxLength(10) },
    age: { required },
    sexValue: { required },
    jobTitle: { required },
    address: { required },
  },
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    submitStatus: null,
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    mobile: "",
    isUpdate: false,
    address: "",
    age: 0,
    sex: [
      { state: "Nam", abbr: 1 },
      { state: "Nữ", abbr: 0 },
    ],
    jobTitle: "",
    bod: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    menu3: false,
    cTime: new Date().toISOString().substr(0, 10),
    mTime: new Date().toISOString().substr(0, 10),
    sexValue: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    statusInput: false,
    noneUpdate: true,
  }),
  components: {
    Alert,
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        // console.log(this.submitStatus);
      } else {
        console.log("okookk");
        this.addUser();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    addUser() {
      let data = {
        userId: null,
        userName: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobile: this.mobile,
        address: this.address,
        age: this.age,
        sex: this.sexValue,
        bod: moment(this.bod).toISOString(),
        jobTitle: this.jobTitle,
        cTime: moment(this.cTime).toISOString(),
        mTime: moment(this.mTime).toISOString(),
        active: 1,
        apiDoc: 0,
        imageUrl: "0.png",
        resetPassword: true,
      };
      let result = this.$store.dispatch("user/addUser", data);
      result.then(
        (res) => {
          if (res.body) {
            this.snackbar = true;
            this.message = "Thêm mới thành công";
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
      // console.log(data);
    },
    updateUser() {
      let data = {
        userId: this.id,
        userName: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobile: this.mobile,
        address: this.address,
        age: this.age,
        sex: this.sexValue,
        bod: moment(this.bod).toISOString(),
        jobTitle: this.jobTitle,
        cTime: moment(this.cTime).toISOString(),
        mTime: moment(this.mTime).toISOString(),
        active: 1,
        apiDoc: 0,
        imageUrl: "0.png",
        resetPassword: true,
      };
      let result = this.$store.dispatch("user/updateUser", data);
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
        }
      );
    },
    getDetailUser(id) {
      let result = this.$store.dispatch("user/getDetailUser", id);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            let { data } = res.body;
            this.userName = data.userName;
            this.password = data.password;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.mobile = data.mobile;
            this.email = data.email;
            this.mobile = data.mobile;
            this.address = data.address;
            this.age = data.age;
            this.sexValue = data.sex;
            this.bod = moment(data.bod).local().format("YYYY-MM-DD");
            this.jobTitle = data.jobTitle;
            this.cTime = moment(data.cTime).local().format("YYYY-MM-DD");
            this.mTime = moment(data.mTime).local().format("YYYY-MM-DD");
            this.active = data.active;
            this.apiDoc = data.apiDoc;
            this.imageUrl = data.imageUrl;
            this.resetPassword = data.resetPassword;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getBack() {
      this.$router.go(-1);
    },
    disableInput() {
      if (this.id) {
        this.statusInput = true;
      }
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Không đúng định dạng");
      !this.$v.email.required && errors.push("Email không được bỏ trống");
      return errors;
    },
    sexErrors() {
      const errors = [];
      if (!this.$v.sexValue.$dirty) return errors;
      !this.$v.sexValue.required &&
        errors.push("Giới tính không được bỏ trống");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Họ không được bỏ trống");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("Tên không được bỏ trống");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Địa chỉ không được bỏ trống");
      return errors;
    },
    mobileErrors() {
      const errors = [];
      if (!this.$v.mobile.$dirty) return errors;
      !this.$v.mobile.required &&
        errors.push("Số điện thoại không được bỏ trống");
      !this.$v.mobile.minLength &&
        errors.push("Số điện thoại phải có 10 ký tự");
      return errors;
    },
    userNameErrors() {
      const errors = [];
      if (!this.$v.userName.$dirty) return errors;
      !this.$v.userName.required &&
        errors.push("Tên tài khoản không được bỏ trống");
      return errors;
    },

    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) return errors;
      !this.$v.age.required && errors.push("Tuổi không được bỏ trống");
      return errors;
    },
    jobTitleErrors() {
      const errors = [];
      if (!this.$v.jobTitle.$dirty) return errors;
      !this.$v.jobTitle.required &&
        errors.push("Tên chức vụ không được bỏ trống");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Mật khẩu không được bỏ trống");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.required && errors.push("Hãy nhập lại mật khẩu");
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Mật khẩu không trùng khớp");
      return errors;
    },
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    if (this.id) {
      this.getDetailUser(this.id);
      this.noneUpdate = false;
      // console.log(this.noneUpdate);
    }
  },
};
</script>

<style scoped>
.d-none {
  display: none;
}
</style>