<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa ý kiến" : "Thêm mới ý kiến" }}</h2>
        </div>
      </div>
    </v-container>

    <div>
      <form @submit.prevent="submit">
        <v-container>
          <v-row class="align-center">
            <div class="col-3">
              <v-col cols="5">
                <label for="#">Số thứ tự</label>
              </v-col>
              <v-col cols="12">
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
              <v-col cols="5">
                <label for="#">Tiêu đề</label>
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

            <div class="col-3">
              <v-col cols="5">
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

            <div class="col-3">
              <v-col cols="5">
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

          <v-row>
            <div class="col-3">
              <v-col cols="5">
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

            <div class="col-3">
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
              :idd="'opinionImages'"
              :fileTag="'opinion'"
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
      </form>
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
import { quillEditor } from "vue-quill-editor";
import Alert from "../../../components/Alert";
import FileUpload from "../../HOMEPAGE/util/FileUpload";
export default {
  mixins: [validationMixin],
  validations: {
    stt: { required },
    title: { required },
    banner: { required },
    path: { required },
  },
  data: () => ({
    stt: "",
    title: "",
    banner: "",
    source: "",
    path: "",
    itemsSource: [
      { label: "Ý kiến khách hàng", value: 0 },
      { label: "Ý kiến của báo chí", value: 1 },
    ],
    items: ["Preview Content", "Raw HTML"],
    description: "",
    tab: null,
    html: "",
    createdTimestamp: "",
    modifiedTimestamp: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    itemsActive: [
      { label: "Không kích hoạt", value: false },
      { label: "Kích hoạt", value: true },
    ],
    active: true,
  }),

  computed: {
    id() {
      return this.$route.params.id;
    },
    sttErrors() {
      const errors = [];
      if (!this.$v.stt.$dirty) return errors;
      !this.$v.stt.required && errors.push("Tiêu đề không được bỏ trống");
      return errors;
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
    pathErrors() {
      const errors = [];
      if (!this.$v.path.$dirty) return errors;
      !this.$v.path.required && errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
  },
  methods: {
    previewBodyChange() {},
    createOpinion() {
      let data = {
        path: this.path,
        title: this.title,
        banner: this.banner,
        stt: this.stt,
        active: 1,
        description: this.description,
        content: this.html,
        html: this.html,
        source: parseInt(this.source),
      };
      this.$store.dispatch("opnions/createOpinion", data).then(
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
          this.updateOpinion();
        } else {
          this.createOpinion();
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
    getOpinionId() {
      this.$store.dispatch("opnions/getOpinionId", this.id).then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            let { data } = res.body;
            this.banner = data.banner;
            this.content = data.content;
            this.createdTimestamp = data.createdTimestamp;
            this.description = data.description;
            this.html = data.html;
            this.modifiedTimestamp = data.modifiedTimestamp;
            this.path = data.path;
            this.source = data.source;
            this.stt = data.stt;
            this.title = data.title;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateOpinion() {
      let data = {
        id: this.id,
        path: this.path,
        title: this.title,
        banner: this.banner,
        stt: this.stt,
        active: 1,
        description: this.description,
        content: this.html,
        html: this.html,
        source: this.source,
        createdTimestamp: this.createdTimestamp,
        modifiedTimestamp: this.modifiedTimestamp,
      };
      this.$store.dispatch("opnions/updateOpinion", data).then(
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
    getLinkBanner(value) {
      this.banner = value;
    },
  },
  components: {
    quillEditor,
    Alert,
    FileUpload,
  },
  created() {
    if (this.id) {
      this.getOpinionId();
    }
  },
};
</script>

<style>
.w-20 {
  width: 20%;
}
.height650 {
  min-height: 650px;
}
</style>