<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa khoá học" : "Thêm mới khoá học" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="6">
                <v-text-field
                  v-model="title"
                  label="Nhập tên ngày học"
                  required
                  :error-messages="titleErrors"
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="courseName"
                  :items="lstCourse"
                  attach
                  chips
                  label="Chọn khoá học"
                  item-text="code"
                  item-value="code"
                  :error-messages="courseNameErrors"
                  @input="$v.courseName.$touch()"
                  @blur="$v.courseName.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="dayLevel"
                label="Nhập ngày học"
                required
                :error-messages="dayLevelErrors"
                @input="$v.dayLevel.$touch()"
                @blur="$v.dayLevel.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="atTime"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="atTime"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="atTime" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(atTime)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="partLevel"
                label="Phần học"
                required
                :error-messages="partLevelErrors"
                @input="$v.partLevel.$touch()"
                @blur="$v.partLevel.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="layout"
                label="Layout"
                required
                :error-messages="layoutErrors"
                @input="$v.layout.$touch()"
                @blur="$v.layout.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="homework"
                label="Bài tập"
                required
                :error-messages="homeworkErrors"
                @input="$v.homework.$touch()"
                @blur="$v.homework.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="test_result_path"
                label="Bài kiểm tra kết thúc"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="lessonLink"
                label="Đường dẫn khoá học"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="topicLevel"
                label="Topic Level"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <div>
            <div class="d-flex align-center justify-space-between">
              <h4>Chỉnh sửa bài học</h4>
              <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
                small
                @click="addLesson"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </div>
            <div class="mt-4" v-for="(item, index) in content" :key="index">
              <h5>Bài học {{ index + 1 }}</h5>
              <v-row>
                <v-col cols="2">
                  <v-text-field
                    label="Layout"
                    required
                    v-model="item.layout"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Bài tập"
                    required
                    v-model="item.exercise"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Ảnh"
                    required
                    v-model="item.poster"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Bài kiểm tra"
                    required
                    v-model="item.test"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Video"
                    required
                    v-model="item.video"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Video thực hành"
                    required
                    v-model="item.video_thuchanh"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
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
      <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Alert from "../../../components/Alert";
import moment from "moment";

export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    courseName: { required },
    dayLevel: { required },
    atTime: { required },
    partLevel: { required },
    layout: { required },
    homework: { required },
  },
  data: () => ({
    lstCourse: [],
    courseName: "",
    title: "",
    dayLevel: "",
    menu: false,
    atTime: new Date().toISOString().substr(0, 10),
    partLevel: "",
    homework: "",
    lessonLink: "",
    test_result_path: "",
    layout: "",
    active: "",
    courseId: 0,
    partIndex: 0,
    dayIndex: 0,
    showSteps: false,
    topicLevel: "",
    content: [
      {
        layout: "",
        test: "",
        topic_index: "",
        exercise: "",
        video: "",
        video_thuchanh: "",
        title: "",
        show_steps: 0,
      },
    ],
    keyWord: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
  }),
  components: {
    Alert,
  },
  methods: {
    getDetailLesson(id) {
      let result = this.$store.dispatch("lesson/getDetailLesson", id);
      result.then(
        (res) => {
          if (res.body) {
            let { data } = res.body;
            this.title = data.title;
            this.content = JSON.parse(data.content);
            this.atTime = moment(data.atTime).local().format("YYYY-MM-DD");
            this.active = data.active;
            this.courseId = data.courseId;
            this.courseName = data.courseName;
            this.partLevel = data.partLevel;
            this.dayLevel = data.dayLevel;
            this.topicLevel = data.topicLevel;
            this.homework = data.homework;
            this.partIndex = data.partIndex;
            this.dayIndex = data.dayIndex;
            this.test_result_path = data.test_result_path;
            this.layout = data.layout;
            this.showSteps = data.showSteps;
            this.lessonLink = data.lessonLink;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getCourse(query) {
      let result = this.$store.dispatch("course/getListCourse", query);
      result.then(
        (res) => {
          this.lstCourse = res.body.data.content;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateLesson() {
      let data = {
        id: parseInt(this.id),
        title: this.title,
        content: JSON.stringify(this.content),
        atTime: moment(this.atTime).toISOString(),
        active: this.active,
        courseId: this.courseId,
        courseName: this.courseName,
        partLevel: this.partLevel,
        dayLevel: this.dayLevel,
        topicLevel: this.topicLevel,
        homework: this.homework,
        partIndex: this.partIndex,
        dayIndex: this.dayIndex,
        test_result_path: this.test_result_path,
        layout: this.layout,
        showSteps: this.showSteps,
        lessonLink: this.lessonLink,
      };
      let result = this.$store.dispatch("lesson/updateLesson", data);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body);
            this.snackbar = true;
            this.message = "Cập nhật thành công";
            this.type = "success";
            setTimeout(() => {
              this.getBack();
              this.snackbar = false;
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

    addNewLesson() {
      let data = {
        id: null,
        title: this.title,
        content: JSON.stringify(this.content),
        atTime: moment(this.atTime).toISOString(),
        active: this.active,
        courseId: this.courseId,
        courseName: this.courseName,
        partLevel: this.partLevel,
        dayLevel: this.dayLevel,
        topicLevel: this.topicLevel,
        homework: this.homework,
        partIndex: this.partIndex,
        dayIndex: this.dayIndex,
        test_result_path: this.test_result_path,
        layout: this.layout,
        showSteps: this.showSteps,
        lessonLink: this.lessonLink,
      };
      let result = this.$store.dispatch("lesson/addLesson", data);
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
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
          console.log(err);
        }
      );
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          this.updateLesson();
        } else {
          this.addNewLesson();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    addLesson() {
      let data = {
        layout: "",
        test: "",
        topic_index: "",
        exercise: "",
        video: "",
        video_thuchanh: "",
        title: "",
        show_steps: 0,
      };
      this.content.push(data);
    },
    getBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required &&
        errors.push("Tên khoá học không được bỏ trống");
      return errors;
    },
    dayLevelErrors() {
      const errors = [];
      if (!this.$v.dayLevel.$dirty) return errors;
      !this.$v.dayLevel.required && errors.push("Ngày học không được bỏ trống");
      return errors;
    },
    partLevelErrors() {
      const errors = [];
      if (!this.$v.partLevel.$dirty) return errors;
      !this.$v.partLevel.required &&
        errors.push("Phần học không được bỏ trống");
      return errors;
    },
    layoutErrors() {
      const errors = [];
      if (!this.$v.layout.$dirty) return errors;
      !this.$v.layout.required && errors.push("Layout không được bỏ trống");
      return errors;
    },
    homeworkErrors() {
      const errors = [];
      if (!this.$v.homework.$dirty) return errors;
      !this.$v.homework.required && errors.push("Bài tập không được bỏ trống");
      return errors;
    },
    query() {
      return {
        query: "",
        page: 0,
        size: 10,
      };
    },
    courseNameErrors() {
      const errors = [];
      if (!this.$v.courseName.$dirty) return errors;
      !this.$v.courseName.required &&
        errors.push("Khoá học không được bỏ trống");
      return errors;
    },
  },
  created() {
    if (this.id) {
      this.getDetailLesson(this.id);
    }
    this.getCourse(this.query);
  },
};
</script>

<style scoped>
</style>