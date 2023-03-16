<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6">
      <div class="title-page">
        <h2>{{ id ? "Sửa khóa học" : "Thêm mới khoá học" }}</h2>
      </div>
    </div>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="title"
                label="Nhập tên khoá học"
                :error-messages="titleErrors"
                required
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="numLesson"
                label="Nhập thời gian học"
                required
                :error-messages="numLessonErrors"
                @input="$v.numLesson.$touch()"
                @blur="$v.numLesson.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="numberDays"
                label="Số lượng ngày học"
                required
                :error-messages="numberDaysErrors"
                @input="$v.numberDays.$touch()"
                @blur="$v.numberDays.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="numberVids"
                label="Số lượng Video"
                required
                :error-messages="numberVidsErrors"
                @input="$v.numberVids.$touch()"
                @blur="$v.numberVids.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="numberPratice"
                label="Số lượng bài thực hành"
                required
                :error-messages="numberPraticeErrors"
                @input="$v.numberPratice.$touch()"
                @blur="$v.numberPratice.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="numberTest"
                label="Số lượng bài test"
                required
                :error-messages="numberTestErrors"
                @input="$v.numberTest.$touch()"
                @blur="$v.numberTest.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="topicNumber"
                label="Số chủ đề"
                required
                :error-messages="topicNumberErrors"
                @input="$v.topicNumber.$touch()"
                @blur="$v.topicNumber.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="code"
                label="Mã khoá học"
                required
                :error-messages="codeErrors"
                @input="$v.code.$touch()"
                @blur="$v.code.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- LandingPage -->
            <v-col cols="6">
              <v-text-field
                v-model="landingPage"
                label="LandingPage"
                required
                :error-messages="landingPageErrors"
                @input="$v.landingPage.$touch()"
                @blur="$v.landingPage.$touch()"
              ></v-text-field>
            </v-col>

            <!-- NGÀY TẠO -->
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

          <!-- TẢI ẢNH ĐẠI DIỆN KHOÁ HỌC -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="tag"
                label="Tag"
                required
                :error-messages="tagErrors"
                @input="$v.tag.$touch()"
                @blur="$v.tag.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="imgSrc"
                label="Ảnh đại diện khoá học"
                required
                :error-messages="imgSrcErrors"
                @input="$v.imgSrc.$touch()"
                @blur="$v.imgSrc.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- TÀI LIỆU KHOÁ HỌC -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="document"
                label="Tài liệu khoá học"
                required
                :error-messages="documentErrors"
                @input="$v.document.$touch()"
                @blur="$v.document.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="icon"
                label="Icon"
                required
                :error-messages="iconErrors"
                @input="$v.icon.$touch()"
                @blur="$v.icon.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- FACEBOOK GROUP -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="fbGroup"
                label="Facebook Group"
                required
                :error-messages="fbGroupErrors"
                @input="$v.fbGroup.$touch()"
                @blur="$v.fbGroup.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="firstLessonLink"
                label="Bài học đầu"
                required
                :error-messages="firstLessonLinkErrors"
                @input="$v.firstLessonLink.$touch()"
                @blur="$v.firstLessonLink.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- VIDEO SRC -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="videoSrc"
                label="Đường dẫn video"
                required
                :error-messages="videoSrcErrors"
                @input="$v.videoSrc.$touch()"
                @blur="$v.videoSrc.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="videoSrcPoster"
                label="Video Poster"
                required
                :error-messages="videoSrcPosterErrors"
                @input="$v.videoSrcPoster.$touch()"
                @blur="$v.videoSrcPoster.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="courseLink"
                label="Link khoá học"
                required
                :error-messages="courseLinkErrors"
                @input="$v.courseLink.$touch()"
                @blur="$v.courseLink.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6 row">
              <div class="col-6">
                <v-text-field
                  v-model="firstLessonId"
                  label="Id bài học"
                  required
                  :error-messages="firstLessonIdErrors"
                  @input="$v.firstLessonId.$touch()"
                  @blur="$v.firstLessonId.$touch()"
                ></v-text-field>
              </div>
              <div class="col-6">
                <v-select
                  :items="itemsPublic"
                  label="Trạng thái khoá học"
                  v-model="isPublic"
                  item-text="label"
                  item-value="value"
                ></v-select>
              </div>
            </v-col>
          </v-row>
          <!-- OVERVIEW -->
          <div>
            <h4>Chi tiết khoá học</h4>
          </div>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="overview.day" label="Ngày"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="overview.day_title"
                label="Tiêu đề ngày"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="overview.topic"
                label="Chủ đề"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="overview.topic_title"
                label="Tiêu đề topic"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="overview.test"
                label="Kiểm tra"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="overview.test_title"
                label="Tên kiểm tra"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- NỘI DUNG KHOÁ HỌC -->
          <div>
            <v-row>
              <v-col cols="6">
                <label for="#">Nội dung khoá học</label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Nội dung khoá học"
                  v-model="content"
                  required
                  :error-messages="contentErrors"
                  @input="$v.content.$touch()"
                  @blur="$v.content.$touch()"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>

          <!-- HƯỚNG DẪN HỌC TẬP -->
          <div>
            <v-row>
              <v-col cols="6">
                <label for="#">Hướng dẫn học tập</label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Hướng dẫn học tập"
                  v-model="guide"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>

          <!-- KẾT QUẢ ĐẠT ĐƯỢC SAU KHOÁ HỌC -->
          <div>
            <v-row>
              <v-col cols="6">
                <label for="#">Kết quả đạt được sau khoá học</label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Kết quả đạt được sau khoá học"
                  v-model="goal"
                ></v-textarea>
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
import { required, integer } from "vuelidate/lib/validators";
import moment from "moment";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    numLesson: { required, integer },
    numberDays: { required, integer },
    numberVids: { required, integer },
    numberPratice: { required, integer },
    numberTest: { required, integer },
    topicNumber: { required, integer },
    code: { required },
    content: { required },
    landingPage: { required },
    atTime: { required },
    tag: { required },
    imgSrc: { required },
    document: { required },
    icon: { required },
    fbGroup: { required },
    firstLessonLink: { required },
    videoSrc: { required },
    videoSrcPoster: { required },
    overview: { required },
    courseLink: { required },
    firstLessonId: { required },
  },
  data: () => ({
    valid: false,
    active: 0,
    title: "",
    numLesson: "",
    numberDays: "",
    numberVids: "",
    numberPratice: "",
    numberTest: "",
    topicNumber: "",
    code: "",
    content: "",
    landingPage: "",
    atTime: new Date().toISOString().substr(0, 10),
    menu: false,
    tag: "",
    guide: "",
    goal: "",
    imgSrc: "",
    document: "",
    icon: "",
    fbGroup: "",
    firstLessonLink: "",
    first_lesson_id: 0,
    videoSrc: "",
    videoSrcPoster: "",
    overview: {
      day: "",
      day_title: "",
      topic: "",
      topic_title: "",
      test: "",
      test_title: "",
    },
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    courseLink: "",
    firstLessonId: "",
    itemsPublic: [
      { label: "Miễn phí", value: true },
      { label: "Trả phí", value: false },
    ],
    isPublic: false,
  }),
  components: {
    Alert,
  },
  computed: {
    videoSrcPosterErrors() {
      const errors = [];
      if (!this.$v.videoSrcPoster.$dirty) return errors;
      !this.$v.videoSrcPoster.required &&
        errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
    videoSrcErrors() {
      const errors = [];
      if (!this.$v.videoSrc.$dirty) return errors;
      !this.$v.videoSrc.required &&
        errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
    firstLessonLinkErrors() {
      const errors = [];
      if (!this.$v.firstLessonLink.$dirty) return errors;
      !this.$v.firstLessonLink.required &&
        errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
    fbGroupErrors() {
      const errors = [];
      if (!this.$v.fbGroup.$dirty) return errors;
      !this.$v.fbGroup.required &&
        errors.push("Facebook Group khoá học không được bỏ trống");
      return errors;
    },
    iconErrors() {
      const errors = [];
      if (!this.$v.icon.$dirty) return errors;
      !this.$v.icon.required &&
        errors.push("Icon khoá học không được bỏ trống");
      return errors;
    },
    documentErrors() {
      const errors = [];
      if (!this.$v.document.$dirty) return errors;
      !this.$v.document.required &&
        errors.push("Tài khoá học không được bỏ trống");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required &&
        errors.push("Tên khoá học không được bỏ trống");
      return errors;
    },
    imgSrcErrors() {
      const errors = [];
      if (!this.$v.imgSrc.$dirty) return errors;
      !this.$v.imgSrc.required &&
        errors.push("Ảnh đại diện khoá học không được bỏ trống");
      return errors;
    },
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required && errors.push("Mã khoá học không được bỏ trống");
      return errors;
    },
    numLessonErrors() {
      const errors = [];
      if (!this.$v.numLesson.$dirty) return errors;
      !this.$v.numLesson.required &&
        errors.push("Số bài học không được bỏ trống");
      !this.$v.numLesson.integer && errors.push("Chỉ nhập số");
      return errors;
    },
    landingPageErrors() {
      const errors = [];
      if (!this.$v.landingPage.$dirty) return errors;
      !this.$v.landingPage.required &&
        errors.push("LandingPage khoá học không được bỏ trống");
      return errors;
    },
    numberDaysErrors() {
      const errors = [];
      if (!this.$v.numberDays.$dirty) return errors;
      !this.$v.numberDays.required &&
        errors.push("Số ngày học không được bỏ trống");
      !this.$v.numberDays.integer && errors.push("Chỉ nhập số");
      return errors;
    },
    numberVidsErrors() {
      const errors = [];
      if (!this.$v.numberVids.$dirty) return errors;
      !this.$v.numberVids.required &&
        errors.push("Số lượng video không được bỏ trống");
      !this.$v.numberVids.integer && errors.push("Chỉ nhập số");
      return errors;
    },
    numberPraticeErrors() {
      const errors = [];
      if (!this.$v.numberPratice.$dirty) return errors;
      !this.$v.numberPratice.required &&
        errors.push("Số ngày thực hành không được bỏ trống");
      !this.$v.numberPratice.integer && errors.push("Chỉ nhập số");
      return errors;
    },
    numberTestErrors() {
      const errors = [];
      if (!this.$v.numberTest.$dirty) return errors;
      !this.$v.numberTest.required &&
        errors.push("Số ngày test không được bỏ trống");
      !this.$v.numberTest.integer && errors.push("Chỉ nhập số");
      return errors;
    },
    topicNumberErrors() {
      const errors = [];
      if (!this.$v.topicNumber.$dirty) return errors;
      !this.$v.topicNumber.required &&
        errors.push("Số lượng chủ đề không được bỏ trống");
      !this.$v.topicNumber.integer && errors.push("Chỉ nhập số");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      !this.$v.content.required &&
        errors.push("Nội dung khoá học không được bỏ trống");
      return errors;
    },
    tagErrors() {
      const errors = [];
      if (!this.$v.tag.$dirty) return errors;
      !this.$v.tag.required && errors.push("Trường bắt buộc");
      return errors;
    },
    courseLinkErrors() {
      const errors = [];
      if (!this.$v.courseLink.$dirty) return errors;
      !this.$v.courseLink.required && errors.push("Trường bắt buộc");
      return errors;
    },
    firstLessonIdErrors() {
      const errors = [];
      if (!this.$v.firstLessonId.$dirty) return errors;
      !this.$v.firstLessonId.required && errors.push("Trường bắt buộc");
      return errors;
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          this.updateCourse();
        } else {
          this.addCourse();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    addCourse() {
      let data = {
        code: this.code,
        active: 1,
        // atTime: moment(this.atTime).toISOString(),
        atTime: 1599734618000,
        // atTime: moment(this.atTime).toISOString(),
        title: this.title,
        topicNumber: parseInt(this.topicNumber),
        videoNumber: parseInt(this.numberVids),
        testNumber: parseInt(this.numberTest),
        dayNumber: parseInt(this.numberDays),
        content: this.content,
        document: this.document,
        guide: this.guide,
        goal: this.goal,
        icon: this.icon,
        imgSrc: this.imgSrc,
        landingPage: this.landingPage,
        tag: this.tag,
        videoSrc: this.videoSrc,
        videoSrcPoster: this.videoSrcPoster,
        firstLessonId: parseInt(this.firstLessonId),
        fbGroup: this.fbGroup,
        certSrc: "certSrc",
        overview: JSON.stringify(this.overview),
        numLesson: parseInt(this.numLesson),
        firstLessonLink: this.firstLessonLink,
        courseLink: this.courseLink,
        isPublic: this.isPublic,
      };
      let result = this.$store.dispatch("course/addCourse", data);
      result.then(
        (res) => {
          console.log(data);
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
    getDetailCourse() {
      let result = this.$store.dispatch("course/getDetailCourse", this.id);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            let { data } = res.body;
            this.title = data.title;
            this.numLesson = data.numLesson;
            this.numberDays = data.dayNumber;
            this.numberVids = data.videoNumber;
            this.numberTest = data.testNumber;
            this.topicNumber = data.topicNumber;
            this.code = data.code;
            this.landingPage = data.landingPage;
            this.tag = data.tag;
            this.content = data.content;
            this.guide = data.guide;
            this.atTime = moment(data.atTime).local().format("YYYY-MM-DD");
            this.goal = data.goal;
            this.imgSrc = data.imgSrc;
            this.document = data.document;
            this.icon = data.icon;
            this.fbGroup = data.fbGroup;
            this.firstLessonLink = data.firstLessonLink;
            this.videoSrc = data.videoSrc;
            this.videoSrcPoster = data.videoSrcPoster;
            this.overview = JSON.parse(data.overview);
            this.active = data.active;
            this.firstLessonId = data.firstLessonId;
            this.courseLink = data.courseLink;
            this.isPublic = data.is_public;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateCourse() {
      let data = {
        id: parseInt(this.id),
        code: this.code,
        active: this.active,
        atTime: moment(this.atTime).toISOString(),
        title: this.title,
        topicNumber: this.topicNumber,
        videoNumber: this.numberVids,
        testNumber: this.numberTest,
        dayNumber: this.numberDays,
        content: this.content,
        document: this.document,
        guide: this.guide,
        goal: this.goal,
        icon: this.icon,
        imgSrc: this.imgSrc,
        landingPage: this.landingPage,
        tag: this.tag,
        first_lesson_id: parseInt(this.first_lesson_id),
        videoSrc: this.videoSrc,
        videoSrcPoster: this.videoSrcPoster,
        fbGroup: this.fbGroup,
        certSrc: "certSrc",
        overview: JSON.stringify(this.overview),
        numLesson: this.numLesson,
        banner: "12312313",
        firstLessonLink: this.firstLessonLink,
        firstLessonId: this.firstLessonId,
        courseLink: this.courseLink,
        isPublic: this.isPublic,
      };
      let result = this.$store.dispatch("course/updateCourse", data);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Cập nhật thành công";
          this.type = "success";
          setTimeout(() => {
            this.getBack();
          }, 1500);
        },
        (err) => {
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
  created() {
    if (this.id) {
      console.log(this.id);
      this.getDetailCourse();
    }
  },
};
</script>

<style scoped>
</style>