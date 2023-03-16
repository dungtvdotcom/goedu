<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>#CMS GoEdu/Tra cứu lịch sử học tập</h2>
        </div>
      </div>
      <div>
        <v-form>
          <v-container>
            <div>
              <v-row class="align-center">
                <v-col cols="2">
                  <label for="#">Nhập Email tạo tài khoản</label>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="email"
                    label="Nhập email"
                    required
                    type="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row class="align-center">
                <v-col cols="2">
                  <label for="#">Nhập mã kích hoạt</label>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="codeAvtive"
                    required
                    :error-messages="codeAvtiveErrors"
                    @input="$v.codeAvtive.$touch()"
                    @blur="$v.codeAvtive.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row>
                <v-col cols="12">
                  <v-btn class="mr-4" type="submit" @click="submit">
                    Xác nhận
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-form>
      </div>
      <h4>Kết quả tìm kiếm</h4>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  data: () => ({
    email: "",
    codeAvtive: "",
  }),
  mixins: [validationMixin],
  validations: {
    codeAvtive: { required },
    email: { required, email },
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Không đúng định dạng");
      !this.$v.email.required && errors.push("Email không được bỏ trống");
      return errors;
    },
    codeAvtiveErrors() {
      const errors = [];
      if (!this.$v.codeAvtive.$dirty) return errors;
      !this.$v.codeAvtive.required &&
        errors.push("Mã kích hoạt không được bỏ trống");
      return errors;
    },
  },
};
</script>

<style scoped>
</style>