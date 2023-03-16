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
                  <label for="#">Chọn khoá học</label>
                </v-col>
                <v-col cols="5">
                  <v-select
                    :items="lstCourse"
                    item-text="title"
                    item-value="id"
                    dense
                    v-model="courseid"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row>
                <v-col cols="12">
                  <v-btn class="mr-4" @click="submit"> Tra cứu </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-form>
      </div>
      <h4>Kết quả tìm kiếm</h4>
      <div>
        <v-data-table
          :headers="headers"
          :items="listHistory"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:[`item.ctime`]="{ item }">
            <!-- {{ item.cTime.formatDate(item.cTime, "DD/MM/YYYY HH:mm") }} -->
            <span>{{ item.ctime | moment("DD/MM/YYYY HH:mm") }}</span>
          </template>
        </v-data-table>
      </div>
    </v-container>
    <!-- <div>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="curentPage"
                  class="my-4"
                  :length="totalPage"
                  :total-visible="7"
                  @input="handlePageChange"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div> -->
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  data: () => ({
    courseid: "",
    headers: [
      { text: "userId", value: "userId" },
      { text: "lessonId", value: "lessonId" },
      { text: "courseId", value: "courseId" },
      { text: "Nội dung", value: "content" },
      { text: "Hoàn thành", value: "done" },
      { text: "Đường dẫn", value: "testPath" },
      { text: "Ngày tạo", value: "ctime" },
    ],
    listHistory: [
      {
        userId: "",
        lessonId: "",
        courseId: "",
        content: "",
        done: "",
        testPath: "",
        ctime: "",
      },
    ],
    lstCourse: [],
  }),
  mixins: [validationMixin],
  validations: {
    codeId: { required },
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.getListHistory();
    },
    getListHistory() {
      let data = {
        course_id: parseInt(this.courseid),
      };
      let result = this.$store.dispatch("takecare/getListHistory", data);
      result.then(
        (res) => {
          if (res.body) {
            // console.log(res.body);
            this.listHistory = res.body.data;
          }
        },
        (err) => {
          console.log(err);
        }
      );
      console.log(data);
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
    // handlePageChange(value) {
    //   this.curentPage = value;
    //   this.getListHistory();
    // },
  },
  computed: {
    codeIdErrors() {
      const errors = [];
      if (!this.$v.codeId.$dirty) return errors;
      !this.$v.codeId.required &&
        errors.push("Mã khoá học không được bỏ trống");
      return errors;
    },
    query() {
      return {
        query: "",
        size: 10,
        page: 0,
      };
    },
  },
  created() {
    this.getListCourse(this.query);
  },
};
</script>

<style scoped>
</style>