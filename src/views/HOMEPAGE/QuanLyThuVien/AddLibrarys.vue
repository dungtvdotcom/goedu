<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa thư viện" : "Thêm mới thư viện" }}</h2>
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

            <div class="col-3">
              <v-col cols="5">
                <label for="#">Nhập nhóm</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="group"
                  label="Nhập nhóm"
                  required
                  :error-messages="groupErrors"
                  @input="$v.group.$touch()"
                  @blur="$v.group.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="5">
                <label for="#">Nhập Tag</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="tag"
                  label="Nhập tag"
                  required
                  :error-messages="tagErrors"
                  @input="$v.tag.$touch()"
                  @blur="$v.tag.$touch()"
                ></v-text-field>
              </v-col>
            </div>
          </v-row>

          <v-row class="align-center">
            <div class="col-3">
              <v-col cols="5">
                <label for="#">SmallBanner</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="smallBanner"
                  label="SmallBanner"
                  required
                  :error-messages="smallBannerErrors"
                  @input="$v.smallBanner.$touch()"
                  @blur="$v.smallBanner.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="5">
                <label for="#">LargeBanner</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="largeBanner"
                  label="LargeBanner"
                  required
                  :error-messages="largeBannerErrors"
                  @input="$v.largeBanner.$touch()"
                  @blur="$v.largeBanner.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-3">
              <v-col cols="5">
                <label for="#">Template</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="template"
                  label="Template"
                  required
                  :error-messages="templateErrors"
                  @input="$v.template.$touch()"
                  @blur="$v.template.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="3">
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    stt: { required },
    group: { required },
    tag: { required },
    template: { required },
    smallBanner: { required },
    largeBanner: { required },
  },
  data: () => ({
    title: "",
    link: "",
    stt: "",
    name: "",
    group: "",
    tag: "",
    template: "",
    description: "",
    smallBanner: "",
    largeBanner: "",
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
  components: {
    Alert,
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
    sttErrors() {
      const errors = [];
      if (!this.$v.stt.$dirty) return errors;
      !this.$v.stt.required && errors.push("Số thứ tự không được bỏ trống");
      return errors;
    },
    groupErrors() {
      const errors = [];
      if (!this.$v.group.$dirty) return errors;
      !this.$v.group.required && errors.push("Nhóm không được bỏ trống");
      return errors;
    },
    tagErrors() {
      const errors = [];
      if (!this.$v.tag.$dirty) return errors;
      !this.$v.tag.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
    smallBannerErrors() {
      const errors = [];
      if (!this.$v.smallBanner.$dirty) return errors;
      !this.$v.smallBanner.required &&
        errors.push("Trường không được bỏ trống");
      return errors;
    },
    largeBannerErrors() {
      const errors = [];
      if (!this.$v.largeBanner.$dirty) return errors;
      !this.$v.largeBanner.required &&
        errors.push("Trường không được bỏ trống");
      return errors;
    },
    templateErrors() {
      const errors = [];
      if (!this.$v.template.$dirty) return errors;
      !this.$v.template.required && errors.push("Trường không được bỏ trống");
      return errors;
    },
  },
  methods: {
    createLibrary() {
      let data = {
        group: this.group,
        title: this.title,
        smallBanner: this.smallBanner,
        largeBanner: this.largeBanner,
        template: this.template,
        tag: this.tag,
        stt: 0,
        description: this.description,
        active: this.active,
      };
      this.$store.dispatch("libraryHome/createLibrary", data).then(
        (res) => {
          if (res.body) {
            console.log(JSON.stringify(data));
          }
        },
        (err) => {
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
          this.updateLibrary();
        } else {
          this.createLibrary();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    getLibraryId() {
      this.$store.dispatch("libraryHome/getLibraryId", this.id).then(
        (res) => {
          if (res.body) {
            console.log(res.body.data);
            let { data } = res.body;
            this.group = data.group;
            this.description = data.description;
            this.largeBanner = data.largeBanner;
            this.smallBanner = data.smallBanner;
            this.stt = data.stt;
            this.tag = data.tag;
            this.template = data.template;
            this.title = data.template;
            this.createdTimestamp = data.createdTimestamp;
            this.modifiedTimestamp = data.modifiedTimestamp;
            this.active = data.active;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    updateLibrary() {
      let data = {
        id: this.id,
        group: this.group,
        title: this.title,
        smallBanner: this.smallBanner,
        largeBanner: this.largeBanner,
        template: this.template,
        tag: this.tag,
        stt: this.stt,
        active: this.active,
        description: this.description,
        createdTimestamp: this.createLibrary,
        modifiedTimestamp: this.modifiedTimestamp,
      };
      this.$store.dispatch("libraryHome/updateLibrary", data).then(
        (res) => {
          if (res.body) {
            console.log(res);
            setTimeout(() => {
              this.getBack();
            }, 1500);
          }
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
      this.getLibraryId();
    }
  },
};
</script>

<style>
</style>