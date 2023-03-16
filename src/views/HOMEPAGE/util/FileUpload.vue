<template>
  <div>
    <div class="upload-area" v-if="idd && fileTag">
      <form
        class="ua-form"
        :id="'file-form-' + idd"
        action=""
        method="POST"
        enctype="multipart/form-data"
        accept-charset="UTF-8"
      >
        <!-- <input type="file" @change="onChangeFile($event)"  :accept="getExt(lessonData.test)" /> -->
        <input
          type="hidden"
          :value="fileTag"
          name="tag"
          :id="'file-tag-id-' + idd"
        />
        <input
          type="file"
          ref="fileupload"
          multiple=""
          name="fileToUpload"
          :id="'file-input-' + idd"
          v-on:change="updateFileName"
          :accept="myExt"
        />
        <p class="p-2" style="cursor: pointer">
          <span v-if="fileNameSelected"
            ><font color="green" face="" size="+1">{{
              fileNameSelected
            }}</font></span
          >
          <span v-else
            >Kéo tệp tin vào khung hoặc
            <font color="red" face="" size="+1">bấm vào đây</font> để tải
            lên</span
          >
        </p>
        <p v-if="link" :key="'linkKey-' + linkKey">
          <a :href="link" target="_blank">{{ link }}</a>
        </p>
        <button
          class="v-btn v-btn--depressed theme--light v-size--default"
          type="submit"
          :disabled="!fileNameSelected"
        >
          Upload
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { libraryService } from "../../../store/services/libraryHome.service";
export default {
  name: "FileUpload",
  props: ["idd", "fileTag"],
  data() {
    return {
      tag: "",
      fileNameSelected: null,
      myExt: ".png,.jpg",
      file: null,
      link: null,
      linkKey: 0,
    };
  },
  created() {
    console.log(this.idd);
    console.log(this.fileTag);
  },
  mounted() {
    this.overrideSubmitTestLesson();
  },
  methods: {
    updateFileName(e) {
      if (e.target.files.length > 0) {
        var ext = e.target.getAttribute("accept");
        var fileName = e.target.files[0].name;
        this.fileNameSelected = fileName;
      }
    },
    overrideSubmitTestLesson() {
      document.forms["file-form-" + this.idd].addEventListener(
        "submit",
        (event) => {
          event.preventDefault();
          let data = {
            fileName: this.fileNameSelected,
            event: event,
          };
          libraryService
            .uploadStaticFile(data)
            .then((res) => {
              // TODO handle body
              console.log(res);
              this.link = res.body.data;
              return res.body.data;
            })
            .then((res) => {
              let linkBanner = res;
              this.$emit("linkBanner", linkBanner);
            })
            .catch((error) => {
              // TODO handle error
              this.$refs.fileupload.value = "";
              this.fileNameSelected = null;
            });
        }
      );
    },
  },
};
</script>
<style>
.upload-area {
  text-align: center;
  border: 2px solid #34a853;
  padding: 30px 0;
  /* color: #34a853; */
}
</style>