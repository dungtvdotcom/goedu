<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa file mẫu" : "Tạo mới file mẫu" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Nhập tên File mẫu</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="title"
                  label="Nhập tên chủ đề"
                  required
                  :error-messages="titleErrors"
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Ảnh đại diện</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="image"
                  label="Nhập khoá học"
                  required
                  :error-messages="imageErrors"
                  @input="$v.image.$touch()"
                  @blur="$v.image.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Chọn khoá học</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="lstCourse"
                  label="Chọn mã khoá học"
                  v-model="course"
                  item-text="code"
                  item-value="id"
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
                  label="Tag"
                  required
                  :error-messages="tagErrors"
                  @input="$v.tag.$touch()"
                  @blur="$v.tag.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Ngày tạo</label>
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
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(atTime)"
                    >
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
                <label for="#">Template</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="template"
                  label="Template"
                  required
                  :error-messages="templateErrors"
                  @input="$v.template.$touch()"
                  @blur="$v.template.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Mô tả khoá học</label>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Nhập mô tả khoá học"
                  v-model="description"
                  :error-messages="descriptionErrors"
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
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
import { required } from "vuelidate/lib/validators";
import moment from "moment";
import Alert from "../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    course: { required },
    tag: { required },
    description: { required },
    image: { required },
    template: { required },
  },
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: [],
    title: "",
    image: "",
    course: "",
    atTime: new Date().toISOString().substr(0, 10),
    menu: false,
    description: "",
    tag: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    lstCourse: [],
    template: "",
  }),
  components: {
    Alert,
  },
  methods: {
    addFile() {
      let data = {
        id: null,
        title: this.title,
        image: "0.png",
        template: this.template,
        tag: this.tag,
        course: parseInt(this.course),
        active: "",
        atTime: moment(this.atTime).toISOString(),
        description: this.description,
      };
      let result = this.$store.dispatch("library/addFile", data);
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
      } else {
        if (this.id) {
          this.updateFile();
        } else {
          this.addFile();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    getBack() {
      this.$router.go(-1);
    },
    getDetailFile() {
      let result = this.$store.dispatch("library/getDetailFile", this.id);
      result.then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            let { data } = res.body;
            this.title = data.title;
            this.image = data.image;
            this.template = data.template;
            this.tag = data.tag;
            this.atTime = moment(data.atTime).local().format("YYYY-MM-DD");
            this.course = data.course;
            this.description = data.description;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateFile() {
      let data = {
        id: this.id,
        title: this.title,
        image: this.image,
        template: this.template,
        tag: this.tag,
        course: this.course,
        active: "",
        atTime: moment(this.atTime).toISOString(),
        description: this.description,
      };
      let result = this.$store.dispatch("library/updateFile", data);
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
          console.log(err);
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
        }
      );
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
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Tên file không được bỏ trống");
      return errors;
    },

    courseErrors() {
      const errors = [];
      if (!this.$v.course.$dirty) return errors;
      !this.$v.course.required &&
        errors.push("Tên khoá học không được bỏ trống");
      return errors;
    },

    tagErrors() {
      const errors = [];
      if (!this.$v.tag.$dirty) return errors;
      !this.$v.tag.required && errors.push("Trường không được bỏ trống");
      return errors;
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required &&
        errors.push("Trường không được bỏ trống");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.image.$dirty) return errors;
      !this.$v.image.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    templateErrors() {
      const errors = [];
      if (!this.$v.template.$dirty) return errors;
      !this.$v.template.required && errors.push("Trường không được bỏ trống");
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
    if (this.id) {
      this.getDetailFile();
    }
    this.getListCourse(this.query);
  },
};
</script>

<style scoped>
</style>