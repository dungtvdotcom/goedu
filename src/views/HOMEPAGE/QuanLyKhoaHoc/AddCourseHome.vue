<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa Blog" : "Thêm mới Blog" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <form @submit.prevent="submit">
        <v-container>
          <v-row class="align-center">
            <div class="col-3">
              <v-col cols="5">
                <label for="#">Nhập số thứ tự</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="stt"
                  label="Nhập STT"
                  required
                  :error-messages="sttErrors"
                  @input="$v.stt.$touch()"
                  @blur="$v.stt.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="4">
                <label for="#">Nhập tên</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Nhập tên"
                  required
                  :error-messages="nameErrors"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="4">
                <label for="#">Nhập tiêu đề</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Nhập tên tiêu đề"
                  required
                  :error-messages="titleErrors"
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
            </div>
            <div class="col-3">
              <v-col cols="2">
                <label for="#">Banner</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="banner"
                  label="Nhập banner"
                  required
                  :error-messages="bannerErrors"
                  @input="$v.banner.$touch()"
                  @blur="$v.banner.$touch()"
                ></v-text-field>
              </v-col>
            </div>
          </v-row>

          <v-row class="align-center">
            <div class="col-3">
              <v-col cols="4">
                <label for="#">Đường dẫn</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="link"
                  label="Nhập đường dẫn"
                  required
                  :error-messages="linkErrors"
                  @input="$v.link.$touch()"
                  @blur="$v.link.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="6">
              <v-col cols="5">
                <label for="#">Trạng thái</label>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="itemsActive"
                  label="Trạng thái"
                  v-model="active"
                  item-text="label"
                  item-value="value"
                ></v-select>
              </v-col>
            </div>
          </v-row>

          <div class="upload-img">
            <FileUpload
              :idd="'coursesImages'"
              :fileTag="'courses'"
              @linkBanner="getLinkBanner"
            ></FileUpload>
          </div>

          <div class="col-9">
            <v-col>
              <label for="#">Mô tả</label>
            </v-col>
            <v-textarea
              solo
              name="input-7-4"
              label="Nhập mô tả"
              v-model="description"
            ></v-textarea>
          </div>
        </v-container>
        <div>
          <v-row>
            <v-col cols="12">
              <v-btn class="mr-4 bgc-custom" type="submit"> Xác nhận </v-btn>
            </v-col>
          </v-row>
        </div>
      </form>
    </div>
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import FileUpload from "../util/FileUpload";
import { controllers } from "chart.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    banner: { required },
    link: { required },
    stt: { required },
    name: { required },
  },
  components: {
    Alert,
    FileUpload,
  },
  data: () => ({
    title: "",
    banner: "",
    link: "",
    stt: "",
    name: "",
    description: "",
    createdTimestamp: "",
    modifiedTimestamp: "",
    itemsActive: [
      { label: "Không kích hoạt", value: false },
      { label: "Kích hoạt", value: true },
    ],
    active: true,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Tiêu đề không được bỏ trống");
      return errors;
    },
    bannerErrors() {
      const errors = [];
      if (!this.$v.banner.$dirty) return errors;
      !this.$v.banner.required && errors.push("Banner không được bỏ trống");
      return errors;
    },
    linkErrors() {
      const errors = [];
      if (!this.$v.link.$dirty) return errors;
      !this.$v.link.required && errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
    sttErrors() {
      const errors = [];
      if (!this.$v.stt.$dirty) return errors;
      !this.$v.stt.required && errors.push("Số thứ tự không được bỏ trống");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Tên không được bỏ trống");
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
          this.updateCourseHome();
        } else {
          this.createCourseHome();
        }

        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    createCourseHome() {
      let data = {
        name: this.name,
        link: this.link,
        banner: this.banner,
        title: this.title,
        description: this.description,
        stt: this.stt,
        active: this.active,
      };
      this.$store.dispatch("courseHome/createCourseHome", data).then(
        (res) => {
          if (res.body) {
            console.log(data);
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
    },
    getListCourseHomeId() {
      this.$store.dispatch("courseHome/getListCourseHomeId", this.id).then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            let { data } = res.body;
            this.active = true;
            this.banner = data.banner;
            this.createdTimestamp = data.createdTimestamp;
            this.modifiedTimestamp = data.modifiedTimestamp;
            this.name = data.name;
            this.stt = data.stt;
            this.title = data.title;
            this.description = data.description;
            this.link = data.link;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    updateCourseHome() {
      let data = {
        id: this.id,
        active: this.active,
        banner: this.banner,
        createdTimestamp: this.createdTimestamp,
        modifiedTimestamp: this.modifiedTimestamp,
        name: this.name,
        stt: this.stt,
        title: this.title,
        description: this.description,
        link: this.link,
      };
      this.$store.dispatch("courseHome/updateCourseHome", data).then(
        (res) => {
          if (res.body) {
            // alert("okokok");
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
          this.message = " Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    getBack() {
      this.$router.go(-1);
    },
    getLinkBanner(value) {
      this.banner = value;
    },
  },
  created() {
    if (this.id) {
      this.getListCourseHomeId();
    }
  },
};
</script>

<style>
</style>