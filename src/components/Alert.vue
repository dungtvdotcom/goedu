<template>
  <!-- <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="'top'"
      :right="'right'"
      class="success"
    >
      <v-alert type="success" class="text-success">
        {{ text }}
      </v-alert>
      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
          <v-icon small left>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="statusError"
      :timeout="timeout"
      :top="'top'"
      :right="'right'"
      class="form-error"
    >
      <v-alert type="warning" class="error">
        <span v-for="(e, k) in textError" :key="k">{{ e }}<br /></span>
      </v-alert>
      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="statusError = false">
          <v-icon small left>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div> -->
  <div class="alert">
    <v-snackbar v-model="snackbar" :bottom="'bottom'" :right="'right'">
      <v-alert :type="type" class="text-success">
        {{ message }}
      </v-alert>
      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
          <v-icon small left>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Alert",
  // data: () => ({
  //   snackbar: false,
  //   statusError: false,
  //   text: "Success",
  //   timeout: 3000,
  //   color: "success",
  //   colorError: "success",
  //   textError: [],
  // }),
  // computed: {
  //   ...mapGetters({
  //     success: "alert/success",
  //     error: "alert/error",
  //   }),
  // },
  // methods: {
  //   changeStatus() {
  //     this.snackbar = !this.snackbar;
  //   },
  // },
  // watch: {
  //   success: {
  //     handler(newData) {
  //       this.snackbar = !this.snackbar;
  //     },
  //     deep: true,
  //   },
  //   error: {
  //     handler(newData) {
  //       this.statusError = !this.statusError;
  //       this.textError = newData;
  //     },
  //     deep: true,
  //   },
  // },
  data: () => ({
    timeout: 10000,
  }),
  props: ["message", "type", "snackbar"],
};
</script>

<style scoped>
.notification {
  position: absolute;
  width: 300px;
  right: 0;
  bottom: 0;
}
</style>