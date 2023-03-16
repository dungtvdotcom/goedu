<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa email" : "Thêm mới email" }}</h2>
        </div>
      </div>
    </v-container>

    <div>
      <form @submit.prevent="submit">
        <v-container>
          <v-row class="align-center">
            <div class="col-6">
              <v-col cols="5">
                <label for="#">Email</label>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Nhập Email"
                  required
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
            </div>

            <div class="col-6">
              <v-col cols="5">
                <label for="#">Source</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="itemsSource"
                  label="Source"
                  v-model="source"
                  item-text="label"
                  item-value="value"
                ></v-select>
              </v-col>
            </div>
          </v-row>
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
import { required, email } from "vuelidate/lib/validators";
import Alert from "../../../components/Alert";
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },
  data: () => ({
    email: "",
    source: "",
    itemsSource: [
      { label: "Ý kiến khách hàng", value: "0" },
      { label: "Ý kiến của báo chí", value: "1" },
    ],
    createdTimestamp: "",
    modifiedTimestamp: "",
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Không đúng định dạng");
      !this.$v.email.required && errors.push("Email không được bỏ trống");
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
          this.updateSubscribedEmails();
        } else {
          this.createSubscribedEmails();
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
    createSubscribedEmails() {
      let data = {
        email: this.email,
        source: this.source,
      };
      this.$store.dispatch("emails/createSubscribedEmails", data).then(
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

    getSubscribedEmailId() {
      this.$store.dispatch("emails/getSubscribedEmailId", this.id).then(
        (res) => {
          if (res.body) {
            console.log(res.body);
            let { data } = res.body;
            this.email = data.email;
            this.source = data.source;
            this.createdTimestamp = data.createdTimestamp;
            this.modifiedTimestamp = data.modifiedTimestamp;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    updateSubscribedEmails() {
      let data = {
        id: this.id,
        email: this.email,
        source: this.source,
        createdTimestamp: this.createdTimestamp,
        modifiedTimestamp: this.modifiedTimestamp,
      };
      this.$store.dispatch("emails/updateSubscribedEmails", data).then(
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
  },
  created() {
    if (this.id) {
      this.getSubscribedEmailId();
    }
  },
};
</script>

<style>
</style>