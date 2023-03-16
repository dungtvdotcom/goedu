<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6">
      <div class="title-page">
        <h2>Danh sách chủ đề</h2>
      </div>
      <div>
        <router-link to="/danhsachchude/them-moi-chu-de">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
          <!-- <span >Sửa</span> -->
          <v-icon @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
export default {
  data: () => ({
    headers: [
      { text: "Tên chủ đề", value: "topicName" },
      { text: "Mô tả chủ đề", value: "describe" },
      { text: "Ngày tạo", value: "createDate" },
      { text: "Action", value: "actions", sortable: false },
    ],
    desserts: [
      {
        topicName: "Chủ đề 1",
        describe: "30 ngày",
        createDate: "10h-23/12/19",
      },
      {
        topicName: "Chủ đề 2",
        describe: "30 ngày",
        createDate: "10h-23/12/19",
      },
      {
        topicName: "Chủ đề 3",
        describe: "30 ngày",
        createDate: "10h-23/12/19",
      },
      {
        topicName: "Chủ đề 4",
        describe: "30 ngày",
        createDate: "10h-23/12/19",
      },
      {
        topicName: "Chủ đề 5",
        describe: "30 ngày",
        createDate: "10h-23/12/19",
      },
    ],
    icons: {
      mdiPencil,
      mdiDelete,
    },
  }),
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
</style>