<template>
  <div class="w-100 pa-3">
    <div class="d-flex justify-space-between mb-6">
      <div class="title-page">
        <h2>Danh sách giáo viên</h2>
      </div>
      <div>
        <router-link to="/danhsachgiaovien/them-moi-giao-vien">
          <v-btn depressed> Thêm mới </v-btn>
        </router-link>
      </div>
    </div>
    <div>
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:[`header.image`]="{ header }">
          {{ header.text.toUpperCase() }}
        </template>

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
      {
        text: "STT",
        align: "start",
        value: "stt",
      },
      { text: "Họ và Tên", value: "name" },
      { text: "Số điện thoại", value: "phone" },
      { text: "Email", value: "Email" },
      { text: "Kế hoạch học tập", value: "plan" },
      { text: "Số buổi học thực tế", value: "number" },
      { text: "Tổng thời gian học", value: "study" },
      { text: "Hoàn thành bài test", value: "test" },
      { text: "Điểm trung bình", value: "mark" },
      { text: "Action", value: "actions", sortable: false },
    ],
    desserts: [
      {
        stt: "Frozen Yogurt",
        name: "Nguyễn Kim Ánh",
        phone: "0123466",
        Email: "email",
        plan: "Kế hoạch học tập",
        number: "Số buổi học thực tế",
        study: "Tổng thời gian học",
        test: "Hoàn thành bài test",
        mark: "Điểm trung bình",
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