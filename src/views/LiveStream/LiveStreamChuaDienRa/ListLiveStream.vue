<template>
    <div class="w-100 pa-3">
        <div class="d-flex justify-space-between mb-6 align-baseline">
            <div class="title-page">
                <h2>Danh sách LiveStream</h2>
            </div>
            <Search title="Nhập vào tên LiveStream"></Search>
            <div>
                <router-link to="/livestream-pending/them-moi-livestream-pending">
                <v-btn depressed>
                    Thêm mới
                    </v-btn>
                        
                    </router-link>
            </div>
      </div>
      <div>
          <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <!-- <template v-slot:[`header.image`]="{ header }">
      {{ header.text.toUpperCase() }}
    </template> -->

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
import {
    mdiPencil,
    mdiDelete,
  } from '@mdi/js'
import Search from './../../../components/Search'
export default {
    components:{
        Search
    },
    data: () => ({
      headers: [
        { text: 'Tên live Streaming', value: 'tenLiveStream' },
        { text: 'Ngày tạo', value: 'createDate' },
        { text: 'Action', value: 'actions',sortable: false },
      ],
      desserts: [
        {
          tenLiveStream: 'Chủ đề 1',
          createDate: '10h-23/12/19',
        },
        {
          tenLiveStream: 'Chủ đề 1',
          createDate: '10h-23/12/19',
        },
        {
          tenLiveStream: 'Chủ đề 1',
          createDate: '10h-23/12/19',
        },
        {
          tenLiveStream: 'Chủ đề 1',
          createDate: '10h-23/12/19',
        },
        {
          tenLiveStream: 'Chủ đề 1',
          createDate: '10h-23/12/19',
        },
      ],
      icons: {
        mdiPencil,
        mdiDelete,
      },
    }),
    methods:{
        editItem(item){
            console.log(item);
        },
        deleteItem(item){
          console.log(item);
        }
    },
}
</script>

<style scoped>

</style>