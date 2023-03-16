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
      <v-form @submit.prevent="submit">
        <v-container>
          <v-row class="align-center">
            <div class="col-4">
              <v-col cols="3">
                <label for="#">Nhập tiêu đề</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Nhập tiêu đề"
                  required
                  :error-messages="titleErrors"
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
            </div>
            <div class="col-4">
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

            <div class="col-4">
              <v-col cols="3">
                <label for="#">Đường dẫn</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="path"
                  label="Nhập đường dẫn"
                  required
                  :error-messages="pathErrors"
                  @input="$v.path.$touch()"
                  @blur="$v.path.$touch()"
                ></v-text-field>
              </v-col>
            </div>
          </v-row>

          <v-row class="align-center">
            <div class="col-4">
              <v-col cols="2">
                <label for="#">Kind</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="kind"
                  label="Nhập kind"
                  required
                  :error-messages="kindErrors"
                  @input="$v.kind.$touch()"
                  @blur="$v.kind.$touch()"
                ></v-text-field>
              </v-col>
            </div>
            <div class="col-4">
              <v-col cols="2">
                <label for="#">Tags</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="tags"
                  label="Nhập tag"
                  required
                  :error-messages="tagsErrors"
                  @input="$v.tags.$touch()"
                  @blur="$v.tags.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-4 d-flex">
              <div class="col-6">
                <v-col cols="2">
                  <label for="#">Source</label>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="itemsSource"
                    label="Source"
                    v-model="source"
                    item-text="label"
                    item-value="value"
                  ></v-select>
                </v-col>
              </div>
              <div class="col-6">
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
            </div>
          </v-row>

          <div class="col-4">
            <v-col cols="3">
              <label for="#">Số thứ tự</label>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="stt"
                label="Nhập số thứ tự"
                required
                :error-messages="sttErrors"
                @input="$v.stt.$touch()"
                @blur="$v.stt.$touch()"
              ></v-text-field>
            </v-col>
          </div>

          <div class="upload-img">
            <FileUpload
              :idd="'storiesImages'"
              :fileTag="'stories'"
              @linkBanner="getLinkBanner"
            ></FileUpload>
          </div>

          <div>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import moment from "moment";
const mammoth = require("mammoth");
import { quillEditor } from "vue-quill-editor";
import Alert from "../../../components/Alert";
import FileUpload from "../util/FileUpload.vue";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    banner: { required },
    kind: { required },
    tags: { required },
    path: { required },
    source: { required },
    stt: { required },
  },
  data: () => ({
    dialogDelete: false,
    title: "",
    banner: "",
    kind: "",
    tags: "",
    modifiedTimestamp: "",
    createdTimestamp: "",
    tag: [],
    items: ["Preview Content", "Raw HTML"],
    html: "",
    tab: null,
    description: "",
    source: "",
    itemsSource: [
      { label: "Ý kiến khách hàng", value: 0 },
      { label: "Ý kiến của báo chí", value: 1 },
    ],
    path: "",
    html_content: "",
    itemsActive: [
      { label: "Không kích hoạt", value: false },
      { label: "Kích hoạt", value: true },
    ],
    active: false,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    stt: "",
  }),
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          this.updateBlogs();
        } else {
          this.createBlog();
        }

        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    previewBodyChange(e) {
      console.log(e);
    },
    getDataDemo() {
      console.log(this.html);
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
    createBlog() {
      let data = {
        path: this.path,
        title: this.title,
        banner: this.banner,
        description: this.description,
        kind: this.kind,
        tags: this.tags,
        active: this.active,
        html: this.html,
        source: this.source,
        content: this.html,
        stt: this.stt,
      };
      let result = this.$store.dispatch("blogs/createBlogs", data);
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

    getBlogId() {
      let result = this.$store.dispatch("blogs/getBlogId", this.id);
      result.then(
        (res) => {
          console.log(res.body.data);
          if (res.body) {
            let { data } = res.body;
            this.active = data.active;
            this.banner = data.banner;
            this.content = data.content;
            this.description = data.description;
            this.html = this.getBodyHtml(data.html);
            this.kind = data.kind;
            this.path = data.path;
            this.source = data.source;
            this.stt = data.stt;
            this.tags = data.tags;
            this.title = data.title;
            this.createdTimestamp = data.createdTimestamp;
            this.modifiedTimestamp = data.modifiedTimestamp;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    updateBlogs() {
      let data = {
        id: this.id,
        active: this.active,
        banner: this.banner,
        content: this.content,
        description: this.description,
        html: this.makeRawHtml(this.html),
        kind: this.kind,
        path: this.path,
        source: this.source,
        stt: this.stt,
        tags: this.tags,
        title: this.title,
        createdTimestamp: this.createdTimestamp,
        modifiedTimestamp: this.modifiedTimestamp,
      };
      let result = this.$store.dispatch("blogs/updateBlogs", data);
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
    getBack() {
      this.$router.go(-1);
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

    makeRawHtml(value) {
      return (
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> <html><body>' +
        value +
        "</body</html>"
      );
    },
    getLinkBanner(value) {
      this.banner = value;
    },
  },
  created() {
    if (this.id) {
      this.getBlogId();
    }
  },
  components: {
    quillEditor,
    Alert,
    FileUpload,
  },
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
    kindErrors() {
      const errors = [];
      if (!this.$v.kind.$dirty) return errors;
      !this.$v.kind.required && errors.push("Kind không được bỏ trống");
      return errors;
    },
    tagsErrors() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.required && errors.push("Tag không được bỏ trống");
      return errors;
    },
    titleEErrors() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.required && errors.push("");
      return errors;
    },
    pathErrors() {
      const errors = [];
      if (!this.$v.path.$dirty) return errors;
      !this.$v.path.required && errors.push("");
      return errors;
    },
    sttErrors() {
      const errors = [];
      if (!this.$v.stt.$dirty) return errors;
      !this.$v.stt.required && errors.push("");
      return errors;
    },
  },
};
</script>

<style>
.height650 {
  min-height: 650px;
}
</style>
