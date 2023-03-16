<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <h2>{{ id ? "Sửa nhóm quyền" : "Thêm mới" }}</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form @submit.prevent="submit">
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Code</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="code"
                  label="Nhập code"
                  required
                  :error-messages="codeErrors"
                  @input="$v.code.$touch()"
                  @blur="$v.code.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Pattern</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="pattern"
                  label="Nhập Pattern"
                  required
                  :error-messages="patternErrors"
                  @input="$v.pattern.$touch()"
                  @blur="$v.pattern.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Tên Permission</label>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="name"
                  label="Nhập tên"
                  required
                  :error-messages="nameErrors"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Active</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="listActive"
                  item-text="activeText"
                  item-value="activeValue"
                  dense
                  v-model="active"
                  required
                  :error-messages="activeErrors"
                  @input="$v.active.$touch()"
                  @blur="$v.active.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Quyền truy cập</label>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="listIs_web"
                  item-text="text"
                  item-value="value"
                  dense
                  v-model="is_web"
                  required
                  :error-messages="is_webErrors"
                  @input="$v.is_web.$touch()"
                  @blur="$v.is_web.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Ngày tạo</label>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="createdTimestamp"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="createdTimestamp"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="createdTimestamp" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(createdTimestamp)"
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
                <label for="#">Ngày sửa</label>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="lastUpdatedTimestamp"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="lastUpdatedTimestamp"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="lastUpdatedTimestamp"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(lastUpdatedTimestamp)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
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
import moment from "moment";
import Alert from "../../../components/Alert";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    code: { required },
    pattern: { required },
    name: { required },
    active: { required },
    is_web: { required },
  },
  components: {
    Alert,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required && errors.push("Trường bắt buộc nhập");
      return errors;
    },
    patternErrors() {
      const errors = [];
      if (!this.$v.pattern.$dirty) return errors;
      !this.$v.pattern.required && errors.push("Trường bắt buộc nhập");
      return errors;
    },

    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Trường bắt buộc nhập");
      return errors;
    },
    activeErrors() {
      const errors = [];
      if (!this.$v.active.$dirty) return errors;
      !this.$v.active.required && errors.push("Trường bắt buộc nhập");
      return errors;
    },
    is_webErrors() {
      const errors = [];
      if (!this.$v.is_web.$dirty) return errors;
      !this.$v.is_web.required && errors.push("Trường bắt buộc nhập");
      return errors;
    },
  },
  data: () => ({
    menu: false,
    menu2: false,
    lastUpdatedTimestamp: new Date().toISOString().substr(0, 10),
    createdTimestamp: new Date().toISOString().substr(0, 10),
    listActive: [
      { activeText: "Kích hoạt", activeValue: 1 },
      { activeText: "Không kích hoạt", activeValue: 0 },
    ],
    active: "",
    is_web: "",
    listIs_web: [
      { text: "WEB", value: 1 },
      { text: "API", value: 0 },
    ],
    code: "",
    pattern: "",
    name: "",
    message: "Lỗi danh sách",
    type: "error",
    snackbar: false,
    submitStatus: null,
  }),
  methods: {
    addPermission() {
      let data = {
        id: null,
        code: this.code,
        pattern: this.pattern,
        name: this.name,
        createdTimestamp: moment(this.createdTimestamp).toISOString(),
        lastUpdatedTimestamp: moment(this.lastUpdatedTimestamp).toISOString(),
        active: this.active,
        is_web: this.is_web,
      };
      let result = this.$store.dispatch("policy/addPermission", data);
      result.then(
        (res) => {
          if (res.body) {
            this.snackbar = true;
            this.message = "Thêm mới thành công";
            this.type = "success";
            setTimeout(() => {
              this.getBack();
              this.snackbar = false;
            }, 1500);
          }
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
    getDetailsPermission(id) {
      let result = this.$store.dispatch("policy/getDetailsPermission", id);
      result.then(
        (res) => {
          if (res.body) {
            let { data } = res.body;
            this.code = data.code;
            this.name = data.name;
            this.pattern = data.pattern;
            this.active = data.active;
            this.is_web = data.isWeb;
            this.createdTimestamp = moment(data.createdTimestamp)
              .local()
              .format("YYYY-MM-DD");
            this.lastUpdatedTimestamp = moment(data.lastUpdatedTimestamp)
              .local()
              .format("YYYY-MM-DD");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    updatePermission() {
      let data = {
        id: this.id,
        code: this.code,
        pattern: this.pattern,
        name: this.name,
        createdTimestamp: moment(this.createdTimestamp).toISOString(),
        lastUpdatedTimestamp: moment(this.lastUpdatedTimestamp).toISOString(),
        active: this.active,
        is_web: this.is_web,
      };
      let result = this.$store.dispatch("policy/updatePermission", data);
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

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.id) {
          this.updatePermission();
        } else {
          this.addPermission();
        }
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
  },
  created() {
    if (this.id) {
      this.getDetailsPermission(this.id);
    }
  },
};
</script>