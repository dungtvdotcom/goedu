<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>Báo cáo số người sử dụng</h2>
      </div>
    </div>
    <div>
      <v-data-table :headers="headers" :items="lstReport" class="elevation-1">
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
export default {
  data: () => ({
    headers: [
      { text: "Active", value: "active" },
      { text: "Number", value: "number" },
    ],
    lstReport: [
      {
        active: "",
        number: 26,
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
  }),
  methods: {
    userCouter() {
      let result = this.$store.dispatch("report/userCouter");
      result.then((res) => {
        if (res.body) {
          // console.log(res.body.data);
          this.lstReport = res.body.data;
        }
      });
    },
  },
  created() {
    this.userCouter();
  },
};
</script>
<style scope>
</style>