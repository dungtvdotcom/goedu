<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6">
      <div class="title-page">
        <h2>Hướng dẫn khoá học</h2>
      </div>
    </div>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <v-row>
            <!-- TITLE -->
            <div class="col-10 pa-0">
              <v-row class="align-center">
                <v-col cols="8">
                  <v-text-field
                    v-model="title"
                    label="Nhập tiêu đề"
                    required
                    :error-messages="titleErrors"
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>
          <v-row>
            <div class="col-4 pa-0">
              <v-row class="align-center">
                <v-col cols="6">
                  <v-select
                    v-model="selectedKind"
                    :value="kind"
                    label="Nhập loại tài liệu"
                    required
                    item-text="k"
                    item-value="v"
                    :items="kinds"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </div>

            <!-- TAG -->
            <div class="col-4 pa-0">
              <v-row class="align-center">
                <v-col cols="10">
                  <v-select
                    :value="tag"
                    multiple
                    label="Nhập Tag"
                    required
                    item-text="k"
                    item-value="v"
                    chips
                    :items="tags"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </div>

            <!-- DATE TIME -->
            <div class="col-4 pa-0">
              <v-row class="align-center">
                <v-col cols="7">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="at_time"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="at_time"
                        label="Nhập Ngày tháng"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="at_time" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(at_time)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
          </v-row>

          <v-row>
            <!-- KEYWORD -->
            <div class="col-10 pa-0">
              <v-row class="align-center">
                <v-col cols="8">
                  <v-text-field
                    v-model="keyword"
                    label="Nhập từ khóa liên quan"
                    required
                    :error-messages="keywordErrors"
                    @input="$v.keyword.$touch()"
                    @blur="$v.keyword.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>

          <v-row>
            <!-- NOTE -->
            <div class="col-10 pa-0">
              <v-row class="align-center">
                <v-col cols="8">
                  <!-- <v-text-field
                    v-model="note"s
                    label="Note"
                    required
                    :error-messages="noteErrors"
                    @input="$v.note.$touch()"
                    @blur="$v.note.$touch()"
                  ></v-text-field> -->
                  <p>Nhập tóm tắt nội dung:</p>
                  <v-textarea
                    name="input-7-1"
                    label="Nhập tóm tắt nội dung"
                    v-model="note"
                    requireds
                    solo
                    :error-messages="noteErrors"
                    @input="$v.note.$touch()"
                    @blur="$v.note.$touch()"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!-- HTML -->

          <div class="col-10 pa-0">
            <v-row class="align-center">
              <v-col cols="8">
                <p>Nhập nội dung HTML:</p>
                <v-file-input
                  label="File input"
                  id="input"
                  ref="myFiles"
                  multiple
                  @change="convertDocx"
                ></v-file-input>
                <div id="docx" v-html="html_content" ref="result1"></div>
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

          <div>
            <v-card color="basil" class="mt-3">
              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                grow
              >
                <v-tab v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card color="basil" flat>
                    <!-- <v-card-text>ddddddddđ</v-card-text> -->
                    <div class="height650">
                      <!--  <vue-editor
                        v-model="html"
                        style="height: 100%"
                      ></vue-editor>-->
                      <quill-editor
                        ref="myQuillEditor"
                        style="height: 100%"
                        :options="{}"
                        v-model="html"
                      />
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="basil" flat>
                    <!-- <v-card-text>{{ text }}</v-card-text> -->
                    <v-col cols="12" md="12">
                      <v-textarea
                        solo
                        name="input-7-4"
                        label=""
                        v-model="html"
                        @keyup="previewBodyChange"
                        class="height650"
                        rows="19"
                      ></v-textarea>
                    </v-col>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
            <br />
            <p>
              Bạn có thể sử dụng <strong><span>MS Word</span></strong> Hoặc sử
              dụng công cụ khác :
              <a target="_blank" href="https://html-online.com/editor/"
                >https://html-online.com/editor/</a
              >
            </p>
          </div>
        </v-container>
      </v-form>
    </div>
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import moment from "moment";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Alert from "../../components/Alert";
const mammoth = require("mammoth");
// import { VueEditor } from "vue2-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  mixins: [validationMixin],
  validations: {
    kind: { required },
    tag: { required },
    note: { required },
    keyword: { required },
    title: { required },
  },
  components: {
    Alert,
    quillEditor,
  },
  data: () => ({
    selectedKind: { k: "MS Excel", v: 1 },
    kinds: [
      { k: "MS Excel", v: 1 },
      { k: "MS Word", v: 2 },
      { k: "MS Powerpoint", v: 3 },
    ],
    tags: [
      { k: "FUNC", v: "FUNC" },
      { k: "FORMAT", v: "FORMAT" },
      { k: "CHART", v: "CHART" },
      { k: "FORMULA", v: "FORMULA" },
      { k: "KEY", v: "KEY" },
      { k: "ERROR", v: "ERROR" },
    ],
    tag: [],
    menu: false,
    at_time: new Date().toISOString().substr(0, 10),
    kind: 0,
    note: "",
    keyword: "",
    html_content: "",
    title: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    tab: null,
    items: ["Preview Content", "Raw HTML"],
    html: "",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),
  methods: {
    previewBodyChange(e) {
      console.log(e);
    },
    guideCourse() {
      let data = {
        kind: parseInt(this.kind),
        tag: this.tag.join(" "),
        title: this.title,
        note: this.note,
        keyword: this.keyword,
        html: this.html,
        at_time: moment(this.at_time).format("x"),
      };
      let result = this.$store.dispatch("guide/guideCourse", data);
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
          this.snackbar = true;
          this.message = "Đã có lỗi xảy ra";
          this.type = "error";
          console.log(err);
        }
      );
      console.log(data);
    },
    async convertDocx(event) {
      // console.log(event);
      var str = "";
      var files = event || [];
      if (!files.length) return;
      var file = files[0];
      var result1 = this.$refs.result1,
        result2 = this.$refs.resut2,
        result3 = this.$refs.resullt3;
      console.time();
      var reader = new FileReader();
      reader.onloadend = function (event) {
        var arrayBuffer = reader.result;
        mammoth
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(function (resultObject) {
            // result1.innerHTML = resultObject.value;
            // console.log(resultObject.value);
            str = resultObject.value;
          });
      };
      reader.readAsArrayBuffer(file);
      setTimeout(() => {
        this.html = this.getBodyHtml(str);
      }, 1000);
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.$route.params.id) {
          this.updateGuide();
        } else {
          this.guideCourse();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },

    getHtml(id) {
      let result = this.$store.dispatch("guide/getDetailGuide", id);
      result.then(
        (res) => {
          if (res.body) {
            let { _source } = res.body;
            // console.log(_source);
            this.tag = _source.tag.split(" ");
            this.kind = _source.kind;
            this.keyword = _source.keyword;
            this.note = _source.note;
            this.title = _source.title;
            this.html = this.getBodyHtml(_source.html);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateGuide() {
      let data = {
        id: this.$route.params.id,
        kind: this.kind,
        tag: this.tag.join(" "),
        title: this.title,
        note: this.note,
        keyword: this.keyword,
        html: this.makeRawHtml(this.html),
        at_time: moment(this.at_time).format("x"),
      };
      let result = this.$store.dispatch("guide/updateGuide", data);
      result.then(
        (res) => {
          this.snackbar = true;
          this.message = "Sửa thành công";
          this.type = "success";
          setTimeout(() => {
            this.getBack();
          }, 1500);
        },
        (err) => {
          this.snackbar = true;
          this.message = "Sửa không thành công, đã có lỗi xảy ra";
          this.type = "error";
        }
      );
    },
    getBack() {
      this.$router.go(-1);
    },
    getBodyHtml(str) {
      // var bodyTags = str.match(/<body.*?>([\s\S]*)<\/body>/gim);
      // returns an array
      // bodyTags[0] is body open, bodyTags[1] is body close
      // unless someone output the markup backwards :)
      // let bodyContents = str.slice(bodyTags[0].length,-(bodyTags[1].length));
      // return bodyContents; // use as innerHTML of <body>
      let v = /<body.*?>([\s\S]*)<\/body>/.exec(str);
      if (!v || v.length == 0) return str;
      return v[1];
    },
    makeRawHtml(value) {
      return (
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> <html><body>' +
        value +
        "</body</html>"
      );
    },
  },
  computed: {
    kindErrors() {
      const errors = [];
      if (!this.$v.kind.$dirty) return errors;
      !this.$v.kind.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    tagErrors() {
      const errors = [];
      if (!this.$v.tag.$dirty) return errors;
      !this.$v.tag.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    noteErrors() {
      const errors = [];
      if (!this.$v.note.$dirty) return errors;
      !this.$v.note.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    keywordErrors() {
      const errors = [];
      if (!this.$v.keyword.$dirty) return errors;
      !this.$v.keyword.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    id() {
      return {
        doc_id: this.$route.params.id,
      };
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getHtml(this.id);
    }
  },
  watch: {},
};
</script>

<style scoped>
.height650 {
  min-height: 650px;
}
</style>