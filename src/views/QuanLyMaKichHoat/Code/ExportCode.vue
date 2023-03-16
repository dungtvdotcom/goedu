<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>Xuất danh sách mã kích hoạt</h2>
        </div>
      </div>
      <div>
        <v-col class="shrink">
          <v-btn class="ma-2" color="primary" @click="expand = !expand">
            Hướng dẫn xuất mã thẻ
          </v-btn>

          <v-expand-transition>
            <v-card v-show="expand" height="200" width="100%" class="mx-auto">
              <v-row>
                <div class="col-3 text-center">
                  <h4 class="pb-2">Excel Plus</h4>
                  <ul>
                    <li class="pb-2">E6Txxxxxx</li>
                    <li class="pb-2">E1Nxxxxxx</li>
                    <li>ETDxxxxxx</li>
                  </ul>
                </div>

                <div class="col-3 text-center">
                  <h4 class="pb-2">Perfect Slide</h4>
                  <ul>
                    <li class="pb-2">P6Txxxxxx</li>
                    <li class="pb-2">P1Nxxxxxx</li>
                    <li>PTDxxxxxx</li>
                  </ul>
                </div>

                <div class="col-3 text-center">
                  <h4 class="pb-2">Super Word</h4>
                  <ul>
                    <li class="pb-2">W6Txxxxxx</li>
                    <li class="pb-2">W1Nxxxxxx</li>
                    <li>WTDxxxxxx</li>
                  </ul>
                </div>

                <div class="col-3 text-center">
                  <h4 class="pb-2">GoMos</h4>
                  <ul>
                    <li class="pb-2">M6Txxxxxx</li>
                    <li class="pb-2">M1Nxxxxxx</li>
                    <li>MTDxxxxxx</li>
                  </ul>
                </div>
              </v-row>
            </v-card>
          </v-expand-transition>
        </v-col>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <!-- CHỌN KHOÁ HỌC -->
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Nhập khoá học</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="lstCourse"
                  label="Chọn mã khoá học"
                  v-model="coursesId"
                  item-text="code"
                  item-value="id"
                  v-on:change="changePrefix(lstCourse, coursesId)"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Tag</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="tag"
                  label="E6T, P6T,W6T, M6T"
                  required
                  :prefix="prefixTag"
                  :error-messages="tagErrors"
                  @input="$v.tag.$touch()"
                  @blur="$v.tag.$touch()"
                  @keyup="uppercase"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <!-- SỐ LƯỢNG MÃ -->
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Nhập số lượng mã</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="amountCode"
                  label="Số lượng mã không được bỏ trống"
                  required
                  :error-messages="amountCodeErrors"
                  @input="$v.amountCode.$touch()"
                  @blur="$v.amountCode.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <!-- THÊM KHOÁ HỌC -->
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Active thêm khoá học</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="course_ref"
                  :items="lstCourse"
                  attach
                  label="Chọn thêm khoá học"
                  multiple
                  item-text="code"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <!-- CHỌN TRẠNG THÁI HỌC THỬ -->
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Trạng thái học thử</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="items"
                  label="Chọn trạng thái"
                  v-model="is_trial"
                  item-text="title"
                  item-value="status"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <!-- CHỌN NGÀY HỌC THỬ -->
          <div v-if="is_trial">
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Chọn ngày học thử</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="indexes"
                  label="Nhập vào bài học thử"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row>
              <v-col cols="12">
                <v-btn class="mr-4 bgc-custom" @click="submit">
                  Tải danh sách mã
                </v-btn>
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
import { required } from "vuelidate/lib/validators";
import FileSaver from "file-saver";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    tag: { required },
    amountCode: { required },
    coursesId: { required },
  },
  data: () => ({
    items: [
      { title: "Học thử", status: true },
      { title: "Không học thử", status: false },
    ],
    tag: "",
    amountCode: 0,
    coursesId: "",
    coursesIds: [],
    ignore_name: true,
    indexes: "0,1,2",
    is_trial: false,
    course_ref: [],
    expand: true,
    lstCourse: [],
    prefixTag: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  components: {
    Alert,
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.downLoad();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    downLoad() {
      let data = {};
      if (this.is_trial) {
        data = {
          tag: this.prefixTag + this.tag,
          number: parseInt(this.amountCode),
          course: parseInt(this.coursesId),
          // course_ref: Array.from(this.convertCourseIds()),
          course_ref: `[${this.course_ref}]`,
          ignore_name: this.ignore_name,
          is_trial: this.is_trial,
          trial_lesson_indexes: this.indexes,
        };
      } else {
        data = {
          tag: this.prefixTag + this.tag,
          number: parseInt(this.amountCode),
          course: parseInt(this.coursesId),
          // course_ref: Array.from(this.convertCourseIds()),
          course_ref: `[${this.course_ref}]`,
          ignore_name: this.ignore_name,
        };
      }

      let result = this.$store.dispatch("code/downLoad", data);
      result.then(
        (res) => {
          var blob = new Blob([res.body], {});
          FileSaver.saveAs(blob, "Danhsachma.xlsx");
          this.reloadInput();
          console.log(data);
        },
        (err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    // convertCourseIds() {
    //   let arrId = this.course_ref.split(" ");
    //   return arrId;
    // },
    reloadInput() {
      this.tag = "";
      this.amountCode = 0;
      this.coursesId = "";
      this.coursesIds = [];
    },
    getListCourse(query) {
      let result = this.$store.dispatch("course/getListCourse", query);
      result.then(
        (res) => {
          if (res.body) {
            this.lstCourse = res.body.data.content;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changePrefix(items, id) {
      let index = items.findIndex((e) => e.id === id);
      let titleCourse = items[index].code;
      if (titleCourse[0] === "S") {
        this.prefixTag = "W";
      } else {
        this.prefixTag = titleCourse[0];
      }
    },
    uppercase() {
      this.tag = this.tag.toUpperCase();
    },
  },
  computed: {
    coursesIdErrors() {
      const errors = [];
      if (!this.$v.coursesId.$dirty) return errors;
      !this.$v.coursesId.required &&
        errors.push("Khoá học không được bỏ trống");
      return errors;
    },
    tagErrors() {
      const errors = [];
      if (!this.$v.tag.$dirty) return errors;
      !this.$v.tag.required && errors.push("Tên tag không được bỏ trống");
      return errors;
    },
    amountCodeErrors() {
      const errors = [];
      if (!this.$v.amountCode.$dirty) return errors;
      !this.$v.amountCode.required &&
        errors.push("Số lượng mã không được bỏ trống");
      return errors;
    },
    query() {
      return {
        query: "",
        page: 0,
        size: 10,
      };
    },
  },
  created() {
    this.getListCourse(this.query);
  },
};
</script>

<style scoped>
</style>