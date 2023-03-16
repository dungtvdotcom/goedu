<template>
  <v-container>
    <div class="form-login">
      <h3>Xin chào, bạn đang đăng nhập vào hệ thống quản trị khoá học GOEdu</h3>
      <v-form @submit.prevent="submit">
        <div>
          <v-text-field
            placeholder="Tên đăng nhập"
            v-model="username"
            required
            :error-messages="userNameErrors"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            placeholder="Mật khẩu"
            type="password"
            v-model="password"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </div>

        <div>
          <v-row>
            <v-col cols="12">
              <v-btn
                class="mr-4 w-100 bgc-custom"
                type="submit"
              >
                Đăng nhập
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </div>
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Alert from "../Alert";
export default {
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required },
  },
  components: {
    Alert,
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.handleSubmit();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
      // this.$v.$touch()
      // this.handleSubmit();
    },
    handleSubmit() {
      // console.log(this.username + this.password);
      let authorization =
        "Basic " + window.btoa(`${this.username}:${this.password}`);
      let data = { Authorization: authorization };
      console.log(data);
      //dispatch
      this.$store.dispatch("auth/getAuth", data).then(
        (res) => {
          const { access_token } = res.body;
          if (access_token) {
            //set localstore
            localStorage.setItem("user_loged", "Bearer " + access_token);
            this.snackbar = true;
            this.message = "Đăng nhập thành công";
            this.type = "success";
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
          } else {
            // alert("Đã có lỗi xảy ra");
            this.snackbar = true;
            this.message = "Đã có lỗi xảy ra. Đăng nhập thất bại";
            this.type = "error";
          }
        },
        (err) => {
          console.log("error", err);
          // alert("Đang nhập thất bại");
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra. Đăng nhập thất bại";
          this.type = "error";
        }
      );
    },
  },
  data: () => ({
    username: "",
    password: "",
    obj: {
      Authorization: null,
      //   "client-id": "VP3CPVsyEiGCqTn1CXcwotBc1BL5oP1x",
      //   "client-secret": "81jiwAcOSNGF01smtRxcEh1fm5Z8J6mr",
    },
    submitStatus: null,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  computed: {
    userNameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Hãy nhập tên tài khoản");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Hãy nhập mật khẩu");
      return errors;
    },
  },
};
</script>

<style scoped>
.form-login {
  max-width: 400px;
  margin: 100px auto;
}
</style>