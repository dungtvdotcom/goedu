<template>
  <div class="pa-3 w-100">
    <div class="d-flex justify-space-between mb-6 align-baseline">
      <div class="title-page">
        <h2>Báo cáo tình trạng số thẻ</h2>
      </div>
    </div>
    <div>
      <v-data-table :headers="headers" :items="lstCard" class="elevation-1">
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
    lstCard: [
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
    cardCouter() {
      let result = this.$store.dispatch("report/cardCouter");
      result.then(
        (res) => {
          if (res.body) {
            this.lstCard = res.body.data;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.cardCouter();
  },
};
</script>

<style scope>
</style>