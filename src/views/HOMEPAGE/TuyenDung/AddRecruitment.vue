<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa tuyển dụng" : "Thêm mới tuyển dụng" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <form @submit.prevent="submit">
        <v-container>
          <v-row>
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
                <label for="#">Đường dẫn</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="path"
                  label="Nhập nhập đường dẫn"
                  required
                  :error-messages="pathErrors"
                  @input="$v.path.$touch()"
                  @blur="$v.path.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="5">
                <label for="#">Hình thức</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="kind"
                  label="Nhập hình thức"
                  required
                  :error-messages="kindErrors"
                  @input="$v.kind.$touch()"
                  @blur="$v.kind.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="6">
                <label for="#">Ngày apply</label>
              </v-col>
              <v-col cols="9">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="applyTime"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="applyTime"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="applyTime" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(applyTime)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </div>
          </v-row>

          <v-row>
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

            <div class="col-3">
              <v-col cols="5">
                <label for="#">Vị trí</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="position"
                  label="Nhập vị trí tuyển dụng"
                  required
                  :error-messages="positionErrors"
                  @input="$v.position.$touch()"
                  @blur="$v.position.$touch()"
                ></v-text-field>
              </v-col>
            </div>
          </v-row>

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
                  <div class="height650">
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
const mammoth = require("mammoth");
import { quillEditor } from "vue-quill-editor";
import moment from "moment";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    path: { required },
    title: { required },
    kind: { required },
    position: { required },
  },
  components: {
    quillEditor,
    Alert,
  },
  data: () => ({
    path: "",
    title: "",
    kind: "",
    menu: false,
    applyTime: new Date().toISOString().substr(0, 10),
    description: "",
    html: "",
    content: "",
    createdTimestamp: "",
    modifiedTimestamp: "",
    items: ["Preview Content", "Raw HTML"],
    tab: null,
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    itemsActive: [
      { label: "Không kích hoạt", value: false },
      { label: "Kích hoạt", value: true },
    ],
    active: true,
    position: "",
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    pathErrors() {
      const errors = [];
      if (!this.$v.path.$dirty) return errors;
      !this.$v.path.required && errors.push("Đường dẫn không được bỏ trống");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Tiêu đề không được bỏ trống");
      return errors;
    },
    kindErrors() {
      const errors = [];
      if (!this.$v.kind.$dirty) return errors;
      !this.$v.kind.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    positionErrors() {
      const errors = [];
      if (!this.$v.position.$dirty) return errors;
      !this.$v.position.required && errors.push("Trường không được bỏ trống");
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
          this.updateRecruitment();
        } else {
          this.createRecruitment();
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
    createRecruitment() {
      let data = {
        path: this.path,
        title: this.title,
        description: this.description,
        content: this.html,
        html: this.html,
        applyTime: moment(this.applyTime).format("yyyy-MM-DD HH:mm:ss"),
        kind: this.kind,
        active: this.active,
        position: this.position,
      };
      this.$store.dispatch("recruitments/createRecruitment", data).then(
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
          this.type = "error";
          this.message = "Đã có lỗi xảy ra";
        }
      );
    },
    getRecruitmentId(id) {
      this.$store.dispatch("recruitments/getRecruitmentId", id).then(
        (res) => {
          if (res.body) {
            console.log(res.body);
            let { data } = res.body;
            this.applyTime = new Date(data.applyTime)
              .toISOString()
              .substr(0, 10);
            this.content = data.content;
            this.createRecruitment = data.createRecruitment;
            this.description = data.description;
            this.html = data.html;
            this.kind = data.kind;
            this.modifiedTimestamp = data.modifiedTimestamp;
            this.path = data.path;
            this.title = data.title;
            this.active = data.active;
            this.position = data.position;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateRecruitment() {
      let data = {
        id: this.id,
        path: this.path,
        title: this.title,
        description: this.description,
        content: this.html,
        html: this.html,
        applyTime: this.applyTime,
        kind: this.kind,
        createdTimestamp: this.createdTimestamp,
        modifiedTimestamp: this.modifiedTimestamp,
        active: this.active,
        position: this.position,
      };
      this.$store.dispatch("recruitments/updateRecruitment", data).then(
        (res) => {
          setTimeout(() => {
            this.getBack();
          }, 1500);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getBack() {
      this.$router.go(-1);
    },
  },
  created() {
    if (this.id) {
      this.getRecruitmentId(this.id);
    }
  },
};
</script>

<style>
.height650 {
  min-height: 650px;
}
</style>