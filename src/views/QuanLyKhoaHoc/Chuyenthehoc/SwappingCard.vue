<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between">
        <div class="title-page">
          <h2>Chuyển thẻ học sang user khác</h2>
        </div>
      </div>
    </v-container>

    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <v-col>
            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Nhập mã thẻ</label>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    label="Nhập mã thẻ"
                    v-model="card_code"
                    required
                    :error-messages="card_codeErrors"
                    @input="$v.card_code.$touch()"
                    @blur="checkCard"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Tên đăng nhập</label>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="userName"
                    label="Nhập tên đăng nhập"
                    @blur="getListUser(userName)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Email cũ </label>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="email_from"
                    label="Nhập email cũ"
                    required
                    :error-messages="email_fromErrors"
                    @input="$v.email_from.$touch()"
                    @blur="getListUser"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="col-6">
              <v-row class="align-center">
                <v-col cols="3">
                  <label for="#">Email mới </label>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="email_to"
                    label="Nhập email mới"
                    required
                    :error-messages="email_toErrors"
                    @input="$v.email_to.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <div>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-4 bgc-custom"
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                >
                  Xác nhận
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>

      <div v-if="false">
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
            <!-- <span >Sửa</span> -->
            <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
          </template>
        </v-data-table>
      </div>
    </div>
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import Alert from "../../../components/Alert";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mdiPencil, mdiDelete } from "@mdi/js";
export default {
  mixins: [validationMixin],
  validations: {
    card_code: { required },
    email_from: { required },
    email_to: { required },
  },
  data: () => ({
    card_code: "",
    email_from: "",
    email_to: "",
    userName: "",
    headers: [
      { text: "UserId", value: "userId" },
      { text: "CardId", value: "cardId" },
      { text: "Số", value: "number" },
      { text: "Ngày hết hạn", value: "cardExpiredTime" },
      { text: "Ngày kích hoạt", value: "cardActivedTime" },
      { text: "Tên", value: "userName" },
      { text: "Họ", value: "fullName" },
      { text: "Thẻ", value: "card" },
      { text: "Trạng thái thẻ", value: "cardStatus" },
      { text: "CourseId", value: "courseId" },
      { text: "CourseIds", value: "courseIds" },
      { text: "Học thử", value: "isTrial" },
      { text: "TrialLessonIds", value: "trialLessonIds" },
      { text: "CardActive", value: "cardActive" },
      { text: "Kích hoạt", value: "active" },
      { text: "Action", value: "actions", sortable: false },
    ],
    desserts: [
      // {
      //   topicName: "Chủ đề 1",
      //   describe: "30 ngày",
      //   createDate: "10h-23/12/19",
      // },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
    submitStatus: null,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  methods: {
    swappingUserCard() {
      let data = {
        card_code: this.card_code,
        email_from: this.email_from,
        email_to: this.email_to,
      };
      let result = this.$store.dispatch("code/swappingUserCard", data);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.description);
            this.snackbar = true;
            this.message = res.body.description;
            this.type = "warning";
          }
        },
        (err) => {
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
      } else {
        this.swappingUserCard();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    checkCard() {
      if(this.card_code==null|| this.card_code.length==0){
        this.email_from = ""
        this.email_to = ""
        this.userName = ""
        return
      }
      this.getListUserCard();
    },
    getListUserCard() {
      let query = {
        query: `card=="${this.card_code}"`,
        size: 10,
        page: 0,
      };
      let result = this.$store.dispatch("code/listUserCard", query);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body.data.content);
            if (res.body.data.content.length) {
              this.userName = res.body.data.content[0].userName;
              this.getListUser(this.userName);
            } else {
              alert("Thẻ không tồn tại")
              this.card_code = ""
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getListUser(value) {
      let query = {
        query: `userName=="${value}"`,
        size: 10,
        page: 0,
      };
      let result = this.$store.dispatch("user/getData", query);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body.data.content[0].email);
            this.email_from = res.body.data.content[0].email;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    // this.swappingUserCard();
  },
  computed: {
    card_codeErrors() {
      const errors = [];
      if (!this.$v.card_code.$dirty) return errors;
      !this.$v.card_code.required && errors.push("Mã thẻ không được bỏ trống");
      return errors;
    },
    email_fromErrors() {
      const errors = [];
      if (!this.$v.email_from.$dirty) return errors;
      !this.$v.email_from.required &&
        errors.push("Email cũ không được bỏ trống");
      return errors;
    },
    email_toErrors() {
      const errors = [];
      if (!this.$v.email_to.$dirty) return errors;
      !this.$v.email_to.required &&
        errors.push("Email mới không được bỏ trống");
      return errors;
    },
  },
  components: {
    Alert,
  },
};
</script>
<style scoped>
</style>