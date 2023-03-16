<template>
  <div class="w-100 pa-3">
    <v-container>
      <div class="d-flex justify-space-between mb-6">
        <div class="title-page">
          <!-- <h2>{{ id ? "Sửa mã kích hoạt" : "Thêm mới mã khoá học" }}</h2> -->
          <h2>Thêm mới mã khoá học</h2>
        </div>
      </div>
    </v-container>
    <div>
      <v-form
        enctype="multipart/form-data"
        accept-charset="UTF-8"
        method="POST"
        action="education/v1/card/generator/upload"
        id="file-form"
      >
        <v-container>
          <div>
            <v-row class="align-center">
              <v-col cols="2">
                <label for="#">Chọn danh sách thẻ</label>
              </v-col>
              <v-col cols="6">
                <v-file-input
                  show-size
                  counter
                  multiple
                  label="File input"
                  v-model="files"
                  accept=".xlsx"
                  name="fileToUpload"
                  id="fileToUpload"
                ></v-file-input>
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
      <!-- <form
        action=""
        id="file-form"
        method="POST"
        enctype="multipart/form-data"
        accept-charset="UTF-8"
      >
        <input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          accept=".xlsx"
        />
        <button type="submit">Gửi</button>
      </form> -->
    </div>
  </div>
</template>

<script>
import { codeService } from "../../../store/services/code.service";
export default {
  data: () => ({
    files: null,
  }),
  methods: {
    // submit() {
    //   this.addCode();
    // },
    overrideSubmitTestLesson() {
      document.forms["file-form"].addEventListener("submit", (event) => {
        event.preventDefault();
        codeService.submitFile("Danhsachma", event).then((resp) => {
          return resp.json();
        });
        console.log(event);
        setTimeout(() => {
          this.getBack();
        }, 1000);
      });
    },
    getBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.overrideSubmitTestLesson();
  },
};
</script>

<style scoped>
</style>