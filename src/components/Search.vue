<template>
  <v-col cols="4">
    <div class="d-flex align-baseline">
      <v-text-field
        v-model="search"
        :label="title"
        single-line
        hide-details
        @keyup="enterSearch"
      ></v-text-field>
      <v-btn icon @click="sentKeyword">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- <v-btn @click="clearSearch"> </v-btn> -->

      <v-btn icon @click="clearSearch">
        <v-icon>mdi-backspace</v-icon>
      </v-btn>
    </div>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    search: "",
    labelName: "",
  }),
  props: ["title"],
  methods: {
    sentKeyword() {
      this.$emit("sentKeyword", this.search);
    },
    enterSearch(e) {
      this.$emit("searchEnter", e, this.search);
    },
    clearSearch(e) {
      this.search = "";
      this.$emit("clearFilter", e);
    },
  },
};
</script>

<style scoped>
</style>