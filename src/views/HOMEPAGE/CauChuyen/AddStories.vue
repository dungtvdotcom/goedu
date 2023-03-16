<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa câu chuyện" : "Thêm mới câu chuyện" }}</h2>
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
              <v-col cols="3">
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
            <div class="col-4 d-flex align-center">
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
            </div>
          </v-row>

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

        <div>
          <v-row>
            <v-col cols="12">
              <v-btn class="mr-4 bgc-custom" type="submit"> Xác nhận </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </div>
    <Alert :message="message" :type="type" :snackbar="snackbar"></Alert>
  </div>
</template>

<script>
import FileUpload from "../util/FileUpload.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import moment from "moment";
import Alert from "../../../components/Alert";
import { quillEditor } from "vue-quill-editor";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    banner: { required },
    kind: { required },
    tags: { required },
    path: { required },
  },
  data: () => ({
    title: "",
    banner: "",
    kind: "",
    tags: "",
    menu: false,
    menu2: false,
    tag: [],
    items: ["Preview Content", "Raw HTML"],
    html: "",
    tab: null,
    description: "",
    path: "",
    source: "",
    itemsSource: [
      { label: "Ý kiến khách hàng", value: 0 },
      { label: "Ý kiến của báo chí", value: 1 },
    ],
    itemsActive: [
      { label: "Không kích hoạt", value: false },
      { label: "Kích hoạt", value: true },
    ],
    createdTimestamp: "",
    modifiedTimestamp: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    active: true,
  }),
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          this.updateStory();
        } else {
          this.createStory();
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
      let v = /<body.*?>([\s\S]*)<\/body>/.exec(str);
      if (!v || v.length == 0) return str;
      return v[1];
    },
    createStory() {
      let data = {
        path: this.path,
        title: this.title,
        banner: this.banner,
        description: this.description,
        // createdTimestamp: moment(this.createdTimestamp).toISOString(),
        // modifiedTimestamp: moment(this.modifiedTimestamp).toISOString(),
        kind: this.kind,
        tags: this.tags,
        active: this.active,
        html: this.html,
        source: 1,
        content: this.html,
        stt: 1,
      };
      let result = this.$store.dispatch("stories/createStory", data);
      result.then(
        (res) => {
          console.log(res.body);
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

    getStoryId() {
      let result = this.$store.dispatch("stories/getStoryId", this.id);
      result.then(
        (res) => {
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

    updateStory() {
      let data = {
        id: this.id,
        active: this.active,
        banner: this.banner,
        content: this.content,
        description: this.description,
        html: this.html,
        kind: this.kind,
        path: this.path,
        source: this.source,
        stt: this.stt,
        tags: this.tags,
        title: this.title,
        createdTimestamp: this.createdTimestamp,
        modifiedTimestamp: this.modifiedTimestamp,
      };
      this.$store.dispatch("stories/updateStory", data).then(
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
          this.message = "Đax có lỗi xảy ra";
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
      !this.$v.path.required && errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
  },
  created() {
    if (this.id) {
      this.getStoryId();
    }
  },
};
</script>

<style>
.height650 {
  min-height: 650px;
}
</style>